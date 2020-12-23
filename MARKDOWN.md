# Markdown Files and Documentation

Hey! What you're reading right now is a markdown file! Markdown files (`*.md`, sometimes `*.mdx`) are special files that make it significantly easier to document important details. The reason it makes documentation simpler is that with just a few special characters, you can easily _italicize text_, **embolden text**, [link text](https://guides.github.com/features/mastering-markdown/), specify `keywords` used in `code`, and more! You can even add code blocks with (or without) syntax highlighting like this:

```javascript
const someString = "a random string";

function printString() {
  console.log(someString);
}
```

You can learn how to use markdown [here](https://guides.github.com/features/mastering-markdown/)!

I **_highly_** recommend learning how to use markdown. It's easy to use, and many popular websites use it for documentation. All the good repositories use some form of markdown to help convey information too. (Look for a `README.md` and/or a `CONTRIBUTING.md` file the next time you visit a popular repository like React's.) With decent markdown knowledge, you can contribute to open source documentation or make easy-to-read documentation of your own.

Markdown files are supported in several places. Some notable ones are GitHub, GitLab, and Visual Studio Code. In fact, if you're reading this file in VS Code, in the top right corner you should see an icon that looks like a magnifying glass hovering over 2 columns. Clicking this icon will allow you to preview the output of your markdown as you write it. Many applications support markdown _syntax_ as well, like Slack and **Discord**.

As you make critical discoveries or notice something that will be difficult to understand without an explanation, I encourage you to document these things in a markdown file (or to properly organize your notes across various markdown files if appropriate). This way, others will be able to quickly reference what you learned, and you'll be able to keep comments (or paragraphs) that seem a bit less relevant outside your code.

Whatever you do, all projects should have a root `README.md` file that gives the general idea of the purpose of your project. You can use a `CONTRIBUTING.md` file to catch people up to speed on how to contribute to the repository and how to understand the codebase's structure (amidst a few other things).

Fun fact: Markdown files are often named with `ALL_CAPS`, but this is not required.
