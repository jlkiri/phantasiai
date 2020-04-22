---
title: How to implement Dark theme with CSS and Javascript
date: "2019-09-23"
spoiler: The simplest way to implement Dark theme on your website
language: en
tags:
  - programming
  - css
---

Good user experience often implies being able to customize the way users interact with your website and adjusting your website to their preferences.

In this post I will explain how to implement Dark/Light theme switching. Browsers already automatically adjust to preferences that users set in their OS. So it is best if you website can do the same.

### Add CSS variables

To avoid writing a lot of conditional checks triggered by the theme change, we can define CSS variables that correspond to either dark or light theme. You [may](https://dev.to/ananyaneogi/create-a-dark-light-mode-switch-with-css-variables-34l8) define them on the `:root` element, but the simplest way is to define them on the `body` element this way:

```css
body.dark {
  --bg: white;
  --text: black;
  --link: rgb(15, 93, 189);
}

body.light {
  --bg: black;
  --text: white;
  --link: rgb(128, 154, 186);
}
```

Ideally, all of your colors would be defined here. Next, we need to add a default class to the `body` element. If you want your default theme to be light, your HTML would look like this:

```html
<body class="light">
  <!--your markup-->
</body>
```

Now, we can add styles to our `body` which use the variables we defined. Note that anything which is contained inside `body` has access to these variables. For example, a link can be styled used the `--link` variable.

```css
body {
  background-color: var(--bg);
  color: var(--text);
}

a {
  color: var(--link);
}
```

### Add a script that detects preferences

[`prefers color scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) is a media feature that lets us detect user preferences. The simplest way to check whether your users prefer a dark color scheme is with the following Javascript:

```javascript
let darkQuery = window.matchMedia("(prefers-color-scheme: dark)")
```

`matches` returns a media query object with a boolean property `matches` which tells us whether our users prefers dark colors. But it also has an `addEventListener` method, which we can use to monitor preference changes and adjust our design accordingly!

Let us a define a minimal script that sets our theme on page load. The easiest way is to just drop it as a `<script>` inside the `body`.

```html
<body>
  <script>
    ;(function() {
      window.__setPreferredTheme = function(newTheme) {
        window.__theme = newTheme
        document.body.className = newTheme
      }

      let darkQuery = window.matchMedia("(prefers-color-scheme: dark)")

      darkQuery.addListener(function(e) {
        window.__setPreferredTheme(e.matches ? "dark" : "light")
      })

      window.__setPreferredTheme(darkQuery.matches ? "dark" : "light")
    })()
  </script>
  <!-- your markup -->
</body>
```

Now your page automatically adjusts to user preferences!

### Add a dark/light theme toggle

Ideally, we also need to give our users a way to change the color theme while browsing. This is achievable with a simple toggle somewhere on your page. There is a [very good guide on how to style your toggle](https://www.w3schools.com/howto/howto_css_switch.asp) but for the sake of simplicity I will use a button here. You can see an example of a custom toggle switch [on my blog](https://phantasiai.dev/).

First we need to add a button.

```html
<button id="toggle">Toggle theme</button>
```

Now we can add a click event listener that will toggle the theme.

```javascript
document.querySelector("#toggle").addEventListener("click", () => {
  window.__setPreferredTheme(
    document.body.className === "light" ? "dark" : "light"
  )
})
```

There is a problem, however. If your website consists of several pages, the next page your users go to will not remember the theme that they chose with a toggle on the previous page. To fix that, we need to leverage local storage. Fortunately, this is a matter of adding few lines to the script above!

```javascript
let preferredTheme

try {
  preferredTheme = localStorage.getItem("theme")
} catch (err) {}

window.__setPreferredTheme = function(newTheme) {
  window.__theme = newTheme
  document.body.className = newTheme

  try {
    localStorage.setItem("theme", newTheme)
  } catch (err) {}
}

let darkQuery = window.matchMedia("(prefers-color-scheme: dark)")

darkQuery.addListener(function(e) {
  window.__setPreferredTheme(e.matches ? "dark" : "light")
})

window.__setPreferredTheme(
  preferredTheme || (darkQuery.matches ? "dark" : "light")
)
```

And this is it!

### In case you use React

In case you want to somehow synchronize state of a component with the current theme, you may want to add to the script above a global function like `onThemeChange`.

```javascript
window.__onThemeChange = function() {}

window.__setPreferredTheme = function(newTheme) {
  window.__theme = newTheme
  document.body.className = newTheme
  window.__onThemeChange(newTheme)

  try {
    localStorage.setItem("theme", newTheme)
  } catch (err) {}
}
```

Then you can use it in your component like this:

```javascript
  componentDidMount() {
    this.setState({ theme: window.__theme })
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme })
    }
  }
```

There are more things to consider depending on whether your website is an SPA or not, but that is outside of the scope of this post. Enjoy your dark theme!
