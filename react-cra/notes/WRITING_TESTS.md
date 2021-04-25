## Writing Tests

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

First `React Testing Library` is significantly more easy to work with compared to other options, and it helps you build more robust tests while steering you away from building brittle, unreliable tests. In some instances, it even helps you become a better frontend developer. (For instance, you may become more aware of which attributes you _should_ be using for your elements.)

Second, `React Testing Library` helps you approach and reason about your tests as if you were a literal user interacting with your UI.

Third, `React Testing Library` gives you _highly transferrable skills_. There is in fact an entire family of Testing Libraries for the various frontend frameworks! There are even testing libraries for E2E testing packages like `Cypress`. This means that if you move on to Vue, Svelte, or some other frontend framework, you'll be able to write tests with the exact same API (barring some minor nuances for setup). Notice that the tests here are nearly identical to the ones I wrote in the Vue version of this project. This saves a **_a lot_** on developer time. And it's even better that you know you'll be writing robust tests as you use the same code.

### End to End (E2E) Testing

There are times when unit/integration tests just won't cut it for your application. Maybe the situation you're trying to test is too complicated, or perhaps you want to wire your application up to the backend and make sure your app actually runs as expected in the browser. That's what E2E tests are for.

You don't need to worry about building tools for this on your own. Many tools already exist out there. (And to certain old friends of mine, something far more efficient and time-saving than that Python-bot method exists.)

One good option is [Cypress](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell). Its test runner is available for free on npm (`npm install -D cypress`). More importantly, [it has support in the testing library family](https://testing-library.com/docs/cypress-testing-library/intro/). You'll notice some slight differences, but it's more or less the same as the other members of the testing library family. What's great about this is that: 1) You won't have to write your own functions for finding something in the DOM, and 2) You'll work with a simple and re-usable API. Again, transferrable skills!

You'll see some examples of Cypress Testing Library here, but you should definitely check out the documentation for both Cypress and Cypress Testing Library for additional help. In this project, some files (and comments) that `cypress` creates by default were kept so that they could be referenced. However, some files -- such as those in the `fixtures` folder -- were removed. You can learn more about `fixtures` by visiting the Cypress (not Cypress Testing Library) documentation.

When running E2E tests, remember to start any necessary applications beforehand (eg. your web app or your database)!

### Mock Data and APIs

In an ideal world, if you're performing E2E tests or just testing out your new frontend features, you'd be able to wire up your frontend to your backend to verify that everything behaves as expected. Unfortunately, things don't always turn out this way. It's possible for your frontend to be finished before the backend. If you're developing both, this isn't a big problem. But if a separate team is developing the API your application consumes, then this will cause some trouble.

Thankfully, you can still create useful tests by taking advantage of mock data and mock APIs.

**For mock data**: [Json Schema Faker](https://github.com/json-schema-faker/json-schema-faker) has proven especially useful for generating randomized data that fits a certain structure. All you do is define a schema and tell Json Schema Faker to generate a random object matching your schema. Examples of this exist in this project.

If you don't need to generate large object structures, [Faker.js](https://github.com/marak/Faker.js/) may suffice. If you go with this option, you can create utility functions that generate randomized data. (Json Schema Faker actually makes use of the API from Faker.js.)

The nice thing about randomly generated mock data is that you can easily use it in all of your tests. Any integration tests with mocked out API responses will be able to use the data. Additionally, any mock APIs you create will also be able to take advantage of your randomly generated mock data. If you want more information about these packages, you can find them on GitHub and locate their documentation. Whichever mock data package you choose for your project, I've found it most helpful to place my utilities for creating mock data under a `test-utils` folder.

**For mock APIs**: [Json Server](https://github.com/typicode/json-server) is another incredibly helpful tool. It enables you to create a simple server for performing CRUD operations with JSON entities. You can view its documentation on GitHub for the details. But in short, posting JSON objects to the server allows you to dynamically create routes with resources that you can operate on. All resources are stored in a JSON file that you specify. Examples can be found here or in the official documentation.

Tip: Including some kind of script to easily reset your mock data/API can improve your development speed! We've set up a simple example of a reset-db script in the _absolute root_ project folder (ie. the folder that contains all 4 sub-projects). It may seem cumbersome to expand, but remember that you can easily scale this up by implementing something like JSON Schema Faker. Thus, expanding the data shouldn't be difficult or tedious. (If the data is interconnected, you may need to make your setup functions and schemas just _slightly_ smarter.)

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

This is kind of continuing a little bit from the previous section. Unit tests make more sense when you're working with specific functions or methods. But when you're dealing with a UI, integration tests are more practical. Instead of worrying about whether you have enough unit tests, you should be asking if you have enough tests to cover your UI's use cases.

This is especially important to think about when stores get involved. What's the point of testing a store in isolation if it's only meaningful when it's hooked up to the UI? There may be valid use cases for testing part of the store in isolation, but most of the time it's more practical to test your components as if they're hooked up to the store (if they rely on one). This will improve your confidence in how the UI will respond to any interactions. Additionally, it will enable you to test your components and your store at the same time.

As you write more tests, you'll come to learn what should be tested in isolation and what shouldn't be. You'll especially be helped by thinking in terms of testing use cases instead of testing lines of code. But in general, when it comes to component tests, favor integration testing over isolated unit testing.

Again, Kent has some good thoughts on [what types of tests you should write](https://kentcdodds.com/blog/write-tests).

### What about Test Coverage?

Test coverage is another tricky one, especially on the frontend. It's good to strive for high test coverage, but don't feel the _absolute need_ to reach 100%. In some cases 100% may be impractical, and in other cases with the UI it may be misleading.

There are easily situations where all your lines of code are "covered", but all your use cases are not. This is why it's best to think in terms of use cases instead of over-focusing on code coverage %. If you cover all your use cases, you'll often find yourself either getting full code coverage or removing unnecessary lines of code.

So use code coverage as a guide to help you remember any use cases you may have forgotten. But don't feel safe _only_ because the raw digits are high, and don't get paranoid if all your use cases are _truly_ covered but the coverage isn't at that attractive 100%.

You know who has some helpful [comments on code coverage](https://kentcdodds.com/blog/how-to-know-what-to-test)? Yup! Kent C. Dodds. (I hope you find all these articles helpful. :eyes:)
