---
title: 'OOP in JS: Series Introduction'
date: '2020-09-15'
slug: oop-in-js-series-intro
excerpt: "This series of articles are my notes on Object-Oriented Programming, as it is in JavaScript..."
tags: ['javascript', 'oop']
---

import TOC from '../../../../src/components/toc';

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

But before we get to that, let's take a look at objects themselves and how we can go about using them, at a basic level.

## Creating Objects

Objects can be created in three different ways:

- The [Object() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/Object) (`new Object()`).
- The [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) method.
- The [Object Literal / Object Initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer) notation.

