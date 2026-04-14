# Express Production Design — Deep Dive

## Project Structure (Feature-Based)
```
src/
├── config/
│   ├── database.js
│   ├── redis.js
│   └── env.js
├── middleware/
│   ├── auth.js
│   ├── validate.js
│   ├── rateLimiter.js
│   └── errorHandler.js
├── modules/
│   ├── users/
│   │   ├── user.routes.js
│   │   ├── user.controller.js
│   │   ├── user.service.js
│   │   ├── user.model.js
│   │   └── user.validation.js
│   ├── orders/
│   │   ├── order.routes.js
│   │   ├── order.controller.js
│   │   ├── order.service.js
│   │   └── order.model.js
│   └── auth/
│       ├── auth.routes.js
│       ├── auth.controller.js
│       └── auth.service.js
├── utils/
│   ├── AppError.js
│   ├── asyncHandler.js
│   └── logger.js
├── app.js          ← Express app setup
└── server.js       ← HTTP server + graceful shutdown
```

## Separation: app.js vs server.js
```javascript
// app.js — Express configuration
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') }));

// Body parsing
app.use(express.json({ limit: '10kb' }));

// Routes
app.use('/api/v1/users', require('./modules/users/user.routes'));
app.use('/api/v1/orders', require('./modules/orders/order.routes'));
app.use('/api/v1/auth', require('./modules/auth/auth.routes'));

// 404 handler
app.all('*', (req, res) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;

// server.js — HTTP server
const app = require('./app');
const { connectDB } = require('./config/database');

const PORT = process.env.PORT || 3000;

async function start() {
    await connectDB();
    
    const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    
    // Graceful shutdown
    const shutdown = () => {
        server.close(() => process.exit(0));
        setTimeout(() => process.exit(1), 15000);
    };
    
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
}

start();
```

## Middleware Design Patterns

### Authentication Middleware
```javascript
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) throw new AppError('Authentication required', 401);
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        throw new AppError('Invalid or expired token', 401);
    }
}

function authorize(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new AppError('Insufficient permissions', 403);
        }
        next();
    };
}

// Usage
router.delete('/users/:id', authenticate, authorize('admin'), deleteUser);
```

### Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: { error: 'Too many requests, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Stricter limit for auth routes
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10,
    skipSuccessfulRequests: true,
});

app.use('/api/', apiLimiter);
app.use('/api/v1/auth/', authLimiter);
```

### Request Logging with Correlation IDs
```javascript
const { v4: uuidv4 } = require('uuid');

function correlationId(req, res, next) {
    req.correlationId = req.headers['x-correlation-id'] || uuidv4();
    res.setHeader('x-correlation-id', req.correlationId);
    next();
}

function requestLogger(req, res, next) {
    const start = Date.now();
    
    res.on('finish', () => {
        console.log(JSON.stringify({
            correlationId: req.correlationId,
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: Date.now() - start,
            userAgent: req.get('user-agent'),
            ip: req.ip,
        }));
    });
    
    next();
}
```

## API Design Best Practices

### Response Format
```javascript
// Success
{
    "status": "success",
    "data": { "user": { "id": 1, "name": "Tyson" } }
}

// List with pagination
{
    "status": "success",
    "data": { "users": [...] },
    "meta": {
        "page": 1,
        "limit": 20,
        "total": 150,
        "totalPages": 8
    }
}

// Error
{
    "status": "error",
    "message": "User not found",
    "code": "USER_NOT_FOUND"
}
```

### Pagination (Cursor-Based)
```javascript
async function getUsers(req, res) {
    const { cursor, limit = 20 } = req.query;
    const parsedLimit = Math.min(parseInt(limit), 100);
    
    let query = 'SELECT * FROM users';
    const params = [];
    
    if (cursor) {
        query += ' WHERE id > $1';
        params.push(cursor);
    }
    
    query += ' ORDER BY id ASC LIMIT $' + (params.length + 1);
    params.push(parsedLimit + 1); // fetch one extra to check hasMore
    
    const rows = await db.query(query, params);
    const hasMore = rows.length > parsedLimit;
    const data = hasMore ? rows.slice(0, parsedLimit) : rows;
    const nextCursor = hasMore ? data[data.length - 1].id : null;
    
    res.json({
        data,
        meta: { nextCursor, hasMore }
    });
}
```

### API Versioning
```javascript
// URI-based (most common, clearest)
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

// With backward compatibility
const v2UserRouter = express.Router();
v2UserRouter.get('/', getUsers);        // new behavior
v2UserRouter.get('/:id', getUserById);  // same as v1

app.use('/api/v2/users', v2UserRouter);
```

## Security Checklist
```javascript
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

app.use(helmet());                            // Security headers
app.use(cors({ origin: allowedOrigins }));    // CORS
app.use(express.json({ limit: '10kb' }));     // Body size limit
app.use(mongoSanitize());                     // NoSQL injection prevention

// NEVER:
// - Trust req.body without validation
// - Use eval() or Function()
// - Store passwords in plain text
// - Return stack traces in production
// - Use * for CORS in production
```

## Interview Questions

**Q: How do you structure a production Express app?**
> Feature-based modules (users/, orders/), each with routes → controller → service → model layers. Separate app.js (Express config) from server.js (HTTP + shutdown). Centralized middleware for auth, validation, error handling, and logging.

**Q: How do you handle API versioning?**
> URI-based (`/api/v1/`, `/api/v2/`) for clarity. Each version has its own router. Shared service layer underneath — controllers differ per version. This gives clear, debuggable URLs and easy proxy/load balancer routing.

**Q: What security measures do you implement?**
> Helmet for headers, CORS whitelist, request body size limits, input validation (Joi/Zod), rate limiting, SQL/NoSQL injection prevention, JWT with short expiry + refresh tokens, and never leaking error internals in production.
