---
title: 'Modern JavaScript: Arrow Functions'
date: '2018-07-30'
slug: modern-javascript-arrow-functions
excerpt: 'New with ES6, we have an additional way to write function expressions in our code – as arrow functions. This new syntax offers 3 main benefits...'
tag: ['javascript', 'esnext']
---

New with ES6, we have an additional way to write function expressions in our code – as arrow functions. This new syntax offers 3 main benefits:

- They are much more concise than regular function expressions/definitions
- They have implicit returns, which allow us to write single-line expressions (much like we can do with conditionals and the [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator))
- The value of `this` is lexically bound, meaning that it is not re-bound when you use an arrow function inside of another function – which is very helpful for asynchronous callbacks

Let’s take a look at a basic example to get familiar with the new syntax. Here we’ll take an array of pet names and map over them, using the different function syntax options:

```javascript
// Function Declaration Syntax
function hello( names ) {
	console.log( `Hello, ${ name }!` );
}

// Function Expression Syntax
const hello = function( name ) {
	console.log( `Hello, ${ name }!` );
};

// Arrow Function Syntax
const hello = ( name ) => {
	console.log( `Hello, ${ name }!` );
};
```

Parentheses around parameters are really only needed when you have more than one parameter. In the above example, parentheses around `name` is not required. You can keep it if you prefer but it is completely optional. If you have multiple arguments or no arguments at all, however, you do need to pass an empty set of parentheses:

```javascript
const hello = name => {
	console.log( `Hello, ${ name }!` );
};
```

### Implicit returns

An *explicit return* is when you explicitly write out the `return` keyword before the statement. With an *implicit return*, you do not need to write out the `return` keyword. You can also remove the curly brackets and pull your statement up to one line. 

```javascript
// Pet names array
const names = [ Tucker, Frank, Remy, Wesley ];

// Arrow Function Syntax lonfhand (explicit return)
const petNames = names.map( name => {
	return `​I have a pet named ${ name }.`
} );

// Arrow Function Syntax shorthand (implicit return)
const petNames = names.map( name => `​I have a pet named ${ name }.` );
```

### Anonymous functions

At the time of writing, arrow functions are always anonymous functions. If you are using an arrow function, you cannot name it. You can, however, assign it to a variable just like you would do with the function expression expression syntax.

One downside to an anonymous function (as opposed to a named function) is that you won’t get as good of an error message, should an error occur in your code. It is often more helpful to know the name of the function where the error occurred, as opposed to just a line number in a stack-trace. That said, I certainly wouldn’t let that discourage you from using them, it’s just something to take note of.

### The “this” keyword

As mentioned above, arrow functions do not define their own `this` value, rather the `this` inside of an arrow function refers to the parent’s scope. Therefore, you don’t want to just use arrow functions everywhere because it’s less to type. Instead, you need to know what the benefits and downsides are and use them where applicable. Take the following code, for example:

```javascript
const button = document.querySelector('.button');

// Here, `this` refers to the `div.box` element
button.addEventListener('click', function() { console.log( this ); } );

// Here, `this` refers to the global `window` object
button.addEventListener('click', () => { console.log( this ); } );
```

As you can see here, if you want `this` to reference the actual element that was clicked, using an arrow function would not be what you want.

On the other hand, as mentioned previously, arrow functions are great for asynchronous code because they automatically bind the context of the `this` within the callback to the scope in which they’re called. With a traditional function, you would need to explicitly bind `this`, using something like `.bind()`, otherwise the callback function will be bound to the global `window` object when it is returned. This is because the global `window` object is the default context for anything that is not specifically bound to something else.

It’s also worth noting that, like the `this` value, arrow functions also do not have their own `arguments` object. The `arguments` object within an arrow function is a reference to the `arguments` object of the enclosing scope. In many cases, however, using [rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) is a good alternative to working with an `arguments` object.

### When would you *not* want to use an arrow function?

In addition to the above caveats with the binding `this` keyword, arrow functions do not have a `prototype` property and they cannot be used as constructors (they will throw an error when used with `new`). Because of this, these types of function expressions are best suited for non-method functions and are not ideal within an object-oriented programming style.

### References &amp; Resources

- [ES6 For Everyone](https://es6.io/) (Module #2: Function Improvements: Arrows and Default Arguments) – course by Wes Bos
- [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Arrow Functions in JavaScript](https://alligator.io/js/arrow-functions/) – Alligator.io