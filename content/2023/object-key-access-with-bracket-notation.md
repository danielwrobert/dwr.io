---
title: 'Object Key Access with Bracket Notation'
date: '2023-04-06'
slug: object-key-access-with-bracket-notation
excerpt: "Bracket notation in JavaScript can be used to access object keys in some surprising ways, including chaining directly off an object literal..."
category: 'JavaScript'
tags: ['core-js', 'esnext']
---

Somewhat recently, I was looking through some example code (JavaScript) for a project and I came across the following syntax:

```javascript
function someFunction() {
    return {
        dog: 'woof',
        cat: 'meow',
        bird: 'chirp',
    }['bird'];
}
```

I hadn’t seen this format before so it took me a second to parse through what it was doing.

Essentially, this is just a fancy way of returning a single value from within an unnamed object, all in one `return` statement.

A more clear (but verbose) way of doing the same thing would be as follows:

```javascript
function someFunction() {
    const obj = {
        dog: 'woof',
        cat: 'meow',
        bird: 'chirp',
    };
    return obj.bird;
}
```

In the above example, returning a single value on that object every time probably doesn’t make sense. But suppose that value was dynamic and you wanted to return one of the items based on some specific data:

```javascript
const currentFilter = 'all';
 
function someFunction(items) {
    return {
        all: items,
        completed: items.filter( item => item.completed ),
        incomplete: items.filter( item => item.incomplete ),
    }[currentFilter];
}
```

All-in-all, while this may take a second glance to parse what is happening (_or may not_), this is a nice and concise way to return a single value from an object in one go.
