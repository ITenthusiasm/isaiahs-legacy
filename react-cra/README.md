# General Standards and Tools for React

This file contains a compilation of some things I've learned about React standards and tools. Given the length, it's likely best used as a reference. As you go through it, you'll be especially helped by using this project's code as an example to look at.

This project was created by running `npx create-react-app react-cra --template --typescript`. Edits were applied after the initial installation. I tried to remove things that would only be distractions, but I left in some things that CRA provides like `reportWebVitals`. Note that the very end of this file holds the default `README.md` information that CRA generates.

Although this project is intended to help get you familiar with React and other tools, it is not a _tutorial_ on React. This project is intended to give you an idea of useful standards and tools while providing some simple examples. For information on exactly how these tools work, see the documentation:

- [React](https://reactjs.org/docs/getting-started.html)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Redux](https://redux.js.org/introduction/getting-started)
- [React Router](https://reactrouter.com/web/guides/quick-start)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro)

Beyond this, consult the list of useful resources mentioned in the root of this repository.

## Configuration

CRA handles all of the important configurations for you, and it leaves a couple ways to modify the configurations. Please note that instead of using regular configuration files, CRA requires you to edit `package.json` to adjust the settings. Some settings are hidden inside the package itself, with the intent that you'll never modify them.

For more information on how to customize the configurations, see [Create React App's official documentation](https://create-react-app.dev/docs/getting-started). In this project, the ESLint config and Jest config are modified.

One additional tool is used beyond what CRA provides: [Prettier](https://prettier.io/). It's an excellent tool for formatting frontend code.

## Folder Structure

File/folder structure is a very simple thing. However, when done well, it can greatly enhance the developer experience. Specifically, it'll help you (and new team members) navigate easily between files.

### Typical Frontend Folder Structure (General)

This is not the only way to structure your files and folders, but it's common between frontend frameworks like React and Vue.

```
src/
  components/
    Icon.tsx
    Header.tsx
    Card.tsx
    index.ts
  pages/
    Home.tsx
    About.tsx
    index.ts
  router/
    history.ts
  services/
    UserService.ts
    index.ts
  store/
    index.ts
  index.tsx
```

The `src` folder is the root folder of your frontend _application_ (this is not the same as the project folder, which contains `src`). By (current) React convention, the entry point of your application should be `src/index.jsx` (or `src/index.tsx`).

The `components` folder contains all of the components used for your application. It _does not_ contain components that represent an entire page of your application.

Personal preference: I also put commonly re-used components (eg. a custom styled button that I expect the rest of my application to use) under `components/_common`. That way I have an easy place to look for (or add to) my common re-usables. (Using `_common` puts the folder above other regularly named folders.)

The `pages` folder contains any components that represent an entire page of your application. For instance, the `Home` and `Todos` pages in this project are placed under the `pages` folder. These components _do not_ typically contain components that make up only part of a page.

The `router` folder contains logic for setting up your router, like initializing the `history`. (Components that act as enhanced `Route`s do not go here. They go under `components`.) I picked this up from Vue. In React, if your application is simple enough, you may not need a `router` folder.

The `services` folder encapsulates the logic you need for making API calls.

The `store` folder contains all logic related to your store. This folder will look different depending on which state management library you use. (We're using redux.)

### Barrel Files

You'll notice that [most of] my `src/*` folders have an `index.ts` file that simply re-exports the files [that I want exposed] within that folder. (See the code for examples.) These are called `barrel files`, and they're useful for several reasons.

**Firstly**, they simplify your import statements. Why write something like this:

```typescript
import ComponentA from "./components/ComponentA";
import ComponentB from "./components/ComponentB";
import ComponentC from "./components/ComponentC";
```

when you can write something like this:

```typescript
import { ComponentA, ComponentB, ComponentC } from "./components";
```

This saves more lines and helps you to reason more easily about your file/folder structure.

**Secondly**, barrel files help you think more in terms of "groups" or "domains". Referring to the previous code example, you'll notice that the simpler import that uses barrel files helps you get what you need from one place. "Ah, for components, I just need to go here. For anything related to services, I go there."

**Finally**, barrel files help you communicate what you expect to be "accessible to the outside world", and what you expect to remain "private". In this project, you'll notice that `src/components/index.ts` _does not_ export the `Notifications` component. That's because `Notifications` is only intended to be used with the `NotificationsContainer`, which _is_ pubilcly accessible to the outside world.

Technically speaking, nothing's stopping a person from digging their hands where they shouldn't. But in terms of _communicating intent_ and _clarifying exactly which components/functions are needed by the outside world_, this works quite well.

**_WARNING_**: Barrel files are only intended to be taken advantage of from other directories. So this is fine:

```typescript
import { ComponentA, ComponentB, ComponentC } from "./components";
```

but this **is not**:

```typescript
// Inside ComponentB.tsx

import { ComponentA } from ".";
```

This creates circular dependencies, and it can also confuse any linters you use. When referring to components within the same directory, you'll have to settle for the longer syntax:

```typescript
// Inside ComponentB.tsx

import ComponentA from "./ComponentA";
```

### Test Folder Structure

After watching Kent C. Dodd's [guide on testing JavaScript](https://testingjavascript.com/), I recommend having a `__tests__` directory in every folder with components/functions that need testing. (See this project's structure as an example). In addition, you should label all test files as `*.test.ts`/`*.test.tsx` (or `*.spec.ts`/`*.spec.tsx` if you prefer) for further clarity. You can adjust the file extension based on whether you use JavaScript or TypeScript, but if you have a TypeScript project I highly recommend writing your tests in TypeScript.

I can recommend this structure with confidence from my personal experiences. It enables you to easily find and add tests, all without over-expanding your IDE's file tree. Here are other common structures I've seen/tried and reasons why I would discourage them (comparatively).

**NOTE**: If you're already convinced of the test file/folder structure I recommended, you can skip to the next section.

**_1) Bad: Put all tests under a single folder that mimics the file/folder structure of your main application_** (ie., it mimics `src`'s structure)

This structure looks something like this:

```
src/
  components/
    Icon.tsx
    ...
  pages/
    Home.tsx
    ...
  ...
test/
  components/
    Icon.test.tsx
    ...
  pages/
    Home.test.tsx
    ...
  ...
```

and it is perhaps the most inconvenient of all options. The reason is that it makes it incredibly difficult to locate relevant tests, _especially_ as your application grows. Let's say you have a complicated application with even more directories beyond the ones in this project. Each of these folders also has several nested folders, and every folder has a significant number of files.

If you were to look for a test for a component or function within a nested folder, it would be quite challenging to find it using your IDE's file navigator because of how many folders you'd have to click through. If you're in VS Code, you could use `ctrl + p` to search files, but you may not know what file to look for (naming and location are not always consistent either). Even after you find the file, you'll notice that your IDE's file navigator becomes over-expanded once you're done. You only wanted to open the directory for a specific test, but now all the test files in any parent directories are also getting displayed. This complicates using the file navigator even more. (RIP if you aren't using a monitor.)

When using the "one `__tests__` folder per directory" approach, you don't run into this problem. First of all, you know exactly where to find your tests. If your file is in the `*/components` folder, you can find the test you want in the `*/components/__tests__` folder. Secondly, you don't have to click through an ugly nest of folders to get to the test you want (nor over-expand your navigator in the process). You only have to click one more folder to get to the tests you want. So navigation and visual overload are kept to a minimum. Finally, it becomes obvious if you're _missing_ tests or if your team concluded that no tests were _necessary_. For instance, you'll notice in this project that `src/router` has no `__tests__` folder because nothing in it requires testing. Similarly, a team may conclude that the `src/services` folder is missing tests.

**_2) Kinda Bad: Keep test files right next to the file they're testing._**

This structure looks something like this:

```
src/
  components/
    Icon.tsx
    Icon.test.tsx
    ...
  pages/
    Home.tsx
    Home.test.tsx
    ...
  ...
```

This one isn't as bad as the previous one. However, as your application grows, this approach still becomes inconvenient. More specifically, having your test files adjacent to the files they test _doubles the size of a directory_. This is _really bad news_ for a large application. While you're looking for specific files to help you build a new feature, your eyes start to become visually overloaded with test files that you don't care about. Similarly, when you're looking for a test, your eyes become visually overloaded by feature files.

When using the "one `__tests__` folder per directory" approach, you again don't run into this issue. You know just where to look for the regular feature files, and you know just where to look for your test files. (And your eyes can distinguish between them easily.) Additionally, by using this approach, you get to take advantage of easy imports with barrel files. (Remember that adjacent files cannot take advantage of their directory's barrel file.)

Ultimately, you can do whatever you want. But the "one `__tests__` folder per directory" approach seems to be the best of both worlds between the two aforementioned methods.

**One quick note on test file structures for _components_**: Life is easy if your React components and their styles are in a single file, like they are in this project. But... what if you want to use CSS for your components? Well...hopefully you'd use a simple solution (perhaps [emotion](https://emotion.sh/docs/introduction)) that enables you to declare CSS styles easily within the same file. But what if you can't or don't want to? Then your folder structure under `components` may look something like this:

```
src/
  components/
    Icon/
      Icon.tsx
      Icon.css
      index.ts
    Card/
      Card.tsx
      Card.css
      index.ts
    ...
  ...
```

This would make the "one `__tests__` folder per directory" approach rather in convenient for your components. In this situation, I would recommend moving the `__tests__` directory one folder up. So your directory would look like this:

```
src/
  components/
    __tests__/
      Icon.test.tsx
      Card.test.tsx
    Icon/
      Icon.tsx
      Icon.css
      index.ts
    Card/
      Card.tsx
      Card.css
      index.ts
    ...
  ...
```

This still enables you to easily access your tests while maintaining the folder component structure that you need. If you're using Vue, you won't need to worry about that dilemma.

### Store Folder Structure (Redux Only)

I already mentioned that it's good to set aside a `store` folder for everything related to the store. An "optimal" structure within the `store` folder varies depending on the state management library you use. However, if you're using `redux`, there's certainly a structure I can recommend (and others that I can recommend against).

Yet again, after watching Kent C. Dodds, I recommend having a single folder under `store` for every reducer in your application. Within these sub folders should be `action`, `reducer`, and `types` files for your actions, reducer logic, and action types (and/or TypeScript types) related to a given reducer. In the `store/index` file, you can export your redux store. From personal preference, I also encourage putting your store's initial state, root reducer, and "store globals" directly in the `store` folder. As you'll see, our application follows this structure:

```
src/
  ...
  store/
    reducer1/
      actions.ts
      reducer.ts
      types.ts
    reducer2/
      actions.ts
      reducer.ts
      types.ts
    ...
    index.ts
    initialState.ts
    rootReducer.ts
```

There are two main reasons I encourage this folder structure. First, it helps you reason about redux better. I have seen many a people -- professional or not -- misuse redux because they don't understand how it truly works. For instance, many people don't understand that a combined redux store is composed of multiple reducers that manage their own _portion_ of the total state. Divinding your `store` folder by reducers helps reinforce this proper understanding of redux.

On a similar note, having a `store/initialState` file that holds the initial global state helps reinforce the idea that the final store you export holds all of the state. By having your reducers default to a portion of that initial state, you're again reinforcing the idea that there's a _global_ state from which each reducer takes a _portion_.

Second, this file structure is easier to manage. You'll know exactly which folder to go to for a given reducer. And when you open that folder, you'll only see what's related to that reducer.

Convinced? Then you can move on to the next section. :) Not convinced? Then let me recommend against 2 patterns you may be familiar with...

**_1) Very Bad: Collocate your redux files with your component files._**

This is perhaps the most disadvantageous file/folder structure you can use for your redux store. This is largely because it distorts a developer's understanding of how redux actually works and creates confusion regarding a component's responsibility.

The structure looks something like this:

```
src/
  components/
    Icon/
      Icon.tsx
      Icon.actions.ts
      Icon.reducer.ts
      Icon.types.ts
    Card/
      Card.tsx
      Card.actions.ts
      Card.reducer.ts
      Card.types.ts
  store/
    index.ts
```

When you collocate redux files with your component, you risk losing a proper understanding of what the redux store really is: A global store made up of one or more reducers. This is especially a risk for any newcomers to React + Redux.

What's even worse with this file structure is that it often creates confusion around component responsibility. Before long, people assume that any "smart component" should be connected to the reducer. And state that could easily be handled locally and efficiently within a component is needlessly chucked into redux. (On that note, redux is not typically the place for global styles.) Once you get to that point, the application becomes a wrangled mess that's hard to comprehend and hard to test -- especially for new developers (or developers returning to a codebase after awhile). You are not _doomed_ to fall into this trap with this structure, but you are certainly guided that way subconsciously.

Finally, this folder structure just creates visual overload in the file tree. You may simply want to see a component and/or its styles. But now your eyes are overloaded with information about the store. What is more, with this structure you're forced to put each component into its own folder (even if you found a way to efficiently put styles and JSX in the same file).

**_2) Kinda Bad: Create one folder for all actions, one folder for all reducers, and one folder for all action types (and/or TypeScript types)._**

