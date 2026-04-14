# Trees — Deep Dive

## Core Concepts
- **Binary Tree**: each node has at most 2 children
- **BST**: left < root < right (for all subtrees)
- **Balanced BST**: height O(log n) — AVL, Red-Black
- **Complete**: all levels filled except possibly last (filled left to right)
- **Height**: longest path from root to leaf

## Traversals
```javascript
// Inorder: Left → Root → Right (BST gives sorted order)
function inorder(root, result = []) {
    if (!root) return result;
    inorder(root.left, result);
    result.push(root.val);
    inorder(root.right, result);
    return result;
}

// Preorder: Root → Left → Right (useful for serialization)
function preorder(root, result = []) {
    if (!root) return result;
    result.push(root.val);
    preorder(root.left, result);
    preorder(root.right, result);
    return result;
}

// Postorder: Left → Right → Root (useful for deletion, calculating sizes)
function postorder(root, result = []) {
    if (!root) return result;
    postorder(root.left, result);
    postorder(root.right, result);
    result.push(root.val);
    return result;
}

// Level Order (BFS)
function levelOrder(root) {
    if (!root) return [];
    const result = [], queue = [root];
    while (queue.length) {
        const level = [];
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
    }
    return result;
}
```

## Key Patterns

### 1. Maximum Depth
```javascript
function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
// DFS — get depth of left and right, take max + 1
```

### 2. Invert Binary Tree
```javascript
function invertTree(root) {
    if (!root) return null;
    [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
    return root;
}
```

### 3. Validate BST
```javascript
function isValidBST(root, min = -Infinity, max = Infinity) {
    if (!root) return true;
    if (root.val <= min || root.val >= max) return false;
    return isValidBST(root.left, min, root.val) && 
           isValidBST(root.right, root.val, max);
}
// Pass valid range down — each node must be within (min, max)
```

### 4. Lowest Common Ancestor
```javascript
// For general binary tree
function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) return root;
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    if (left && right) return root; // p and q are on different sides
    return left || right;
}

// For BST — use BST property
function lcaBST(root, p, q) {
    if (p.val < root.val && q.val < root.val) return lcaBST(root.left, p, q);
    if (p.val > root.val && q.val > root.val) return lcaBST(root.right, p, q);
    return root; // split point = LCA
}
```

### 5. Kth Smallest in BST
```javascript
function kthSmallest(root, k) {
    let count = 0, result = null;
    
    function inorder(node) {
        if (!node || result !== null) return;
        inorder(node.left);
        count++;
        if (count === k) { result = node.val; return; }
        inorder(node.right);
    }
    
    inorder(root);
    return result;
}
// Inorder traversal of BST gives sorted order — stop at kth
```

### 6. Binary Tree Right Side View
```javascript
function rightSideView(root) {
    if (!root) return [];
    const result = [], queue = [root];
    
    while (queue.length) {
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            if (i === size - 1) result.push(node.val); // last node in level
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return result;
}
```

### 7. Serialize / Deserialize
```javascript
function serialize(root) {
    if (!root) return 'null';
    return `${root.val},${serialize(root.left)},${serialize(root.right)}`;
}

function deserialize(data) {
    const nodes = data.split(',');
    let i = 0;
    
    function build() {
        if (nodes[i] === 'null') { i++; return null; }
        const node = new TreeNode(Number(nodes[i++]));
        node.left = build();
        node.right = build();
        return node;
    }
    
    return build();
}
// Preorder serialization — root first, then recursively left and right
```

### 8. Diameter of Binary Tree
```javascript
function diameterOfBinaryTree(root) {
    let maxDiameter = 0;
    
    function height(node) {
        if (!node) return 0;
        const left = height(node.left);
        const right = height(node.right);
        maxDiameter = Math.max(maxDiameter, left + right);
        return 1 + Math.max(left, right);
    }
    
    height(root);
    return maxDiameter;
}
// Diameter through a node = left height + right height
// Calculate height bottom-up and track max diameter
```

## Trie (Prefix Tree)
```javascript
class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}

class Trie {
    constructor() { this.root = new TrieNode(); }
    
    insert(word) {
        let node = this.root;
        for (const c of word) {
            if (!node.children[c]) node.children[c] = new TrieNode();
            node = node.children[c];
        }
        node.isEnd = true;
    }
    
    search(word) {
        const node = this._findNode(word);
        return node !== null && node.isEnd;
    }
    
    startsWith(prefix) {
        return this._findNode(prefix) !== null;
    }
    
    _findNode(str) {
        let node = this.root;
        for (const c of str) {
            if (!node.children[c]) return null;
            node = node.children[c];
        }
        return node;
    }
}
```

## Problems to Solve

| # | Problem | Pattern | LeetCode |
|---|---------|---------|----------|
| 1 | Invert Binary Tree | DFS recursive | #226 |
| 2 | Maximum Depth | DFS | #104 |
| 3 | Same Tree | DFS comparison | #100 |
| 4 | Level Order Traversal | BFS | #102 |
| 5 | Validate BST | DFS with range | #98 |
| 6 | Kth Smallest in BST | Inorder + counter | #230 |
| 7 | LCA of Binary Tree | Recursive split | #236 |
| 8 | Binary Tree Right Side View | BFS last in level | #199 |
| 9 | Serialize/Deserialize | Preorder + null markers | #297 |
| 10 | Implement Trie | Prefix tree | #208 |

## DFS vs BFS Decision
```
Need level-by-level? → BFS (queue)
Need path from root to leaf? → DFS (recursive/stack)
Need to find shortest path? → BFS
Need to explore all paths? → DFS
BST search? → DFS following BST property
```
