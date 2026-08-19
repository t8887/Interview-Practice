---
topic: Linked List
level: advanced
status: solid
last_reviewed: 2026-08-19
next_review: 2026-08-20
---

# Linked List — Deep Dive

## Core Concepts
- **No random access** — must traverse from head, O(n) access
- **O(1) insert/delete** at known position (no shifting)
- **Types**: singly linked, doubly linked, circular
- **JS implementation**: plain objects with `.val` and `.next`

```javascript
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}
```

## Key Patterns

### 1. Reverse Linked List
```javascript
function reverseList(head) {
    let prev = null, curr = head;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
// Three pointers: prev, curr, next — rewire one link at a time
```

### 2. Detect Cycle (Floyd's Tortoise & Hare)
```javascript
function hasCycle(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}

// Find cycle start
function detectCycle(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            slow = head;
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow; // cycle start
        }
    }
    return null;
}
// Math: when they meet, distance from head to cycle start = distance from meeting point to cycle start
```

### 3. Merge Two Sorted Lists
```javascript
function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0);
    let curr = dummy;
    
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            curr.next = l1;
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }
    curr.next = l1 || l2;
    return dummy.next;
}
// Dummy node pattern — avoids special-casing the head
```

### 4. Remove Nth From End
```javascript
function removeNthFromEnd(head, n) {
    const dummy = new ListNode(0, head);
    let fast = dummy, slow = dummy;
    
    // Move fast n+1 ahead
    for (let i = 0; i <= n; i++) fast = fast.next;
    
    // Move both until fast reaches end
    while (fast) {
        slow = slow.next;
        fast = fast.next;
    }
    
    slow.next = slow.next.next; // skip the nth node
    return dummy.next;
}
// Two pointers with gap of n — when fast reaches end, slow is at (n+1)th from end
```

### 5. Find Middle
```javascript
function middleNode(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}
// Slow moves 1, fast moves 2 — when fast reaches end, slow is at middle
```

### 6. Merge K Sorted Lists
```javascript
function mergeKLists(lists) {
    if (!lists.length) return null;
    
    // Divide and conquer — merge pairs repeatedly
    while (lists.length > 1) {
        const merged = [];
        for (let i = 0; i < lists.length; i += 2) {
            const l1 = lists[i];
            const l2 = i + 1 < lists.length ? lists[i + 1] : null;
            merged.push(mergeTwoLists(l1, l2));
        }
        lists = merged;
    }
    return lists[0];
}
// Time: O(N log k) where N = total nodes, k = number of lists
// Each level merges all N nodes, log k levels
```

### 7. Reorder List
```javascript
function reorderList(head) {
    // 1. Find middle
    let slow = head, fast = head;
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // 2. Reverse second half
    let prev = null, curr = slow.next;
    slow.next = null;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    
    // 3. Merge two halves alternately
    let first = head, second = prev;
    while (second) {
        const tmp1 = first.next, tmp2 = second.next;
        first.next = second;
        second.next = tmp1;
        first = tmp1;
        second = tmp2;
    }
}
// Combines three patterns: find middle, reverse, merge
```

### 8. LRU Cache
```javascript
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
        // Doubly linked list with dummy head/tail
        this.head = { key: 0, val: 0, prev: null, next: null };
        this.tail = { key: 0, val: 0, prev: null, next: null };
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    _remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    _addToFront(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }
    
    get(key) {
        if (!this.map.has(key)) return -1;
        const node = this.map.get(key);
        this._remove(node);
        this._addToFront(node);
        return node.val;
    }
    
    put(key, value) {
        if (this.map.has(key)) {
            this._remove(this.map.get(key));
        }
        const node = { key, val: value, prev: null, next: null };
        this._addToFront(node);
        this.map.set(key, node);
        
        if (this.map.size > this.capacity) {
            const lru = this.tail.prev;
            this._remove(lru);
            this.map.delete(lru.key);
        }
    }
}
// O(1) get and put — HashMap for lookup, DLL for ordering
```

## Problems to Solve

