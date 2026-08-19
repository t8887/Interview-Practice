# JavaScript Puzzles & Problems — ANSWERS & SOLUTIONS

> ⚠️ **SPOILER ALERT:** This file contains all answers. Only check AFTER attempting the problem in `05-tricky-output-puzzles.md`.

---
---

# PART 1: OUTPUT PUZZLES — ANSWERS

---

## SECTION 1: HOISTING & TEMPORAL DEAD ZONE (TDZ)

### Puzzle 1 — var hoisting vs let TDZ
> **Output:** `undefined` then `ReferenceError: Cannot access 'age' before initialization`
> **Why:** `var` declarations are hoisted and initialized as `undefined`. `let` is hoisted but NOT initialized — accessing it before declaration throws a ReferenceError (Temporal Dead Zone).

---

### Puzzle 2 — Function-scoped var hoisting trap
> **Output:** `undefined`, `2`
> **Why:** `var a` inside `foo` is hoisted to the top of the function. The local `a` shadows the global one. First log sees hoisted `undefined`, second sees assigned `2`.

---

### Puzzle 3 — let TDZ inside function with outer const
> **Output:** `ReferenceError`
> **Why:** Even `typeof` doesn't save you from TDZ. The local `const randomValue` shadows the outer one and is in TDZ at the time of access.

---

### Puzzle 4 — Function declaration vs expression hoisting
> **Output:** `"foo"` then `TypeError: bar is not a function`
> **Why:** Function declarations are fully hoisted (name + body). Function expressions assigned to `var` only hoist the variable as `undefined` — calling `undefined()` throws TypeError.

---

## SECTION 2: CLOSURES & SCOPE

### Puzzle 5 — The classic for-loop + var + setTimeout
> **Output:** `3 3 3` then `0 1 2`
> **Why:** `var` is function-scoped — all callbacks share the SAME `i` (which is `3` after loop). `let` is block-scoped — each iteration gets its own `j`.

---

### Puzzle 6 — Closure + catch block scope
> **Output:** `1`, `undefined`, `2`
> **Why:** The `catch(x)` creates a NEW block-scoped `x` that shadows the outer `x`. Inside catch, `x = 1` modifies the catch-scoped `x`, but `y = 2` modifies the outer `y`. Outside catch, the outer `x` is still `undefined`.

---

### Puzzle 7 — IIFE accidental global
> **Output:** `"undefined"`, `"number"`
> **Why:** `y = 10` has no `let/var/const` — it becomes an implicit global. `let x` is scoped to the IIFE. Outside, `x` doesn't exist but `y` does.

---

### Puzzle 8 — Memoization closure cache
> **Output:** `"Calculated! 20"`, `"From cache! 20"`, `"From cache! 20"`
> **Why:** First call calculates and caches `10 → 20`. Second call finds `10` in cache. Third call: `5 * 2 = 10`, also found in cache. The closure keeps `cache` alive across calls.

---

## SECTION 3: `this` KEYWORD TRAPS

### Puzzle 9 — Arrow function `this` in object
> **Output:** `20`, `NaN`
> **Why:** `diameter()` is a regular method — `this` refers to `shape`. `perimeter` is an arrow function — `this` refers to the surrounding (global/module) scope, where `this.radius` is `undefined`. `2 * Math.PI * undefined = NaN`.

---

### Puzzle 10 — `this` with call() inside setTimeout
> **Output:** `"🥑"`, `"😎"`
> **Why:** `data.getStatus()` — `this` is `data`, so `"🥑"`. `.call(this)` — the `this` in the arrow function callback is the outer `this` (global/window where `var status = '😎'`).

---

### Puzzle 11 — Arrow function in object method
> **Output:** `"my@email.com"`
> **Why:** Arrow functions don't have their own `this`. `this.email = email` modifies `this` from the enclosing scope (global), NOT `user`. The `user.email` property is untouched.

---

### Puzzle 12 — Constructor returning an object
> **Output:** `"Maserati"`
> **Why:** When a constructor explicitly returns an object, that object replaces the default `this`. If it returns a primitive, the `this` is used instead.

---

## SECTION 4: TYPE COERCION & OPERATORS

### Puzzle 13 — String + Number concatenation chain
> **Output:** `"122"`, `"32"`, `"NaN2"`, `NaN`
> **Why:**
> - `1 + "2"` → `"12"` + `"2"` → `"122"` (string concat)
> - `+"2"` is unary plus → `2`, so `1 + 2 = 3`, then `3 + "2"` → `"32"`
> - `"A" - "B"` → `NaN`, then `NaN + "2"` → `"NaN2"` (string concat)
> - `NaN + 2` → `NaN` (number operation)

