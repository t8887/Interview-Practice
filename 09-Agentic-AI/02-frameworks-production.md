# Agentic AI — LangChain, Frameworks & Production Patterns

## LangChain.js (Core Concepts)

### Chains
```javascript
const { ChatOpenAI } = require('@langchain/openai');
const { PromptTemplate } = require('@langchain/core/prompts');
const { RunnableSequence } = require('@langchain/core/runnables');
const { StringOutputParser } = require('@langchain/core/output_parsers');

const model = new ChatOpenAI({ model: "gpt-4o", temperature: 0 });

// Simple chain
const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate("Summarize this risk report in 3 bullet points:\n{report}"),
    model,
    new StringOutputParser()
]);

const result = await chain.invoke({ report: "The client has..." });
```

### Agents with Tools
```javascript
const { createToolCallingAgent, AgentExecutor } = require('langchain/agents');
const { DynamicTool } = require('@langchain/core/tools');
const { ChatPromptTemplate } = require('@langchain/core/prompts');

// Define tools
const searchTool = new DynamicTool({
    name: "search_compliance_db",
    description: "Search compliance database for regulations and past violations",
    func: async (query) => {
        const results = await db.search(query);
        return JSON.stringify(results.slice(0, 5));
    }
});

const riskScoreTool = new DynamicTool({
    name: "calculate_risk",
    description: "Calculate risk score given client ID and risk factors",
    func: async (input) => {
        const { clientId, factors } = JSON.parse(input);
        const score = await riskEngine.calculate(clientId, factors);
        return JSON.stringify(score);
    }
});

// Create agent
const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a risk assessment agent. Analyze client risks thoroughly using available tools."],
    ["human", "{input}"],
    ["placeholder", "{agent_scratchpad}"]
]);

const agent = createToolCallingAgent({
    llm: model,
    tools: [searchTool, riskScoreTool],
    prompt
});

const executor = new AgentExecutor({
    agent,
    tools: [searchTool, riskScoreTool],
    verbose: true,
    maxIterations: 10
});

const result = await executor.invoke({
    input: "Assess the compliance risk for client ABC Corp"
});
```

### RAG Chain with LangChain
```javascript
const { OpenAIEmbeddings } = require('@langchain/openai');
const { PineconeStore } = require('@langchain/pinecone');
const { createRetrievalChain } = require('langchain/chains/retrieval');
const { createStuffDocumentsChain } = require('langchain/chains/combine_documents');

// Vector store
const embeddings = new OpenAIEmbeddings();
const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: pineconeClient.Index('policies')
});

// Retrieval chain
const retriever = vectorStore.asRetriever({ k: 5 });

const combineDocsChain = await createStuffDocumentsChain({
    llm: model,
    prompt: ChatPromptTemplate.fromMessages([
        ["system", "Answer based on context:\n\n{context}"],
        ["human", "{input}"]
    ])
});

const ragChain = await createRetrievalChain({
    retriever,
    combineDocsChain
});

const response = await ragChain.invoke({
    input: "What is our policy on third-party vendor risk?"
});
// response.answer + response.context (source chunks)
```

## Production Agent Patterns

### Retry with Fallback
```javascript
async function callWithRetry(fn, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (err) {
            if (i === maxRetries - 1) throw err;
            if (err.status === 429) {
                // Rate limited — exponential backoff
                await sleep(Math.pow(2, i) * 1000);
            }
        }
    }
}

// Fallback to cheaper/faster model
async function generateWithFallback(messages) {
    try {
        return await openai.chat.completions.create({
            model: "gpt-4o",
            messages
        });
    } catch {
        // Fallback to faster model
        return await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages
        });
    }
}
```

### Streaming Responses
```javascript
// Server (Express + SSE)
app.post('/api/agent/stream', authenticate, async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    
    const stream = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: req.body.messages,
        stream: true
    });
    
    for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
    }
    
    res.write('data: [DONE]\n\n');
    res.end();
});

// Client (React)
async function streamChat(messages, onChunk) {
    const response = await fetch('/api/agent/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ messages })
    });
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const text = decoder.decode(value);
        const lines = text.split('\n').filter(l => l.startsWith('data: '));
        
        for (const line of lines) {
            const data = line.slice(6);
            if (data === '[DONE]') return;
            const { content } = JSON.parse(data);
            onChunk(content);
        }
    }
}
```