| # | Problem | Pattern | LeetCode |
|---|---------|---------|----------|
| 1 | Reverse Linked List | Iterative reverse | #206 |
| 2 | Linked List Cycle | Fast/slow pointers | #141 |
| 3 | Merge Two Sorted Lists | Dummy node + merge | #21 |
| 4 | Remove Nth From End | Two pointers with gap | #19 |
| 5 | Reorder List | Find mid + reverse + merge | #143 |
| 6 | Merge K Sorted Lists | Divide & conquer | #23 |
| 7 | LRU Cache | HashMap + DLL | #146 |
| 8 | Copy List with Random Pointer | HashMap clone | #138 |

## Interview Talking Points
- "I'm using a dummy node to avoid edge cases when the head itself might change"
- "Floyd's algorithm works because in a cycle, fast gains one step per iteration — they must meet"
- "LRU Cache: HashMap gives O(1) lookup, doubly linked list gives O(1) removal and insertion"
- "For merge K lists, divide and conquer gives O(N log k) vs O(Nk) for sequential merge"

## Prerequisites
[`03-two-pointers.md`](./03-two-pointers.md) (slow/fast pointer mechanics, used throughout this file's Floyd's-cycle content).

## Related
[`16-DSA-Practice/design/lru-cache.js`](../16-DSA-Practice/design/lru-cache.js) — this file's LRU Cache is the canonical, correctly-implemented O(1) version (confirmed during `/prep-analyze`); the practice-layer copy is a reference-solved exercise, not a separate implementation. **Contrast with the confirmed-buggy versions elsewhere in the repo:** `07-System-Design/in-depth/04-caching.md`'s hand-rolled LRU was O(n) (fixed during `/prep-restructure` Phase 0) and `12-Company/persistent-aws-backend-developer.md`'s LRU had a `get()` that deleted before reading (also fixed) — if you see a third LRU implementation anywhere in this repo that disagrees with this file, this file is the one to trust. Also: `08-DSA/15-binary-search-variants.md` (Median of Two Sorted Arrays uses a similar two-pointer-on-linked-structure mental model).

## Interview Questions (hardest first)
1. Derive algebraically why Floyd's slow/fast pointers must meet inside a cycle, and why resetting one pointer to head then advancing both by 1 finds the cycle start. (This file's own `_meta/REPOSITORY_ANALYSIS.md` entry flags that the file *asserts* this without proof — be ready to derive it live.)
2. Why does Merge K Sorted Lists via divide-and-conquer achieve O(N log k) instead of O(Nk)? Walk through the log k merge levels.
3. Implement Copy List with Random Pointer two ways — O(n) space (HashMap) and O(1) extra space (interleaved-node trick) — and explain the trade-off out loud.
4. Extend the LRU Cache into an LFU Cache (see `16-DSA-Practice/design/lfu-cache.js`) — what's the extra bookkeeping LFU needs that LRU doesn't?
5. Why does this file's LRU Cache use a dummy head *and* tail node instead of just a head?

## Exercises
1. Prove Floyd's meeting-point math on paper before checking any reference — this file states the result, not the derivation.
2. Implement Copy List with Random Pointer both ways (named in this file's own problems table, row 8, with zero code above it).
3. Add TTL-based expiry to the LRU Cache (evict on capacity AND age) — a standard follow-up interviewers ask after the base implementation.

## My Real-World Usage
The LRU Cache pattern here is the same underlying data structure reasoning behind Redis's `allkeys-lru` eviction policy, which shows up in the UTEC caching layer story (`12-Company/recro-cheq-nodejs-prep.md` §6-Q17 has the fuller production version — per-instance eviction-policy separation, not just the raw DS).

## Common Mistakes
- Implementing LRU with a plain array/Map and `indexOf`/`splice` (O(n)) instead of HashMap + doubly linked list (O(1)) — a mistake this exact repo made twice in other files before Phase 0 fixed it.
- Forgetting to update the LRU Cache's `prev`/`next` pointers on both ends when removing a node (classic off-by-reference bug).
- Reading a key's value *after* deleting it from the cache in `get()` — deletes the value before you can read it, always returns `undefined`. A confirmed, real bug found in `12-Company/persistent-aws-backend-developer.md` during `/prep-analyze`.
