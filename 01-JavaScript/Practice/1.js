// // function increment(){
// //     let initValue = 0;
// //     return () => {
// //         initValue = ++initValue
// //         return initValue
// //     }

// // }

// // const intr = increment(10)
// // console.log(intr());
// // console.log(intr());
// // console.log(intr());
// // console.log(intr());
// // console.log(intr());

// // for (var i = 0; i < 3; i++) {
// //     setTimeout(() => console.log(i), 100);
// // }

// // for (let i = 0; i < 3; i++) {
// //     setTimeout(() => console.log(i), 100);
// // }

// // for (var i = 0; i < 3; i++) {
// //     ((j) => {
// //         setTimeout(() => console.log(j), 100);
// //     })(i);
// // }

// // function sayHi() {
// //   console.log(name);
// //   console.log(age);
// //   var name = 'Lydia';
// //   let age = 21;
// // }
// // sayHi();

// // var a = 1;
// // function foo() {
// //   console.log(a);
// //   var a = 2;
// //   console.log(a);
// // }
// // foo();

// // const randomValue = 21;
// // function getInfo() {
// //   console.log(typeof randomValue);
// //   const randomValue = 'Lydia';
// // }
// // getInfo();

// // console.log(foo());
// // console.log(bar());

// // function foo() { return 'foo'; }
// // var bar = function() { return 'bar'; };

// // for (var i = 0; i < 3; i++) {
// //   setTimeout(() => console.log(i), 1);
// // }
// // for (let j = 0; j < 3; j++) {
// //   setTimeout(() => console.log(j), 1);
// // }

// // (() => {
// //   let x, y;
// //   try {
// //     throw new Error();
// //   } catch (x) {
// //     (x = 1), (y = 2);
// //     console.log(x);
// //   }
// //   console.log(x);
// //   console.log(y);
// // })();

// // (() => {
// //   let x = (y = 10);
// // })();
// // console.log(typeof x);
// // console.log(typeof y);

// // const shape = {
// //   radius: 10,
// //   diameter() {
// //     return this.radius * 2;
// //   },
// //   perimeter: () => 2 * Math.PI * this.radius,
// // };
// // console.log(shape.diameter());
// // console.log(shape.perimeter());

// // function Car() {
// //   this.make = 'Lamborghini';
// //   return { make: 'Maserati' };
// // }
// // const myCar = new Car();
// // console.log(myCar.make);

// // console.log(1 + "2" + "2");
// // console.log(1 + +"2" + "2");
// // console.log("A" - "B" + "2");
// // console.log("A" - "B" + 2);

// // console.log(typeof null);
// // console.log(typeof undefined);
// // console.log(null == undefined);
// // console.log(null === undefined);

// // console.log(!typeof name === 'object');
// // console.log(!typeof name === 'string');

// // console.log(typeof typeof 1);

// // console.log(+true);
// // console.log(!'Lydia');

// // let a = 3;
// // let b = new Number(3);
// // let c = 3;

// // console.log(a == b);
// // console.log(a === b);
// // console.log(b === c);

// // console.log(!!0);
// // console.log(!!new Number(0));
// // console.log(!!'');
// // console.log(!!new Boolean(false));
// // console.log(!!undefined);

// // const a = {};
// // const b = { key: 'b' };
// // const c = { key: 'c' };

// // a[b] = 123;
// // a[c] = 456;

// // console.log(a[b]);

// // let person = { name: 'Lydia' };
// // const members = [person];
// // person = null;

// // console.log(members);

// // const obj = { a: 'one', b: 'two', a: 'three' };
// // console.log(obj);

// // function getInfo(member, year) {
// //   member.name = 'Lydia';
// //   year = '1998';
// // }

// // const person = { name: 'Sarah' };
// // const birthYear = '1997';

// // getInfo(person, birthYear);
// // console.log(person, birthYear);

// // const promise1 = Promise.resolve('First');
// // const promise2 = Promise.resolve('Second');
// // const promise3 = Promise.reject('Third');
// // const promise4 = Promise.resolve('Fourth');

// // const runPromises = async () => {
// //   const res1 = await Promise.all([promise1, promise2]);
// //   const res2 = await Promise.all([promise3, promise4]);
// //   return [res1, res2];
// // };

// // runPromises()
// //   .then(res => console.log(res))
// //   .catch(err => console.log(err));

// // const myPromise = Promise.resolve(Promise.resolve('Promise'));

// // function funcOne() {
// //   setTimeout(() => console.log('Timeout 1!'), 0);
// //   myPromise.then(res => res).then(res => console.log(`${res} 1!`));
// //   console.log('Last line 1!');
// // }

// // async function funcTwo() {
// //   const res = await myPromise;
// //   console.log(`${res} 2!`);
// //   setTimeout(() => console.log('Timeout 2!'), 0);
// //   console.log('Last line 2!');
// // }

// // funcOne();
// // funcTwo();

// // let newList = [1, 2, 3].push(4);
// // console.log(newList.push(5));

// // [1, 2, 3, 4].reduce((x, y) => console.log(x, y));

// // const groceries = ['banana', 'apple', 'peanuts'];

// // if (groceries.indexOf('banana')) {
// //   console.log('We have to buy bananas!');
// // } else {
// //   console.log("We don't have to buy bananas!");
// // }

// // let fruit = ['🍌', '🍊', '🍎'];
// // fruit = fruit.slice(0, 1);
// // fruit.splice(0, 1);
// // // fruit.unshift('🍇');
// // console.log(fruit);