---

### Puzzle 14 — Tricky equality and typeof
> **Output:** `"object"`, `"undefined"`, `true`, `false`
> **Why:** `typeof null` is `"object"` (historic JS bug). `null == undefined` is `true` (spec rule). `null === undefined` is `false` (different types).

---

### Puzzle 15 — Double negation and typeof trap
> **Output:** `false`, `false`
> **Why:** `typeof name` returns `"string"`. `!"string"` → `false` (truthy string negated). `false === 'object'` → `false`. `false === 'string'` → `false`. Operator precedence: `!` runs before `===`.

---

### Puzzle 16 — `typeof typeof`
> **Output:** `"string"`
> **Why:** `typeof 1` → `"number"` (a string). `typeof "number"` → `"string"`.

---

### Puzzle 17 — Unary plus, negation, and boolean
> **Output:** `1`, `false`
> **Why:** `+true` converts boolean to number → `1`. `!'Lydia'` → any non-empty string is truthy, negated → `false`.

---

### Puzzle 18 — `new Number()` vs primitive
> **Output:** `true`, `false`, `false`
> **Why:** `a == b` → coercion makes them equal. `a === b` → `a` is primitive, `b` is object → `false`. `b === c` → same thing, object vs primitive.

---

### Puzzle 19 — Falsy values trap
> **Output:** `false`, `true`, `false`, `true`, `false`
> **Why:** `0`, `''`, `undefined` are falsy. But `new Number(0)` and `new Boolean(false)` are OBJECTS — all objects are truthy, even if they wrap a falsy value!

---

## SECTION 5: OBJECTS, REFERENCES & MUTATION

### Puzzle 20 — Object as key (toString trap)
> **Output:** `456`
> **Why:** Object keys are strings. Both `b` and `c` get converted to `"[object Object]"`. So `a["[object Object]"]` is first set to `123`, then overwritten to `456`.

---

### Puzzle 21 — Reference vs value assignment
> **Output:** `[{ name: "Lydia" }]`
> **Why:** `person = null` reassigns the `person` variable, but the object `{ name: "Lydia" }` still exists in `members[0]`. The array holds a reference to the OBJECT, not to the variable.

---

### Puzzle 22 — Object.freeze shallow freeze
> **Output:** `"101 Main St"`
> **Why:** `Object.freeze()` is shallow — it freezes top-level properties. Nested objects are NOT frozen. `person.address` is a reference that can still be mutated.

---

### Puzzle 23 — Object.defineProperty hidden property
> **Output:** `{ name: "Lydia", age: 21 }`, `["name"]`
> **Why:** `Object.defineProperty` defaults `enumerable` to `false`. The property exists but won't show up in `Object.keys()`, `for...in`, or `JSON.stringify`.

---

### Puzzle 24 — Duplicate keys in object literal
> **Output:** `{ a: "three", b: "two" }`
> **Why:** Duplicate keys in an object literal — the last one wins. The first `a` is silently overwritten.

---

### Puzzle 25 — Pass by reference vs value
> **Output:** `{ name: "Lydia" }`, `"1997"`
> **Why:** Objects are passed by reference — mutating `member.name` changes the original. Primitives (strings) are passed by value — `year = '1998'` creates a local copy.

---

## SECTION 6: EVENT LOOP, PROMISES & ASYNC

### Puzzle 26 — setTimeout order
> **Output:** `"First"`, `"Third"`, `"Second"`
> **Why:** `bar()` schedules `"Second"` to the macrotask queue. `foo()` logs immediately. `baz()` logs immediately. After call stack is empty, the setTimeout callback runs.

---

### Puzzle 27 — Promise vs setTimeout execution order
> **Output:** `"Start"`, `"End"`, `"Promise"`, `"Timeout"`
> **Why:** Synchronous code runs first (`Start`, `End`). Microtasks (Promises) run before macrotasks (setTimeout). So `Promise` before `Timeout`.

---

### Puzzle 28 — Async function returns a Promise
> **Output:** `Promise {<pending>}`
> **Why:** `async` functions ALWAYS return a Promise. Without `await` on the caller side, you get the pending Promise object, not the resolved value.

---

