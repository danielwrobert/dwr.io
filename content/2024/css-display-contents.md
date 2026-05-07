---
title: 'CSS Display Contents'
date: '2024-12-28'
slug: css-display-contents
excerpt: "The display: contents; rule tells CSS to skip the targeted element in layout calculations, treating its children as direct children of the parent..."
category: 'CSS'
tags: ['css-layout']
---

The `display: contents;` rule in CSS is a unique display value that tells CSS **not** to treat the targeted item as an actual element in the DOM and, instead, treat the children of the target element as direct children of the parent element. It is then essentially treated by CSS as if you set the target element to `display: none;` in a way that does not impact the children. While the target element still exists in the DOM (and therefore is accessible via JavaScript), you cannot apply any other styles to it.

Here is an example of using semantic sections within a Flexbox container:

#### HTML

```xml
<div class="item-grid">
  <section class="featured-items">
    <div class="item-card">Item 1</div>
    <div class="item-card">Item 2</div>
    <div class="item-card">Item 3</div>
  </section>
  <section class="regular-items">
    <div class="item-card">Item 4</div>
    <div class="item-card">Item 5</div>
    <div class="item-card">Item 6</div>
  </section>
</div>
```

#### CSS

```css
.item-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 25px;
}

.featured-items,
.regular-items {
  display: contents;
  background: lavender; // This will not render because of the displey: contents rule above.
}

.item-card {
  flex: 0 0 150px;
  padding: 20px;
  border: 1px solid #bcc2cd;
}
```

#### Output

<iframe id="cp_embed_oNdKZqY" src="//codepen.io/anon/embed/preview/oNdKZqY?height=450&amp;theme-id=light&amp;slug-hash=oNdKZqY&amp;default-tab=result" height="450" scrolling="no" frameborder="0" allowfullscreen allowpaymentrequest name="CodePen Embed oNdKZqY" title="CodePen Embed oNdKZqY" class="cp_embed_iframe" style={{width:'100%',overflow:'hidden'}}>CodePen Embed Fallback</iframe>

Here we are able maintain semantic sections in our HTML while having all of the item cards participate in the same flex layout. Without the `display: contents` rule, the sections would create unwanted grouping in the flex layout.

At the time of writing, [browser support is fairly decent](https://caniuse.com/css-display-contents) with all modern browsers having at least partial support. The main caveat with this partial support is that buttons are not accessible with `display: contents` applied.

Another thing to be aware of is that this rule [doesn't work on replaced elements](https://drafts.csswg.org/css-display/#unbox) (like `<img>`, `<input>`, `<video>`, `<canvas>`, etc. ), as these elements aren’t rendered purely by CSS box concepts.

Overall, the `display: contents;` rule is a useful new tool in maintaining semantic HTML structure while simplifying the rendered layout presentation (as demonstrated above), for responsive design patterns that require adjustments to container display across viewports, or generally in any scenario where you need some form of logical grouping in your HTML but want those groups to be invisible to the layout engine.
