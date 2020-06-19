---
title: 'JavaScript: Template Literals'
date: '2020-06-18'
slug: javascript-template-literals
excerpt: 'Up until now, we only had two ways to write a string in JavaScript - single and double quotes. If we wanted to interpolate a variable with one of these string options, we'd need to break out of the string and concatenate the variable.'
tag: ['javascript', 'esnext']
---

Up until now, we only had two ways to write a string in JavaScript - single and double quotes. If we wanted to interpolate a variable with one of these string options, we'd need to break out of the string and concatenate the variable.

As of ES2015, we are able to use Template Literals. These are string literals that allow embedded expressions.

Instead of single or double-quoted strings, we can enclose our strings with back-ticks, which allows for variable interpolation without breaking out of the string.

For example:

```js
const petName = 'Tucker';
const petAge = 9;
const petType = 'dog';
const petAbout = `My ${petType} ${ petName } is ${ petAge * 7 } years old, in dog years.`;
```

## Multi-line strings

In addition to interpolation, another feature of Template Literals, that wasn't available before, is that you can now easily create multi-line strings without having to escape them.

Prior to this feature, you needed to escape each return, as follows:

```js
const markup = "This is \
    a multi-line string. The \
    returns need to be escaped with \
    slashes and you can not interpolate \
    variables.";
```

## HTML fragments

This is handy when creating HTML markup to output as a string. Note that the whitespace will be output as well, but this isn't really problematic since the whitespace is ignored as soon as it hits the HTML.

```js
const pet = {
    name: 'Tucker',
    type: 'Dog',
    breed: 'Shih Tzu',
    bio: 'Tucker is a sweet and snuggly little pup ... and also very needy.',
};

const markup = `
    <div class="pet">
      <h2>
        ${pet.name}
      </h2>
      <p class="type">Type: ${pet.type}</p>
      <p class="breed">Breed: ${pet.breed}</p>
      <p class="bio">About ${pet.name}: ${person.bio}</p>
    </div>
  `;
```

## Nested template literals

The last thing to note here is that you can nest template literals within each other by wrapping the nested templates in the same `${}` placeholder that we use to interpolate variables.

```js
const pets = [
    { name: 'Tucker', type: 'dog', age: 9, }
    { name: 'Remy', type: 'dog', age: 11, }
    { name: 'Frank', type: 'dog', age: 4, }
    { name: 'Garfield', type: 'cat', age: 41, }
    { name: 'Rudolph', type: 'reindeer', age: 81, }
];

const markup = `
    <ul class="pet">
      ${ pets.map( pet => `<li>${ pet.name } is a ${ pet.age } year old ${ pet.type }</li>` ).join( '' ) }
    </ul>
  `;
```

In the example above we have a template string that is nested inside a template string. With this, we can easily loop over and render the list items without breaking out of the containing string.

 _Side note: since `map()` returns an array, we pass it to `join()` and join it on an empty string to get rig of the commas in the output._

### References & Resources

- [ES6 For Everyone](https://es6.io/) – course by Wes Bos
- [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
