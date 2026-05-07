---
title: 'Working With JavaScript Arrays: Non-Destructive Methods'
date: '2023-06-29'
slug: working-with-javascript-arrays-non-destructive-methods
excerpt: "JavaScript offers a variety of array methods to manipulate and transform data. This post covers non-destructive methods — those that return a new array without modifying the original..."
category: 'JavaScript'
tags: ['core-js', 'javascript-arrays']
---

In JavaScript, arrays are one of the most commonly used data structures. They are a collection of elements, each with a unique index or key. JavaScript offers a variety of methods to work with arrays that make it easy to manipulate and transform your data.

This short series will list out some of the most commonly used array methods, grouped into three classifications (destructive, non-destructive, and static). We will also see a short example for each method to illustrate how it works.

## Article Series

- Part 1: [Destructive Methods](https://dwr.io/working-with-javascript-arrays-destructive-methods/)

- Part 2: Non-Destructive Methods (this post)

- Part 3: [Static Methods](https://dwr.io/working-with-javascript-arrays-static-methods/)

## Non-Destructive Methods

In this article, we will cover some non-destructive JavaScript Array methods. These methods, also known as immutable methods, do not modify the original array; instead, they return a new array or another value based on the original array’s content. They are preferred when you want to maintain the integrity of the original data and perform operations without altering it.

### 1\. concat()

The `concat()` method is used to merge two or more arrays and returns a new array. It takes one or more arguments, which are the arrays and/or values to be concatenated into a new array.

```javascript
const myArray1 = [1, 2, 3];
const myArray2 = [4, 5, 6];
const newArray = myArray1.concat(myArray2);
console.log(newArray); // Output: [1, 2, 3, 4, 5, 6]
```

If no parameters are passed in, a [shallow copy](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy) of the existing array on which `concat()` is called will be returned.

### 2\. filter()

The `filter()` method is used to create a new array with all elements that pass the test implemented by the provided function.

```javascript
const myArray = [1, 2, 3, 4, 5];
const filteredArray = myArray.filter((element) => {
  return element % 2 === 0;
});
console.log(filteredArray); // Output: [2, 4]
```

This method takes one argument, which is a function that represents the condition to be satisfied.

### 3\. indexOf()

The `indexOf()` method is used to find the index of a specific element in an array.

```javascript
const myArray = ['apple', 'banana', 'orange'];
const index = myArray.indexOf('banana');
console.log(index); // Output: 1
```

It takes one argument, which represents the element to search for in the array, and returns the first index at which the specified element is found. If the specified element is not found, `-1` is returned.

### 4\. lastIndexOf()

Similar to `indexOf()`, the `lastIndexOf()` method is used to find the last index of a specific element in an array.

```javascript
const myArray = ['apple', 'banana', 'orange', 'banana'];
const index = myArray.lastIndexOf('banana');
console.log(index); // Output: 3
```

It also takes one argument, which represents the element to search for in the array, and returns the last index at which the specified element is found. If the specified element is not found, `-1` is returned.

### 5\. forEach()

The `forEach()` method is used to execute a function for each element in an array.

```javascript
const myArray = ['apple', 'banana', 'orange'];
myArray.forEach((element) => {
  console.log(element);
});
// Output:
// 'apple'
// 'banana'
// 'orange'
```

It takes one argument, which is a function that represents the action to be performed on each element.

### 6\. map()

The `map()` method is used to create a new array by applying a callback function to each element in an existing array.

```javascript
let array = [1, 2, 3];
let newArray = array.map(function(element) {
  return element * 2;
});
console.log(newArray); // [2, 4, 6]
```

The callback function takes each element as its parameter and returns a new value, which is added to the new array.

### 7\. reduce()

The `reduce()` method is used to reduce an array to a single value by applying a callback function to each element in the array.

```javascript
let array = [1, 2, 3, 4, 5];
let sum = array.reduce(function(accumulator, current) {
  return accumulator + current;
});
console.log(sum); // 15
```

The callback function takes two parameters: an accumulator value and the current element in the array. The accumulator value is updated with each iteration of the function, and the final value is returned at the end.

### 8\. reduceRight()

The `reduceRight()` method is similar to `reduce()`, but it processes the elements in the array from right to left.

```javascript
let array = ["a", "b", "c", "d"];
let result = array.reduceRight(function(accumulator, element) {
  return accumulator + element;
}, "");
console.log(result); // "dcba"
```

### 9\. slice()

The `slice()` method is used to create a new array from a section of an existing array.

```javascript
const myArray = ['apple', 'banana', 'orange', 'grape', 'kiwi'];
const newArray = myArray.slice(1, 4);
console.log(newArray); // Output: ['banana', 'orange', 'grape']
```

It takes two arguments, which represent the starting and ending indices of the section to be extracted. Note that the ending index will _not_ be included in the copy - it is essentially our starting point and up _until_ (but not including) the ending point.

- If a negative index is passed, it counts back from the end of the array

- If the starting index omitted, `0` is used.

- If the starting index is greater than the length of the array, nothing is extracted.

- If the end index is greater than the length of the array or the end index is omitted, the value of the length of the array is used. This results in all of the elements from the start index to the end of the array to be extracted.

### 10\. every()

The `every()` method is used to check whether all elements in an array pass a certain test. The test is specified by a callback function that takes each element as its parameter and returns true or false.

```javascript
let array1 = [1, 2, 3, 4, 5];
let array2 = [2, 4, 6, 8, 10];
let result1 = array1.every(function(element) {
  return element % 2 === 0;
});
console.log(result1); // false
let result2 = array2.every(function(element) {
  return element % 2 === 0;
});
console.log(result2); // true
```

### 11\. some()

The `some()` method is similar to the `every()` method, but it checks whether _at least one_ element in the array passes the test specified by a function.

```javascript
let array1 = [1, 2, 3, 4, 5];
let array2 = [2, 4, 6, 8, 10];
let result1 = array1.some(function(element) {
  return element % 2 === 0;
});
console.log(result1); // true
let result2 = array2.some(function(element) {
  return element % 2 === 1;
});
console.log(result2); // false
```

### 12\. find()

The `find()` method is used to return the value of the first element in an array that satisfies a provided condition.

```javascript
let array = [1, 2, 3, 4, 5];
let result = array.find(function(element) {
  return element > 3;
});
console.log(result); // 4
```

If no such element is found, `undefined` is returned.

### 13\. findIndex()

The `findIndex()` method is similar to `find()`, but it returns the index of the first element in an array that satisfies a provided condition.

```javascript
let array = [1, 2, 3, 4, 5];
let result = array.findIndex(function(element) {
  return element > 3;
});
console.log(result); // 3
```

If no such element is found, `-1` is returned.

### 14\. includes()

The `includes()` method is used to check whether an array includes a specific element. It returns a boolean value of true or false.

```javascript
let array = [1, 2, 3, 4, 5];
console.log(array.includes(3)); // true
console.log(array.includes(6)); // false
```

### 15\. join()

The `join()` method is used to join all elements in an array into a single string.

```javascript
let array = ["hello", "world", "!"];
let result = array.join(" ");
console.log(result); // "hello world !"
```

The method takes an optional separator parameter, which is used to separate the elements in the string.

### 16\. flat()

The `flat()` method is used to create a new array with all sub-array elements concatenated into it recursively.

```javascript
let array = [1, 2, [3, 4, [5, 6]]];
let newArray = array.flat();
console.log(newArray); // [1, 2, 3, 4, [5, 6]]
let newArray2 = array.flat(2);
console.log(newArray2); // [1, 2, 3, 4, 5, 6]
```

It takes one argument, which is the depth level that specifies how deep a nested array structure should be flattened. The default depth level is `1`.

### 17\. flatMap()

The `flatMap()` method is a combination of the `map()` and `flat()` methods. It is particularly useful for when you want to both transform each element in an array and flatten the resulting array into a single level.

```javascript
let array = [1, 2, 3, 4, 5];

let newArray = array.flatMap(function(element) {
  return [element * 2];
});

console.log(newArray); // [2, 4, 6, 8, 10]
```

`flatMap()` takes a callback function as an argument. This callback function transforms each element in the array and returns an array (or an iterable object) of elements, which are then flattened into a new single-level array (note that both the mapping and flattening operations are performed in one step).

It's important to note that `flatMap()` not only maps and flattens the resulting array but also removes any empty or `undefined` values from the flattened array.

### 18\. toSorted()

The `toSorted()` array method in JavaScript is a non-destructive version of the `sort()` method. It returns a new array with the elements sorted in ascending order.

```javascript
const arr = [3, 4, 2, 5, 1];
const sortedArr = arr.toSorted();

console.log(sortedArr); // [1, 2, 3, 4, 5]
```

### 19\. toSpliced()

Similar the how the `toSorted()` method is the non-destructive version of `sort()`, the `toSpliced()` method is a non-destructive version of `splice()`. It returns a new array with the specified elements removed, leaving the original array unchanged.

```javascript
const arr = [1, 2, 3, 4, 5];
const splicedArr = arr.toSpliced(2, 2, "a", "b");

console.log(splicedArr); // [1, 2, "a", "b", 5]
console.log(arr); // [1, 2, 3, 4, 5]
```

## Wrapping Up

In this part, you’ve learned about some of the non-destructive methods in JavaScript, along with short examples on how to use them.

Next up in this series, we’re going to cover JavaScript's static methods.

* * *

## Article Series

- Part 1: [Destructive Methods](https://dwr.io/working-with-javascript-arrays-destructive-methods/)

- Part 2: Non-Destructive Methods (this post)

- Part 3: [Static Methods](https://dwr.io/working-with-javascript-arrays-static-methods/)
