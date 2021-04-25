## Hooks

React hooks are a new feature that was added to React in v16.8. In short, it allows functional components to manage local state. However, the state management that hooks provide is much more flexible than what you get with regular class components, and it makes your components easier to understand. You can refer to the [documentation](https://reactjs.org/docs/hooks-intro.html) or checkout people like Ben Awad or Kent C. Dodds for help with learning hooks.

As a word of advice, **_always_** check to see if the library you're using has helplful hooks (`react-router-dom` and `react-redux` are some examples). If you're interested, here are some advantages that hooks bring to the table that may not be immediately obvious:

First of all, hooks eliminate the need for Higher Order Components (HOCs). If you're unfamiliar with HOCs, a HOC is a function that takes a component as an argument and returns a component; you've likely used them before. If you've ever used `connect` for Redux, `withRouter` for React Router, or `withStyles` for React JSS, you're indeed familiar with HOCs. The problem with HOCs is that they often require you to export an awkward function call like `connect(mapStateToProps)(Component)`. If for some reason you also need other HOCs, things can get messy really quickly...

```typescript
connect(mapStateToProps)(withStyles(styles)(Component));
```

In addition to requiring you to wrap your components like crazy, HOCs often require you to pollute your props. For instance, redux store variables may be exposed through `props.variable` even though the variable isn't truly a prop that you pass into your component. This adds confusion about what actually belongs to your component locally and what's managed by your store or other tools. (It can potentially make TypeScript more of a hassle too.)

This problem is also nullified with hooks because they will return exactly what you need as variable(s) within your functional component.

It may be hard for you to imagine the benefit this brings from just a few words. You can catch a glimpse of the benefit by observing how this project uses Redux without relying on something like `connect`.
