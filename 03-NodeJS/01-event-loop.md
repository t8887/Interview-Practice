# Node.js Event Loop — Deep Dive

## Node.js Runtime Architecture

```
+-------------------------------+    +------------------------------+
|          V8 ENGINE            |    |     libuv + Node.js APIs     |
|                               |    |                              |
|  +-------------------------+  |    |  - fs, crypto, dns, zlib     |
|  |      Memory Heap        |  |    |  - timers (setTimeout)       |
|  |  (objects, variables)   |  |    |  - network (http, net)       |
|  +-------------------------+  |    |  - child_process              |
|                               |    |                              |
|  +-------------------------+  |    |  Uses: thread pool (4)       |
|  |      Call Stack         |  |    |      + OS kernel async       |
|  |  (LIFO - runs your JS) |  |    |        (epoll/kqueue)        |
|  +------------+------------+  |    +--------------+---------------+
+---------------|--------------+                    |
                |                                   |
                |         +-------------------------+
                |         |    Callback Queues
                |         |
                |         |    1. nextTick Queue  -- Microtask
                |         |    2. Promise Queue   -- Microtask
                |         |    3. Timer Queue     -- Macrotask
                |         |    4. I/O Queue       -- Macrotask
                |         |    5. Check Queue     -- Macrotask
                |         |    6. Close Queue     -- Macrotask
                |         |
                |         +------------+
                |                      |
                |    +-----------------+-----------+
                +--->|          EVENT LOOP         |
                     |  "Is Call Stack empty?      |
                     |   Move next callback        |
                     |   from queue --> stack"      |
                     +-----------------------------+
```

**Key Rule**: The event loop only pushes callbacks to the Call Stack when the Call Stack is **EMPTY**.

## How a Full Async Operation Flows (Step by Step)

```javascript
console.log("Start");

fs.readFile("file.txt", (data) => {
    console.log("File data");
});

console.log("End");
```

### Walkthrough:
```
Step 1: console.log("Start") → pushed to Call Stack → executes → popped off
        Output: "Start"

Step 2: fs.readFile() → pushed to Call Stack → recognized as async
        → offloaded to libuv (Node API) → popped off Call Stack
        → libuv uses thread pool to read file in background

Step 3: console.log("End") → pushed to Call Stack → executes → popped off
        Output: "End"

Step 4: Call Stack is now EMPTY. Main module code is done.

Step 5: File read completes in background → callback placed in I/O Queue

Step 6: Event Loop checks: "Call Stack empty? Yes."
        → Moves callback from I/O Queue → Call Stack

Step 7: Callback executes → console.log("File data") → popped off
        Output: "File data"
```

### The Flow Pattern (memorize this):
```
Your Code → Call Stack → Async? → Node API (libuv) → Background work
                                                          ↓
Call Stack ← Event Loop ← Callback Queue ← Work complete, callback queued
```

## The 6 Callback Queues (Priority Order)

Each queue is checked in order. **Between EVERY callback execution, microtask queues are re-checked.**

| Priority     | Queue                  | What Goes Here                                  | Type      |
|--------------|------------------------|------------------------------------------------|-----------|
| 1 (highest)  | **nextTick Queue**     | `process.nextTick()` callbacks                 | Microtask |
| 2            | **Promise Queue**      | `.then()`, `.catch()`, `.finally()`, `async/await` | Microtask |
| 3            | **Timer Queue**        | `setTimeout()`, `setInterval()`                | Macrotask |
| 4            | **I/O Queue**          | `fs`, `http`, `net`, database callbacks        | Macrotask |
| 5            | **Check Queue**        | `setImmediate()`                               | Macrotask |
| 6 (lowest)   | **Close Queue**        | `socket.on('close')`, `server.on('close')`     | Macrotask |

### Critical Rule: Microtask Queues Drain Between Every Callback
```javascript
setTimeout(() => console.log("timeout 1"), 0);
setTimeout(() => {
    console.log("timeout 2");
    process.nextTick(() => console.log("nextTick inside timeout"));
}, 0);
setTimeout(() => console.log("timeout 3"), 0);

// Output:
// timeout 1
// timeout 2
// nextTick inside timeout   ← microtask queue checked between each timer callback!
// timeout 3
```

### Complete 6-Queue Example
```javascript
const fs = require('fs');

setTimeout(() => console.log('1: Timer Queue'), 0);

fs.readFile(__filename, () => {
    console.log('2: I/O Queue');
    
    setImmediate(() => console.log('3: Check Queue (inside I/O)'));
    
    setTimeout(() => console.log('4: Timer Queue (inside I/O)'), 0);
    
    process.nextTick(() => console.log('5: nextTick Queue (inside I/O)'));
    
    Promise.resolve().then(() => console.log('6: Promise Queue (inside I/O)'));
});

setImmediate(() => console.log('7: Check Queue'));

process.nextTick(() => console.log('8: nextTick Queue'));

Promise.resolve().then(() => console.log('9: Promise Queue'));

console.log('10: Synchronous');

// Output:
// 10: Synchronous          ← call stack (sync code first)
// 8: nextTick Queue        ← microtask: nextTick (highest priority)
// 9: Promise Queue          ← microtask: promise
// 1: Timer Queue            ← macrotask: timer phase
// 7: Check Queue            ← macrotask: check phase
// 2: I/O Queue              ← macrotask: I/O phase (file read done)
// 5: nextTick Queue (inside I/O) ← microtask drain after I/O callback
// 6: Promise Queue (inside I/O)  ← microtask drain after I/O callback
// 3: Check Queue (inside I/O)    ← check phase
// 4: Timer Queue (inside I/O)    ← timer phase (next iteration)
```

