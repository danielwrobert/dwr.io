---
title: 'CSS Feature Queries'
date: '2023-04-03'
slug: css-feature-queries
excerpt: "Feature queries in CSS allow you to test whether a particular feature is supported by the browser before applying styles that use that feature..."
category: 'CSS'
tags: ['progressive-enhancement']
---

Feature queries in CSS allow you to test whether a particular feature is supported by the browser before applying styles that use that feature. This means that you can take advantage of the latest features and functionality, while still ensuring that your site looks good on older browsers and devices.

This is done by testing whether a particular CSS feature is supported by the browser, and then applying your styles based on that test. The syntax is _similar_ to a media query, which allows you to apply styles based on the size of the screen (or other device properties). Instead of testing for device characteristics, however, we test for specific CSS features.

Here's the basic syntax for a feature query:

```css
@supports (property: value) {
  /* Styles that use the property and value */
}
```

The `@supports` rule is what is used to define a block of CSS that should only be applied if the browser supports the specified feature. Inside the block, you can use any properties and values that are supported by the feature you're testing for.

For example, let's say you want to use CSS Grid to create a layout with multiple columns. However, CSS Grid is not supported by all of the browsers in the requirements for your particular project. Using the `@supports` rule, we can take a Progressive Enhancement approach to only apply the grid styles if the browser supports them and provide a sensible fallback for older browsers:

```css
.container {
  display: flex;
  flex-wrap: wrap;
}

@supports (display: grid) {
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
}
```

Here, the `.container` element is first styled with `display: flex` and `flex-wrap: wrap`, which creates a responsive layout that works on all devices. Then, only in cases where supported, the ruleset within our `@supports` block will override the previously defined ruleset that uses`display: flex`, providing a solid user experience for all users, while offering an enhanced experience for those using a more modern browser.

_Note that CSS Grid and Flexbox both have very good browser support - they are just used here for the sake of example._

## The not Operator

`@supports` can be paired with a `not` operator to check for features that are _not_ supported by the browser.

We can rewrite the above CSS Grid example with the `not` operator, as follows:

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}

@supports not (display: grid) {
  .container {
    display: flex;
    flex-wrap: wrap;
  }
}
```

The benefit of this approach is when browsers _do_ support CSS Grid, the ruleset within the `@supports` block is ignored as opposed to overriding the ruleset above via the cascade.

## Multiple Checks Using or & and Operators

You can also check support for multiple properties using the `or` & `and` operators.

```css
/* and */
@supports (aspect-ratio: 16 / 9) and (backdrop-filter: blur(10px)) {
  /* If both conditions are true, use the CSS in this block. */
}

/* or */
@supports (aspect-ratio: 16 / 9) or (backdrop-filter: blur(10px)) {
  /* If either of the conditions are true, use the CSS in this block. */
}
```

Feature Queries are a handy tool that allow you to take advantage of the latest CSS features while still ensuring that your site looks good on all devices and browsers!
