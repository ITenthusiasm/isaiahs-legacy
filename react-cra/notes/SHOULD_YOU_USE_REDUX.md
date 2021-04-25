## Should You Use Redux?

Redux is a popular tool for complex state management in React. Unfortunately, it's also a complicated tool that requires a noticeable amount of boilerplate. In fact, several people who use it in the professional world don't actually understand how it works or how it _should_ be used. Because of this, many have come to dread redux and tend to ignore it.

Although many despise redux, pretty much everyone agrees that if your state management will get complex, redux can be a good solution. However, other good options exist.

If you're simply trying to avoid ugly [prop drilling](https://kentcdodds.com/blog/prop-drilling), consider [React Context](https://reactjs.org/docs/context.html). If you require state management but not complex state management, [MobX](https://mobx.js.org/README.html) seems to be a popular option among many. (I personally wouldn't use it though.) If you're **_only_** using redux to store information fetched from databases _and_ are using graphql, consider [Apollo](https://www.apollographql.com/docs/react/).

You can always use redux in conjunction with whichever tool you choose if you end up needing it. You're free to use only redux as well. But consider if your application _truly_ needs Redux before using it.

In the meantime, here are some ways redux **_should not_** be used:

1. Don't use redux for styling your components. There are other solutions out there that are far better and more efficient.
2. Don't connect every component to redux. This creates confusion around a given component's actual responsibilities, and it can quickly make your code difficult to follow. Components should only be connected to redux when _necessary_.
