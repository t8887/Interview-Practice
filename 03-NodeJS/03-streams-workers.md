# Node.js Streams & Worker Threads — Deep Dive

## Streams

### Why Streams?
```javascript
// BAD: Load entire file into memory
const data = fs.readFileSync('huge-file.csv'); // 2GB? OOM!

// GOOD: Process chunk by chunk
const stream = fs.createReadStream('huge-file.csv');
stream.on('data', (chunk) => processChunk(chunk));
```

### Four Types
1. **Readable** — source of data (fs.createReadStream, http request)
2. **Writable** — destination (fs.createWriteStream, http response)
3. **Duplex** — both readable and writable (net.Socket, TCP)
4. **Transform** — modify data in transit (zlib.createGzip, crypto)

### Basic Stream Usage
```javascript
const fs = require('fs');
const zlib = require('zlib');

// Pipe: readable → transform → writable
fs.createReadStream('input.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('input.txt.gz'))
    .on('finish', () => console.log('Compression complete'));

// Error handling with pipeline (preferred)
const { pipeline } = require('stream/promises');

async function compress(input, output) {
    await pipeline(
        fs.createReadStream(input),
        zlib.createGzip(),
        fs.createWriteStream(output)
    );
    console.log('Pipeline succeeded');
}
```

### Custom Readable Stream
```javascript
const { Readable } = require('stream');

class CounterStream extends Readable {
    constructor(max) {
        super({ objectMode: true });
        this.max = max;
        this.current = 0;
    }
    
    _read() {
        if (this.current <= this.max) {
            this.push({ count: this.current++ });
        } else {
            this.push(null); // signal end of stream
        }
    }
}

const counter = new CounterStream(5);
counter.on('data', (data) => console.log(data));
```

### Custom Transform Stream
```javascript
const { Transform } = require('stream');

class CSVToJSON extends Transform {
    constructor(headers) {
        super({ objectMode: true });
        this.headers = headers;
    }
    
    _transform(chunk, encoding, callback) {
        const line = chunk.toString().trim();
        const values = line.split(',');
        const obj = {};
        this.headers.forEach((h, i) => { obj[h] = values[i]; });
        this.push(obj);
        callback();
    }
}
```

### Backpressure
```javascript
// When writable can't keep up with readable
const readable = fs.createReadStream('large-file');
const writable = fs.createWriteStream('output');

readable.on('data', (chunk) => {
    const canContinue = writable.write(chunk);
    if (!canContinue) {
        readable.pause(); // STOP reading — writable buffer is full
        writable.once('drain', () => {
            readable.resume(); // writable drained, resume reading
        });
    }
});

// pipe() handles backpressure automatically — prefer pipe/pipeline
```

### HTTP Streaming Response
```javascript
const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    // Stream large dataset
    const cursor = db.collection('users').find().cursor();
    
    res.write('[');
    let first = true;
    
    cursor.on('data', (doc) => {
        if (!first) res.write(',');
        res.write(JSON.stringify(doc));
        first = false;
    });
    
    cursor.on('end', () => {
        res.write(']');
        res.end();
    });
}).listen(3000);
```

## Worker Threads

### When to Use
- CPU-intensive computation (hashing, image processing, parsing)
- NOT for I/O (use async I/O instead — it's already non-blocking)
- Heavy JSON parsing/serialization
- Complex math/crypto operations

### Basic Worker
```javascript
// main.js
const { Worker } = require('worker_threads');

function runWorker(data) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData: data });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) reject(new Error(`Worker exited with code ${code}`));
        });
    });
}

// worker.js
const { workerData, parentPort } = require('worker_threads');

function heavyComputation(data) {
    // CPU-intensive work here
    let result = 0;
    for (let i = 0; i < data.iterations; i++) {
        result += Math.sqrt(i);
    }
    return result;
}

parentPort.postMessage(heavyComputation(workerData));
```

### Worker Pool Pattern
```javascript
const { Worker } = require('worker_threads');
const os = require('os');

class WorkerPool {
    constructor(workerScript, poolSize = os.cpus().length) {
        this.workerScript = workerScript;
        this.pool = [];
        this.queue = [];
        
        for (let i = 0; i < poolSize; i++) {
            this.pool.push({ busy: false, worker: this._createWorker() });
        }
    }
    
    _createWorker() {
        const worker = new Worker(this.workerScript);
        return worker;
    }
    
    async execute(data) {
        return new Promise((resolve, reject) => {
            const available = this.pool.find(w => !w.busy);
            
            if (available) {
                this._run(available, data, resolve, reject);
            } else {
                this.queue.push({ data, resolve, reject });
            }
        });
    }
    
    _run(entry, data, resolve, reject) {
        entry.busy = true;
        entry.worker.postMessage(data);
        
        const onMessage = (result) => {
            entry.busy = false;
            entry.worker.removeListener('error', onError);
            resolve(result);
            this._processQueue();
        };
        
        const onError = (err) => {
            entry.busy = false;
            entry.worker.removeListener('message', onMessage);
            reject(err);
            this._processQueue();
        };
        
        entry.worker.once('message', onMessage);
        entry.worker.once('error', onError);
    }
    
    _processQueue() {
        if (this.queue.length === 0) return;
        const available = this.pool.find(w => !w.busy);
        if (available) {
            const { data, resolve, reject } = this.queue.shift();
            this._run(available, data, resolve, reject);
        }
    }
}
```

### SharedArrayBuffer (Shared Memory)
```javascript
// main.js
const { Worker } = require('worker_threads');

const sharedBuffer = new SharedArrayBuffer(4); // 4 bytes
const sharedArray = new Int32Array(sharedBuffer);
sharedArray[0] = 0;

const worker = new Worker('./worker.js', { workerData: sharedBuffer });

// worker.js
const { workerData } = require('worker_threads');
const sharedArray = new Int32Array(workerData);
Atomics.add(sharedArray, 0, 1); // thread-safe increment
```

## Cluster Mode (Process-Level Scaling)
```javascript
const cluster = require('cluster');
const http = require('http');
const os = require('os');

if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    console.log(`Primary ${process.pid} forking ${numCPUs} workers`);
    
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died, restarting...`);
        cluster.fork(); // auto-restart
    });
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Worker ${process.pid}\n`);
    }).listen(3000);
}
```

## Interview Questions

**Q: Cluster vs Worker Threads?**
> Cluster: multiple processes, each with own event loop and memory. Good for scaling HTTP servers across CPUs. Worker threads: multiple threads in one process, share memory, good for CPU-intensive tasks within a request.

**Q: What is backpressure?**
> When a writable stream can't consume data as fast as the readable produces it. The writable's internal buffer fills up. `.write()` returns false, signaling the readable to pause. When the buffer drains, a 'drain' event fires and reading resumes. `pipe()` handles this automatically.

**Q: When would you NOT use streams?**
> Small files that fit in memory — streams add overhead. When you need the entire content before processing (e.g., JSON.parse of a complete object). When the data is already in memory.
