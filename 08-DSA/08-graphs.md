# Graphs — Deep Dive

## Core Concepts

### Representations
```javascript
// Adjacency List (most common in interviews)
const graph = {
    0: [1, 2],
    1: [0, 3],
    2: [0, 3],
    3: [1, 2]
};

// Or using Map
const graph = new Map();
graph.set(0, [1, 2]);

// Build from edge list
function buildGraph(n, edges) {
    const graph = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u); // undirected
    }
    return graph;
}
```

### DFS vs BFS
- **DFS**: go deep first — use stack/recursion — cycle detection, topological sort, path finding
- **BFS**: go level by level — use queue — shortest path (unweighted), level-order

## Key Patterns

### 1. Number of Islands (Grid DFS/BFS)
```javascript
function numIslands(grid) {
    let count = 0;
    
    function dfs(i, j) {
        if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] === '0') return;
        grid[i][j] = '0'; // mark visited
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    }
    
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j);
            }
        }
    }
    return count;
}
// Time: O(M*N), Space: O(M*N) call stack
// Each cell visited once, marked to avoid revisiting
```

### 2. Clone Graph
```javascript
function cloneGraph(node) {
    if (!node) return null;
    const cloned = new Map();
    
    function dfs(node) {
        if (cloned.has(node)) return cloned.get(node);
        
        const copy = new Node(node.val);
        cloned.set(node, copy);
        
        for (const neighbor of node.neighbors) {
            copy.neighbors.push(dfs(neighbor));
        }
        return copy;
    }
    
    return dfs(node);
}
// HashMap maps original → clone; DFS handles cycles via memoization
```

### 3. Course Schedule (Cycle Detection / Topological Sort)
```javascript
// Can finish all courses? (detect cycle in directed graph)
function canFinish(numCourses, prerequisites) {
    const graph = Array.from({ length: numCourses }, () => []);
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
    }
    
    // 0 = unvisited, 1 = in current path, 2 = fully processed
    const state = new Array(numCourses).fill(0);
    
    function hasCycle(node) {
        if (state[node] === 1) return true;  // cycle!
        if (state[node] === 2) return false; // already processed
        
        state[node] = 1;
        for (const next of graph[node]) {
            if (hasCycle(next)) return true;
        }
        state[node] = 2;
        return false;
    }
    
    for (let i = 0; i < numCourses; i++) {
        if (hasCycle(i)) return false;
    }
    return true;
}
```

### 4. Course Schedule II (Topological Sort — Kahn's Algorithm)
```javascript
function findOrder(numCourses, prerequisites) {
    const graph = Array.from({ length: numCourses }, () => []);
    const inDegree = new Array(numCourses).fill(0);
    
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        inDegree[course]++;
    }
    
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }
    
    const order = [];
    while (queue.length) {
        const node = queue.shift();
        order.push(node);
        for (const next of graph[node]) {
            inDegree[next]--;
            if (inDegree[next] === 0) queue.push(next);
        }
    }
    
    return order.length === numCourses ? order : [];
}
// BFS approach: process nodes with 0 in-degree first
// If can't process all nodes → cycle exists
```

### 5. Pacific Atlantic Water Flow
```javascript
function pacificAtlantic(heights) {
    const rows = heights.length, cols = heights[0].length;
    const pacific = Array.from({ length: rows }, () => new Array(cols).fill(false));
    const atlantic = Array.from({ length: rows }, () => new Array(cols).fill(false));
    
    function dfs(r, c, reachable, prevHeight) {
        if (r < 0 || c < 0 || r >= rows || c >= cols) return;
        if (reachable[r][c] || heights[r][c] < prevHeight) return;
        
        reachable[r][c] = true;
        dfs(r + 1, c, reachable, heights[r][c]);
        dfs(r - 1, c, reachable, heights[r][c]);
        dfs(r, c + 1, reachable, heights[r][c]);
        dfs(r, c - 1, reachable, heights[r][c]);
    }
    
    // Start DFS from ocean borders (reverse flow)
    for (let c = 0; c < cols; c++) {
        dfs(0, c, pacific, -Infinity);
        dfs(rows - 1, c, atlantic, -Infinity);
    }
    for (let r = 0; r < rows; r++) {
        dfs(r, 0, pacific, -Infinity);
        dfs(r, cols - 1, atlantic, -Infinity);
    }
    
    const result = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (pacific[r][c] && atlantic[r][c]) result.push([r, c]);
        }
    }
    return result;
}
// Key insight: reverse the problem — flow FROM ocean INWARD (go uphill)
```

### 6. Union-Find (Disjoint Set)
```javascript
class UnionFind {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
        this.count = n;
    }
    
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // path compression
        }
        return this.parent[x];
    }
    
    union(x, y) {
        const px = this.find(x), py = this.find(y);
        if (px === py) return false;
        
        // Union by rank
        if (this.rank[px] < this.rank[py]) this.parent[px] = py;
        else if (this.rank[px] > this.rank[py]) this.parent[py] = px;
        else { this.parent[py] = px; this.rank[px]++; }
        
        this.count--;
        return true;
    }
    
    connected(x, y) { return this.find(x) === this.find(y); }
}
// Almost O(1) per operation with path compression + union by rank
// Use for: connected components, cycle detection in undirected graphs
```

## Problems to Solve

| # | Problem | Pattern | LeetCode |
|---|---------|---------|----------|
| 1 | Number of Islands | Grid DFS | #200 |
| 2 | Clone Graph | DFS + HashMap | #133 |
| 3 | Course Schedule | Cycle detection | #207 |
| 4 | Course Schedule II | Topological sort | #210 |
| 5 | Pacific Atlantic Water Flow | Multi-source DFS | #417 |
| 6 | Number of Connected Components | Union-Find / DFS | #323 |
| 7 | Graph Valid Tree | Union-Find + edge count | #261 |
| 8 | Alien Dictionary | Topological sort | #269 |

## Graph Problem Decision Framework
```
Is it a grid? → DFS/BFS from each unvisited cell
Need shortest path (unweighted)? → BFS
Need all paths / cycle detection? → DFS
Dependencies/ordering? → Topological Sort
Connected components? → Union-Find or DFS
Weighted shortest path? → Dijkstra
```
