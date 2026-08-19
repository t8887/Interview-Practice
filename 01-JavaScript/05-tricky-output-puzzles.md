# JavaScript Tricky Output Puzzles — The Ultimate Interview List

> Sources: Lydia Hallie's JS Questions, GeeksforGeeks, AmbitionBox, Glassdoor, LeetCode Discuss, HackerRank, GreatFrontEnd
> Companies: Google, Amazon, Flipkart, Atlassian, Razorpay, CRED, Swiggy, Microsoft, Paytm, Meesho, PhonePe, Uber, Meta
> **Rule: Try to answer BEFORE looking at the output. That's how you actually learn.**
> 📂 **Answers:** See `06-answers.md` for all solutions and explanations.

---

## SECTION 1: HOISTING & TEMPORAL DEAD ZONE (TDZ)

### Puzzle 1 — var hoisting vs let TDZ
```javascript
function sayHi() {
  console.log(name);
  console.log(age);
  var name = 'Lydia';
  let age = 21;
}
sayHi();
```

---

### Puzzle 2 — Function-scoped var hoisting trap
```javascript
var a = 1;
function foo() {
  console.log(a);
  var a = 2;
  console.log(a);
}
foo();
```

---

### Puzzle 3 — let TDZ inside function with outer const
```javascript
const randomValue = 21;
function getInfo() {
  console.log(typeof randomValue);
  const randomValue = 'Lydia';
}
getInfo();
```

---

### Puzzle 4 — Function declaration vs expression hoisting
```javascript
console.log(foo());
console.log(bar());

function foo() { return 'foo'; }
var bar = function() { return 'bar'; };
```

---

## SECTION 2: CLOSURES & SCOPE

### Puzzle 5 — The classic for-loop + var + setTimeout
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 1);
}
```

---

### Puzzle 6 — Closure + catch block scope
```javascript
(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();
```

---

### Puzzle 7 — IIFE accidental global
```javascript
(() => {
  let x = (y = 10);
})();
console.log(typeof x);
console.log(typeof y);
```

---

### Puzzle 8 — Memoization closure cache
```javascript
const add = () => {
  const cache = {};
  return num => {
    if (num in cache) {
      return `From cache! ${cache[num]}`;
    } else {
      const result = num + 10;
      cache[num] = result;
      return `Calculated! ${result}`;
    }
  };
};

const addFunction = add();
console.log(addFunction(10));
console.log(addFunction(10));
console.log(addFunction(5 * 2));
```

---

## SECTION 3: `this` KEYWORD TRAPS

### Puzzle 9 — Arrow function `this` in object
```javascript
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};
console.log(shape.diameter());
console.log(shape.perimeter());
```

---

### Puzzle 10 — `this` with call() inside setTimeout
```javascript
var status = '😎';
setTimeout(() => {
  const status = '😍';
  const data = {
    status: '🥑',
    getStatus() {
      return this.status;
    },
  };
  console.log(data.getStatus());
  console.log(data.getStatus.call(this));
}, 0);
```

---

### Puzzle 11 — Arrow function in object method
```javascript
const user = {
  email: "my@email.com",
  updateEmail: email => {
    this.email = email;
  }
};
user.updateEmail("new@email.com");
console.log(user.email);
```

---

### Puzzle 12 — Constructor returning an object
```javascript
function Car() {
  this.make = 'Lamborghini';
  return { make: 'Maserati' };
}
const myCar = new Car();
console.log(myCar.make);
```

---

## SECTION 4: TYPE COERCION & OPERATORS

### Puzzle 13 — String + Number concatenation chain
```javascript
console.log(1 + "2" + "2");
console.log(1 + +"2" + "2");
console.log("A" - "B" + "2");
console.log("A" - "B" + 2);
```

---

### Puzzle 14 — Tricky equality and typeof
```javascript
console.log(typeof null);
console.log(typeof undefined);
console.log(null == undefined);
console.log(null === undefined);
```

---

### Puzzle 15 — Double negation and typeof trap
```javascript
console.log(!typeof name === 'object');
console.log(!typeof name === 'string');
```

---

### Puzzle 16 — `typeof typeof`
```javascript
console.log(typeof typeof 1);
```

---

### Puzzle 17 — Unary plus, negation, and boolean
```javascript
console.log(+true);
console.log(!'Lydia');
```

---

### Puzzle 18 — `new Number()` vs primitive
```javascript
let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b);
console.log(a === b);
console.log(b === c);
```

---

### Puzzle 19 — Falsy values trap
```javascript
console.log(!!0);
console.log(!!new Number(0));
console.log(!!'');
console.log(!!new Boolean(false));
console.log(!!undefined);
```

---

## SECTION 5: OBJECTS, REFERENCES & MUTATION

### Puzzle 20 — Object as key (toString trap)
```javascript
const a = {};
const b = { key: 'b' };
const c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);
```

---

### Puzzle 21 — Reference vs value assignment
```javascript
let person = { name: 'Lydia' };
const members = [person];
person = null;