### Puzzle 29 — Promise.all with rejection
> **Output:** `"Third"`
> **Why:** `Promise.all` rejects as soon as ANY promise rejects. `res1` resolves fine. `res2` contains `promise3` which rejects — the whole `runPromises` rejects, caught by `.catch()`.

---

### Puzzle 30 — Complex microtask/macrotask ordering
> **Output:** `"Last line 1!"`, `"Promise 2!"`, `"Last line 2!"`, `"Promise 1!"`, `"Timeout 1!"`, `"Timeout 2!"`
> **Why:**
> 1. `funcOne()`: setTimeout → macrotask queue. Promise `.then` → microtask queue. `"Last line 1!"` logs immediately.
> 2. `funcTwo()`: hits `await` → pauses, yields to microtask queue.
> 3. Microtask: `funcTwo` resumes → `"Promise 2!"`, schedules Timeout 2, `"Last line 2!"`.
> 4. Microtask: `funcOne`'s `.then` chain completes → `"Promise 1!"`.
> 5. Macrotasks: `"Timeout 1!"`, `"Timeout 2!"`.

---

## SECTION 7: ARRAYS & BUILT-IN METHODS

### Puzzle 31 — `push()` returns length, not array
> **Output:** `TypeError: newList.push is not a function`
> **Why:** `[1,2,3].push(4)` returns `4` (the new length), NOT the array. So `newList = 4`. `4.push(5)` → TypeError because numbers don't have a `push` method.

---

### Puzzle 32 — `reduce` without initial value
> **Output:** `1 2`, `undefined 3`, `undefined 4`
> **Why:** No initial accumulator — first element (`1`) is used as initial `x`. `console.log` returns `undefined`, which becomes the new accumulator for next iteration.

---

### Puzzle 33 — `map` with implicit return
> **Output:** `[undefined, undefined, undefined]`
> **Why:** `typeof num === 'number'` is always `true` for all elements. `return;` (no value) returns `undefined`. The second `return` is never reached.

---

### Puzzle 34 — `indexOf` returns 0 (falsy!)
> **Output:** `"We don't have to buy bananas!"`
> **Why:** `indexOf('banana')` returns `0` (found at index 0). `0` is falsy! The `if` condition fails. Use `indexOf() !== -1` or `.includes()` instead.

---

### Puzzle 35 — `splice` vs `slice`
> **Output:** `['🍇', '🍊', '🍎']`
> **Why:** `slice(0,1)` returns `['🍌']` but does NOT mutate. `splice(0,1)` removes `'🍌'` (mutates). `unshift('🍇')` adds to start. Result: `['🍇', '🍊', '🍎']`.

---

## SECTION 8: PROTOTYPES, CLASSES & MISC

### Puzzle 36 — Static method not on instance
> **Output:** `TypeError: freddie.colorChange is not a function`
> **Why:** `static` methods live on the class itself, NOT on instances. `Chameleon.colorChange('orange')` would work, but `freddie.colorChange()` throws.

---

### Puzzle 37 — Arrow function has no prototype
> **Output:** `{ constructor: ... }`, `undefined`
> **Why:** Regular functions have a `prototype` property. Arrow functions do NOT — they can't be used as constructors.

---

### Puzzle 38 — Symbol uniqueness
> **Output:** `true`, `true`, `false`
> **Why:** `Number(2)` and `Boolean(false)` as functions (without `new`) return primitives → same value = equal. Every `Symbol()` call creates a unique, guaranteed-different symbol.

---

### Puzzle 39 — `hasOwnProperty` with number keys & Set
> **Output:** `true`, `true`, `false`, `true`
> **Why:** Object keys are always strings — both `'1'` and `1` work with `hasOwnProperty` because `1` is coerced to `'1'`. Sets use strict equality (`===`) — `'1' !== 1`.

---

### Puzzle 40 — Automatic semicolon insertion (ASI)
> **Output:** `"a is bigger"` then `undefined`, `"b is bigger"` then `undefined`
> **Why:** JavaScript's ASI inserts a semicolon after `return`. So `return;` returns `undefined`. The `a + b` is unreachable dead code. Always put the return value on the same line!

---

## BONUS SECTION: MIND-BENDERS

### Puzzle 41 — Logical operators with truthy/falsy objects
> **Output:** `{}`, `""`, `[]`
> **Why:** `||` returns the first truthy value (or the last value if all falsy).
> - `false || {}` → `{}` (truthy, stops here)
> - `null || false || ''` → `''` (all falsy, returns last)
> - `[] || 0` → `[]` (empty array is truthy!)

