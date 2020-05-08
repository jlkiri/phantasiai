---
title: You do not need a Container component or How to use Redux hooks in
  Storybook stories
date: 2020-05-08T07:17:40.687Z
spoiler: It is simpler that it might seem.
language: en
tags:
  - programming
  - react
---
I often hear that you still need [Container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) that fetch data or retrieve something from Redux store and pass it to the state-less component even if retrieval/fetching itself can be done with hooks. The reasoning behind these opinions is that it is difficult to test components with hooks of this kind (or use them in Storybook). Or that it simply takes to much time and energy.

This is not true. I will show you how components like this can be very easily used in Storybook with its new [Component Story Format](https://storybook.js.org/docs/formats/component-story-format/). I won't show any testing examples but believe me that the same solution applies to tests as well.

Here is a very simple way to preview your components in Storybook or test them with your favorite library when you use hooks that fetch or retrieve data:

![How to use Redux hooks in Storybook stories](/assets/carbon-3-.png)

The key here is the dependency injection of a hook which provides values from the [knobs](https://github.com/storybookjs/storybook/tree/master/addons/knobs) instead of using some external source. No magic. It costs almost nothing to design your components around this need: just add a hook prop and a default value for it.

This way we can keep building more \[custom hooks](https://reactjs.org/docs/hooks-custom.html) and utilize their ability to be composed.

Sometimes, some things, like fetching arbitrary data (and/or loading states) cannot be replaced with knobs. In this case it is still enough to provide some constant mock response with a fake hook that can be injected. And that's it!