console.log(members);
```

---

### Puzzle 22 — Object.freeze shallow freeze
```javascript
const person = {
  name: 'Lydia',
  address: { street: '100 Main St' },
};
Object.freeze(person);
person.address.street = '101 Main St';
console.log(person.address.street);
```

---

### Puzzle 23 — Object.defineProperty hidden property
```javascript
const person = { name: 'Lydia' };
Object.defineProperty(person, 'age', { value: 21 });

console.log(person);
console.log(Object.keys(person));
```

---

### Puzzle 24 — Duplicate keys in object literal
```javascript
const obj = { a: 'one', b: 'two', a: 'three' };
console.log(obj);
```

---

### Puzzle 25 — Pass by reference vs value
```javascript
function getInfo(member, year) {
  member.name = 'Lydia';
  year = '1998';
}

const person = { name: 'Sarah' };
const birthYear = '1997';

getInfo(person, birthYear);
console.log(person, birthYear);
```

---

## SECTION 6: EVENT LOOP, PROMISES & ASYNC

### Puzzle 26 — setTimeout order
```javascript
const foo = () => console.log('First');
const bar = () => setTimeout(() => console.log('Second'));
const baz = () => console.log('Third');

bar();
foo();
baz();
```

---

### Puzzle 27 — Promise vs setTimeout execution order
```javascript
console.log('Start');

setTimeout(() => console.log('Timeout'), 0);

Promise.resolve().then(() => console.log('Promise'));

console.log('End');
```

---

### Puzzle 28 — Async function returns a Promise
```javascript
async function getData() {
  return await Promise.resolve('I made it!');
}
const data = getData();
console.log(data);
```

---

### Puzzle 29 — Promise.all with rejection
```javascript
const promise1 = Promise.resolve('First');
const promise2 = Promise.resolve('Second');
const promise3 = Promise.reject('Third');
const promise4 = Promise.resolve('Fourth');

const runPromises = async () => {
  const res1 = await Promise.all([promise1, promise2]);
  const res2 = await Promise.all([promise3, promise4]);
  return [res1, res2];
};

runPromises()
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

---

### Puzzle 30 — Complex microtask/macrotask ordering
```javascript
const myPromise = Promise.resolve(Promise.resolve('Promise'));

function funcOne() {
  setTimeout(() => console.log('Timeout 1!'), 0);
  myPromise.then(res => res).then(res => console.log(`${res} 1!`));
  console.log('Last line 1!');
}

async function funcTwo() {
  const res = await myPromise;
  console.log(`${res} 2!`);
  setTimeout(() => console.log('Timeout 2!'), 0);
  console.log('Last line 2!');
}

funcOne();
funcTwo();
```

---

## SECTION 7: ARRAYS & BUILT-IN METHODS

### Puzzle 31 — `push()` returns length, not array
```javascript
let newList = [1, 2, 3].push(4);
console.log(newList.push(5));
```

---

### Puzzle 32 — `reduce` without initial value
```javascript
[1, 2, 3, 4].reduce((x, y) => console.log(x, y));
```

---

### Puzzle 33 — `map` with implicit return
```javascript
[1, 2, 3].map(num => {
  if (typeof num === 'number') return;
  return num * 2;
});
```

---

### Puzzle 34 — `indexOf` returns 0 (falsy!)
```javascript
const groceries = ['banana', 'apple', 'peanuts'];

if (groceries.indexOf('banana')) {
  console.log('We have to buy bananas!');
} else {
  console.log("We don't have to buy bananas!");
}
```

---

### Puzzle 35 — `splice` vs `slice`
```javascript
const fruit = ['🍌', '🍊', '🍎'];
fruit.slice(0, 1);
fruit.splice(0, 1);
fruit.unshift('🍇');
console.log(fruit);
```

---

## SECTION 8: PROTOTYPES, CLASSES & MISC

### Puzzle 36 — Static method not on instance
```javascript
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
    return this.newColor;
  }
  constructor({ newColor = 'green' } = {}) {
    this.newColor = newColor;
  }
}
const freddie = new Chameleon({ newColor: 'purple' });
console.log(freddie.colorChange('orange'));
```

---

### Puzzle 37 — Arrow function has no prototype
```javascript
function giveLydiaPizza() {
  return 'Here is pizza!';
}
const giveLydiaChocolate = () =>
  "Here's chocolate...";

console.log(giveLydiaPizza.prototype);
console.log(giveLydiaChocolate.prototype);
```

---

### Puzzle 38 — Symbol uniqueness
```javascript
console.log(Number(2) === Number(2));
console.log(Boolean(false) === Boolean(false));
console.log(Symbol('foo') === Symbol('foo'));
```

---

### Puzzle 39 — `hasOwnProperty` with number keys & Set
```javascript
const obj = { 1: 'a', 2: 'b', 3: 'c' };
const set = new Set([1, 2, 3, 4, 5]);

console.log(obj.hasOwnProperty('1'));
console.log(obj.hasOwnProperty(1));
console.log(set.has('1'));
console.log(set.has(1));
```