### Cost & Token Management
```javascript
// Track token usage
async function trackedCompletion(messages, userId) {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages
    });
    
    const { prompt_tokens, completion_tokens, total_tokens } = response.usage;
    
    // Log usage
    await db.query(
        'INSERT INTO api_usage (user_id, model, prompt_tokens, completion_tokens, cost) VALUES (?, ?, ?, ?, ?)',
        [userId, 'gpt-4o', prompt_tokens, completion_tokens,
         prompt_tokens * 0.0025 / 1000 + completion_tokens * 0.01 / 1000]
    );
    
    return response;
}

// Budget limits
async function checkBudget(userId) {
    const [{ totalCost }] = await db.query(
        'SELECT SUM(cost) as totalCost FROM api_usage WHERE user_id = ? AND created_at > DATE_SUB(NOW(), INTERVAL 1 MONTH)',
        [userId]
    );
    return totalCost < 50; // $50/month limit
}
```

### Agent Evaluation Framework
```javascript
// Test cases for agent quality
const testCases = [
    {
        input: "What is the risk rating for client XYZ?",
        expectedTools: ["search_compliance_db", "calculate_risk"],
        expectedOutputContains: ["risk score", "severity"],
        maxIterations: 5
    },
    {
        input: "List all high-severity findings from last quarter",
        expectedTools: ["search_compliance_db"],
        expectedOutputContains: ["high", "findings"],
        maxIterations: 3
    }
];

async function evaluateAgent(testCases) {
    const results = [];
    for (const tc of testCases) {
        const start = Date.now();
        const result = await executor.invoke({ input: tc.input });
        const latency = Date.now() - start;
        
        results.push({
            input: tc.input,
            passed: tc.expectedOutputContains.every(
                keyword => result.output.toLowerCase().includes(keyword.toLowerCase())
            ),
            latency,
            output: result.output.slice(0, 200)
        });
    }
    return results;
}
```

## AWS Services for AI Agents

### Architecture: Agent on AWS
```
Client → API Gateway → Lambda (agent orchestrator)
                          ├── OpenAI API (LLM)
                          ├── S3 (document storage)
                          ├── OpenSearch (vector search)
                          ├── RDS/MySQL (structured data)
                          ├── SQS (async tasks)
                          └── DynamoDB (conversation history)
```

### AWS Bedrock (Alternative to OpenAI)
```javascript
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

const client = new BedrockRuntimeClient({ region: 'us-east-1' });

const response = await client.send(new InvokeModelCommand({
    modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
    body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        messages: [{ role: "user", content: "Analyze this risk report..." }],
        max_tokens: 1024
    })
}));
```

## Interview Questions

**Q: Describe your experience building AI agents at EY.**
> At EY Risk.ai, I built the prompt infrastructure for AI agents focused on compliance and risk assessment. The system used tool calling to query internal databases, RAG over regulatory documents, and structured output for risk reports. I designed the agent workflow that would intake client data, route to appropriate analysis tools, and generate validated assessment reports.

**Q: How do you handle agent reliability in production?**
> (1) Retry with exponential backoff for API failures. (2) Model fallback (GPT-4o → GPT-4o-mini). (3) Max iteration limits to prevent infinite loops. (4) Output schema validation (Zod). (5) Human-in-the-loop for high-stakes decisions. (6) Comprehensive logging of tool calls and decisions. (7) Evaluation test suite run before deploys.

**Q: How do you choose between fine-tuning and RAG?**
> RAG when: knowledge changes frequently, need source attribution, don't have enough training data (<1000 examples), need to combine multiple data sources. Fine-tuning when: teaching a specific style/format, specialized domain language, need lower latency (no retrieval step), task is consistent and well-defined. Often combine both.

**Q: How do you handle sensitive data with LLMs?**
> (1) PII redaction before sending to API. (2) Use Azure OpenAI or AWS Bedrock (data stays in your cloud). (3) Don't log prompt/response content with PII. (4) Encryption in transit and at rest. (5) Access controls on who can query the agent. (6) Audit trail of all queries and responses.
