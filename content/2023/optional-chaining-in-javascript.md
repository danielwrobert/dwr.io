---
title: 'Optional Chaining in JavaScript'
date: '2023-12-27'
slug: optional-chaining-in-javascript
excerpt: "Introduced in ECMAScript 2020, Optional Chaining allows you to read deeply nested object properties without explicitly validating each reference in the chain..."
category: 'JavaScript'
tags: ['core-js']
---

Introduced in ECMAScript 2020, Optional Chaining is a a modern feature in JavaScript that allows you to read the value of a property located deep within a chain of nested object properties, without having to explicitly validate each reference in the chain.

This simplifies the process of handling potential `null` or `undefined` values without the need for cumbersome and error-prone conditional checks.

## Syntax

The syntax of optional chaining is fairly straightforward. Consider the following nested `character` object:

```javascript
const character = {
    name: "Roger Rabbit",
    address: {
        street: "123 Main St",
        city: "Toon Town"
    }
};
```

Traditionally, safely accessing the nested properties would involve more verbose conditional checks:

```javascript
let city;
if ( character && character.address ) {
    city = character.address.city;
}
```

We can shorten this a _little_ bit by chaining AND statements:

```javascript
const city = character && character.address && character.address.city;
```

With optional chaining, however, this simplifies our code even further:

```javascript
const city = character?.address?.city;
```

If either `character` or `address` are `null` or `undefined`, our statement will return `undefined` instead of throwing an error.

With that in mind, you _may_ still need to add a check if you intend to manipulate the returned value in some way or display it to the user on the front-end.

## Practical use cases

A few practical uses for Optional Chaining are as follows:

- **Deep Object Trees:** In applications with complex data structures, optional chaining can greatly simplify access to deeply nested properties.

- **API Responses:** When dealing with uncertain or incomplete data from APIs, you can gracefully handle missing data without verbose checks.

- **UI Development:** It can also be a more concise way to write your code when developing front-end components that might receive objects with optional properties.

Of course, this is not an exhaustive list!

## Browser support

Optional Chaining is [widely supported in modern browsers](https://caniuse.com/mdn-javascript_operators_optional_chaining), including the latest versions of Chrome, Firefox, Safari, and Edge. It is not supported in Internet Explorer.