## How It Actually Works (libuv Internals)

### The Event Loop Phases (in order)
```
   +---------------------------+
+->|         timers            |  <-- setTimeout, setInterval callbacks
|  +---------------------------+
|  +---------------------------+
|  |     pending callbacks     |  <-- I/O callbacks deferred to next loop
|  +---------------------------+
|  +---------------------------+
|  |       idle, prepare       |  <-- internal use only
|  +---------------------------+
|  +---------------------------+
|  |           poll            |  <-- retrieve new I/O events; execute I/O callbacks
|  +---------------------------+
|  +---------------------------+
|  |           check           |  <-- setImmediate() callbacks
|  +---------------------------+
|  +---------------------------+
|  |      close callbacks      |  <-- socket.on('close'), etc.
|  +---------------------------+
+--------- LOOP BACK ---------+
```

### Phase Details

**1. Timers Phase**
- Executes callbacks from `setTimeout()` and `setInterval()`
- Timer threshold is NOT guaranteed exact — it's a minimum delay
- Timers are checked at the START of each event loop iteration

**2. Poll Phase (most important)**
- Calculates how long to block and poll for I/O
- Processes events in the poll queue (I/O callbacks)
- If poll queue is empty:
  - If `setImmediate()` is scheduled → move to check phase
  - If timers are due → wrap back to timers phase
  - Otherwise → wait for callbacks to be added to poll queue

**3. Check Phase**
- Executes `setImmediate()` callbacks
- Runs immediately after poll phase completes

### Microtasks vs Macrotasks

```javascript
// Microtasks (run BETWEEN each phase, and between each macrotask)
// Higher priority than macrotasks
process.nextTick(() => console.log('nextTick'));      // nextTick queue (highest)
Promise.resolve().then(() => console.log('promise')); // promise queue
queueMicrotask(() => console.log('microtask'));       // promise queue

// Macrotasks (run in their respective phase)
setTimeout(() => console.log('timeout'), 0);          // timer queue
setImmediate(() => console.log('immediate'));          // check queue
```

**The Draining Rule**: After EACH macrotask callback executes, the event loop drains ALL microtasks (nextTick queue first, then promise queue) before moving to the next callback.

### Classic Interview Question: Execution Order
```javascript
console.log('1: start');

setTimeout(() => console.log('2: setTimeout'), 0);

setImmediate(() => console.log('3: setImmediate'));

Promise.resolve().then(() => console.log('4: promise'));

process.nextTick(() => console.log('5: nextTick'));

console.log('6: end');

// Output:
// 1: start
// 6: end
// 5: nextTick     (nextTick queue — runs before ANY microtask)
// 4: promise      (promise queue — runs before next macrotask)
// 2: setTimeout   (timer queue — order with setImmediate varies)
// 3: setImmediate (check queue — order with setTimeout varies)

// NOTE: setTimeout(0) vs setImmediate order is NON-DETERMINISTIC in main module
// But inside an I/O callback, setImmediate ALWAYS fires first
```

### Walk through it like the Event Loop does:
```
Call Stack          nextTick Queue    Promise Queue    Timer Queue    Check Queue
──────────          ──────────────    ─────────────    ───────────    ───────────
log('1: start')
→ prints "1: start"
→ pops off

setTimeout(cb, 0)
→ registers cb      
→ pops off                                             [cb: log('2')]

setImmediate(cb)
→ registers cb
→ pops off                                                            [cb: log('3')]

Promise.then(cb)
→ registers cb                        [cb: log('4')]
→ pops off

process.nextTick(cb)
→ registers cb       [cb: log('5')]
→ pops off

log('6: end')
→ prints "6: end"
→ pops off

── Call Stack EMPTY ── Event Loop kicks in ──

1. Drain nextTick queue → prints "5: nextTick"
2. Drain promise queue  → prints "4: promise"
3. Timer phase          → prints "2: setTimeout"
4. Check phase          → prints "3: setImmediate"
```

### Inside I/O Callback
```javascript
const fs = require('fs');

fs.readFile('/some/file', () => {
    setTimeout(() => console.log('timeout'), 0);
    setImmediate(() => console.log('immediate'));
});

// Output: ALWAYS immediate → timeout
// Because: after I/O callback, we're in poll phase → check phase (setImmediate) runs first
```

## libuv Thread Pool

