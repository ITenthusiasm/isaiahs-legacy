# Configuring Frontend Frameworks

The point of this document is to explain some of the significant configuration needs you'll run into with your projects. Most often, you'll be relying on something else for this, like Create React App (CRA). However, it's helpful to know the basics of how the configurations work in case you need to customize something (or everything) on your own.

I'm sure you've already noticed that frontend frameworks never quite work on their own without any setup. For instance, if you want to use React, you're used to using CRA. But did you know that you could get React working without CRA?

See, in order to build an application with a frontend framework, you have to work through a bit of setup. You need to install all the necessary [npm packages](https://www.npmjs.com/). After that, you need to specify several [con](https://babeljs.io)-[fig](https://webpack.js.org)-[u](https://eslint.org/)-[ra](https://jestjs.io/)-[tions](https://www.typescriptlang.org/) to make sure your app works and to enable features like linting, testing, and type checking. Even after all this, you'll likely want to create some [npm scripts](https://docs.npmjs.com/cli/v6/using-npm/scripts) to make common tasks like linting or testing simpler. Tools such as CRA are intended to help you skip all of this.

Getting to skip all the setup and jump straight into development is very useful. However, it comes at the price of customization (and understanding). It also comes with a much longer initial `npm install`. I want to go over the basics of some of the most common configuration tools to improve your knowledge and expand your options. While going through the topics, you might be helped by using the codebase as a reference.

Topics of interest:

1. [Babel](#babel)
2. [Webpack (and Other Bundlers)](#webpack-and-other-bundlers)
   - [Loaders](#loaders)
   - [Improving the Development Experience](#improving-the-development-experience)
3. [ESLint](#eslint)
4. [Jest (and other Testing Tools)](#jest-and-other-testing-tools)
5. [Typescript](#typescript)
   - [Transpiling](#transpiling)
   - [Configuring](#configuring)
   - [Identifying Types](#identifying-types)
6. [Wrap-up](#wrap-up)

## [Babel](https://babeljs.io/)

**This is arguably the most important configuration piece.**

You can consider babel a "JavaScript transpiler": It takes JavaScript in one version/syntax and transforms it into JavaScript in another version/syntax. This is a very powerful tool! For instance, maybe a new JavaScript feature just came out that you _reallllly_ want to use, but [Node](https://nodejs.org) doesn't support it yet. Or perhaps you want to use [JSX](https://reactjs.org/docs/introducing-jsx.html) to write your React code, but you know it won't work in the browser because it isn't valid JavaScript. No worries! Babel takes care of this for you!

By using a set of babel [plugins](https://babeljs.io/docs/en/plugins), you can specify how your code should be transformed from a JS syntax of your choice to a JS syntax that your target (Node, browser, etc.) can understand. Oftentimes, people will discover that a combination of plugins work well together and group them into a babel [preset](https://babeljs.io/docs/en/presets). For instance, [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react) is used to translate your React code. It includes the plugins you'll need for React, like what's needed to transform your JSX.

If you're configuring everything on your own, you'll have to specify your settings in a configuration file like `.babelrc`. If you're using an external tool like CRA, it will often configure this for you, but it may also hide the configuration from you. See the [docs](https://babeljs.io/docs/en/configuration) for more details.

## [Webpack](https://webpack.js.org/) (and Other Bundlers)

[Bundlers](https://www.youtube.com/watch?v=5IG4UmULyoA) like webpack are mainly intended to bundle all of your JavaScript into one file. However, many bundlers often serve additional purposes like minifying your JS (for efficiency) or transpiling/compiling your code (eg. `.vue` files) into valid JS during the bundling process. By properly configuring `webpack` (or whichever bundler you choose), you can specify how you want your code to be bundled, optimized, transpiled, etc.

**This is mainly useful for frontend technologies**. For example, if you build a SPA (eg. a React app), you can bundle your JavaScript into a single file. Then, in the `HTML` file you're using for the app, you can load that JS file. Boom. An entire application is easily loaded just like that.

However, if you're writing a Node application (backend), there isn't as much of a point in bundling and minifying your JavaScript -- though it is certainly an option.

### Loaders

Bundlers like webpack often use [loaders](https://webpack.js.org/loaders) (or something similar) that enable you to preprocess files. By using loaders, you can specify how your file should be transpiled and/or processed during the bundling procedure. For instance, there are loaders to tell webpack how to interpret/handle TypeScript files, JSX files, and CSS files during the bundling process.

Since I just said webpack loaders can be used for transpiling, I want to make an important distinction between `webpack` and `babel` before continuing. Babel can indeed be used to _transpile_ your JavaScript code, but it is _not_ necessarily purposed for bundling. Similarly, webpack is unable to transpile code _on its own_; its main purpose is _bundling_. `Loaders` are the bridge between webpack and useful tools like babel. By using a [babel-loader](https://github.com/babel/babel-loader), you can point webpack to your babel configuration and tell it how to transpile your JS; by using a TypeScript loader ([ts-loader](https://github.com/TypeStrong/ts-loader)), you can point webpack to your TS configuration and tell it how to read and type-check TS files; by using a [css-loader](https://github.com/webpack-contrib/css-loader), you can tell webpack how to preprocess CSS files, and so on.

So again, the _primary_ purpose of bundlers like webpack is to bundle your JS into a single file. However, _loaders_ (specified in your bundler's configuration) enable bundlers to interpret and transpile your code. You'll see some examples of this in the code base that will hopefully make things more clear.

### Improving the Development Experience

The problematic thing about bundlers is that they ultimately just output bundled file(s) for you to use. If you're developing a React app, you'll have to bundle your code every time you want to see a change reflected in your browser. This is a very tedious process.

For this reason, people have created development servers. These servers are designed to accept all HTTP GET requests and return your HTML file _with the preprocessed JavaScript_. They also perform a clean refresh for you whenever you change your code. For this, you can use pre-built solutions like [webpack-dev-server](https://github.com/webpack/webpack-dev-server). Alternatively, you can create your own server. This is simple to do, and you'll see an example in the codebase.

If you're configuring everything on your own, you'll have to specify your settings in a configuration file like `webpack.config.js`. If you're creating your own development server, you'll have to do additional work. External tools like CRA not only configure webpack for you, but they also typically provide a webpack development server for you to use out of the box. However, these configuration details are hidden from you, so you won't be able to change them. Visit the documentation for your chosen bundler for more info. [Here's webpack's](https://webpack.js.org/concepts/).

## [ESLint](https://eslint.org/)

Unlike webpack and babel, ESLint provides no special features to enhance your application; it is for development purposes only. ESLint is useful for enforcing standards in your codebase. When used correctly, this keeps your code clean, readable, and consistent. If you're using [VS Code](https://code.visualstudio.com/), it is recommended to take advantage of the [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to improve your development experience with visual warnings.

If you're configuring everything on your own, you'll have to specify your settings in a configuration file like `.eslintrc.json`. If you're using an external tool like CRA, it will often configure this for you. Interestingly, CRA does not _entirely_ hide the ESLint configurations from you, so you have a level of control over what is and isn't enforced. However, many of the packages and root configurations will be hidden from you. If you want to adjust CRA's provided rules, you'll still have to provide the additional packages and a root configuration file that acts as the final say on ESLint rules. See the [docs](https://eslint.org/docs/user-guide/getting-started) for more details.

## [Jest](https://jestjs.io/) (and other Testing Tools)

Unlike webpack nnd babel, Jest (or whichever testing tool you choose) provides no special features to enhance your application; it is for development purposes only. Jest is useful for testing your JavaScript files to ensure that all your requirements are properly met. When used correctly, it gives you confidence that your code truly accomplishes what it's intended to accomplish.

If you're configuring everything on your own, you'll have to specify your settings in a configuration file like `jest.config.js`. If you're using an external tool like CRA, it will often configure this for you. As with ESLint, CRA does not strip away all of your control over Jest. You can adjust many things by providing your own configuration file. See the [docs](https://jestjs.io/docs/en/getting-started) for more details.

## [TypeScript](https://www.typescriptlang.org/)

TypeScript (TS) is one of the most powerful JS tools ever invented. Unlike webpack and babel, TypeScript provides no special features to enhance your application (for the most part); it is for development purposes only. However, TypeScript is incredibly useful for the type checking that it provides. It forces you to clarify types. This helps answer many questions like, "What type of arguments does this function or component expect?" and "Will passing in a string break this method?" -- resulting in cleaner, **_significantly more predictable_** code. If you're using a good IDE like VS Code, TS also improves intellisense.

Personally, I'd argue that most projects should be done with TypeScript. Even some small ones will significantly benefit from it. Many people share this view. Take this [twitter post](https://twitter.com/davidkpiano/status/1076610046266654723?lang=en), for instance. I swore to myself that TS was unnecessary complicated nonsense, and that I'd never go through such a silly, predictable set of steps as outlined in the post. Lo and behold, I followed _exactly_ that transformation process, as did many others. TS is _mildly_ simple, and it surely pays off once you're used to it. Yes, it is even worth (**_gradually_**) refactoring a moderately-sized codebase to use TS entirely -- particularly if you're going to keep building on it.

**_Warning_**: TypeScript **_is not_** C# or Java. It is _typed JavaScript_. Trying to approach TypeScript like C# or Java, especially when working with a frontend framework like React, will typically result in a **_worse_** development experience. Many people learned this the hard way, and it makes things painful for anyone making the transition from JS to TS. Approach TS just as if you were writing regular JavaScript, but with improved JSDocs and type clarity. You have been warned.

- As an example, the concept of an `Interface` in TypeScript is not quite the same as the concept of an `Interface` in C#. Moreover, there are linting rules that ban using `Iinterface-name` as a name for an interface. Again, TypeScript **_is not_** C# or Java.

### Transpiling

Nowadays, TS is typically transpiled into JS using Babel. [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript) will be sufficient for your needs.

### Configuring

TypeScript is configured by using a `tsconfig.json` file. You can find more information [here](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) and find a list of options [here](https://www.typescriptlang.org/tsconfig). If you're lazy, you can just copy the `tsconfig.json` file that CRA creates for a React app. (Or if you're using Vue, you can copy the one that the Vue CLI plugin for TypeScript uses.)

### Identifying Types

It's important to note that although TypeScript will attempt to infer some types, you'll have to explicitly specify many of them.

If you're using an npm package from another library, then _that library_ will have to specify types. "But what if the popular library I'm using only uses JavaScript and defines no TypeScript types?" you may ask. That's where the [Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped) GitHub repository comes in. This repository defines types for tons of libraries that don't provide types themselves -- from the popular `react` to the less popular `json-schema-faker`.

When you need types for a library but the library doesn't provide the types for you, it is usually sufficient to run `npm install -D @types/PACKAGE_NAME`. This will install the correct type definitions for your package from the Definitely Typed repository. If you forget this, TypeScript will usually warn you that it lacks type definitions and suggest potential installation commands.

If you're configuring everything on your own, you'll have to specify your settings in a configuration file like `tsconfig.json`. If you're using an external tool like CRA, it will often configure this for you. Note that although you'll have access to the `tsconfig.json` file that it creates, CRA may overwrite some of your configurations. Also note that if you install any additional packages (or you're adding TypeScript to an existing CRA project), you'll have to properly install all the correct types yourself. The main thing you won't have control over is the `ts-loader` for webpack. See the [docs](https://www.typescriptlang.org/docs/) for more details.

And yes, I recommend writing both your main code and your tests in TypeScript.

## Wrap-up

And that's all I have on configuring your JavaScript applications. This is only surface-level stuff. But hopefully between this and the codebase, you'll get an idea of the basics.

**_One more major warning_**: If you use CRA, **_avoid [`eject`ing](https://create-react-app.dev/docs/available-scripts#npm-run-eject) CRA as much as possible!_** I've seen many people who have very little knowledge of JS configurations make the dangerous choice to eject their React app. The idea of customizability may make ejecting CRA tempting; but since CRA is built to handle a multitude of use cases, you'll likely end up overwhelmed and confused by the resulting configurations -- as many have. Ejecting CRA is irreversible, so if you mess up, you mess up _big_. Ejecting CRA is _almost_ always unnecessary. Typically, your use case can be resolved by upgrading to the latest version of CRA, downgrading CRA (if there's a major bug), or opening an issue on [GitHub](https://github.com/facebook/create-react-app/issues). If you're predicting that you'll desperately want a lot of configuration control, then don't even bother with CRA. It's typically much better to handle all the configuration yourself than attempt to use ejected CRA as a "starting point".

If you're interested, Cory House has an excellent [introductory video](https://www.pluralsight.com/courses/javascript-development-environment) on configuring your JavaScript applications. Note that this video does not include TypeScript (at least not the last time I checked.)
