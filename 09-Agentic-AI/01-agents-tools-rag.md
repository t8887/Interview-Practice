# Agentic AI — Agent Workflows, Tool Calling & Architecture

## What is an AI Agent?
```
Traditional LLM:   Input → LLM → Output (single pass)
AI Agent:          Input → LLM → Think → Act → Observe → Think → Act → ... → Final Answer

Key difference: Agents LOOP — they reason, take actions, observe results, and iterate.
```

## Agent Architecture Patterns

### ReAct (Reasoning + Acting)
```
User: "What's the weather in Mumbai and should I carry an umbrella?"

Agent:
Thought: I need to find the current weather in Mumbai.
Action: get_weather(city="Mumbai")
Observation: Temperature: 32°C, Humidity: 85%, Condition: Partly cloudy, Rain probability: 70%

Thought: Rain probability is 70%, which is high. I should recommend an umbrella.
Action: respond_to_user(answer="It's 32°C and partly cloudy in Mumbai with 70% rain probability. Yes, carry an umbrella!")
```

### Planning Pattern
```
User: "Create a risk assessment report for client XYZ"

Agent Plan:
1. Fetch client data from CRM
2. Query risk database for past incidents
3. Run compliance checks
4. Generate risk score
5. Format into report template
6. Save and notify stakeholders

Agent executes each step, passing outputs to next step.
```

### Multi-Agent Collaboration
```
Orchestrator Agent ──► Research Agent (fetches data)
                   ──► Analysis Agent (processes data)
                   ──► Writer Agent (generates report)
                   ──► Review Agent (checks quality)

Each agent has specialized tools and instructions.
```

## Tool Calling (Function Calling)

### OpenAI Function Calling
```javascript
const { OpenAI } = require('openai');
const openai = new OpenAI();

// Define tools
const tools = [
    {
        type: "function",
        function: {
            name: "search_database",
            description: "Search the risk database for compliance records",
            parameters: {
                type: "object",
                properties: {
                    query: { type: "string", description: "Search query" },
                    filters: {
                        type: "object",
                        properties: {
                            date_from: { type: "string", format: "date" },
                            severity: { type: "string", enum: ["low", "medium", "high", "critical"] }
                        }
                    }
                },
                required: ["query"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "calculate_risk_score",
            description: "Calculate composite risk score for a client",
            parameters: {
                type: "object",
                properties: {
                    client_id: { type: "string" },
                    factors: {
                        type: "array",
                        items: { type: "object", properties: {
                            name: { type: "string" },
                            value: { type: "number" },
                            weight: { type: "number" }
                        }}
                    }
                },
                required: ["client_id", "factors"]
            }
        }
    }
];

// Agent loop
async function runAgent(userMessage) {
    const messages = [
        { role: "system", content: "You are a risk assessment AI agent. Use tools to gather data and analyze risks." },
        { role: "user", content: userMessage }
    ];
    
    while (true) {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages,
            tools,
            tool_choice: "auto"
        });
        
        const msg = response.choices[0].message;
        messages.push(msg);
        
        // If no tool calls, agent is done
        if (!msg.tool_calls || msg.tool_calls.length === 0) {
            return msg.content;
        }
        
        // Execute each tool call
        for (const toolCall of msg.tool_calls) {
            const args = JSON.parse(toolCall.function.arguments);
            let result;
            
            switch (toolCall.function.name) {
                case 'search_database':
                    result = await searchDatabase(args.query, args.filters);
                    break;
                case 'calculate_risk_score':
                    result = await calculateRiskScore(args.client_id, args.factors);
                    break;
                default:
                    result = { error: 'Unknown function' };
            }
            
            messages.push({
                role: "tool",
                tool_call_id: toolCall.id,
                content: JSON.stringify(result)
            });
        }
    }
}
```

### Tool Implementation Best Practices
```javascript
// 1. Validate tool inputs (don't trust LLM-generated args)
function searchDatabase(query, filters = {}) {
    if (typeof query !== 'string' || query.length > 500) {
        throw new Error('Invalid query');
    }
    // Parameterized queries to prevent injection
    return db.query('SELECT * FROM records WHERE content LIKE ?', [`%${query}%`]);
}

// 2. Return structured, concise results (LLMs have context limits)
function formatToolResult(rows) {
    return rows.slice(0, 10).map(r => ({
        id: r.id,
        summary: r.content.slice(0, 200),
        severity: r.severity,
        date: r.created_at
    }));
}

// 3. Error handling — give agent useful error messages
try {
    result = await tool(args);
} catch (err) {
    result = { error: err.message, suggestion: 'Try with different parameters' };
}
```

## Memory & Retrieval (RAG)

### RAG Architecture
```
Document Ingestion:
PDF/Docs → Chunk (500-1000 tokens) → Embed (OpenAI/Cohere) → Vector DB (Pinecone/pgvector)

Query Time:
User Query → Embed → Vector Search (top-k similar chunks) → Inject into LLM prompt → Answer

┌─────────────────────────────────────────────────────┐
│ System: You are a helpful assistant.                │
│ Context: [chunk1] [chunk2] [chunk3]                 │
│ User: What is our refund policy?                    │
│ Assistant: Based on the documents, your refund...   │
└─────────────────────────────────────────────────────┘
```