---

### Puzzle 42 — Template literal tagged function
> **Output:** `["", " is ", " years old"]`, `"Lydia"`, `21`
> **Why:** Tagged templates pass the string parts as an array first, then each interpolated value as separate arguments.

---

### Puzzle 43 — `for...in` vs `for...of`
> **Output:** `"0" "1" "2" "3"` then `"☕" "💻" "🍷" "🍫"`
> **Why:** `for...in` iterates over enumerable property KEYS (indices as strings). `for...of` iterates over iterable VALUES.

---

### Puzzle 44 — Destructuring rename trap
> **Output:** `ReferenceError: firstName is not defined`
> **Why:** `{ firstName: myName }` extracts `firstName` and renames it to `myName`. The variable `firstName` is never created — only `myName` exists.

---

### Puzzle 45 — setInterval persists after null assignment
> **Output:** `"Alert!"` keeps logging every second forever
> **Why:** `setInterval` returns a timer ID and registers the callback with the runtime. Setting `config = null` loses the reference to the ID, but the timer is still active. You'd need `clearInterval(config.alert)` BEFORE nullifying.

---

### Puzzle 46 — Promise.resolve + then vs async/await order
> **Output:** `"second"`, `"I have resolved!"`, `"I have resolved!"`, `"second"`
> **Why:**
> - `firstFunction`: `.then()` is async (microtask), `"second"` logs immediately.
> - `secondFunction`: `await` pauses execution, resumes after microtask.
> - Order: sync `"second"` → microtask from firstFunction's `.then` → microtask from secondFunction's `await` → `"second"` from secondFunction.

---

### Puzzle 47 — Getter returns undefined
> **Output:** `undefined`
> **Why:** There's a `set` but no `get` for `language`. When you access a property that has only a setter, it returns `undefined`.

---

### Puzzle 48 — JSON.stringify with replacer array
> **Output:** `'{"level":19,"health":90}'`
> **Why:** The second argument to `JSON.stringify` is a replacer. When it's an array, only those keys are included in the output.

---
---

# PART 2: PRACTICAL CODING PROBLEMS — SOLUTIONS

---

## SECTION 10: SORTING ALGORITHMS

### Problem 49 — Bubble Sort
```javascript
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}
```
> **Time:** O(n²) worst/avg, O(n) best (already sorted with `swapped` optimization)
> **Space:** O(1) — in-place
> **Key Insight:** Repeatedly swaps adjacent elements. Largest element "bubbles" to the end each pass. The `swapped` flag exits early if no swaps happen (already sorted).

---

### Problem 50 — Selection Sort
```javascript
function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}
```
> **Time:** O(n²) always | **Space:** O(1)
> **Key Insight:** Finds the minimum element in the unsorted portion and swaps it to the correct position. Fewer swaps than bubble sort.

---

### Problem 51 — Merge Sort (Divide & Conquer)
```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}
```
> **Time:** O(n log n) always | **Space:** O(n)
> **Key Insight:** Divides array in half, recursively sorts each half, then merges. Stable sort. Preferred when you need guaranteed O(n log n).

---

### Problem 52 — Quick Sort
```javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}
```
> **Time:** O(n log n) avg, O(n²) worst | **Space:** O(log n) stack
> **Key Insight:** Pick a pivot, partition into left (smaller) and right (larger), recursively sort. In-place version exists but this is cleaner for interviews.

---

### Problem 53 — Sort an array of 0s, 1s, and 2s (Dutch National Flag)
```javascript
function sortColors(arr) {
  let low = 0, mid = 0, high = arr.length - 1;

  while (mid <= high) {
    if (arr[mid] === 0) {
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      low++;
      mid++;
    } else if (arr[mid] === 1) {
      mid++;
    } else {
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      high--;
    }
  }
  return arr;
}
```
> **Time:** O(n) single pass | **Space:** O(1)
> **Key Insight:** Three pointers — `low` for 0s boundary, `mid` for current, `high` for 2s boundary. Swaps elements into correct regions.

---

## SECTION 11: HASH MAP / OBJECT PROBLEMS

### Problem 54 — Two Sum (return indices)
```javascript
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
```
> **Time:** O(n) | **Space:** O(n)
> **Key Insight:** Store `{value: index}` in a Map. For each element, check if `target - current` exists in the Map. One-pass solution.

---

### Problem 55 — Frequency Counter (Count character occurrences)
```javascript
function charFrequency(str) {
  const freq = {};
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}
```
> **Key Insight:** `freq[char] = (freq[char] || 0) + 1` is the universal pattern for counting. Works with strings, arrays, anything.