---

### Puzzle 40 — Automatic semicolon insertion (ASI)
```javascript
function nums(a, b) {
  if (a > b) console.log('a is bigger');
  else console.log('b is bigger');
  return
  a + b;
}
console.log(nums(4, 2));
console.log(nums(1, 2));
```

---

## BONUS SECTION: MIND-BENDERS

### Puzzle 41 — Logical operators with truthy/falsy objects
```javascript
const one = false || {} || null;
const two = null || false || '';
const three = [] || 0 || true;

console.log(one, two, three);
```

---

### Puzzle 42 — Template literal tagged function
```javascript
function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = 'Lydia';
const age = 21;

getPersonInfo`${person} is ${age} years old`;
```

---

### Puzzle 43 — `for...in` vs `for...of`
```javascript
const arr = ['☕', '💻', '🍷', '🍫'];

for (let item in arr) {
  console.log(item);
}
for (let item of arr) {
  console.log(item);
}
```

---

### Puzzle 44 — Destructuring rename trap
```javascript
const { firstName: myName } = { firstName: 'Lydia' };
console.log(firstName);
```

---

### Puzzle 45 — setInterval persists after null assignment
```javascript
let config = {
  alert: setInterval(() => {
    console.log('Alert!');
  }, 1000),
};
config = null;
```

---

### Puzzle 46 — Promise.resolve + then vs async/await order
```javascript
const myPromise = () => Promise.resolve('I have resolved!');

function firstFunction() {
  myPromise().then(res => console.log(res));
  console.log('second');
}

async function secondFunction() {
  console.log(await myPromise());
  console.log('second');
}

firstFunction();
secondFunction();
```

---

### Puzzle 47 — Getter returns undefined
```javascript
const config = {
  languages: [],
  set language(lang) {
    return this.languages.push(lang);
  },
};
console.log(config.language);
```

---

### Puzzle 48 — JSON.stringify with replacer array
```javascript
const settings = {
  username: 'lydiahallie',
  level: 19,
  health: 90,
};
const data = JSON.stringify(settings, ['level', 'health']);
console.log(data);
```

---

## QUICK REFERENCE: CONCEPTS COVERED

| # | Concept | Puzzles |
|---|---------|---------|
| 1 | Hoisting & TDZ | 1, 2, 3, 4 |
| 2 | Closures & Scope | 5, 6, 7, 8 |
| 3 | `this` keyword | 9, 10, 11, 12 |
| 4 | Type Coercion & Operators | 13, 14, 15, 16, 17, 18, 19 |
| 5 | Objects, References & Mutation | 20, 21, 22, 23, 24, 25 |
| 6 | Event Loop, Promises & Async | 26, 27, 28, 29, 30, 46 |
| 7 | Arrays & Built-in Methods | 31, 32, 33, 34, 35 |
| 8 | Prototypes, Classes & Misc | 36, 37, 38, 39, 40 |
| 9 | Bonus Mind-Benders | 41, 42, 43, 44, 45, 47, 48 |

---

> **Study Strategy:**
> 1. Cover each puzzle WITHOUT looking at the answer first
> 2. Run the code in the browser console to verify
> 3. Understand the WHY — the concept matters more than the answer
> 4. Revisit the ones you got wrong after 2-3 days (spaced repetition)
> 5. Once comfortable, these concepts will click in bigger coding problems too

---
---

# PART 2: PRACTICAL CODING PROBLEMS — Sorting, Hash Maps, Arrays, Strings, Polyfills & More

> **Sources:** LeetCode, GreatFrontEnd, BigFrontEnd, GeeksforGeeks, HackerRank, Glassdoor, AmbitionBox
> **Companies:** Google, Amazon, Microsoft, Meta, Flipkart, Atlassian, Razorpay, CRED, Swiggy, Paytm, Meesho, PhonePe, Uber
> **Rule: Try solving BEFORE looking at the solution. Write it in your editor, not just read it.**
> 📂 **Solutions:** See `06-answers.md` for all solutions and explanations.

---

## SECTION 10: SORTING ALGORITHMS

### Problem 49 — Bubble Sort
> 📌 Asked at: Wipro, Infosys, TCS, Accenture

Implement bubble sort that sorts an array in ascending order.
```javascript
function bubbleSort(arr) {
  // Your code here
}

// Test:
console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90]));
// Expected: [11, 12, 22, 25, 34, 64, 90]
```

---

### Problem 50 — Selection Sort
> 📌 Asked at: TCS, Cognizant, HCL

Implement selection sort that sorts an array in ascending order.
```javascript
function selectionSort(arr) {
  // Your code here
}

// Test:
console.log(selectionSort([29, 10, 14, 37, 13]));
// Expected: [10, 13, 14, 29, 37]
```

---

### Problem 51 — Merge Sort (Divide & Conquer)
> 📌 Asked at: Google, Amazon, Microsoft, Flipkart, Uber