### Implementation (Node.js)
```javascript
const { OpenAI } = require('openai');
const { PineconeClient } = require('@pinecone-database/pinecone');

const openai = new OpenAI();
const pinecone = new PineconeClient();

// 1. Index documents
async function indexDocument(doc) {
    // Split into chunks
    const chunks = splitIntoChunks(doc.content, 500);
    
    // Generate embeddings
    const embeddings = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: chunks.map(c => c.text)
    });
    
    // Store in vector DB
    const index = pinecone.Index('documents');
    const vectors = chunks.map((chunk, i) => ({
        id: `${doc.id}_${i}`,
        values: embeddings.data[i].embedding,
        metadata: {
            text: chunk.text,
            source: doc.title,
            page: chunk.page
        }
    }));
    
    await index.upsert(vectors);
}

// 2. Query with RAG
async function queryWithRAG(question) {
    // Embed the question
    const queryEmbedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: question
    });
    
    // Search vector DB
    const index = pinecone.Index('documents');
    const results = await index.query({
        vector: queryEmbedding.data[0].embedding,
        topK: 5,
        includeMetadata: true
    });
    
    // Build context from results
    const context = results.matches
        .map(m => `[Source: ${m.metadata.source}]\n${m.metadata.text}`)
        .join('\n\n');
    
    // Generate answer
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: `Answer based on the provided context. If the context doesn't contain the answer, say so.\n\nContext:\n${context}` },
            { role: "user", content: question }
        ]
    });
    
    return {
        answer: response.choices[0].message.content,
        sources: results.matches.map(m => m.metadata.source)
    };
}

// 3. Chunking strategy
function splitIntoChunks(text, maxTokens = 500, overlap = 50) {
    const sentences = text.split(/[.!?]+/);
    const chunks = [];
    let currentChunk = '';
    
    for (const sentence of sentences) {
        if ((currentChunk + sentence).length > maxTokens * 4) { // ~4 chars per token
            chunks.push({ text: currentChunk.trim() });
            // Keep overlap for context continuity
            const words = currentChunk.split(' ');
            currentChunk = words.slice(-overlap).join(' ') + ' ' + sentence;
        } else {
            currentChunk += ' ' + sentence;
        }
    }
    if (currentChunk.trim()) chunks.push({ text: currentChunk.trim() });
    return chunks;
}
```

### Conversation Memory
```javascript
// Short-term: Message history (in-context)
const messages = [
    { role: "system", content: systemPrompt },
    // ... previous messages in conversation
    { role: "user", content: latestQuestion }
];
// Limit: context window (128K for GPT-4o, but cost/latency scales with tokens)

// Long-term: Summary + retrieve relevant past conversations
async function getConversationContext(userId, currentQuery) {
    // 1. Get recent messages (last 10)
    const recent = await db.getRecentMessages(userId, 10);
    
    // 2. Search past conversations for relevant context
    const relevant = await vectorSearch(currentQuery, { userId, topK: 3 });
    
    // 3. Get user profile/preferences
    const profile = await db.getUserProfile(userId);
    
    return { recent, relevant, profile };
}
```

## Guardrails & Evaluation

### Input Guardrails
```javascript
// 1. Content moderation
async function moderateInput(text) {
    const moderation = await openai.moderations.create({ input: text });
    if (moderation.results[0].flagged) {
        throw new Error('Content flagged by moderation');
    }
}

// 2. Prompt injection detection
function detectInjection(text) {
    const patterns = [
        /ignore.*previous.*instructions/i,
        /you are now/i,
        /forget.*everything/i,
        /system.*prompt/i,
        /\bDAN\b/,
    ];
    return patterns.some(p => p.test(text));
}

// 3. Input length limits
function validateInput(text) {
    if (text.length > 10000) throw new Error('Input too long');
    return text.trim();
}
```

### Output Guardrails
```javascript
// 1. Structured output validation
const { z } = require('zod');

const RiskAssessmentSchema = z.object({
    clientId: z.string(),
    riskScore: z.number().min(0).max(100),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    findings: z.array(z.object({
        category: z.string(),
        description: z.string(),
        recommendation: z.string()
    })),
    generatedAt: z.string()
});

async function generateRiskAssessment(clientId) {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [...],
        response_format: { type: "json_object" }
    });
    
    const parsed = JSON.parse(response.choices[0].message.content);
    return RiskAssessmentSchema.parse(parsed); // Validate structure
}

// 2. Hallucination check — verify facts against source
function verifyAgainstSources(answer, sources) {
    // Check that key claims in the answer are supported by source documents
    // Flag unsupported claims for human review
}
```

### Evaluation Metrics
```
1. Relevance:  Does the answer address the question? (LLM-as-judge)
2. Faithfulness: Is the answer supported by retrieved context? (no hallucination)
3. Completeness: Does it cover all aspects of the question?
4. Latency:    Time from query to response
5. Tool Usage:  Did the agent use the right tools in the right order?
6. Cost:       Total API tokens consumed
```

## Interview Questions

**Q: How would you design an AI agent for compliance risk assessment?**
> Agent receives a client review request. Tools: search compliance DB, fetch client history, check regulatory rules, calculate risk scores. RAG over policy documents for regulatory interpretation. Agent iterates: gather data → analyze → identify gaps → generate report. Output validated with Zod schema. Human-in-the-loop for high-severity findings.

**Q: How do you prevent hallucination in production AI systems?**
> (1) RAG — ground responses in retrieved documents. (2) Structured output with schema validation. (3) Citation requirement — agent must cite source chunks. (4) Confidence scoring — low confidence triggers human review. (5) Factual consistency checks against the source data.

**Q: Explain your approach to prompt engineering for agents.**
> Clear system prompt with role, constraints, and available tools. Chain-of-thought prompting for complex reasoning. Few-shot examples for expected tool usage patterns. Output format specification (JSON schema). Guardrails in system prompt (what NOT to do). Iterate based on evaluation metrics.

**Q: How do you handle context window limitations?**
> (1) Chunking + RAG for large documents (retrieve only relevant chunks). (2) Conversation summarization for long chats. (3) Selective memory — store key facts, discard filler. (4) Map-reduce for processing many documents (summarize each, then synthesize). (5) Use models with larger context windows for complex tasks.