---

### Problem 56 — Group Anagrams
```javascript
function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    const key = str.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }

  return Array.from(map.values());
}
```
> **Time:** O(n * k log k) where k = max string length | **Space:** O(n)
> **Key Insight:** Anagrams have the same sorted characters. Use sorted string as the Map key.

---

### Problem 57 — First Non-Repeating Character
```javascript
function firstNonRepeating(str) {
  const freq = {};
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  for (const char of str) {
    if (freq[char] === 1) return char;
  }
  return null;
}
```
> **Time:** O(n) two passes | **Space:** O(1) — max 26 chars
> **Key Insight:** First pass builds frequency map, second pass finds the first char with count 1. Order matters — must iterate original string, not the object.

---

### Problem 58 — Find Duplicates in Array
```javascript
function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();

  for (const num of arr) {
    if (seen.has(num)) duplicates.add(num);
    else seen.add(num);
  }

  return [...duplicates];
}
```
> **Time:** O(n) | **Space:** O(n)
> **Key Insight:** Use a Set for O(1) lookups. If we've seen it before, it's a duplicate.

---

### Problem 59 — Most Frequent Element (Majority Element)
```javascript
function majorityElement(nums) {
  const map = {};
  for (const num of nums) {
    map[num] = (map[num] || 0) + 1;
    if (map[num] > nums.length / 2) return num;
  }
}
```
> **Time:** O(n) | **Space:** O(n)
> **Key Insight:** Count frequencies, return the one that appears more than n/2 times. Can also use Boyer-Moore Voting Algorithm for O(1) space.

---

### Problem 60 — Intersection of Two Arrays
```javascript
function intersection(arr1, arr2) {
  const set1 = new Set(arr1);
  return [...new Set(arr2.filter(item => set1.has(item)))];
}
```
> **Time:** O(n + m) | **Space:** O(n)
> **Key Insight:** Convert one array to a Set for O(1) lookups, then filter the other.

---

## SECTION 12: STRING MANIPULATION

### Problem 61 — Reverse a String (multiple ways)
```javascript
// Method 1: Built-in
const reverse1 = str => str.split('').reverse().join('');

// Method 2: Loop
function reverse2(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

// Method 3: Reduce
const reverse3 = str => str.split('').reduce((rev, char) => char + rev, '');
```
> **Follow-up:** Reverse without affecting special characters: `"a,b$c"` → `"c,b$a"`

---

### Problem 62 — Check if String is Palindrome
```javascript
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}
```
> **Time:** O(n) | **Space:** O(n) for cleaned string
> **Key Insight:** Remove non-alphanumeric chars, lowercase, then use two-pointer approach from both ends.

---

### Problem 63 — Longest Substring Without Repeating Characters
```javascript
function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let maxLen = 0;
  let start = 0;

  for (let end = 0; end < s.length; end++) {
    if (seen.has(s[end]) && seen.get(s[end]) >= start) {
      start = seen.get(s[end]) + 1;
    }
    seen.set(s[end], end);
    maxLen = Math.max(maxLen, end - start + 1);
  }

  return maxLen;
}
```
> **Time:** O(n) | **Space:** O(min(n, 26))
> **Key Insight:** Sliding window with a Map tracking last-seen index. When a repeat is found, slide the window start forward.

---

### Problem 64 — Check if Two Strings are Anagrams
```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const freq = {};
  for (const char of s) freq[char] = (freq[char] || 0) + 1;
  for (const char of t) {
    if (!freq[char]) return false;
    freq[char]--;
  }
  return true;
}
```
> **Time:** O(n) | **Space:** O(1) — max 26 lowercase letters
> **Key Insight:** Build frequency map from first string, decrement for second. If any goes below 0 or is missing, not an anagram.

---

### Problem 65 — String Compression
```javascript
function compressString(str) {
  let compressed = '';
  let count = 1;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      compressed += str[i] + (count > 1 ? count : '');
      count = 1;
    }
  }

  return compressed.length < str.length ? compressed : str;
}
```
> **Key Insight:** Count consecutive chars. Only append count if > 1. Return original if compressed isn't shorter.

---

### Problem 66 — Title Case a String
```javascript
function titleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
```

---

## SECTION 13: ARRAY MANIPULATION