The structure looks something like this

```
src/
  ...
  store/
    actions/
      actions1.ts
      actions2.ts
    reducer/
      reducer1.ts
      reducer2.ts
    types/
      types1.ts
      types2.ts
    index.ts
    initialState.ts
    rootReducer.ts
```

The nice thing about this folder structure is that it slightly helps you reason about redux the proper way: one global store with one or more reducers. The disadvantage of this folder structure is that it creates visual overload. It does this in two ways:

1. As your application grows, the number of files within a given folder -- such as `actions` -- increases. This means that as your application becomes more complex, it will be more difficult for you to locate a _specific_ file for your reducer (in this example, the specific actions file for a given reducer).
2. You will **_always_** need to have 3 folders open in order to make updates to a reducer. This is because the _components_ of a _single_ reducer (actions, reducer logic, and action types) are naturally split across 3 folders in this convention. And as your application grows, you'll end up with a progressively overwhelming file tree in your IDE.

The original file structure I recommended not only helps reduce visual overload, but it also more strongly reinforces the core concepts of how redux operates.

### Test Utilities

Although it's good to put your tests under `__tests__` sub folders as mentioned previously, you may want a place to put test utilities. So where should you put your configuration files for your test runner (eg. `jest.config.js`)? Where should you put helpers that _only your tests_ will use?

