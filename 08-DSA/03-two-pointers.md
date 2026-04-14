# Two Pointers — Deep Dive

## Core Concepts

### When to Use Two Pointers
- **Sorted arrays** — search for pairs, triplets
- **Palindrome checks** — left and right converging
- **Partitioning** — slow/fast pointer (Dutch National Flag)
- **Linked lists** — cycle detection, finding middle

### Types
1. **Opposite direction** — left at start, right at end, converge
2. **Same direction** — slow and fast, or read/write pointers
3. **Two arrays** — one pointer per array (merge pattern)

## Key Patterns

### 1. Opposite Direction: Two Sum (Sorted)
```javascript
function twoSumSorted(numbers, target) {
    let left = 0, right = numbers.length - 1;
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        if (sum === target) return [left + 1, right + 1];
        if (sum < target) left++;
        else right--;
    }
    return [];
}
// Time: O(n), Space: O(1)
// Works because array is SORTED — if sum too small, move left; too big, move right
```

### 2. Three Sum
```javascript
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue; // skip duplicates
        
        let left = i + 1, right = nums.length - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
}
// Time: O(n²), Space: O(1) excluding output
// Key: sort first, then fix one element and use two-pointer for the other two
```

### 3. Container With Most Water
```javascript
function maxArea(height) {
    let left = 0, right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const water = Math.min(height[left], height[right]) * (right - left);
        maxWater = Math.max(maxWater, water);
        
        // Move the shorter wall — it's the bottleneck
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}
// Why move shorter wall? Because moving taller wall can ONLY decrease or maintain width
// while the height is still limited by the shorter wall
```

### 4. Trapping Rain Water
```javascript
function trap(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            leftMax = Math.max(leftMax, height[left]);
            water += leftMax - height[left];
            left++;
        } else {
            rightMax = Math.max(rightMax, height[right]);
            water += rightMax - height[right];
            right--;
        }
    }
    return water;
}
// Time: O(n), Space: O(1)
// Water at position = min(maxLeft, maxRight) - height[position]
// We process from the side with smaller max since that's the bottleneck
```

### 5. Valid Palindrome
```javascript
function isPalindrome(s) {
    let left = 0, right = s.length - 1;
    
    while (left < right) {
        // Skip non-alphanumeric
        while (left < right && !isAlphanumeric(s[left])) left++;
        while (left < right && !isAlphanumeric(s[right])) right--;
        
        if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
        left++;
        right--;
    }
    return true;
}

function isAlphanumeric(c) {
    return /[a-zA-Z0-9]/.test(c);
}
```

### 6. Same Direction: Remove Duplicates
```javascript
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;
    let slow = 0;
    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    return slow + 1;
}
// slow = write pointer (last unique), fast = read pointer (scan ahead)
```

### 7. Move Zeroes
```javascript
function moveZeroes(nums) {
    let slow = 0;
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
            slow++;
        }
    }
}
// slow tracks next position for non-zero element
```

## Problems to Solve

| # | Problem | Pattern | LeetCode |
|---|---------|---------|----------|
| 1 | Valid Palindrome | Opposite direction | #125 |
| 2 | Two Sum II (sorted) | Opposite direction | #167 |
| 3 | 3Sum | Fix one + Two pointer | #15 |
| 4 | Container With Most Water | Opposite direction | #11 |
| 5 | Trapping Rain Water | Opposite + max tracking | #42 |
| 6 | Remove Duplicates from Sorted Array | Same direction | #26 |
| 7 | Move Zeroes | Same direction swap | #283 |
| 8 | Sort Colors (Dutch National Flag) | Three pointers | #75 |

## Decision Framework
```
Is array sorted?
├── Yes → Two pointers (opposite direction)
├── No → Can I sort it first?
│   ├── Yes (order doesn't matter) → Sort + two pointers
│   └── No → Consider HashMap instead
└── Need in-place modification? → Same direction (slow/fast)
```

## Interview Talking Points
- "Two pointers works here because the array is sorted — we can make decisions about which pointer to move"
- "The key insight for water container: we always move the shorter wall because it's the bottleneck for capacity"
- "For 3Sum, I reduce it to 2Sum by fixing one element and using two pointers on the rest"
- "The slow pointer marks the boundary of our result, fast pointer explores ahead"