### Problem 67 — Flatten a Nested Array (any depth)
```javascript
// Method 1: Recursive
function flatten(arr) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

// Method 2: Using reduce
function flattenReduce(arr) {
  return arr.reduce(
    (acc, item) =>
      acc.concat(Array.isArray(item) ? flattenReduce(item) : item),
    []
  );
}

// Method 3: Built-in (know this exists but interviewers may ask you to implement)
// arr.flat(Infinity)
```
> **Time:** O(n) where n = total elements | **Space:** O(n)
> **Key Insight:** Recursively spread nested arrays. Interviewers love this because it tests recursion + array methods.

---

### Problem 68 — Remove Duplicates from Sorted Array (in-place)
```javascript
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
}
```
> **Time:** O(n) | **Space:** O(1)
> **Key Insight:** Two-pointer technique. Slow pointer `i` tracks unique elements, fast pointer `j` scans forward.

---

### Problem 69 — Move Zeroes to End
```javascript
function moveZeroes(nums) {
  let insertPos = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[insertPos], nums[i]] = [nums[i], nums[insertPos]];
      insertPos++;
    }
  }
  return nums;
}
```
> **Time:** O(n) | **Space:** O(1)
> **Key Insight:** Maintain `insertPos` for the next non-zero element. Swap non-zero elements to the front.

---

### Problem 70 — Maximum Subarray Sum (Kadane's Algorithm)
```javascript
function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
```
> **Time:** O(n) | **Space:** O(1)
> **Key Insight:** At each position, decide: start a new subarray here, or extend the previous one. This is Kadane's Algorithm — a MUST KNOW.

---

### Problem 71 — Rotate Array by K positions
```javascript
function rotateArray(nums, k) {
  k = k % nums.length;

  function reverse(arr, start, end) {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  }

  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);

  return nums;
}
```
> **Time:** O(n) | **Space:** O(1)
> **Key Insight:** Three-reverse trick. `k % n` handles cases where k > array length.

---

### Problem 72 — Product of Array Except Self
```javascript
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    result[i] = leftProduct;
    leftProduct *= nums[i];
  }

  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return result;
}
```
> **Time:** O(n) | **Space:** O(1) — output array doesn't count
> **Key Insight:** Two passes — left products then right products. Each position gets (product of all left) * (product of all right). No division needed.

---

### Problem 73 — Find Missing Number (0 to n)
```javascript
function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}
```
> **Time:** O(n) | **Space:** O(1)
> **Key Insight:** Sum of 0..n = n*(n+1)/2. Subtract actual sum to find the missing one. Or use XOR approach.

---

### Problem 74 — Merge Two Sorted Arrays
```javascript
function mergeSorted(arr1, arr2) {
  const result = [];
  let i = 0, j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) result.push(arr1[i++]);
    else result.push(arr2[j++]);
  }

  while (i < arr1.length) result.push(arr1[i++]);
  while (j < arr2.length) result.push(arr2[j++]);

  return result;
}
```
> **Time:** O(n + m) | **Space:** O(n + m)
> **Key Insight:** Two-pointer approach — compare heads of both arrays, push the smaller one.

---

## SECTION 14: TWO POINTERS & SLIDING WINDOW

### Problem 75 — Valid Parentheses
```javascript
function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if (char in map) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}
```
> **Time:** O(n) | **Space:** O(n)
> **Key Insight:** Use a stack. Push opening brackets, pop for closing brackets. If the popped bracket doesn't match, invalid.

---

### Problem 76 — Container With Most Water
```javascript
function maxArea(height) {
  let left = 0, right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    maxWater = Math.max(maxWater, area);

    if (height[left] < height[right]) left++;
    else right--;
  }

  return maxWater;
}
```
> **Time:** O(n) | **Space:** O(1)
> **Key Insight:** Two pointers from both ends. Move the shorter wall inward (keeping the taller one gives better chance of larger area).

---

### Problem 77 — Maximum Sum Subarray of Size K (Sliding Window)
```javascript
function maxSumSubarray(arr, k) {
  let maxSum = 0;
  let windowSum = 0;

  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;

  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
```
> **Time:** O(n) | **Space:** O(1)
> **Key Insight:** Sliding window of fixed size. Instead of recalculating sum, add the new element and subtract the element leaving the window.

---

### Problem 78 — Three Sum (find triplets that sum to 0)
```javascript
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

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
```
> **Time:** O(n²) | **Space:** O(1) ignoring output
> **Key Insight:** Sort first, fix one element, then use two-pointer for the remaining pair. Skip duplicates to avoid duplicate triplets.

