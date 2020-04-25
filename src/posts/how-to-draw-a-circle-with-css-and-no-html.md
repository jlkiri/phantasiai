---
title: How to draw a circle with CSS and no HTML
date: 2020-04-24T08:00:18.495Z
spoiler: A simple but handy approach.
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

This is literally all you need. In this example, a circle will appear right in the center of some existing HTML element that has a class `with-circle`. You do not need to create a new `<div>` with `border-radius: 50%` - which is [how circles are usually created](https://codesandbox.io/s/html-circle-wix0k). If one color stops at 45% and another begins at 45%, then there is no room for what is called interpolation - filling in the missing colors by the browser.

You can play with different values here:

<iframe
     src="https://codesandbox.io/embed/gradient-only-circle-ys3nf?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fstyles.css&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="gradient-only-circle"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

You might wonder why I chose `45.1%` instead of `45%` as the start value of the second color? The reason is that if both are the same, some browsers (like Chrome) do not make a smooth transition between colors and you can see the pixelated border, which is not nice. Here are two zoomed-in versions of the same circle:

### 45%

![pixelated](/assets/roughedge.png)

### 45.1%

![smooth](/assets/smoothedge.png)

## Comparison to other approaches

Why would you choose the `radial-gradient` approach over others? First of all, as you may have noticed you automatically get a centered circle. On the other hand, you have to actually do more work to make it not centered with something like `background-position`.

I think this is mostly useful when you need a plain circle and it is not supposed to be interacted with. In other words, its only function is being a background, which is what the CSS property name suggests. This is true especially if you want to stack circles like in the example below:

<iframe
     src="https://codesandbox.io/embed/gradient-only-circles-stacked-5r990?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fstyles.css&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="gradient-only-circles-stacked"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Notice how you don't have to create a single DOM node.

`radial-gradient` can also be very handy if you need to animate circles. Here's how you can just animate `background-position` to get a nice effect of floating circles (hover on circle):

<iframe
     src="https://codesandbox.io/embed/gradient-only-circles-animated-mct5r?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fstyles.css&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="gradient-only-circles-animated"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

That's pretty much it. You should also check out other nice CSS approaches to creating all sorts of shapes, like [clip-path](https://css-tricks.com/clipping-masking-css/).