Implement merge sort using divide and conquer.
```javascript
function mergeSort(arr) {
  // Your code here
}

function merge(left, right) {
  // Your code here
}

// Test:
console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));
// Expected: [3, 9, 10, 27, 38, 43, 82]
```

---

### Problem 52 — Quick Sort
> 📌 Asked at: Google, Amazon, Atlassian, Razorpay

Implement quick sort. Pick a pivot, partition, and recursively sort.
```javascript
function quickSort(arr) {
  // Your code here
}

// Test:
console.log(quickSort([10, 7, 8, 9, 1, 5]));
// Expected: [1, 5, 7, 8, 9, 10]
```

---

### Problem 53 — Sort an array of 0s, 1s, and 2s (Dutch National Flag)
> 📌 Asked at: Amazon, Microsoft, Flipkart, Paytm, PhonePe

Sort in a single pass using O(1) space. (Hint: three pointers)
```javascript
function sortColors(arr) {
  // Your code here
}

// Test:
console.log(sortColors([2, 0, 2, 1, 1, 0]));
// Expected: [0, 0, 1, 1, 2, 2]
```

---

## SECTION 11: HASH MAP / OBJECT PROBLEMS

### Problem 54 — Two Sum (return indices)
> 📌 Asked at: Google, Amazon, Meta, Microsoft, Uber, Flipkart (THE most asked problem)

Given an array and a target, return indices of two numbers that add up to target. Use a hash map for O(n).
```javascript
function twoSum(nums, target) {
  // Your code here
}

// Test:
console.log(twoSum([2, 7, 11, 15], 9));  // [0, 1]
console.log(twoSum([3, 2, 4], 6));       // [1, 2]
```

---

### Problem 55 — Frequency Counter (Count character occurrences)
> 📌 Asked at: Amazon, Flipkart, Swiggy, CRED, Razorpay

Return an object with character frequencies for a given string.
```javascript
function charFrequency(str) {
  // Your code here
}

// Test:
console.log(charFrequency('javascript'));
// Expected: { j: 1, a: 2, v: 1, s: 1, c: 1, r: 1, i: 1, p: 1, t: 1 }
```

---

### Problem 56 — Group Anagrams
> 📌 Asked at: Google, Amazon, Meta, Uber

Group strings that are anagrams of each other.
```javascript
function groupAnagrams(strs) {
  // Your code here
}

// Test:
console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
// Expected: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]
```

---

### Problem 57 — First Non-Repeating Character
> 📌 Asked at: Amazon, Microsoft, Goldman Sachs, Flipkart

Return the first character that appears only once. Return null if none.
```javascript
function firstNonRepeating(str) {
  // Your code here
}

// Test:
console.log(firstNonRepeating('aabbcdd')); // 'c'
console.log(firstNonRepeating('aabb'));     // null
```

---

### Problem 58 — Find Duplicates in Array
> 📌 Asked at: Flipkart, Paytm, Swiggy, Meesho

Return an array of elements that appear more than once.
```javascript
function findDuplicates(arr) {
  // Your code here
}

// Test:
console.log(findDuplicates([1, 2, 3, 2, 4, 5, 5, 6])); // [2, 5]
```

---

### Problem 59 — Most Frequent Element (Majority Element)
> 📌 Asked at: Amazon, Google, Microsoft

Return the element that appears more than n/2 times.
```javascript
function majorityElement(nums) {
  // Your code here
}

// Test:
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // 2
```

---

### Problem 60 — Intersection of Two Arrays
> 📌 Asked at: Meta, Amazon, Flipkart

Return elements common to both arrays (unique).
```javascript
function intersection(arr1, arr2) {
  // Your code here
}

// Test:
console.log(intersection([1, 2, 2, 1], [2, 2]));      // [2]
console.log(intersection([4, 9, 5], [9, 4, 9, 8, 4])); // [9, 4]
```

---

## SECTION 12: STRING MANIPULATION

### Problem 61 — Reverse a String (multiple ways)
> 📌 Asked at: Every company (warm-up)

Implement at least 2 different approaches to reverse a string.
```javascript
// Method 1: Built-in
const reverse1 = str => { /* Your code */ };

// Method 2: Loop
function reverse2(str) { /* Your code */ }

// Method 3: Reduce
const reverse3 = str => { /* Your code */ };

// Test:
console.log(reverse1('hello'));  // 'olleh'
```
> **Follow-up:** Reverse without affecting special characters: `"a,b$c"` → `"c,b$a"`

---

### Problem 62 — Check if String is Palindrome
> 📌 Asked at: Amazon, Infosys, TCS, Goldman Sachs

Handle: uppercase, spaces, special characters. Use two-pointer approach.
```javascript
function isPalindrome(str) {
  // Your code here
}

// Test:
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('race a car'));                      // false
```

---

### Problem 63 — Longest Substring Without Repeating Characters
> 📌 Asked at: Google, Amazon, Meta, Microsoft, Uber (very frequently asked)

