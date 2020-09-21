---
title: 'OOP in JS: Series Introduction'
date: '2020-09-21'
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

But before we get to that, let's take a look at objects themselves and how we can go about creating and using them, at a very basic level.

## Creating Objects

Objects can be created in a few different ways.

1. The [Object() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/Object) (`new Object()`): `const coffee = new Object();`
2. The [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) method: `const coffee = Object.create();`
3. The [Object Literal / Object Initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer) notation: `const coffee = {}`

## Properties & Methods

Creating an empty object isn't always the most useful thing. In most cases, we'll want to add properties and/or methods to that object. To do so, we can use Property Accessors.

If we create an object with the Object Literal approach, we can add properties directly on the object when we define it:

```js
const coffee = {
	type: 'Ristretto',
	ingredients: ['espresso'],
	origin: 'Italy',
	description: 'A short shot of concentrated espresso.'
};
```

We can also add properties to an object that we've created via the dot notation:

```js
const coffee = Object.create();

coffee.type = 'Ristretto';
coffee.ingredients = ['espresso'];
coffee.origin = 'Italy';
coffee.description = 'A short shot of concentrated espresso.';
```

This works regardless of which above approach we take to initially define the object. 

We can store any type of data as properties on our object - even other objects. When a function is stored as a property on an object it is referred to as a "method".

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

## Property Accessors

Once we have an object with all of the data that we want stored in it, we'll need a way to access (and/or add to) that data.

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors), "property accessors provide access to an object's properties by using the dot notation or the bracket notation".

### Dot Notation

In addition to defining properties via the dot notation, as we saw above, we can also use it to access existing properties on an object:

```js
coffee.type; // 'Riesretto
```

When working with dot notation, property [identifiers](https://developer.mozilla.org/en-US/docs/Glossary/identifier) can only be alphanumeric, with the exception of `_` and `$`. Also properties can not start with a number.

### Bracket Notation

The bracket notation is similar to accessing an index on an array - or an element in an associative array, if you're familiar with that concept from another language:

```js
coffee['description']; // 'A short shot of concentrated espresso.'
```

When working with bracket notation, property identifiers have to be a string. Unlike with dot notation, variables may also be used as long as the variable resolves to a string. This also means that they can include any characters - including spaces. 

Overall, dot notation is much eaiser to read than bracket notation and will probably be what you see most often used. However, bracket notation is still very useful in scenarios where you need to work around those naming limitations in dot notation. For example:

```js
const eleven = {
	'11' = 'eleven',
}

eleven.11; // this will result in a SyntaxError.
eleven['11']; // this will output 'eleven', as expected.
```

## Up Next

Now that we've gone over the very basics of objects in JavaScript, in [the next note](#) (coming soon), we'll discuss the Prototype Chain and how we can use it to work with objects in an object-oriented paradigm.

<TOC>

- **Part 1:** Series Introduction __(This Note)__
- **Part 2:** The Prototype Chain __(Coming Soon)__
- **Part 3:** The this Keyword __(Coming Soon)__
- **Part 4:** The new Keyword __(Coming Soon)__
- **Part 5:** Classes __(Coming Soon)__

</TOC>