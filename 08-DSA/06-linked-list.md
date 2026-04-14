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
