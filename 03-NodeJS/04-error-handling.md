# Node.js Error Handling — Deep Dive

## Error Types

### Operational Errors (Expected, Handle Gracefully)
- Failed database connection
- Request timeout
- Invalid user input
- File not found
- Rate limit exceeded

### Programmer Errors (Bugs, Should Crash)
- Reading property of undefined
- Passing wrong type to a function
- Forgetting to await a promise
- Memory leaks

> **Rule**: Handle operational errors gracefully. Let programmer errors crash the process (then restart with PM2/cluster).

## Patterns

### 1. Express Error Handling
```javascript
// Custom error class
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Async handler wrapper — catches promise rejections
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Route using async handler
app.get('/users/:id', asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) throw new AppError('User not found', 404);
    res.json(user);
}));

// Centralized error middleware (MUST have 4 params)
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }
    
    // Programmer error — don't leak details
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});
```

### 2. Global Error Handlers
```javascript
// Uncaught exceptions (synchronous)
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
    // Log to monitoring service
    // Graceful shutdown — DO NOT continue running
    process.exit(1);
});

// Unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('UNHANDLED REJECTION:', reason);
    // Log to monitoring
    // In Node 15+, this crashes the process by default
});

// SIGTERM for graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        db.disconnect();
        process.exit(0);
    });
    
    // Force kill after timeout
    setTimeout(() => process.exit(1), 10000);
});
```

### 3. Error Handling in Different Layers
```javascript
// Service layer — throw operational errors
class UserService {
    static async getById(id) {
        const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        if (!user) throw new AppError('User not found', 404);
        return user;
    }
    
    static async create(data) {
        try {
            return await db.query('INSERT INTO users ...', [data]);
        } catch (err) {
            if (err.code === '23505') { // Postgres unique violation
                throw new AppError('Email already exists', 409);
            }
            throw err; // unknown error — let it bubble up
        }
    }
}

// Controller layer — handle HTTP concerns
const getUser = asyncHandler(async (req, res) => {
    const user = await UserService.getById(req.params.id);
    res.json({ data: user });
});

// Repository layer — translate DB errors
async function queryWithRetry(sql, params, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            return await pool.query(sql, params);
        } catch (err) {
            if (err.code === 'ECONNREFUSED' && i < retries - 1) {
                await sleep(1000 * Math.pow(2, i));
                continue;
            }
            throw err;
        }
    }
}
```

### 4. Graceful Shutdown
```javascript
const http = require('http');

function createServer(app) {
    const server = http.createServer(app);
    
    let isShuttingDown = false;
    
    async function shutdown(signal) {
        if (isShuttingDown) return;
        isShuttingDown = true;
        
        console.log(`${signal} received. Starting graceful shutdown...`);
        
        // 1. Stop accepting new connections
        server.close(async () => {
            console.log('HTTP server closed');
            
            // 2. Close database connections
            await db.end();
            console.log('Database connections closed');
            
            // 3. Close Redis
            await redis.quit();
            console.log('Redis connection closed');
            
            process.exit(0);
        });
        
        // 4. Force shutdown after timeout
        setTimeout(() => {
            console.error('Forced shutdown after timeout');
            process.exit(1);
        }, 30000);
    }
    
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
    
    return server;
}
```

### 5. Validation Pattern
```javascript
// Using Joi (or Zod for TypeScript)
const Joi = require('joi');

const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(100).required(),
    age: Joi.number().integer().min(18).max(120),
});

function validate(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const messages = error.details.map(d => d.message);
            throw new AppError(messages.join(', '), 400);
        }
        req.body = value; // use sanitized values
        next();
    };
}

app.post('/users', validate(createUserSchema), asyncHandler(createUser));
```

## Error Handling Checklist
```
✅ Custom error classes with statusCode and isOperational
✅ Async handler wrapper for all routes
✅ Centralized error middleware (4 params)
✅ Global uncaughtException handler
✅ Global unhandledRejection handler
✅ Graceful shutdown on SIGTERM/SIGINT
✅ Input validation middleware
✅ Don't leak error details in production
✅ Log errors to monitoring (not just console)
✅ Retry transient errors (DB connections, network)
```

## Interview Questions

**Q: How do you handle errors in Express async routes?**
> Wrap async handlers to catch rejections and pass to next(). Use centralized error middleware. Separate operational errors (expected, handle gracefully) from programmer errors (unexpected, crash and restart).

**Q: What happens if you throw inside a callback?**
> It becomes an uncaught exception. Callbacks don't have a built-in way to propagate errors up — you must pass errors as the first argument (error-first convention) or use promises/async-await instead.

**Q: How do you implement graceful shutdown?**
> Listen for SIGTERM/SIGINT, stop accepting new requests (server.close), wait for in-flight requests to complete, close DB/Redis connections, then exit. Set a timeout for forced shutdown.
