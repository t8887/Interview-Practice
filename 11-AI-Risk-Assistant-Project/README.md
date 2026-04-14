# AI Risk Assessment Assistant — Project Scaffold

## Overview
A full-stack AI-powered compliance and risk assessment tool — your portfolio project demonstrating React, Node.js, TypeScript, MySQL, MongoDB, AWS, and Agentic AI.

## Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React + TS)                │
│  Dashboard │ Client View │ Risk Report │ Chat Interface     │
└──────────────────────────┬──────────────────────────────────┘
                           │ REST + SSE (streaming)
┌──────────────────────────▼──────────────────────────────────┐
│                    API Gateway (Express + TS)                │
│  Auth │ Rate Limit │ Validation │ Logging │ Error Handler   │
└──┬───────┬────────┬────────┬───────────┬────────────────────┘
   │       │        │        │           │
   ▼       ▼        ▼        ▼           ▼
 MySQL   MongoDB   Redis   OpenAI     S3/OpenSearch
 (users,  (reports, (cache, (agent     (documents,
  RBAC,   convos,   rate    LLM,       vector search)
  audit)  vectors)  limit)  tools)
```

## Tech Stack
- **Frontend**: React 18, TypeScript, TailwindCSS, TanStack Query, React Router
- **Backend**: Node.js, Express, TypeScript
- **Databases**: MySQL (relational), MongoDB (documents/chat), Redis (cache)
- **AI**: OpenAI GPT-4o, function calling, RAG with embeddings
- **Cloud**: AWS Lambda (optional), S3, SES
- **Auth**: JWT + refresh tokens, RBAC

## Project Structure
```
ai-risk-assistant/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/        # Button, Input, Modal, Table
│   │   │   ├── dashboard/     # DashboardStats, RiskChart
│   │   │   ├── clients/       # ClientList, ClientDetail
│   │   │   ├── reports/       # ReportView, ReportEditor
│   │   │   └── chat/          # ChatInterface, MessageBubble
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── ClientsPage.tsx
│   │   │   ├── ReportPage.tsx
│   │   │   └── ChatPage.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useFetch.ts
│   │   │   └── useChat.ts
│   │   ├── store/             # Zustand stores
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
├── server/                    # Node.js backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts    # MySQL + MongoDB connections
│   │   │   ├── redis.ts
│   │   │   └── openai.ts
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── auth.middleware.ts
│   │   │   ├── clients/
│   │   │   │   ├── clients.routes.ts
│   │   │   │   ├── clients.controller.ts
│   │   │   │   └── clients.service.ts
│   │   │   ├── reports/
│   │   │   │   ├── reports.routes.ts
│   │   │   │   ├── reports.controller.ts
│   │   │   │   └── reports.service.ts
│   │   │   └── agent/
│   │   │       ├── agent.routes.ts
│   │   │       ├── agent.controller.ts
│   │   │       ├── agent.service.ts
│   │   │       ├── tools/
│   │   │       │   ├── searchCompliance.ts
│   │   │       │   ├── calculateRisk.ts
│   │   │       │   └── generateReport.ts
│   │   │       └── prompts/
│   │   │           ├── system.ts
│   │   │           └── templates.ts
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts
│   │   │   ├── rateLimiter.ts
│   │   │   ├── validate.ts
│   │   │   └── logger.ts
│   │   ├── models/            # MySQL schemas (Knex/Prisma)
│   │   ├── schemas/           # MongoDB schemas (Mongoose)
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
│
├── database/
│   ├── mysql/
│   │   ├── migrations/
│   │   └── seeds/
│   └── mongodb/
│       └── seeds/
│
└── README.md
```

## Key Database Schemas

### MySQL (Relational Data)
```sql
-- Users & RBAC
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'analyst', 'viewer') DEFAULT 'viewer',
    refresh_token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Clients
CREATE TABLE clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    industry VARCHAR(100),
    risk_tier ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    contact_email VARCHAR(255),
    created_by INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Logs (every action tracked for compliance)
CREATE TABLE audit_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id INT REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id VARCHAR(100),
    details JSON,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_action (user_id, action),
    INDEX idx_entity (entity_type, entity_id)
);
```

### MongoDB (Documents & Chat)
```javascript
// Risk Report
const ReportSchema = new mongoose.Schema({
    clientId: { type: Number, required: true, index: true },
    title: { type: String, required: true },
    status: { type: String, enum: ['draft', 'review', 'final'], default: 'draft' },
    riskScore: { type: Number, min: 0, max: 100 },
    severity: { type: String, enum: ['low', 'medium', 'high', 'critical'] },
    findings: [{
        category: String,
        description: String,
        severity: String,
        recommendation: String,
        source: String  // AI-generated or manual
    }],
    generatedBy: { type: String, enum: ['ai', 'manual'] },
    reviewedBy: { type: Number }, // userId
    metadata: {
        tokensUsed: Number,
        modelUsed: String,
        toolsUsed: [String]
    }
}, { timestamps: true });