Return the length of the longest substring without repeating characters.
```javascript
function lengthOfLongestSubstring(s) {
  // Your code here
}

// Test:
console.log(lengthOfLongestSubstring('abcabcbb')); // 3 ('abc')
console.log(lengthOfLongestSubstring('bbbbb'));     // 1
console.log(lengthOfLongestSubstring('pwwkew'));    // 3 ('wke')
```

---

### Problem 64 — Check if Two Strings are Anagrams
> 📌 Asked at: Amazon, Goldman Sachs, Flipkart, Paytm

Return true if both strings are anagrams of each other.
```javascript
function isAnagram(s, t) {
  // Your code here
}

// Test:
console.log(isAnagram('anagram', 'nagaram')); // true
console.log(isAnagram('rat', 'car'));          // false
```

---

### Problem 65 — String Compression
> 📌 Asked at: Amazon, Microsoft, Bloomberg

`"aabcccccaaa"` → `"a2bc5a3"`. Return original if compressed isn't shorter.
```javascript
function compressString(str) {
  // Your code here
}

// Test:
console.log(compressString('aabcccccaaa')); // 'a2bc5a3'
console.log(compressString('abc'));          // 'abc' (no compression needed)
```

---

### Problem 66 — Title Case a String
> 📌 Asked at: Swiggy, CRED, Meesho

Capitalize the first letter of each word.
```javascript
function titleCase(str) {
  // Your code here
}

// Test:
console.log(titleCase('the quick brown fox')); // 'The Quick Brown Fox'
```

---

## SECTION 13: ARRAY MANIPULATION

### Problem 67 — Flatten a Nested Array (any depth)
> 📌 Asked at: Google, Amazon, Meta, Flipkart, Razorpay

Flatten deeply nested arrays. Implement without using `.flat()`.
```javascript
function flatten(arr) {
  // Your code here
}

// Test:
console.log(flatten([1, [2, [3, [4]], 5]])); // [1, 2, 3, 4, 5]
```

---

### Problem 68 — Remove Duplicates from Sorted Array (in-place)
> 📌 Asked at: Google, Amazon, Meta, Microsoft

Modify the array in-place. Return the count of unique elements.
```javascript
function removeDuplicates(nums) {
  // Your code here
}

// Test:
const arr = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const k = removeDuplicates(arr);
console.log(k, arr.slice(0, k)); // 5, [0, 1, 2, 3, 4]
```

---

### Problem 69 — Move Zeroes to End
> 📌 Asked at: Meta, Amazon, Microsoft, Flipkart

Move all zeroes to end while maintaining order of non-zero elements. In-place.
```javascript
function moveZeroes(nums) {
  // Your code here
}

// Test:
console.log(moveZeroes([0, 1, 0, 3, 12]));   // [1, 3, 12, 0, 0]
console.log(moveZeroes([0, 0, 1]));           // [1, 0, 0]
```

---

### Problem 70 — Maximum Subarray Sum (Kadane's Algorithm)
> 📌 Asked at: Google, Amazon, Microsoft, Goldman Sachs, Uber

