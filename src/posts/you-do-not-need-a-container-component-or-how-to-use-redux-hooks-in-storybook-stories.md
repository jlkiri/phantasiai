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

And this is how it works:

![Story GIF](/assets/story.gif)

This way we can keep building more [custom hooks](https://reactjs.org/docs/hooks-custom.html) and utilize their ability to be composed.

Sometimes, some things, like fetching arbitrary data (and/or loading states) cannot be replaced with knobs. In this case it is still enough to provide some constant mock response with a fake hook that can be injected. And that's it!

## Used code

```jsx
// TextButton.stories.js

import React from "react";
import { withKnobs, color } from "@storybook/addon-knobs";

const useColorFromExternalSource = () => {
  /* A hook which uses a real Redux (or whatever) store or fetches something.
  	 Implementation is irrelevant.
  */
};

/* A component you want to preview and which you normally
   import from the story/test file.
*/
const TextButton = ({ useColorHook = useColorFromReduxStore, children }) => {
  const textColor = useColorHook();
  return <button style={{ color: textColor }}>{children}</button>;
};

/* Default addon-knobs values and names. */
const label = "Color";
const defaultValue = "#00000";

/* A hook that only uses a knob and returns its value. */
const useStoryKnobsColor = () => {
  return color(label, defaultValue); // ← knobs
};

/* The story itself。We inject a hook that will provide a knob value
   instead of querying some external source.
*/
export const ColoredButton = () => {
  return (
    <TextButton useColorHook={useStoryKnobsColor}>Hello Button</TextButton>
  );
};

export default {
  title: "Button",
  component: TextButton,
  decorators: [withKnobs],
};

```