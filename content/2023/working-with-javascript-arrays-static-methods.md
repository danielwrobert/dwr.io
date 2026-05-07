---
title: 'Working With JavaScript Arrays: Static Methods'
date: '2023-07-27'
slug: working-with-javascript-arrays-static-methods
excerpt: "JavaScript offers a variety of array methods to manipulate and transform data. This post covers static methods — those called directly on the Array constructor..."
category: 'JavaScript'
tags: ['core-js', 'javascript-arrays']
---

In JavaScript, arrays are one of the most commonly used data structures. They are a collection of elements, each with a unique index or key. JavaScript offers a variety of methods to work with arrays that make it easy to manipulate and transform your data.

This short series will list out some of the most commonly used array methods, grouped into three classifications (destructive, non-destructive, and static). We will also see a short example for each method to illustrate how it works.

## Article Series

- Part 1: [Destructive Methods](https://dwr.io/working-with-javascript-arrays-destructive-methods/)

- Part 2: [Non-Destructive Methods](https://dwr.io/working-with-javascript-arrays-non-destructive-methods/)

- Part 3: Static Methods (_this post_)

## Static Methods

In this final article of the series, we will cover the static JavaScript Array methods. Static methods are _not_ on the Array prototype, rather, they are properties of the Array data type itself. Because of this, they need to be called directly from the Array data type directly and not through an Array instance.

If you create a new Array instance and try to access  one of the static methods from that instance, you will get an `Uncaught TypeError`.

### 1\. Array.from()

The `Array.from()` method is used to create a new shallow-copied `Array` instance from an array-like or iterable object.

```javascript
const str = 'hello';
const newArray = Array.from(str);
console.log(newArray); // Output: ['h', 'e', 'l', 'l', 'o']
```

It can also be used to map the values of an existing array to a new array.

```javascript
const numbers = [1, 2, 3];
const newArray = Array.from(numbers, (x) => x * 2);
console.log(newArray); // Output: [2, 4, 6]
```

Note that `Array.from()` never creates a sparse array. If the iterable object that is being converted is missing any index properties, they will be set as `undefined` in the new array.

### 2\. Array.isArray()

The `Array.isArray()` method is used to check if a given value is an array.

```javascript
const myArray = [1, 2, 3];
const isArr = Array.isArray(myArray);
console.log(isArr); // Output: true
```

### 3\. Array.of()

The `Array.of()` method is used to create a new `Array` instance from a variable number of arguments.

```javascript
const newArray = Array.of(1, 2, 3, 4, 5);
console.log(newArray); // Output: [1, 2, 3, 4, 5]
```

The key difference between using the `Array.of()` and the `Array()` constructor is how they each handle when a single argument is passed.

For example, calling `Array.of(3)` will create an array with a single element, `3`. Calling `Array(3)`, however, will create an empty array with 3 empty slots (not slots with actual `undefined` values).

### 4\. Array.fromAsync()

Much like `Array.from()`, the `Array.fromAsync()` method is used to create a new shallow-copied `Array` instance from an array-like or iterable object.

```javascript
const generator = async function* () {
  yield 1;
  yield 2;
  yield 3;
}
const array = await Array.fromAsync(generator());
```

The difference between the two methods is that `Array.from()` only works for synchronous iterables. `Array.fromAsync()`, on the other hand, fills the gap when working with asynchronous iterables (as demonstrated in the example above).

Note that `Array.fromAsync()` is a fairly new method and [it does not have very good browser support](https://caniuse.com/mdn-javascript_builtins_array_fromasync). At the time of writing, it is only available in Firefox 115 and Safari 16.4.

## Wrapping Up

In this part, you’ve learned about some of the static methods in JavaScript, along with short examples on how to use them.

This concludes the series on JavaScript array methods. I hope it was helpful – thanks for following along!

* * *

## Article Series

- Part 1: [Destructive Methods](https://dwr.io/working-with-javascript-arrays-destructive-methods/)

- Part 2: [Non-Destructive Methods](https://dwr.io/working-with-javascript-arrays-non-destructive-methods/)

- Part 3: Static Methods (_this post_)
