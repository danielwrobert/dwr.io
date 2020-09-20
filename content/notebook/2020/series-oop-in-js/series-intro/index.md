---
title: 'OOP in JS: Series Introduction'
date: '2020-09-15'
slug: oop-in-js-series-intro
excerpt: "This series of articles are my notes on Object-Oriented Programming, as it is in JavaScript..."
tags: ['javascript', 'oop']
---

import TOC from '../../../../../src/components/toc';

<TOC>

- **Part 1:** Series Introduction __(This Note)__
- **Part 2:** The Prototype Chain __(Coming Soon)__
- **Part 3:** The this Keyword __(Coming Soon)__
- **Part 4:** The new Keyword __(Coming Soon)__
- **Part 5:** Classes __(Coming Soon)__

</TOC>

This series of articles are my notes on Object-Oriented Programming (OOP), as it is in JavaScript. OOP is a popular programming paradigm that allows us a way to structure and maintain complex code.

Unlike other programming languages that use class-based object orientation, JavaScript uses prototype-based object orientation. This difference may be a source of confustion for developers coming from a class-based language, especially when using the "syntactical sugar" of the `class` keyword and the results don't turn out quite as expected.

In this series, we'll aim to cover the following things:

- The Prototype Chain: the "under the hood" feature of JavaScript enables us to emulate OOP.
- The `this`, `new`, and `class` keywords which allow us to automate our object and method creation.

But before we get to that, let's take a look at objects themselves and how we can go about using them, at a very basic level.

## Creating Objects

Objects can be created in a few different ways.

1. The [Object() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/Object) (`new Object()`): `const coffee = new Object();`
2. The [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) method: `const coffee = Object.create();`
3. The [Object Literal / Object Initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer) notation: `const coffee = {}`

## Property Accessors

Creating an empty object isn't always the most useful thing. In most cases, we'll want to add properties and/or methods to that object. To do so, we can use Property Accessors.

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors), "property accessors provide access to an object's properties by using the dot notation or the bracket notation".

If we create an object with the Object Literal approach, we can add properties directly on the object when we define it:

```js
const coffee = {
	type: 'RIstretto',
	ingredients: ['espresso'],
	origin: 'Italy',
	description: 'A short shot of concentrated espresso.'
};
```

We can also add properties to an object that we've created via the dot notation, regardless of which above approach we take to define it:

```js
const coffee = Object.create();

coffee.type = 'Ristretto';
coffee.ingredients = ['espresso'];
coffee.origin = 'Italy';
coffee.description = 'A short shot of concentrated espresso.';
```

We also use the dot notation to access these properties on an existing object:

```js
console.log( coffee.type ) // 'Riesretto
```

In addition to adding properties (i.e., primitive data types) to our objects, we can also add functions. A function that is stored as a property on an object is referred to as a "method".


```js
const coffee = {
	type: 'Ristretto',
	ingredients: ['espresso'],
	origin: 'Italy',
	description: 'A short shot of concentrated espresso.',
	brew: function() {
		console.log( `Your Ristretto will be ready in 5 minutes!` );
	}
};
```

Now that we've gone over the very basics of Objects in JavaScript, let's move on to [the next note](#) (coming soon), where we discuss how we can work with them in an object-oriented paradigm.

<TOC>

- **Part 1:** Series Introduction __(This Note)__
- **Part 2:** The Prototype Chain __(Coming Soon)__
- **Part 3:** The this Keyword __(Coming Soon)__
- **Part 4:** The new Keyword __(Coming Soon)__
- **Part 5:** Classes __(Coming Soon)__

</TOC>