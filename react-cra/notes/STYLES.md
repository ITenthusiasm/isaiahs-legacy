## Styles

Unlike Vue, React does not have a common, clean convention for styling your components. It's typically recommened to use CSS to style your components. You can do that with raw CSS files (I wouldn't necessarily recommend that for React), CSS Modules, Tailwind, Bootstrap, or CSS-in-JS solutions like `emotion` or `react-jss`.

If you're interested, here are some old [benchmarks](https://github.com/A-gambit/CSS-IN-JS-Benchmarks/blob/master/RESULT.md) of different options. Please note the date.

In general, inline styles are discouraged since they are limited and considered "inefficient". Occasionally, they can also be a source of confusion. Since this project is geared towards learning React rather than CSS, I've used inline styles. But note that I've only done so for simplicity.

If the solution you use permits (eg. `react-jss` or inline styles), I'd encourage you to _try out_ putting all of your styles for a given component at the bottom of the file, like in Vue. This helps you keep track of what styles belong to the component, and it can also help you scope your styles better. If you use something like `React Native` or `React PDF` in the future, you'll likely be doing this anyway. Unfortunately, React doesn't have as ornate of a solution as Vue when it comes to this. So if you decide against that, it's understandable.

(Note: If you're only against putting styles at the end of a file because of a vague idea of "Separation of Concerns", I recommend you read my comments on Single File Components in the Vue version of this large project.)
