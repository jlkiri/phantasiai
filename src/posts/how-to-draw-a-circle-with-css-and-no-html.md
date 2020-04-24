---
title: How to draw a circle with CSS and no HTML
date: 2020-04-24T08:00:18.495Z
spoiler: Simple circle with CSS
language: en
tags:
  - css
  - programming
---
If you ever find yourself needing to draw a circle with pure CSS and not a single line of HTML - I've got you covered.

The answer is very simple: [radial-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/radial-gradient).

You may already know how to make [hard color stops](https://css-tricks.com/snippets/css/css-linear-gradient/#article-header-id-4), i.e. a background with no gradation between two or more colors. This can be done with `linear-gradient` but the same logic applies to `radial-gradient` too!

```css
.with-circle {
  width: 100vw;
  height: 100vh;
  background: radial-gradient(
    circle,
    rgba(255, 153, 111, 1) 45%,
    rgba(255, 255, 255, 1) 45.1%
  );
}
```

This is literally all you need. In this example, a circle will appear right in the center of some existing HTML element that has a class `with-circle`. You do not need to create a new `<div>` with `border-radius: 50%` - which is [how circles are usually created](https://codesandbox.io/s/html-circle-wix0k).
If one color stops at 45% and another begins at 45%, then there is no room for what is called interpolation - filling in the missing colors by the browser. 

You can play with different values here:

<iframe
     src="https://codesandbox.io/embed/gradient-only-circle-ys3nf?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fstyles.css&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="gradient-only-circle"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

You might wonder why I wrote `45.1%` instead of `45%` for the start value of the second color? The reason is that 

Why would you choose this approach over others? I find this useful when you 