---

## SECTION 15: POLYFILLS & UTILITY IMPLEMENTATIONS

### Problem 79 — Implement `Array.prototype.map`
```javascript
Array.prototype.myMap = function(callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result[i] = callback.call(thisArg, this[i], i, this);
    }
  }
  return result;
};
```
> **Key Insight:** Must handle: `thisArg`, index parameter, original array reference, sparse arrays (`i in this`).

---

### Problem 80 — Implement `Array.prototype.filter`
```javascript
Array.prototype.myFilter = function(callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};
```

---

### Problem 81 — Implement `Array.prototype.reduce`
```javascript
Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;

  if (accumulator === undefined) {
    if (this.length === 0) throw new TypeError('Reduce of empty array with no initial value');
    accumulator = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }

  return accumulator;
};
```
> **Key Insight:** Handle the case when no `initialValue` is provided — use first element and start from index 1. Throw on empty array with no initial value.

---

### Problem 82 — Implement `debounce`
```javascript
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```
> **Key Insight:** Clears previous timer on every call. Only executes after the specified delay with no new calls. Must preserve `this` context with `apply`.

---

### Problem 83 — Implement `throttle`
```javascript
function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
```
> **Key Insight:** Executes immediately, then blocks further calls until the time limit passes. Debounce delays execution; throttle limits frequency.

---

### Problem 84 — Implement `Function.prototype.bind`
```javascript
Function.prototype.myBind = function(context, ...boundArgs) {
  const fn = this;
  return function(...callArgs) {
    return fn.apply(context, [...boundArgs, ...callArgs]);
  };
};
```
> **Key Insight:** Must support partial application (pre-filled args). Use `apply` to set `this` context.

---

### Problem 85 — Implement `Function.prototype.call` and `apply`
```javascript
Function.prototype.myCall = function(context, ...args) {
  context = context || globalThis;
  const uniqueKey = Symbol();
  context[uniqueKey] = this;
  const result = context[uniqueKey](...args);
  delete context[uniqueKey];
  return result;
};

Function.prototype.myApply = function(context, args = []) {
  context = context || globalThis;
  const uniqueKey = Symbol();
  context[uniqueKey] = this;
  const result = context[uniqueKey](...args);
  delete context[uniqueKey];
  return result;
};
```
> **Key Insight:** Temporarily attach the function to the context object using a Symbol (no collision), invoke it, then clean up.

---

### Problem 86 — Deep Clone an Object
```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  const clone = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
}
```
> **Key Insight:** Recursively clone. Handle special types (Date, RegExp). Use `hasOwnProperty` to skip prototype chain. For circular refs, use a WeakMap.

---

### Problem 87 — Implement `Promise.all`
```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    if (promises.length === 0) {
      resolve(results);
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          completed++;
          if (completed === promises.length) resolve(results);
        })
        .catch(reject);
    });
  });
}
```
> **Key Insight:** Track results by index (not push order). Count completions. Reject immediately on first failure. Wrap with `Promise.resolve()` to handle non-promise values.

---

### Problem 88 — Implement `curry`
```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...nextArgs) {
      return curried.apply(this, [...args, ...nextArgs]);
    };
  };
}
```
> **Key Insight:** Compare collected args length with the function's expected arity (`fn.length`). If enough args, execute. Otherwise, return a function that collects more.

---

### Problem 89 — Implement `memoize`
```javascript
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```
> **Key Insight:** Cache results keyed by stringified arguments. `JSON.stringify` works for most cases. For complex objects, consider a WeakMap or custom hashing.

---

### Problem 90 — Implement `Array.prototype.flat`
```javascript
Array.prototype.myFlat = function(depth = 1) {
  const result = [];

  const flatten = (arr, d) => {
    for (const item of arr) {
      if (Array.isArray(item) && d > 0) {
        flatten(item, d - 1);
      } else {
        result.push(item);
      }
    }
  };

  flatten(this, depth);
  return result;
};
```
> **Key Insight:** Respects depth parameter. Decrements depth on each recursive level. `Infinity` flattens completely.

---

### Problem 91 — Implement `pipe` and `compose`
```javascript
// pipe: left to right
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);

// compose: right to left
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);
```
> **Key Insight:** `pipe` uses `reduce` (left→right), `compose` uses `reduceRight` (right→left). Both are functional programming essentials.

---

## SECTION 16: RECURSION & DYNAMIC PROGRAMMING