### What Uses the Thread Pool
- `fs` module operations (read, write, stat, etc.)
- `crypto.pbkdf2`, `crypto.randomBytes`
- `dns.lookup()` (NOT `dns.resolve()` — that uses c-ares)
- `zlib` operations

### Default: 4 threads
```javascript
// Increase thread pool size
process.env.UV_THREADPOOL_SIZE = 8; // max 1024

// Proof: all 4 run in parallel, 5th waits
const crypto = require('crypto');
const start = Date.now();
for (let i = 0; i < 5; i++) {
    crypto.pbkdf2('secret', 'salt', 100000, 64, 'sha512', () => {
        console.log(`${i}: ${Date.now() - start}ms`);
    });
}
// First 4 finish around same time, 5th takes ~2x longer
```

## Event Loop Blocking

### What Blocks the Event Loop
```javascript
// BAD: Synchronous CPU-intensive work
function blockingWork() {
    const start = Date.now();
    while (Date.now() - start < 5000) {} // blocks for 5 seconds
}

// BAD: Large JSON parsing
JSON.parse(hugeString); // synchronous, blocks event loop

// BAD: Complex regex
/^(a+)+$/.test('aaaaaaaaaaaaaaaaaa!'); // catastrophic backtracking

// BAD: Synchronous crypto
crypto.pbkdf2Sync('password', 'salt', 100000, 64, 'sha512');
```

### How to Detect Blocking
```javascript
// Monitor event loop delay
const { monitorEventLoopDelay } = require('perf_hooks');
const h = monitorEventLoopDelay({ resolution: 20 });
h.enable();

setInterval(() => {
    console.log(`Event loop delay: min=${h.min}ms, max=${h.max}ms, mean=${h.mean}ms`);
    h.reset();
}, 5000);
```

### How to Fix Blocking
```javascript
// 1. Use worker threads for CPU-intensive work
const { Worker, parentPort } = require('worker_threads');

// 2. Break long loops with setImmediate
async function processLargeArray(items) {
    for (let i = 0; i < items.length; i++) {
        process(items[i]);
        if (i % 1000 === 0) {
            await new Promise(resolve => setImmediate(resolve)); // yield to event loop
        }
    }
}

// 3. Use async versions of APIs
// BAD: fs.readFileSync()
// GOOD: await fs.promises.readFile()
```

## Interview Questions & Answers

**Q: Is Node.js single-threaded?**
> JavaScript execution is single-threaded. But Node.js uses libuv's thread pool (default 4 threads) for blocking I/O operations, and the OS kernel for networking. So the event loop is single-threaded, but Node.js as a whole is not.

**Q: What's the difference between process.nextTick() and setImmediate()?**
> `process.nextTick()` fires at the end of the current operation, before the event loop continues. `setImmediate()` fires on the next iteration of the event loop (check phase). nextTick has higher priority and can starve the event loop if used recursively.

**Q: How does Node.js handle 10,000 concurrent connections?**
> Non-blocking I/O + event loop. Each connection doesn't need a dedicated thread. The event loop delegates I/O to the OS kernel (epoll/kqueue) which notifies Node.js when data is ready. CPU work is still single-threaded, but I/O waiting is multiplexed.

**Q: What happens if a Promise is never resolved?**
> It stays in memory as a pending promise. If nothing references it, it eventually gets garbage collected. No error is thrown. To detect, use `--unhandled-rejections` flag and set timeouts for critical promises.

**Q: Walk me through what happens when you call setTimeout(cb, 0)?**
> 1. `setTimeout(cb, 0)` is pushed onto the Call Stack.
> 2. V8 sees it's a timer — hands it off to libuv (Node API).
> 3. `setTimeout` is popped off the Call Stack.
> 4. libuv starts a timer in the background (minimum 1ms delay internally).
> 5. When timer expires, `cb` is placed into the **Timer Queue**.
> 6. Event Loop waits for Call Stack to be empty.
> 7. Event Loop checks microtask queues first (nextTick → Promise).
> 8. If microtask queues are empty, Event Loop moves `cb` from Timer Queue → Call Stack.
> 9. `cb` executes and is popped off the Call Stack.

**Q: Why does process.nextTick() run before Promises?**
> Node.js has two microtask queues: the **nextTick queue** and the **promise queue**. After each phase (or after each callback), the event loop drains the entire nextTick queue first, then the entire promise queue. This is by design — `nextTick` is meant for "do this immediately after current operation" while Promises are standard microtasks.

**Q: Can you starve the event loop with process.nextTick?**
> Yes. If `process.nextTick()` is called recursively, the nextTick queue never empties, so the event loop never moves to the next phase. This blocks all I/O, timers, and other callbacks. Use `setImmediate()` instead for recursive patterns — it yields to the event loop between calls.

```javascript
// BAD: Starves the event loop
function bad() {
    process.nextTick(bad); // never lets event loop continue
}

// GOOD: Yields to event loop
function good() {
    setImmediate(good); // runs in check phase, allows other phases to execute
}
```
