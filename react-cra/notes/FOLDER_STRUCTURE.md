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
  App.tsx
  index.tsx
```

The `src` folder is the root folder of your frontend _application_ (this is not the same as the project folder, which contains `src`). By (current) React convention, the entry point of your application should be `src/index.jsx` (or `src/index.tsx`). Also by convention, `src/App.tsx` is often the root _component_ of your application (excluding providers that wrap your entire app).

The `components` folder contains all of the components used for your application. It _does not_ contain components that represent an entire page of your application.

Personal preference: I also put commonly re-used components (eg. a custom styled button that I expect the rest of my application to use) under `components/_common`. That way I have an easy place to look for (or add to) my common re-usables. (Using `_common` puts the folder above other regularly named folders.)

The `pages` folder (also called `views`) contains any components that represent an entire page of your application. For instance, the `Home` and `Todos` pages in this project are placed under the `pages` folder. These files _do not_ typically contain components that make up only part of a page.

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

**Secondly**, barrel files help you think more in terms of "groups" or "domains". Referring to the previous code example, you'll notice that the simpler import that uses barrel files helps you get what you need from one place: "Ah, for components, I just need to go here. For anything related to services, I go there."

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

After watching Kent C. Dodd's [guide on testing JavaScript](https://testingjavascript.com/), I recommend having a `__tests__` directory in every folder with components/functions that need testing. (See this project's structure as an example). In addition, you should label all test files as `*.test.ts`/`*.test.tsx` (or `*.spec.ts`/`*.spec.tsx` if you prefer) for further clarity. You can adjust the file extension based on whether you use JavaScript or TypeScript. If you have a TypeScript project, I highly recommend writing your tests in TypeScript as well.

I can recommend this file structure with confidence from my personal experiences. It enables you to easily find and add tests, all without over-expanding your IDE's file tree. Here are other common structures I've seen/tried and reasons why I would discourage them (comparatively).

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

There are two main reasons I encourage this folder structure. First, it helps you reason about redux better. I have seen many a people -- professional or not -- misuse redux because they don't understand how it truly works. For instance, many people don't understand that a combined redux store is composed of multiple reducers that manage their own _portion_ of the total state. Dividing your `store` folder by reducers helps reinforce this proper understanding of redux.

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

Although it's good to put your tests under `__tests__` sub folders as mentioned previously, you may want a place to put test utilities. So... where should you put your configuration files for your test runner (eg. `jest.config.js`)? Where should you put helpers that _only your tests_ will use?

For these situations, I recommend creating a folder called `test-utils` (or something similar) in the root of your project folder. That way, you have an easy place to find your test helpers, and it's kept separate from your actual application.

(Note: Regarding my comment on `jest.config.js`, note that CRA pre-configures this for you.)

### The `public` Folder

Use of the `public` folder may vary slightly depending on whether you build your application from scratch or use tools like CRA. Since this part of the project was built using CRA, see the [docs](https://create-react-app.dev/docs/using-the-public-folder/) for more info.