### Problem 92 — Fibonacci (Multiple Approaches)
```javascript
// Recursive (naive) — O(2^n)
function fibRecursive(n) {
  if (n <= 1) return n;
  return fibRecursive(n - 1) + fibRecursive(n - 2);
}

// Memoized — O(n)
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// Iterative — O(n), O(1) space
function fibIterative(n) {
  if (n <= 1) return n;
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}
```
> **Key Insight:** Naive recursion is O(2ⁿ). Memoization brings it to O(n). Iterative is O(n) with O(1) space. Know all three approaches.

---

### Problem 93 — Climbing Stairs (DP)
```javascript
function climbStairs(n) {
  if (n <= 2) return n;
  let prev = 1, curr = 2;

  for (let i = 3; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }

  return curr;
}
```
> **Time:** O(n) | **Space:** O(1)
> **Key Insight:** Same as Fibonacci! `ways(n) = ways(n-1) + ways(n-2)`. You can take 1 or 2 steps at a time.

---

### Problem 94 — Coin Change (Minimum Coins)
```javascript
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] + 1 < dp[i]) {
        dp[i] = dp[i - coin] + 1;
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
```
> **Time:** O(amount × coins) | **Space:** O(amount)
> **Key Insight:** Bottom-up DP. `dp[i]` = minimum coins to make amount `i`. For each amount, try every coin.

---

## SECTION 17: LINKED LIST (IN JAVASCRIPT)

### Problem 95 — Reverse a Linked List
```javascript
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let current = head;

  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}

// Helper to create list from array
function createList(arr) {
  let head = null;
  for (let i = arr.length - 1; i >= 0; i--) {
    head = new ListNode(arr[i], head);
  }
  return head;
}

function listToArray(head) {
  const result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}
```
> **Time:** O(n) | **Space:** O(1)
> **Key Insight:** Three pointers: `prev`, `current`, `next`. At each step, reverse the pointer and advance.

---

### Problem 96 — Detect Cycle in Linked List (Floyd's Algorithm)
```javascript
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }

  return false;
}
```
> **Time:** O(n) | **Space:** O(1)
> **Key Insight:** Tortoise and Hare algorithm. Slow moves 1 step, fast moves 2 steps. If they meet, there's a cycle. If fast reaches null, no cycle.

---

## SECTION 18: MISCELLANEOUS INTERVIEW FAVORITES

### Problem 97 — Event Emitter
```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
    return this;
  }

  off(event, listener) {
    if (!this.events[event]) return this;
    this.events[event] = this.events[event].filter(l => l !== listener);
    return this;
  }

  emit(event, ...args) {
    if (!this.events[event]) return false;
    this.events[event].forEach(listener => listener(...args));
    return true;
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
    return this;
  }
}
```
> **Key Insight:** Store listeners in an object keyed by event name. `once` wraps the listener to auto-remove after first invocation.

---

### Problem 98 — Implement `get` (safe deep property access)
```javascript
function get(obj, path, defaultValue) {
  const keys = Array.isArray(path) ? path : path.replace(/\[(\d+)\]/g, '.$1').split('.');

  let result = obj;
  for (const key of keys) {
    if (result == null) return defaultValue;
    result = result[key];
  }

  return result === undefined ? defaultValue : result;
}
```
> **Key Insight:** Parse the path string, handle both dot notation and bracket notation. Bail out early if any intermediate value is null/undefined.

---

### Problem 99 — Implement `setInterval` using `setTimeout`
```javascript
function mySetInterval(callback, delay) {
  let timerId;

  function repeat() {
    callback();
    timerId = setTimeout(repeat, delay);
  }

  timerId = setTimeout(repeat, delay);

  return {
    clear: () => clearTimeout(timerId),
  };
}
```

---

### Problem 100 — LRU Cache
```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}
```
> **Time:** O(1) for both get and put | **Space:** O(capacity)
> **Key Insight:** JavaScript `Map` preserves insertion order. Delete + re-set moves a key to the end. First key = least recently used.

---

### Problem 101 — Implement `Promise.allSettled`
```javascript
function promiseAllSettled(promises) {
  return Promise.all(
    promises.map(promise =>
      Promise.resolve(promise)
        .then(value => ({ status: 'fulfilled', value }))
        .catch(reason => ({ status: 'rejected', reason }))
    )
  );
}
```

---

### Problem 102 — Flatten an Object (nested to dot notation)
```javascript
function flattenObject(obj, prefix = '', result = {}) {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      flattenObject(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}
```
