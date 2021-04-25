## Keep Your Dependencies Simple and Organized (`package.json` and `package-lock.json`)!

Please _please_ **_please_** keep your dependencies simple and organized! I've seen several nightmarish `package.json`s, many of which included numerous outdated and even _unused_ dependencies. Other people shove _all_ packages directly into `dependencies` in `package.json`. Properly managing your packages will enable you to provide greater clarity to how your project is structured, amidst other things.

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
