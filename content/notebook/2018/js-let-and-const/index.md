---
title: 'Modern JavaScript: Using Var, Let, and Const'
date: '2018-07-12'
slug: modern-javascript-using-var-let-and-const
excerpt: 'As of ES6, we have two new ways to define variables, in addition to the classic var keyword. Each are a little bit different in their own way and I’ll break down those differences in this article.'
tags: ['javascript', 'esnext']
---

As of ES6, we have two new ways to define variables, in addition to the classic `var` keyword. Each are a little bit different in their own way and I’ll break down those differences in this article.

Var
---

The biggest difference between `var` and the aforementioned new keywords is around the concept of “scoping”.

`var` variables are function-scoped – this means that they are only available inside the functions in which they are created. If they’re not created within a function, they will be available on the global scope (aka the `window` object).

This can be unfavorable in a case where you want a temporary variable to just be set within a conditional or loop, for example. Conditional statements and loops are blocks and *not* functions, so anything defined within a conditional will be leaked to the parent scope (parent function or `window`).

In the code below, we are defining a variable inside of the conditional, which is really only needed for an operation inside of that statement.

```javascript
for ( var i = 0; i < 10; i++ ) {
  /* ... do some stuff here ... */
}
```

Because we’ve used `var` here for the iterator variable, and the variable is set within a conditional block and not a function, the variable we’ve set specifically for the conditional operation has leaked out to the global (`window`) scope.

```javascript
console.log( window.i ); // 10

```

This is really unnecessary, as the only reason this iterator variable was created at all was specifically for the use of this loop. Allowing it to leak out to the global scope in this way just pollutes that scope with unneeded data.

Let and Const
-------------

When using `let` and `const`, the issue with the `for` loop is solved because both `let` and `const` are block-scoped. An example of a block statement is anything within open and closing curly brackets `{}` – functions, conditionals, or even just a set of curly brackets themselves. If something is defined using `let` or `const` within a block, it will not be leaked outside of that block to the parent.

```javascript
for ( let i = 0; i < 10; i++ ) {
  /* ... do some stuff here ... */
}
console.log( window.i ); // undefined

{
  let data = "some block-scoped information"
}
console.log( data ); // ReferenceError: data is not defined
```

Because of the way `let` and `const` are scoped, they replace the need for using IIFEs (Immediately Invoked Function Expressions) because nothing will leak into the parent (or global) scope by design – which is what IIFEs are typically used for.

Another main difference between `var` and these new keywords is that, unlike `var`, both `let` and `const` can only be defined once – you can redefine a variable defined with `var` but you will get an error if you try to redefine a variable defined with `let` or `const`.

```javascript
// Var
var pet = "Tucker";
var pet = "Frank";
console.log( pet ); // Frank

// Let
let pet = "Tucker";
let pet = "Frank"; // SyntaxError: redeclaration of let pet
console.log( pet );

// Const
const pet = "Tucker";
const pet = "Frank"; // SyntaxError: redeclaration of const pet
console.log( pet );
```

The difference between `let` and `const`
----------------------------------------

A variable that has been defined with `let` *can* be updated but it can not be redefined. For example:

```javascript
let pet = "Tucker";
console.log(pet); // Tucker

let pet = "Frank"; //SyntaxError: redeclaration of let pet
console.log(pet); // Tucker

pet = "Frank";
console.log(pet); // Frank
```

When using `const`, on the other hand, the data can not be redefined *or* reassigned. This does *not* mean, however, that the data is immutable. When working with an object that has been defined with `const`, for example, you can update the properties on that object – you just can’t wipe out or reassign the entire variable.

```javascript
const pet = {
  name: "Tucker",
  type: "dog",
  age: 8
};
console.log(pet); // Object { name: "Tucker", type: "dog", age: 8 }

pet = "Frank";
console.log(pet); // TypeError: invalid assignment to const `pet'

pet = {
  name: "Frank",
  age: 3
};
console.log(pet); // TypeError: invalid assignment to const `pet'

pet.name = "Frank";
pet.age = 3;
console.log(pet); // Object { name: "Frank", type: "dog", age: 3 }
```

If you do want to totally freeze an object, you can pass it to `Object.freeze()`. This will prevent you from updating any of the properties on that object. See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) for more details.

Should `var` be used at all anymore?
------------------------------------

There are a couple of popular approaches to using `var`, `let`, and `const` in defining your variables. These are just opinions, however, there really isn’t a definitive answer here.

Some prominent members of the JS community say, “`let` is the new `var`.” In [this post](https://mathiasbynens.be/notes/es6-const), for example, Mathias Bynens states the following:

- Use `const` by default
- Use `let` only when rebinding is needed (only if you need to update the value of your variable)
- `var` should not be used in ES6+

This is also the approach used throughout Wes Bos’s [ES6 For Everyone](https://es6.io/) course (which I highly recommend).

Other people, on the other hand, say that `let`, `var`, and `const` all serve different, nuanced purposes and are intended to be used together. [Kyle Simpson](https://me.getify.com/), for example, states:

- Use `var` for top-level variables that are shared across many (especially larger) scopes
- Use `let` for localized variables with smaller scopes
- Refactor `let` to `const` only after some code has been written and you’re reasonable sure that you’ve got a case where there shouldn’t be variable reassignment

This approach also addresses the downside of `const` – if you end up realizing later on that you need to update a value, you’d have to go back and update the `const` to use `let`.

While I *most* often find myself reaching for `let` and `const` over `var`, I do believe that the latter opinion makes the most sense – to use `var` for a variable that is actually *intended* to be used across multiple scopes. Some of the variables in your program may only be needed to be functionally scoped, where others may need to be block scoped. Additionally, in using both `var` and `let` in instances where they are best suited, you are also creating a good stylistic signal to the reader of your code for the intention of that variable – i.e., should a particular variable be used across multiple scopes or is it only intended for that particular block of code?

There really isn’t a definitive answer here. I think the approach you take boils down to what makes the most sense to you and in the code that you’re writing.