// Conversation (Agent Chat)
const ConversationSchema = new mongoose.Schema({
    userId: { type: Number, required: true, index: true },
    clientId: { type: Number, index: true },
    messages: [{
        role: { type: String, enum: ['system', 'user', 'assistant', 'tool'] },
        content: String,
        toolCalls: mongoose.Schema.Types.Mixed,
        createdAt: { type: Date, default: Date.now }
    }],
    title: String,
    status: { type: String, enum: ['active', 'archived'], default: 'active' }
}, { timestamps: true });
```

## Key API Endpoints
```
Auth:
POST   /api/auth/login           Login → JWT
POST   /api/auth/refresh         Refresh access token
POST   /api/auth/logout          Invalidate refresh token

Clients:
GET    /api/clients              List clients (paginated, filtered)
GET    /api/clients/:id          Client detail + risk history
POST   /api/clients              Create client (admin/analyst)
PATCH  /api/clients/:id          Update client

Reports:
GET    /api/reports              List reports (filter by client, status)
GET    /api/reports/:id          Get report detail
POST   /api/reports/generate     AI-generate report for client
PATCH  /api/reports/:id          Update report (review, approve)

Agent:
POST   /api/agent/chat           Send message to AI agent
GET    /api/agent/conversations  List user's conversations
GET    /api/agent/conversations/:id  Get conversation history
POST   /api/agent/stream         Stream agent response (SSE)

Search:
GET    /api/search?q=...         Full-text search across reports/findings
```

## Agent Implementation Highlights
```typescript
// server/src/modules/agent/agent.service.ts
const SYSTEM_PROMPT = `You are a risk assessment AI assistant for compliance analysts.
You have access to tools to:
- Search the compliance database
- Fetch client risk history
- Calculate composite risk scores
- Generate formatted risk reports

Always cite your sources. If you're unsure, say so.
Follow these rules:
1. Never fabricate data — only use what tools return
2. Flag high-severity findings prominently
3. Provide actionable recommendations
4. Keep responses concise and professional`;

const tools = [
    {
        type: "function",
        function: {
            name: "search_compliance",
            description: "Search compliance records, regulations, and past findings",
            parameters: {
                type: "object",
                properties: {
                    query: { type: "string" },
                    severity: { type: "string", enum: ["low", "medium", "high", "critical"] },
                    dateFrom: { type: "string" }
                },
                required: ["query"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "get_client_history",
            description: "Fetch risk assessment history for a specific client",
            parameters: {
                type: "object",
                properties: {
                    clientId: { type: "number" }
                },
                required: ["clientId"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "calculate_risk_score",
            description: "Calculate composite risk score from multiple factors",
            parameters: {
                type: "object",
                properties: {
                    clientId: { type: "number" },
                    factors: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                name: { type: "string" },
                                value: { type: "number" },
                                weight: { type: "number" }
                            }
                        }
                    }
                },
                required: ["clientId", "factors"]
            }
        }
    }
];
```

## Features to Implement (Priority Order)
1. **Auth + RBAC** — Login, JWT, role-based access
2. **Client CRUD** — List, create, detail pages
3. **AI Chat Interface** — Chat with agent, streaming responses
4. **Report Generation** — AI generates risk report for a client
5. **Search** — Full-text search across all reports and findings
6. **Dashboard** — Stats, charts, recent activity
7. **Audit Logging** — Every action logged for compliance
8. **Pagination** — Cursor-based for all list endpoints

## Getting Started
```bash
# 1. Clone and install
cd ai-risk-assistant
npm install         # root
cd client && npm install
cd ../server && npm install

# 2. Environment
cp server/.env.example server/.env
# Fill in: DB connections, JWT secrets, OpenAI key

# 3. Database setup
cd server
npx knex migrate:latest    # MySQL migrations
npm run seed               # Seed data

# 4. Run
npm run dev                # Starts both client (3000) and server (4000)
```

## Interview Talking Points
```
"I built an AI Risk Assessment Assistant as a portfolio project that 
demonstrates my full-stack and AI capabilities:

- React dashboard with TypeScript for risk analysts
- Node.js/Express API with JWT auth and RBAC
- AI agent using OpenAI function calling to analyze client risks
- RAG pipeline over compliance documents
- MySQL for users/RBAC/audit, MongoDB for reports/conversations
- Redis for caching and rate limiting
- Streaming responses via SSE for real-time chat UX
- Comprehensive audit logging for regulatory compliance

This mirrors the real-world compliance AI system I built at EY, but 
as an end-to-end project I own completely."
```
