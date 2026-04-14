# Binary Search — Deep Dive

## Core Concepts
- **Prerequisite**: sorted array or monotonic search space
- **Time**: O(log n) — halves search space each step
- **Common bug**: overflow in `mid = (low + high) / 2` → use `mid = low + ((high - low) >> 1)`

## Templates

### Template 1: Standard (find exact match)
```javascript
function binarySearch(nums, target) {
    let lo = 0, hi = nums.length - 1;
    while (lo <= hi) {
        const mid = lo + ((hi - lo) >> 1);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}
```

### Template 2: Find leftmost / first true
```javascript
function findFirst(nums, target) {
    let lo = 0, hi = nums.length;
    while (lo < hi) {
        const mid = lo + ((hi - lo) >> 1);
        if (nums[mid] >= target) hi = mid;
        else lo = mid + 1;
    }
    return lo; // first position where nums[i] >= target
}
```

### Template 3: Find rightmost
```javascript
function findLast(nums, target) {
    let lo = 0, hi = nums.length;
    while (lo < hi) {
        const mid = lo + ((hi - lo) >> 1);
        if (nums[mid] <= target) lo = mid + 1;
        else hi = mid;
    }
    return lo - 1; // last position where nums[i] <= target
}
```

## Key Patterns

### 1. Search in Rotated Sorted Array
```javascript
function search(nums, target) {
    let lo = 0, hi = nums.length - 1;
    
    while (lo <= hi) {
        const mid = lo + ((hi - lo) >> 1);
        if (nums[mid] === target) return mid;
        
        // Left half is sorted
        if (nums[lo] <= nums[mid]) {
            if (target >= nums[lo] && target < nums[mid]) hi = mid - 1;
            else lo = mid + 1;
        }
        // Right half is sorted
        else {
            if (target > nums[mid] && target <= nums[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;
}
// Key: one half is always sorted — check if target is in sorted half
```

### 2. Find Minimum in Rotated Sorted Array
```javascript
function findMin(nums) {
    let lo = 0, hi = nums.length - 1;
    
    while (lo < hi) {
        const mid = lo + ((hi - lo) >> 1);
        if (nums[mid] > nums[hi]) lo = mid + 1;
        else hi = mid;
    }
    return nums[lo];
}
// If mid > right, minimum is in right half; otherwise, minimum is in left half (including mid)
```

### 3. Binary Search on Answer Space
```javascript
// Koko eating bananas — find minimum speed
function minEatingSpeed(piles, h) {
    let lo = 1, hi = Math.max(...piles);
    
    while (lo < hi) {
        const mid = lo + ((hi - lo) >> 1);
        const hours = piles.reduce((sum, p) => sum + Math.ceil(p / mid), 0);
        if (hours <= h) hi = mid;    // can eat slower
        else lo = mid + 1;           // need to eat faster
    }
    return lo;
}
// Binary search on answer: what's the minimum speed that works?
// Check if a given speed is feasible, then narrow range
```

### 4. Search a 2D Matrix
```javascript
function searchMatrix(matrix, target) {
    const m = matrix.length, n = matrix[0].length;
    let lo = 0, hi = m * n - 1;
    
    while (lo <= hi) {
        const mid = lo + ((hi - lo) >> 1);
        const val = matrix[Math.floor(mid / n)][mid % n];
        if (val === target) return true;
        if (val < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return false;
}
// Treat 2D matrix as 1D sorted array: row = mid / cols, col = mid % cols
```

### 5. Find Peak Element
```javascript
function findPeakElement(nums) {
    let lo = 0, hi = nums.length - 1;
    
    while (lo < hi) {
        const mid = lo + ((hi - lo) >> 1);
        if (nums[mid] > nums[mid + 1]) hi = mid;     // peak is left or at mid
        else lo = mid + 1;                             // peak is right
    }
    return lo;
}
// Guaranteed: if going uphill, peak must exist on that side
```

### 6. Median of Two Sorted Arrays
```javascript
function findMedianSortedArrays(nums1, nums2) {
    // Binary search on smaller array
    if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
    
    const m = nums1.length, n = nums2.length;
    let lo = 0, hi = m;
    
    while (lo <= hi) {
        const i = lo + ((hi - lo) >> 1);
        const j = Math.floor((m + n + 1) / 2) - i;
        
        const left1 = i === 0 ? -Infinity : nums1[i - 1];
        const right1 = i === m ? Infinity : nums1[i];
        const left2 = j === 0 ? -Infinity : nums2[j - 1];
        const right2 = j === n ? Infinity : nums2[j];
        
        if (left1 <= right2 && left2 <= right1) {
            if ((m + n) % 2 === 0) {
                return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
            }
            return Math.max(left1, left2);
        }
        if (left1 > right2) hi = i - 1;
        else lo = i + 1;
    }
}
// Binary search partition: find i,j where left1 <= right2 AND left2 <= right1
```

## Problems to Solve

| # | Problem | Pattern | LeetCode |
|---|---------|---------|----------|
| 1 | Binary Search | Standard | #704 |
| 2 | Search in Rotated Sorted Array | Modified BS | #33 |
| 3 | Find Min in Rotated Sorted Array | Modified BS | #153 |
| 4 | Koko Eating Bananas | BS on answer | #875 |
| 5 | Search 2D Matrix | 1D mapping | #74 |
| 6 | Find Peak Element | BS on condition | #162 |
| 7 | Median of Two Sorted Arrays | Partition BS | #4 |

## When to Use Binary Search
```
Sorted array + search? → Standard binary search
"Minimum/Maximum that satisfies condition"? → Binary Search on Answer
Rotated sorted array? → Modified binary search (check which half is sorted)
Matrix (sorted rows/cols)? → 2D binary search
```