For these situations, I recommend creating a folder called `test-utils` (or something similar) in the root of your project folder. That way, you have an easy place to find your test helpers, and it's kept separate from your actual application.

(Note: Regarding my comment on `jest.config.js`, note that CRA pre-configures this for you.)

### The `public` Folder

Use of the `public` folder may vary slightly depending on whether you build your application from scratch or use tools like CRA. Since this part of the project was built using CRA, see the [docs](https://create-react-app.dev/docs/using-the-public-folder/) for more info.

# Hooks

React hooks are a new feature that was added to React in v16.8. In short, it allows functional components to manage local state. However, the state management that hooks provide is much more flexible than what you get with regular class components, and it makes your components easier to understand. You can refer to the [documentation](https://reactjs.org/docs/hooks-intro.html) or checkout people like Ben Awad or Kent C. Dodds for help with learning hooks.

As a word of advice, **_always_** check to see if the library you're using has helplful hooks (`react-router-dom` and `react-redux` are some examples). If you're interested, here are some advantages that hooks bring to the table that may not be immediately obvious:

First of all, hooks eliminate the need for Higher Order Components (HOCs). If you're unfamiliar with HOCs, a HOC is a function that takes a component as an argument and returns a component; you've likely used them before. If you've ever used `connect` for Redux, `withRouter` for React Router, or `withStyles` for React JSS, you're indeed familiar with HOCs. The problem with HOCs is that they often require you to export an awkward function call like `connect(mapStateToProps)(Component)`. If for some reason you also need other HOCs, things can get messy really quickly...

```typescript
connect(mapStateToProps)(withStyles(styles)(Component));
```

In addition to requiring you to wrap your components like crazy, HOCs often require you to pollute your props. For instance, redux store variables may be exposed through `props.variable` even though the variable isn't truly a prop that you pass into your component. This adds confusion about what actually belongs to your component locally and what's managed by your store or other tools. (It can potentially make TypeScript more of a hassle too.)

This problem is also nullified with hooks because they will return exactly what you need as variable(s) within your functional component.

It may be hard for you to imagine the benefit this brings from just a few words. You can catch a glimpse of the benefit by observing how this project uses Redux without relying on something like `connect`.

# Should You Use Redux?

Redux is a popular tool for complex state management in React. Unfortunately, it's also a complicated tool that requires a noticeable amount of boilerplate. In fact, several people who use it in the professional world don't actually understand how it works or how it _should_ be used. Because of this, many have come to dread redux and tend to ignore it.

Although many despise redux, pretty much everyone agrees that if your state management will get complex, redux can be a good solution. However, other good options exist.

If you're simply trying to avoid ugly [prop drilling](https://kentcdodds.com/blog/prop-drilling), consider [React Context](https://reactjs.org/docs/context.html). If you require state management but not complex state management, [MobX](https://mobx.js.org/README.html) seems to be a popular option among many. If you're **_only_** using redux to store information fetched from databases _and_ are using graphql, consider [Apollo](https://www.apollographql.com/docs/react/).

You can always use redux in conjunction with whichever tool you choose if you end up needing it. You're free to use only redux as well. But consider if your application _truly_ needs Redux before using it.

In the meantime, here are some ways redux **_should not_** be used:

1. Don't use redux for styling your components. There are other solutions out there that are far better and more efficient.
2. Don't connect every component to redux. This creates confusion around a given component's actual responsibilities, and it can quickly make your code difficult to follow. Components should only be connected to redux when _necessary_.

# Writing Tests

### Test Runners

When it comes to running tests, there are 2 main options out there: [Jest](https://jestjs.io/) and [Mocha](https://mochajs.org/). In short, Jest is the choice to go with if you want a robust framework that's easy to use and gives you a lot of functionality out of the box. Mocha, on the other hand, is better if you want more flexibility. However, at this point, it should be noted that unless you're doing something really crazy, the "flexibility" that Mocha adds is almost never practical/relevant for the average developer.

I'd thoroughly encourage any JS developer to use Jest over Mocha. Here are a few reasons:

1. Jest gives you a lot of tooling out of the box. You get assertion, function/class mocking, fake timers, and more from Jest itself. If you use Mocha, you have to install packages for these things yourself _and_ read those packages' documentation pages. This creates a larger burden on the developer.
2. Jest makes it easier for you to test specific files or groups of files, as opposed to running all your tests at once. This means you easily save more time as you write tests.
3. Jest has better support with the Testing Library Family, which makes testing frontend frameworks a simple and enjoyable experience. (More on that later.)
4. The documentation for Jest is more robust and easy to follow. This means you get your questions answered sooner, and that means you'll be writing your tests faster.

There are more reasons beyond those. And if you care, the stars and forks on GitHub seem to be in favor of Jest as well. But you're always free to choose what you please.

### Testing React Components

When writing tests for your React components, the recommened approach is to use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). In fact, CRA ditched `Enzyme` in favor of `React Testing Library` a long time ago.

### Why React Testing Library?

There are two main advantages to using `React Testing Library` over other options.

First `React Testing Library` is significantly more easy to work with compared to other options, and it helps you build more robust tests while steering you away from building brittle, unreliable ones. In some instances, it even helps you become a better frontend developer. (For instance, you may become more aware of which attributes you _should_ be using for your elements.)

Second, `React Testing Library` helps you approach and reason about your tests as if you were a literal user interacting with your UI.

Third, `React Testing Library` gives you _highly transferrable skills_. There is in fact an entire family of Testing Libraries for the various frontend frameworks! There are even testing libraries for E2E testing packages like `Cypress`. This means that if you move on to Vue, Svelte, or some other frontend framework, you'll be able to write tests with the exact same API (barring some minor nuances for setup). Notice that the tests here are nearly identical to the ones I wrote in the Vue verssion of this project. This saves a **_a lot_** on developer time. And it's even better that you know you'll be writing robust tests as you use the same code.

### End to End (E2E) Testing

There are times when unit/integration tests just won't cut it for your application. Maybe the situation you're trying to test is too complicated, or perhaps you want to wire your application up to the backend and make sure your app actually runs as expected in the browser. That's what E2E tests are for.

You don't need to worry about building tools for this on your own. Many tools already exist out there. (And to certain old friends of mine, something far more efficient and time-saving than that Python-bot method exists.)

One good option is [Cypress](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell). Its test runner is available for free on npm (`npm install -D cypress`). More importantly, [it has support in the testing library family](https://testing-library.com/docs/cypress-testing-library/intro/). You'll notice some slight differences, but it's more or less the same as the other members of the testing library family. What's great about this is that: 1) You won't have to write your own functions for finding something in the DOM, and 2) You'll work with a simple and re-usable API. Again, transferrable skills! You'll see some examples of Cypress Testing Library here.

### Mock Data and APIs

In an ideal world, if you're performing E2E tests or just testing out your new frontend features, you'd be able to wire up your frontend to your backend to verify that everything behaves as expected. Unfortunately, things don't always turn out this way. It's possible for your frontend to be finished before the backend. If you're developing both, this isn't a big problem. But if a separate team is developing the API your application consumes, then this will cause some trouble.

Thankfully, you can still create useful tests by taking advantage of mock data and mock APIs.

**For mock data**: [Json Schema Faker](https://github.com/json-schema-faker/json-schema-faker) has proven especially useful for generating randomized data that fits a certain structure. All you do is define a schema and tell Json Schema Faker to generate a random object matching your schema. Examples of this exist in this project.

If you don't need to generate large object structures, [Faker.js](https://github.com/marak/Faker.js/) may suffice. If you go with this option, you can create utility functions that generate randomized data. (Json Schema Faker actually makes use of the API from Faker.js.)

The nice thing about randomly generated mock data is that you can easily use it in all of your tests. Any integration tests with mocked out API responses will be able to use the data. Additionally, any mock APIs you create will also be able to take advantage of your randomly generated mock data. If you want more information about these packages, you can find them on GitHub and locate their documentation. Whichever mock data package you choose for your project, I've found it most helpful to place my utilities for creating mock data under a `test-utils` folder.

**For mock APIs**: [Json Server](https://github.com/typicode/json-server) is another incredibly helpful tool. It enables you to create a simple server for performing CRUD operations with JSON entities. You can view its documentation on GitHub for the details. But in short, posting JSON objects to the server allows you to dynamically create routes with resources that you can operate on. All resources are stored in a JSON file that you specify. Examples can be found here or in the official documentation.

### A Different Way to Think about Testing

Whether you're convinced of using the testing library tools or not, it's important to establish a proper mindset when it comes to testing the frontend. More specifically, it's important to understand that just as frontend development is different from backend development, so frontend testing is different from backend testing.

People who are more familiar with backend development are typically used to thinking in terms of functions and classes. For instance, they want to know that a function or a class method behaves appropriately when given the right inputs, and that classes properly interact with each other. This in turn impacts how backend developers approach tests. Even the languages that are primarily for the backend are more geared towards these purposes.

Frontend development is a completely different sphere. We all know this, and it's why we think in terms of "frontend" and "backend". The core frontend languages themselves -- HTML, CSS, and JS -- are significantly different from the backend languages (particularly HTML and CSS). Instead of thinking primarily in terms of "functions" and "classes", fronted developers think primarily in terms of "elements"/"components" and "styles". They want the UI to be pleasant and simple for the user. Things like functions and classes mainly come into play when developers want special reactivity or they want to handle complex tasks. This, in turn, also impacts how frontend developers _should_ approach tests.

_Should_ is the keyword. Why? Because today, I feel like the focus of frontend tests has been forgotten; it has been confused with the focus of backend tests. In the past, if people wanted to test their backends manually, they'd have to run a program that passes certain inputs to their functions/methods and check the output. (Or they'd have to properly setup classes and see how they interact.) Nowadays, we still do that, but with automation.

By contrast, in the past, if people wanted to test their frontends manually, they'd have to interact with a UI. They'd type into certain inputs and click specific buttons to make sure the UI responded correctly. You'd be out of your mind to "test your website" by simply passing certain inputs to JavaScript functions/methods and observing the output. Those functions/methods only exist to serve a purpose on the UI. So you couldn't say your webpage was properly tested until you interacted with your elements/components as if you were a user.

Yet today, many frontend developers write their automated tests like backend tests: Tests are written in terms of "methods" and "state" and "props", rather than being written in relationship to the DOM -- what's actually going to be visible to the user. This results in tests that are very brittle (change a function name or an implementation and everything fails) and that are highly unreliable (your function gives a good output but isn't hooked up correctly to the UI).

This issue in particular is why tools like React Testing Library are favored over those like Enzyme. The testing library family helps frontend devs get back to the basics by _encouraging_ them to write tests representing a user interacting with a UI. It also _discourages_ tests that simply focus on outputs from functions and methods (or the implementation details of state and props). And of course, this improves the resilience and validity of any frontend tests that are written.

All that to say, write your frontend tests wisely. Enzyme is usable, but it's limited and enables poor habits. So I highly encourage using React Testing Library. And when your needs are too complex for it, use something like Cypress Testing Library or some other E2E tool.

Kent C. Dodds (you'll hear his name a lot here) has some great input on testing implementation details [here](https://kentcdodds.com/blog/testing-implementation-details).

### Does Your Frontend _Really_ Need Unit Tests?

This is kind of continuing a little bit from the previous section. Unit tests make more sense when you're working with specific functions or methods. But when you're dealing with a UI, integration tests are more practical. Instead of worrying about whether you have enough unit tests, you should be asking if you have enough tests to cover your UI cases.

This is especially important to think about when stores get involved. What's the point of testing a store in isolation if it's only meaningful when it's hooked up to the UI? There may be valid use cases for testing part of the store in isolation, but most of the time it's more practical to test your components as if they're hooked up to the store (if they rely on one). This will improve your confidence in how the UI will respond to any interactions. Additionally, it will enable you to test your components and your store at the same time.

As you write more tests, you'll come to learn what should be tested in isolation and what shouldn't be. You'll especially be helped by thinking in terms of testing use cases instead of testing lines of code. But in general, when it comes to component tests, favor integration testing over isolated unit testing.

Again, Kent has some good thoughts on [what types of tests you should write](https://kentcdodds.com/blog/write-tests).

### What about Test Coverage?

Test coverage is another tricky one, especially on the frontend. It's good to strive for high test coverage, but don't feel the _absolute need_ to reach 100%. In some cases 100% may be impractical, and in other cases with the UI it may be misleading.

There are easily situations where all your lines of code are "covered", but all your use cases are not. This is why it's best to think in terms of use cases instead of over-focusing on code coverage %. If you cover all your use cases, you'll often find yourself either getting full code coverage or removing unnecessary lines of code.

So use code coverage as a guide to help you remember any use cases you may have forgotten. But don't feel safe _only_ because the raw digits are high, and don't get paranoid if all your use cases are _truly_ covered but the coverage isn't at that attractive 100%.

You know who has some helpful [comments on code coverage](https://kentcdodds.com/blog/how-to-know-what-to-test)? Yup! Kent C. Dodds. (I hope you find all these articles helpful. :eyes:)

# Keep Your Dependencies Simple and Organized (`package.json` and `package-lock.json`)!

Please _please_ **_please_** keep your dependencies simple and organized! I've seen several nightmarish `package.json`s, many of which included numerous outdated and even _unused_ dependencies. Other people shove all packages directly into `dependencies` in `package.json`. Properly managing your packages will enable you to provide greater clarity to how your project is structured, amidst other things.

### Unused Packages

There is never a reason why your `package.json` file should include unused dependencies. If you were trying out a package but found out it wasn't worth using, uninstall the package before your forget about it. You can also use your IDE to do a quick search on which packages are actually used/imported and which ones are never mentioned.

### Unnecessary Packages

When you're trying to solve a [simple] problem, resist the urge to resolve it by searching for an npm package that does what you want. Most of the time, the solution isn't too complicated, and it will be better to write the code yourself. Even if you have to do a little bit of research, it will be worth it to forego the extra package.

Keep your `package.json` file as small as possible. This decreases the risk of blowing up your application's bundle size, and it helps make your _real_ dependencies clear. In addition, there are many packages out there which are not well-maintained or that may become unusable when the main libraries your application uses get updated. Save package installations for when you _really_ need them. And if you're going to install a package, make sure it is well supported. (Bonus points if it's popular or growing in popularity.)

Of course, I'm not advocating for developing _everything_ in house. That would be unreasonable, especially when other people have developed robust solutions to the problem you're trying to solve. For instance, at this point it doesn't make sense to try to build your own test runner for JavaScript given the options out there. However it also doesn't make sense to install a package that helps you find the sum of an array of numbers; you can easily use JavaScript's `reduce` for that.

### Outdated Packages

Outdated packages are a different story. Most of the time you _should_ be able to update your packages. But sometimes a major update to a package you use would break your application after the upgrade.

By continuously monitoring your packages (run `npm outdated`), you can see which packages should be updated. For packages that won't break your application, you should update them immediately. You can do this by running `npm update`. Sometimes, if the package has a new major version, you may need to do `npm install PACKAGE_NAME@latest`.

If a package update _would_ break your application, check the library's documentation for what's necessary for a migration. Then, set aside a time in the future (when appropriate) to update the package and migrate your code. It's **_much_** easier to migrate one package at a specified time than to migrate _several_ packages at once. The more seriously you take keeping packages up to date, the easier your life will be. This will also make it easier for you to get access to new and powerful features.

### Properly Organizing Your Dependencies

You can clarify your intentions with your packages by properly organizing them. This enhances the developer's experience _and_ the user's experience.

`dependencies` contains all the packages that you intend for use in production. That is, it contains all the packages that your application actually _needs_.

`devDependencies` contains all the packages that you use for development only. These are packages that are _not_ needed by your application. (This is especially important if you are making a package that others will install or contribute to.)

`peerDependencies` is mainly intended for use if you're building a library with npm packages that you expect your end-user to be using. For instance, you may be building a set of re-usable React components in a library. Your library _needs_ the `react` package to function, but you also rightly acknowledge that your users will be using React as well. To ensure that your user's application behaves predictably, you specify `react` as a `peerDependency`. See [here](https://stackoverflow.com/questions/26737819/why-use-peer-dependencies-in-npm-for-plugins) for more details on why this is important.

You can visit the [docs](https://docs.npmjs.com/cli/v6/commands/npm-install) for information on installing packages properly. (Make sure the version of the docs is correct for your use case.)

### Respecting `package-lock.json`

Occasionally, `package-lock.json` will give people a hard time. This usually happens when there's a problem with a `registry` or when there's a git conflict during a `merge` or `rebase`. Oftentimes people will attempt to resolve the issue by deleting `package-lock.json` and re-running an `npm install`. Everyone familiar with how npm actually works discourages this heavily. Consider deleting `package-lock.json` "a big no-no".

The `package-lock.json` file is intended to guarantee a consistent dependency tree between developers (_and_ deployed builds). It also helps protect versions of nested dependencies. Though rare, there are instances where removing that protection enables a nested dependency to be installed at a version that would break your application.

Npm provides a [means to resolve git conflicts](https://docs.npmjs.com/cli/v6/configuring-npm/package-locks#resolving-lockfile-conflicts) for verions >= 5.7.0. You should use the solution specified here instead of performing a full rewrite.

If a registry in `package-lock.json` is incorrect, consider simply correcting the registry to fix your installation error.

Finally, if you're building a library/application and using `package.json` to track your app's version, _please_ keep `package-lock.json` up-to-date as well. There don't seem to be any immediate consequences (for your application) if you fail to do this. However, since `npm` will always sync the versions in `package.json` and `package-lock.json` after an install, you should make sure the versions are in sync _before_ checking in your code. Otherwise, the next person who checks out your code will see a version update to `package-lock.json` as one of the changes to be checked into git after they perform an install. This is a confusing experience since this developer may not have installed any new packages.

### Leaving Configurations in Configuration Files

Configuring your development tools (eg. ESLint and Jest) in your `package.json` file only makes the package file even more bloated and hard to follow. Try to keep your configurations to individual files where possible. (To be fair, sometimes boilerplates like CRA make this difficult or impossible.)

# Styles

Unlike Vue, React does not have a common, clean convention for styling your components. It's typically recommened to use CSS to style your components. You can do that with raw CSS files (I wouldn't necessarily recommend that for React), CSS Modules, Tailwind, Bootstrap, or CSS-in-JS solutions like `emotion` or `react-jss`.

If you're interested, here are some old [benchmarks](https://github.com/A-gambit/CSS-IN-JS-Benchmarks/blob/master/RESULT.md) of different options. Please note the date.

In general, inline styles are discouraged since they are limited and considered "inefficient". Occasionally, they can also be a source of confusion. Since this project is geared towards learning React rather than CSS, I've used inline styles. But note that I've only done so for simplicity.

If the solution you use permits (eg. `react-jss` or inline styles), I'd encourage you to _try out_ putting all of your styles for a given component at the bottom of the file, like in Vue. This helps you keep track of what styles belong to the component, and it can also help you scope your styles better. If you use something like `React Native` or `React PDF` in the future, you'll likely be doing this anyway. Unfortunately, React doesn't have as ornate of a solution as Vue when it comes to this. So if you decide against that, it's understandable.

(Note: If you're only against putting styles at the end of a file because of a vague idea of "Separation of Concerns", I recommend you read my comments on Single File Components in the Vue version of this large project.)

# Avoid `dangerouslySetInnerHTML` Whenever Possible...

That should go without saying, but I've seen things. Whenever possible, please consider other options. It will make your app more secure and potentially more readable. If your app heavily relies on `dangerouslySetInnerHTML`, you may want to reconsider your approach (How should you get your markup?) or your tool (Should you even use React?).

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
