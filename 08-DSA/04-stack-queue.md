# Stack & Queue — Deep Dive

## Core Concepts

### Stack (LIFO)
- **Use cases**: undo/redo, browser history, parsing expressions, DFS
- **Operations**: push O(1), pop O(1), peek O(1)
- In JS: use array with `push()` and `pop()`

### Queue (FIFO)
- **Use cases**: BFS, task scheduling, rate limiting, message queues
- **Operations**: enqueue O(1), dequeue O(1), front O(1)
- In JS: `push()` + `shift()` is O(n)! Use linked list or index-based for O(1)

### Monotonic Stack
- Stack that maintains increasing or decreasing order
- Used for: next greater/smaller element, temperatures, histogram

## Key Patterns

### 1. Valid Parentheses
```javascript
function isValid(s) {
    const stack = [];
    const map = { ')': '(', ']': '[', '}': '{' };
    
    for (const char of s) {
        if (char in map) {
            if (stack.pop() !== map[char]) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}
// Time: O(n), Space: O(n)
```

### 2. Min Stack
```javascript
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = []; // parallel stack tracking minimum
    }
    
    push(val) {
        this.stack.push(val);
        const min = this.minStack.length === 0 
            ? val 
            : Math.min(val, this.minStack[this.minStack.length - 1]);
        this.minStack.push(min);
    }
    
    pop() {
        this.stack.pop();
        this.minStack.pop();
    }
    
    top() {
        return this.stack[this.stack.length - 1];
    }
    
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}
// All operations O(1) — the trick is maintaining a parallel min-tracking stack
```

### 3. Daily Temperatures (Monotonic Stack)
```javascript
function dailyTemperatures(temperatures) {
    const result = new Array(temperatures.length).fill(0);
    const stack = []; // stores INDICES, not values
    
    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevIndex = stack.pop();
            result[prevIndex] = i - prevIndex;
        }
        stack.push(i);
    }
    return result;
}
// Time: O(n), Space: O(n)
// Monotonic decreasing stack — pop when current temp > stack top
// Each element pushed and popped at most once
```

### 4. Evaluate Reverse Polish Notation
```javascript
function evalRPN(tokens) {
    const stack = [];
    const ops = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b),
    };
    
    for (const token of tokens) {
        if (token in ops) {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(ops[token](a, b));
        } else {
            stack.push(Number(token));
        }
    }
    return stack[0];
}
```

### 5. Generate Parentheses (Stack/Backtracking)
```javascript
function generateParenthesis(n) {
    const result = [];
    
    function backtrack(current, open, close) {
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }
        if (open < n) backtrack(current + '(', open + 1, close);
        if (close < open) backtrack(current + ')', open, close + 1);
    }
    
    backtrack('', 0, 0);
    return result;
}
// Key constraint: close count must never exceed open count
```

### 6. Implement Queue using Stacks
```javascript
class MyQueue {
    constructor() {
        this.pushStack = [];
        this.popStack = [];
    }
    
    push(x) {
        this.pushStack.push(x);
    }
    
    pop() {
        this._transfer();
        return this.popStack.pop();
    }
    
    peek() {
        this._transfer();
        return this.popStack[this.popStack.length - 1];
    }
    
    empty() {
        return this.pushStack.length === 0 && this.popStack.length === 0;
    }
    
    _transfer() {
        if (this.popStack.length === 0) {
            while (this.pushStack.length) {
                this.popStack.push(this.pushStack.pop());
            }
        }
    }
}
// Amortized O(1) for all operations — each element transferred at most once
```

### 7. Largest Rectangle in Histogram
```javascript
function largestRectangleArea(heights) {
    const stack = []; // indices of increasing heights
    let maxArea = 0;
    
    for (let i = 0; i <= heights.length; i++) {
        const h = i === heights.length ? 0 : heights[i];
        
        while (stack.length && h < heights[stack[stack.length - 1]]) {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    return maxArea;
}
// Time: O(n) — each bar pushed/popped once
// Monotonic increasing stack — when we find a shorter bar, calculate areas
```

## Efficient Queue in JavaScript
```javascript
// For interview: explain why shift() is O(n) and use this instead
class Queue {
    constructor() {
        this.items = {};
        this.head = 0;
        this.tail = 0;
    }
    enqueue(val) { this.items[this.tail++] = val; }
    dequeue() {
        if (this.head === this.tail) return undefined;
        const val = this.items[this.head];
        delete this.items[this.head++];
        return val;
    }
    get size() { return this.tail - this.head; }
}
```

## Problems to Solve

| # | Problem | Pattern | LeetCode |
|---|---------|---------|----------|
| 1 | Valid Parentheses | Stack matching | #20 |
| 2 | Min Stack | Parallel min stack | #155 |
| 3 | Evaluate Reverse Polish Notation | Operand stack | #150 |
| 4 | Daily Temperatures | Monotonic stack | #739 |
| 5 | Generate Parentheses | Backtracking | #22 |
| 6 | Largest Rectangle in Histogram | Monotonic stack | #84 |
| 7 | Implement Queue using Stacks | Two-stack trick | #232 |
| 8 | Sliding Window Maximum | Monotonic deque | #239 |

## Interview Talking Points
- "Monotonic stack: every element is pushed/popped at most once, so it's O(n) total"
- "I store indices not values — indices let me calculate distances/widths"
- "The min stack trick: maintain a parallel stack that tracks the minimum at each level"
- "For the queue with two stacks: amortized O(1) because each element is transferred exactly once"