Find the contiguous subarray with the maximum sum. (Hint: Kadane's Algorithm)
```javascript
function maxSubArray(nums) {
  // Your code here
}

// Test:
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6 (subarray: [4,-1,2,1])
console.log(maxSubArray([1]));                                // 1
console.log(maxSubArray([-1]));                               // -1
```

---

### Problem 71 — Rotate Array by K positions
> 📌 Asked at: Amazon, Microsoft, Flipkart

Rotate right by k steps. Do it in O(1) space. (Hint: three-reverse trick)
```javascript
function rotateArray(nums, k) {
  // Your code here
}

// Test:
console.log(rotateArray([1, 2, 3, 4, 5, 6, 7], 3)); // [5, 6, 7, 1, 2, 3, 4]
```

---

### Problem 72 — Product of Array Except Self
> 📌 Asked at: Google, Amazon, Meta, Microsoft, Uber

Return an array where each element is the product of all other elements. No division allowed.
```javascript
function productExceptSelf(nums) {
  // Your code here
}

// Test:
console.log(productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]
console.log(productExceptSelf([-1, 1, 0, -3, 3])); // [0, 0, 9, 0, 0]
```

---

### Problem 73 — Find Missing Number (0 to n)
> 📌 Asked at: Amazon, Microsoft, Goldman Sachs

Array contains n distinct numbers from 0 to n. Find the missing one.
```javascript
function missingNumber(nums) {
  // Your code here
}

// Test:
console.log(missingNumber([3, 0, 1]));    // 2
console.log(missingNumber([0, 1]));       // 2
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8
```

---

### Problem 74 — Merge Two Sorted Arrays
> 📌 Asked at: Google, Amazon, Meta

Merge two sorted arrays into one sorted array.
```javascript
function mergeSorted(arr1, arr2) {
  // Your code here
}

// Test:
console.log(mergeSorted([1, 3, 5], [2, 4, 6])); // [1, 2, 3, 4, 5, 6]
```

---

## SECTION 14: TWO POINTERS & SLIDING WINDOW

### Problem 75 — Valid Parentheses
> 📌 Asked at: Google, Amazon, Meta, Microsoft, Goldman Sachs (very frequently asked)

Return true if the string has valid matching brackets. (Hint: stack)
```javascript
function isValid(s) {
  // Your code here
}

// Test:
console.log(isValid('()[]{}')); // true
console.log(isValid('(]'));     // false
console.log(isValid('{[]}'));   // true
```

---

### Problem 76 — Container With Most Water
> 📌 Asked at: Google, Amazon, Meta, Uber

Find two lines that together with the x-axis form a container holding the most water.
```javascript
function maxArea(height) {
  // Your code here
}

// Test:
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
```

---

### Problem 77 — Maximum Sum Subarray of Size K (Sliding Window)
> 📌 Asked at: Amazon, Microsoft, Flipkart

Find the maximum sum of any contiguous subarray of size k.
```javascript
function maxSumSubarray(arr, k) {
  // Your code here
}

// Test:
console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // 9 (subarray: [5, 1, 3])
```

---

### Problem 78 — Three Sum (find triplets that sum to 0)
> 📌 Asked at: Google, Amazon, Meta, Microsoft (VERY frequently asked)

Find all unique triplets that sum to zero. No duplicate triplets.
```javascript
function threeSum(nums) {
  // Your code here
}

// Test:
console.log(threeSum([-1, 0, 1, 2, -1, -4])); // [[-1, -1, 2], [-1, 0, 1]]
```

---

## SECTION 15: POLYFILLS & UTILITY IMPLEMENTATIONS

### Problem 79 — Implement `Array.prototype.map`
> 📌 Asked at: Flipkart, Razorpay, CRED, Swiggy, Meesho, PhonePe

Must handle: `thisArg`, index, original array reference, sparse arrays.
```javascript
Array.prototype.myMap = function(callback, thisArg) {
  // Your code here
};

// Test:
console.log([1, 2, 3].myMap(x => x * 2)); // [2, 4, 6]
console.log([1, 2, 3].myMap((x, i) => x + i)); // [1, 3, 5]
```

---

### Problem 80 — Implement `Array.prototype.filter`
> 📌 Asked at: Flipkart, Razorpay, CRED, Swiggy
```javascript
Array.prototype.myFilter = function(callback, thisArg) {
  // Your code here
};

// Test:
console.log([1, 2, 3, 4, 5].myFilter(x => x > 3)); // [4, 5]
```

---

### Problem 81 — Implement `Array.prototype.reduce`
> 📌 Asked at: Google, Flipkart, Razorpay, CRED

Handle: no initial value (use first element), throw on empty array with no initial value.
```javascript
Array.prototype.myReduce = function(callback, initialValue) {
  // Your code here
};

// Test:
console.log([1, 2, 3, 4].myReduce((acc, curr) => acc + curr, 0)); // 10
console.log([1, 2, 3, 4].myReduce((acc, curr) => acc + curr));    // 10
```

---

### Problem 82 — Implement `debounce`
> 📌 Asked at: Google, Amazon, Flipkart, Razorpay, CRED, Swiggy, Paytm (extremely popular)

Only execute after delay with no new calls. Must preserve `this` context.
```javascript
function debounce(fn, delay) {
  // Your code here
}

// Test:
const search = debounce((query) => console.log('Searching:', query), 300);
search('h');
search('he');
search('hel');
search('hello'); // Only "Searching: hello" fires after 300ms
```

---

### Problem 83 — Implement `throttle`
> 📌 Asked at: Google, Amazon, Flipkart, Razorpay, CRED

Execute immediately, block further calls until time limit passes.
```javascript
function throttle(fn, limit) {
  // Your code here
}

// Test:
const log = throttle(() => console.log('Scrolled!'), 1000);
// Calling log() rapidly will only fire once per second
```

---

### Problem 84 — Implement `Function.prototype.bind`
> 📌 Asked at: Google, Flipkart, Razorpay, CRED, PhonePe

Must support partial application (pre-filled args).
```javascript
Function.prototype.myBind = function(context, ...boundArgs) {
  // Your code here
};

// Test:
const person = { name: 'Alice' };
function greet(greeting, punct) {
  return `${greeting}, ${this.name}${punct}`;
}
const bound = greet.myBind(person, 'Hello');
console.log(bound('!')); // 'Hello, Alice!'
```

---

### Problem 85 — Implement `Function.prototype.call` and `apply`
> 📌 Asked at: Flipkart, Razorpay, CRED
```javascript
Function.prototype.myCall = function(context, ...args) {
  // Your code here
};

Function.prototype.myApply = function(context, args = []) {
  // Your code here
};

// Test:
function greet(greeting) { return `${greeting}, ${this.name}`; }
console.log(greet.myCall({ name: 'Bob' }, 'Hi'));     // 'Hi, Bob'
console.log(greet.myApply({ name: 'Bob' }, ['Hi']));  // 'Hi, Bob'
```

---

### Problem 86 — Deep Clone an Object
> 📌 Asked at: Google, Amazon, Flipkart, Razorpay, CRED

Handle: nested objects, arrays, Date, RegExp. Use recursion.
```javascript
function deepClone(obj) {
  // Your code here
}

// Test:
const original = { a: 1, b: { c: 2, d: [3, 4] }, e: new Date() };
const cloned = deepClone(original);
cloned.b.c = 99;
console.log(original.b.c); // 2 (unchanged)
console.log(cloned.b.c);   // 99
```

---

### Problem 87 — Implement `Promise.all`
> 📌 Asked at: Google, Amazon, Meta, Flipkart, Razorpay

Track results by index, count completions, reject on first failure.
```javascript
function promiseAll(promises) {
  // Your code here
}

// Test:
promiseAll([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]).then(console.log); // [1, 2, 3]

promiseAll([
  Promise.resolve(1),
  Promise.reject('Error!'),
  Promise.resolve(3),
]).catch(console.log); // 'Error!'
```

---

### Problem 88 — Implement `curry`
> 📌 Asked at: Google, Amazon, Flipkart, CRED, Razorpay

Compare collected args with function arity (`fn.length`). Collect until enough.
```javascript
function curry(fn) {
  // Your code here
}

// Test:
function add(a, b, c) { return a + b + c; }
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3));   // 6
console.log(curriedAdd(1, 2)(3));   // 6
console.log(curriedAdd(1)(2, 3));   // 6
console.log(curriedAdd(1, 2, 3));   // 6
```

---

### Problem 89 — Implement `memoize`
> 📌 Asked at: Google, Amazon, Flipkart, Razorpay

Cache results keyed by arguments. Return cached value if available.
```javascript
function memoize(fn) {
  // Your code here
}

// Test:
const factorial = memoize(function f(n) {
  if (n <= 1) return 1;
  return n * f(n - 1);
});

console.log(factorial(5)); // 120 (computed)
console.log(factorial(5)); // 120 (from cache)
```

---

### Problem 90 — Implement `Array.prototype.flat`
> 📌 Asked at: Flipkart, Razorpay, Swiggy

Respect depth parameter. Default depth = 1. `Infinity` flattens completely.
```javascript
Array.prototype.myFlat = function(depth = 1) {
  // Your code here
};

// Test:
console.log([1, [2, [3, [4]]]].myFlat());          // [1, 2, [3, [4]]]
console.log([1, [2, [3, [4]]]].myFlat(2));          // [1, 2, 3, [4]]
console.log([1, [2, [3, [4]]]].myFlat(Infinity));   // [1, 2, 3, 4]
```

---

### Problem 91 — Implement `pipe` and `compose`
> 📌 Asked at: Razorpay, CRED, Flipkart

`pipe`: left-to-right. `compose`: right-to-left.
```javascript
const pipe = /* Your code */;
const compose = /* Your code */;

// Test:
const add1 = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

console.log(pipe(add1, double, square)(2));    // 36 → (2+1)=3, *2=6, ^2=36
console.log(compose(square, double, add1)(2)); // 36 → (2+1)=3, *2=6, ^2=36
```

---

## SECTION 16: RECURSION & DYNAMIC PROGRAMMING

### Problem 92 — Fibonacci (Multiple Approaches)
> 📌 Asked at: Every company

Implement three ways: naive recursive, memoized, iterative.
```javascript
// Recursive (naive)
function fibRecursive(n) { /* Your code */ }

// Memoized
function fibMemo(n, memo = {}) { /* Your code */ }

// Iterative
function fibIterative(n) { /* Your code */ }

// Test:
console.log(fibIterative(10)); // 55
console.log(fibMemo(10));      // 55
```

---

### Problem 93 — Climbing Stairs (DP)
> 📌 Asked at: Google, Amazon, Microsoft, Flipkart

You can climb 1 or 2 steps at a time. How many distinct ways to reach step n?
```javascript
function climbStairs(n) {
  // Your code here
}

// Test:
console.log(climbStairs(5));  // 8
console.log(climbStairs(10)); // 89
```

---

### Problem 94 — Coin Change (Minimum Coins)
> 📌 Asked at: Google, Amazon, Goldman Sachs

Given coin denominations and a target amount, find the fewest coins to make that amount. Return -1 if impossible.
```javascript
function coinChange(coins, amount) {
  // Your code here
}

// Test:
console.log(coinChange([1, 5, 10, 25], 30)); // 2 (25 + 5)
console.log(coinChange([2], 3));              // -1
```

---

## SECTION 17: LINKED LIST (IN JAVASCRIPT)

### Problem 95 — Reverse a Linked List
> 📌 Asked at: Google, Amazon, Meta, Microsoft, Flipkart

Use three pointers: `prev`, `current`, `next`.
```javascript
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  // Your code here
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

// Test:
const list = createList([1, 2, 3, 4, 5]);
console.log(listToArray(reverseList(list))); // [5, 4, 3, 2, 1]
```

---

### Problem 96 — Detect Cycle in Linked List (Floyd's Algorithm)
> 📌 Asked at: Google, Amazon, Microsoft

Tortoise and Hare: slow moves 1, fast moves 2. If they meet, cycle exists.
```javascript
function hasCycle(head) {
  // Your code here
}
```

---

## SECTION 18: MISCELLANEOUS INTERVIEW FAVORITES

### Problem 97 — Event Emitter
> 📌 Asked at: Google, Amazon, Meta, Flipkart, Atlassian

Implement `on`, `off`, `emit`, and `once` methods.
```javascript
class EventEmitter {
  constructor() {
    // Your code here
  }

  on(event, listener) { /* Your code */ }
  off(event, listener) { /* Your code */ }
  emit(event, ...args) { /* Your code */ }
  once(event, listener) { /* Your code */ }
}

// Test:
const emitter = new EventEmitter();
const greet = name => console.log(`Hello, ${name}!`);
emitter.on('greet', greet);
emitter.emit('greet', 'Alice'); // 'Hello, Alice!'
emitter.off('greet', greet);
emitter.emit('greet', 'Bob');   // (nothing)
```

---

### Problem 98 — Implement `get` (safe deep property access)
> 📌 Asked at: Flipkart, Razorpay, CRED, Atlassian

Handle dot notation and bracket notation: `'a.b[0].c'`
```javascript
function get(obj, path, defaultValue) {
  // Your code here
}

// Test:
const data = { a: { b: [{ c: 42 }] } };
console.log(get(data, 'a.b[0].c'));          // 42
console.log(get(data, 'a.b[1].c', 'N/A'));  // 'N/A'
console.log(get(data, 'x.y.z', 'default')); // 'default'
```

---

### Problem 99 — Implement `setInterval` using `setTimeout`
> 📌 Asked at: Flipkart, Razorpay
```javascript
function mySetInterval(callback, delay) {
  // Your code here
  // Return an object with a clear() method
}
```

---

### Problem 100 — LRU Cache
> 📌 Asked at: Google, Amazon, Meta, Microsoft (very popular)

Implement `get(key)` and `put(key, value)` in O(1). (Hint: JS Map preserves insertion order)
```javascript
class LRUCache {
  constructor(capacity) {
    // Your code here
  }

  get(key) { /* Your code */ }
  put(key, value) { /* Your code */ }
}

// Test:
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1
cache.put(3, 3);           // evicts key 2
console.log(cache.get(2)); // -1
```

---

### Problem 101 — Implement `Promise.allSettled`
> 📌 Asked at: Flipkart, Razorpay, CRED

Unlike `Promise.all`, this waits for ALL promises (fulfilled OR rejected).
```javascript
function promiseAllSettled(promises) {
  // Your code here
}

// Test:
promiseAllSettled([
  Promise.resolve(1),
  Promise.reject('Error'),
  Promise.resolve(3),
]).then(console.log);
// [{status:'fulfilled', value:1}, {status:'rejected', reason:'Error'}, {status:'fulfilled', value:3}]
```

---

### Problem 102 — Flatten an Object (nested to dot notation)
> 📌 Asked at: Flipkart, Razorpay, CRED, Atlassian

`{ a: { b: 1, c: { d: 2 } } }` → `{ 'a.b': 1, 'a.c.d': 2 }`
```javascript
function flattenObject(obj, prefix = '', result = {}) {
  // Your code here
}

// Test:
console.log(flattenObject({ a: { b: 1, c: { d: 2 } }, e: 3 }));
// { 'a.b': 1, 'a.c.d': 2, e: 3 }
```

---

## QUICK REFERENCE: ALL PROBLEMS

| # | Problem | Category |
|---|---------|----------|
| 49-53 | Bubble, Selection, Merge, Quick, Dutch Flag | Sorting |
| 54-60 | Two Sum, Frequency, Anagrams, Non-Repeat, Dups, Majority, Intersection | Hash Map |
| 61-66 | Reverse, Palindrome, Longest Substr, Anagram Check, Compress, Title | Strings |
| 67-74 | Flatten, Remove Dups, Move Zeroes, Kadane, Rotate, Product, Missing, Merge | Arrays |
| 75-78 | Valid Parens, Container Water, Max Sum K, Three Sum | Two Ptr / Window |
| 79-91 | map, filter, reduce, debounce, throttle, bind, call/apply, clone, Promise.all, curry, memo, flat, pipe | Polyfills |
| 92-94 | Fibonacci, Climbing Stairs, Coin Change | Recursion / DP |
| 95-96 | Reverse List, Cycle Detection | Linked List |
| 97-102 | Event Emitter, _.get, setInterval, LRU Cache, allSettled, Flatten Obj | Misc |

---

> **Study Strategy:**
> 1. Attempt EVERY problem in your editor before checking `06-answers.md`
> 2. Time yourself — aim for 15-20 min per problem
> 3. If stuck after 20 min, check the hint in the problem description, then try again
> 4. Only check the full answer after a genuine attempt
> 5. Revisit problems you couldn't solve after 2-3 days (spaced repetition)
> 6. For polyfills: write them from memory at least 3 times
