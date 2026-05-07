---
title: 'Default Function Parameters in JavaScript'
date: '2023-01-03'
slug: default-function-parameters-in-javascript
excerpt: "As of ES6, we are able to set default parameter values when defining a function, allowing named parameters to be initialized when no value is passed..."
category: 'JavaScript'
tags: ['core-js', 'es6']
---

As of ES6, we are able to set default parameter values when defining a function, as shown below:

```javascript
function calculateBill(total, tax = 0.13, tip = 0.15) {...}
```

This allows for named parameters to be initialized with default values if no value is present or it evaluates to `undefined`.

If you want to call a function without passing one of the parameters, allowing it to fall back to the default, you need to explicitly pass `undefined` in it's place, as shown below:

```javascript
const totalBill = calculateBill(100, undefined, 0.25);
```

One caveat to keep in mind is that this is order-dependent (without using destructuring).

At the time of publishing this post, this feature has been around for a while and has [pretty solid browser support](https://caniuse.com/mdn-javascript_functions_default_parameters).

### References & Resources

- [ES6 For Everyone](https://es6.io/) - course by Wes Bos

- [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
