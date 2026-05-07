---
title: 'Working With JavaScript Arrays: Destructive Methods'
date: '2023-06-19'
slug: working-with-javascript-arrays-destructive-methods
excerpt: "JavaScript offers a variety of array methods to manipulate and transform data. This post covers destructive methods — those that modify the original array..."
category: 'JavaScript'
tags: ['core-js', 'javascript-arrays']
---

In JavaScript, arrays are one of the most commonly used data structures. They are a collection of elements, each with a unique index or key. JavaScript offers a variety of methods to work with arrays that make it easy to manipulate and transform your data.

This short series will list out some of the most commonly used array methods, grouped into three classifications (destructive, non-destructive, and static). We will also see a short example for each method to illustrate how it works.

## Article Series

- Part 1: Destructive Methods (this post)

- Part 2: [Non-Destructive Methods](https://dwr.io/working-with-javascript-arrays-non-destructive-methods/)

- Part 3: Static Methods (_coming soon_)

## Destructive Methods

Let's jump right in! In this first part of the series, we will cover some of the destructive Array methods in JavaScript. These methods, also known as mutative methods, modify the original array they are called on, thus making them destructive. They are useful when you specifically want to update or alter the existing data within an array.

### 1\. push()

The `push()` method is used to add elements to the end of an array. It takes one or more arguments, which represent the elements to be added.

```javascript
const myArray = ['apple', 'banana', 'orange'];
myArray.push('grape');
console.log(myArray); // Output: ['apple', 'banana', 'orange', 'grape']
```

### 2\. pop()

The `pop()` method is used to remove the last element from an array. It does not take any arguments.

```javascript
const myArray = ['apple', 'banana', 'orange'];
myArray.pop();
console.log(myArray); // Output: ['apple', 'banana']
```

### 3\. shift()

The `shift()` method is used to remove the first element from an array. It does not take any arguments.

```javascript
const myArray = ['apple', 'banana', 'orange'];
myArray.shift();
console.log(myArray); // Output: ['banana', 'orange']
```

### 4\. unshift()

The `unshift()` method is used to add elements to the beginning of an array. It takes one or more arguments, which represent the elements to be added to the array.

```javascript
const myArray = ['apple', 'banana', 'orange'];
myArray.unshift('grape', 'strawberry');
console.log(myArray); // Output: ['grape', 'strawberry', 'apple', 'banana', 'orange']
```

### 5\. splice()

The `splice()` method modifies an array by removing or replacing existing elements and/or adding new elements in place. It returns an array containing the removed elements, or an empty array if no elements were removed.

```javascript
const myArray = ['apple', 'banana', 'orange', 'grape', 'kiwi'];
myArray.splice(1, 4); // returns ['banana', 'orange', 'grape']
console.log(myArray); // Output: ['apple']

const myArray = ['apple', 'banana', 'orange', 'grape', 'kiwi'];
myArray.splice(3, 1, 'blueberry'); // returns ['grape']
console.log(myArray); // Output: ['apple', 'banana', 'orange', 'blueberry', 'kiwi']
```

It takes two main arguments, which represent the starting and ending positions of the section to be extracted – the first being the zero-based index to be used for the starting point and the second (optional) being the delete count, i.e., the number of elements in the array to remove from the starting point.

If the second parameter is omitted, or if its value is greater than or equal to the number of elements after the position specified by the first parameter, then all the elements from the starting position to the end of the array will be deleted.

Any additional arguments that are optionally passed after the delete count will represent items that will be added to the array, beginning from the argument passed in as the starting point.

### 6\. reverse()

The `reverse()` method is used to reverse the order of the elements in an array. It doesn't take any arguments.

```javascript
let array = [1, 2, 3, 4, 5];
array.reverse();
console.log(array); // [5, 4, 3, 2, 1]
```

### 7\. sort()

The `sort()` method sorts the elements of an array in place (no copy is made) and returns the reference to the original array, in sorted order. It takes one argument, which is a function that represents the order in which the elements should be sorted.

```javascript
const myArray = [3, 1, 4, 2, 5];
myArray.sort((a, b) => a - b);
console.log(myArray); // Output: [1, 2, 3, 4, 5]
```

The function is called two arguments, which represent the first and second elements in position for comparison.

This will return a negative value if `a` should come before `b`, and vise versa. A zero value will return if `a` and `b` are equal.

By default, if no function is passed, the elements in the array will be converted to strings and ordered based on their Unicode code points.

To sort the elements in an array without mutating the original array, use [`toSorted()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted).

### 8\. fill()

The `fill()` method is used to fill all elements in an array with a specified value. It does this by converting all of the elements in the array to a static value, from a start index (default `0`) to an end index (default `array.length`), and returns the modified array.

```javascript
let array = [1, 2, 3, 4, 5];
array.fill(0, 2, 4);
console.log(array); // [1, 2, 0, 0, 5]
```

This method takes three parameters:

1. the value to fill the array with.

3. A zero-based start index (optional).

5. A zero-based end index (optional).

## Wrapping Up

In this part, you’ve learned about some of the destructive methods in JavaScript, along with short examples on how to use them.

Next up in this series, we’re going to cover JavaScript's non-destructive methods.

* * *

## Article Series

- Part 1: Destructive Methods (you are here)

- Part 2: [Non-Destructive Methods](https://dwr.io/working-with-javascript-arrays-non-destructive-methods/)

- Part 3: Static Methods (_coming soon_)