// // function bubbleSort(arr) {
// //     let sortedArr = []
// //     for (let i = 0; i < arr.length; i++) {
// //     for (let j = i+1; j < arr.length-1; j++) {
// //         const element1 = arr[i];
// //         const element2 = arr[j];
// //             console.log(element1, element2, i , j)
// //         if(element1 < element2){
// //             arr[i] = element1;
// //             arr[j] = element2;
// //         }else {
// //             arr[i] = element2;
// //             arr[j] = element1;
// //         }
// //     }
// //     }
// //     return arr;
// // }

// // // Test:
// // console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90]));
// // Expected: [11, 12, 22, 25, 34, 64, 90]

// // function bubbleSort(arr) {
// //     for (let i = 0; i < arr.length; i++) {
// //         for (let j = 0; j < arr.length - i - 1; j++) {

// //             console.log(j, j + 1 )
// //             if (arr[j] > arr[j + 1]) {
// //                 // swap
// //                 let temp = arr[j];
// //                 arr[j] = arr[j + 1];
// //                 arr[j + 1] = temp;
// //             }
// //         }
// //     }
// //     return arr;
// // }

// // console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90]));

// // function twoSum(nums, target) {
// //     const arr = []
// //     for (let i = 0; i < nums.length-1; i++) {
// //     for (let j = 0; j < nums.length-1-1; j++) {
// //         const element1 = nums[i];
// //         const element2 = nums[j];
// //         if(element1 + element2 === target){
// //             arr.push([i ,j])
// //         }
// //         }
// //     }
// //     return arr
// // }

// // // Test:
// console.log(twoSum([2,3,6, 7, 11, 15], 9));  // [0, 1]
// console.log(twoSum([3, 2, 4], 6));

// // function twoSum(nums, target) {
// //   let map = {}; // value → index

// //   for (let i = 0; i < nums.length; i++) {
// //     let needed = target - nums[i];

// //     if (map[needed] !== undefined) {
// //       return [map[needed], i];
// //     }

// //     map[nums[i]] = i;
// //   }
// // }

// // Iterative O(n)
// function fibonacci(n) {
//   if (n <= 1) return n;
//   let a = 0, b = 1;
//   for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
//   return b;
// }

// console.log(fibonacci(1))
// console.log(fibonacci(2))
// console.log(fibonacci(3))
// console.log(fibonacci(4))
// console.log(fibonacci(5))
// console.log(fibonacci(6))
// console.log(fibonacci(7))
// console.log(fibonacci(8))
// console.log(fibonacci(9))
// console.log(fibonacci(10))
// console.log(fibonacci(11))
// console.log(fibonacci(12))
// console.log(fibonacci(13))
// console.log(fibonacci(14))
// console.log(fibonacci(15))

// find duplicate from array

// const arr = [1,2,3,4,5,6,7,8,2,3,6,4,2,6];

// const findDuplicate = (Array) => {

//     let map = {};

//     for (let i = 0; i < Array.length; i++) {
//         const element = Array[i];

//         if(!map[element]){
//             map[element] = 1;
//         }else{
//             map[element] = map[element] + 1
//         }
//     }

//     for(const a in map) {
//         if(map[a]>1)
//             console.log(a)
//     }
// }

// findDuplicate(arr)

// let arr = [1,2,[3,4,[5]]];

// const flatArray = (rajiv) => {
//     let newArr = [];

//     for(let i=0;i<rajiv.length;i++){
//         if(Array.isArray(rajiv[i])){
//             let value = flatArray(rajiv[i]);
//             newArr.push(...value);
//         }else{
//             newArr.push(rajiv[i]);
//         }
//     }
//     return newArr;

// }
// console.log(flatArray(arr));

// deepcopy

// const original = { name: "Alice", details: { age: 30, hobbies: ["chess"] } };

// Create an exact independent duplicate
// const deepCopy = structuredClone(original);

// deepCopy.details.hobbies.push("coding");
// console.log(original.details.hobbies, deepCopy); // ["chess"] (Original remains untouched!)

// function getUser(id) {
//     try {
//         console.log("try");
//         throw new Error("throw Error");
//     } catch (e) {
//         console.log("Error", e);
//     } finally {
//         console.log("Finally");
//     }
// }
// getUser();

// function sayName() {
//     console.log("My Name is " + this.name + " " + this.numbers);
// }

// const tyson = {
//     name: "tyson",
//     sayName,
// };

// tyson.sayName();

// sayName.call(tyson, 1);

// sayName.apply(tyson, [1, 2, 3, 4, 5]);

// const bindName = sayName.bind(tyson);

// bindName();

// // other bind

// function multiply(a, b) {
//     console.log(a * b);
// }

// const double = multiply.bind(null, 2);

// double(10);

// const votes = ["node", "react", "node", "mongo", "node"];

// const mappedValues = votes.reduce((acc, curr) => {
//     acc[curr] = (acc[curr] || 0) + 1;
//     return acc;
// }, {});

// console.log(mappedValues);

// const people = [
//     { name: "Tyson", city: "Pune" },
//     { name: "Rutuja", city: "Mumbai" },
//     { name: "Akba", city: "Pune" },
// ];

// const counted = people.reduce((acc, p) => {
//     (acc[p.city] ||= []).push(p.name);
//     return acc;
// }, {});

// console.log(counted);

// const newArray = [
//     [1, 2],
//     [3, [2, 3, 4]],
//     [4, 5],
// ].reduce((acc, curr) => {
//     return acc.concat(curr);
// }, []);

// console.log(newArray);
