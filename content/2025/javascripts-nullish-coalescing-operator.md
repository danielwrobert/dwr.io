---
title: "JavaScript's Nullish Coalescing Operator"
date: '2025-01-31'
slug: javascripts-nullish-coalescing-operator
excerpt: "The nullish coalescing operator (??) returns the right operand when the left is null or undefined — a more precise alternative to the || operator..."
category: 'JavaScript'
tags: ['core-js', 'modern-js']
---

The nullish coalescing operator (`??`) is a relatively new addition to the JavaScript language (introduced in ES2020). It is a logical operator that returns the right side operand when the left side operand is `null` or `undefined`, and otherwise returns the left side operand. It is similar to the logical OR operator (`||`), however it checks for "nullish" values, as opposed to the broader truthy/falsy values.

There are only two "nullish" valued in Javascript - `null` and `undefined`. So the nullish coalescing operator offers a much cleaner solution for when you need to treat other falsy values as valid.

Here's a quick example:

```javascript
const foo = null ?? 'default value'; // 'default value'
const bar = 0 ?? 42; // 0 (unlike ||, which would return 42)
```

### Further reading

You can read more about this operator [on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing).
