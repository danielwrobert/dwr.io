---
title: 'Using CSS Custom Properties'
date: '2018-01-06'
slug: using-css-custom-properties
excerpt: 'CSS Custom Properties, also commonly referred to as CSS Variables, is a specification that allows you to declare a property and use it later on in your stylesheet. This works similar to how you would declare a variable with a preprocessor.'
tag: ['css']
---

CSS Custom Properties, also commonly referred to as CSS Variables, is a specification that allows you to declare a property and use it later on in your stylesheet. This works similar to how you would declare a variable with a preprocessor.

The syntax is a little bit funky, but it’s really not too difficult to get used to:

```css
/* Defining a Custom Property */
:root {
  --bg-color: #2d3238;
  --text-color:#f9ffee;
}
/* Using the Custom Property */
.some-element {
  background-color: var(--bg-color);
  color: var(--text-color);
}

```

Additionally, you can provide a fallback value, which will be used if the variable hasn’t been defined:

```css
.some-element {
  background-color: var(--bg-color, #404139);
}

```

While Sass and other preprocessors may have a much more terse syntax, there are a couple of really nice benefits to native variables that you do not get with a preprocessor.

**Scoping**

One way to define your variables are to scope them to the `:root` of your CSS (as shown in the example above). The `:root` is basically the equivalent of the HTML tag, the highest/outermost element in the markup. Doing this sets your variables to be “globally scoped”. You can also scope your variables to any selector. Doing so will override previously defined variables of the same name on any parent elements in the document tree (including the `:root` selector).

Custom Properties are scoped specifically to the element they are declared on. If you put a variable on an element, that element and all of it’s children will have access to it – nothing above/outside of it.

Scoping allows you the flexibility to have global variables for some things and element-specific variables (or overrides) for others. If a variable is something that is used throughout your document, you can set it as a global on `:root`. If you want it to be specific to an element/component, you have that option too.

Defining colors for your application is a great example of when you might use global variables.

**Dynamic Modification**

Another benefit of custom properties is that they stay in your CSS when rendered by the browser, unlike with a preprocessor where those variables are compiled to actual CSS color values and dispersed across the stylesheet. Because the actual variables are rendered by the browser as-is, they are not compiled at any given time and can be dynamically updated directly with JavaScript.

None of my comparisons with preprocessors are to say that this feature actually replaces them or that they should not still be used. There are plenty of great features that preprocessors can do that plain CSS cannot do today. Because Custom Properties are just CSS, they can just as well be used *with* preprocessors! However, this is an exciting feature to have handy in those circumstances where a preprocessor isn’t really needed.