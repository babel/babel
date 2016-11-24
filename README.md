<p align="center">
  <a href="https://babeljs.io/">
    <img alt="babel" src="https://raw.githubusercontent.com/babel/logo/master/babel.png" width="546">
  </a>
</p>

<p align="center">
  The compiler for writing next generation JavaScript.
</p>

<p align="center">
  <a href="https://travis-ci.org/babel/babel"><img alt="Travis Status" src="https://img.shields.io/travis/babel/babel/master.svg?style=flat&label=travis"></a>
  <a href="https://circleci.com/gh/babel/babel"><img alt="CircleCI Status" src="https://img.shields.io/circleci/project/babel/babel/master.svg?style=flat&label=circle"></a>
  <a href="https://codecov.io/github/babel/babel"><img alt="Coverage Status" src="https://img.shields.io/codecov/c/github/babel/babel/master.svg?style=flat"></a>
  <a href="https://slack.babeljs.io/"><img alt="Slack Status" src="https://slack.babeljs.io/badge.svg"></a>
  <a href="https://www.npmjs.com/package/babel-core"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/babel-core.svg"></a>
</p>

Babel is a tool that helps you write the latest version of Javascript.

When your supported environments don't support certain features natively, it will compile it down to a supported version. 

Try it out at our [REPL](https://babeljs.io/repl) and follow us at [@babeljs](https://twitter.com/babeljs).

- [FAQ](#faq)
- [Packages](#packages)
  - [Core Packages](#core-packages)
  - [Other](#other) 
  - [Presets](#presets)
  - [Plugins](#plugins)
    - [Transform Plugins](#transform-plugins)
    - [Syntax Plugins](#syntax-plugins)
  - [Misc Packages](#misc-packages)
- [License](#license)

# FAQ

## Docs?

Check out our website: [babeljs.io](http://babeljs.io/)

## Looking for support?

For questions and support please visit our [discussion forum](https://discuss.babeljs.io/), sign up for our [Slack community](https://slack.babeljs.io/), or [StackOverflow](http://stackoverflow.com/questions/tagged/babeljs).

## Want to report a bug or request a feature?

Bugs and feature requests can be posted at https://github.com/babel/babel/issues.

> We've moved our issues from phabricator back to github issues!

Former phabricator issue urls now automatically redirect to their corresponding Github issue:

https://phabricator.babeljs.io/T2168 mostly corresponds to https://github.com/babel/babel/issues/2168.

## Want to report an issue with [babeljs.io](https://babeljs.io) (the website)?

For documentation and website issues please visit the [babel/babel.github.io](https://github.com/babel/babel.github.io)repo.

## Want to contribute to Babel?

Check out our [CONTRIBUTING.md](https://github.com/babel/babel/blob/master/CONTRIBUTING.md). If you have already joined slack, join our [#development](https://babeljs.slack.com/messages/development) channel!

You can also start by checking out the issues with the [help-wanted](https://github.com/babel/babel/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) label.

Our discussions/notes/roadmap: [babel/notes](https://github.com/babel/notes)

## Packages

The Babel repo is managed as a [monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md); it's composed of many npm packages.

### Core Packages

| Package | Version | Dependencies |
|--------|-------|------------|
| [`babel-core`](/packages/babel-core) | [![npm](https://img.shields.io/npm/v/babel-core.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-core) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-core)](https://david-dm.org/babel/babel?path=packages/babel-core) |
| [`babylon`](https://github.com/babel/babylon) | [![npm](https://img.shields.io/npm/v/babylon.svg?maxAge=2592000)](https://www.npmjs.com/package/babylon) | [![Dependency Status](https://david-dm.org/babel/babylon.svg)](https://david-dm.org/babel/babylon) |
| [`babel-traverse`](/packages/babel-traverse) | [![npm](https://img.shields.io/npm/v/babel-traverse.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-traverse) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-traverse)](https://david-dm.org/babel/babel?path=packages/babel-traverse) |
| [`babel-generator`](/packages/babel-generator) | [![npm](https://img.shields.io/npm/v/babel-generator.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-generator) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-generator)](https://david-dm.org/babel/babel?path=packages/babel-generator) |

[`babel-core`](/packages/babel-core) is the Babel compiler itself; it exposes the `babel.transform` method, where `transformedCode = transform(src).code`.

The compiler can be broken down into 3 parts:
- The parser: [`babylon`](https://github.com/babel/babylon) (moved to a separate repo and versioned independently)
- The transformer[s]: All the plugins/presets
  - These all use [`babel-traverse`](/packages/babel-traverse) to traverse through the AST
- The generator: [`babel-generator`](/packages/babel-generator)

The flow goes like this:

input string -> `babylon` parser -> `AST` -> transformer[s] -> `AST` -> `babel-generator` -> output string

Check out the [`babel-handbook`](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#introduction) for more information on this.

#### Other

| Package | Version | Dependencies |
|--------|-------|------------|
| [`babel-cli`](/packages/babel-cli) | [![npm](https://img.shields.io/npm/v/babel-cli.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-cli) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-cli)](https://david-dm.org/babel/babel?path=packages/babel-cli) |
| [`babel-types`](/packages/babel-types) | [![npm](https://img.shields.io/npm/v/babel-types.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-types) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-types)](https://david-dm.org/babel/babel?path=packages/babel-types) |
| [`babel-polyfill`](/packages/babel-polyfill) | [![npm](https://img.shields.io/npm/v/babel-polyfill.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-polyfill) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-polyfill)](https://david-dm.org/babel/babel?path=packages/babel-polyfill) |
| [`babel-runtime`](/packages/babel-runtime) | [![npm](https://img.shields.io/npm/v/babel-runtime.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-runtime) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-runtime)](https://david-dm.org/babel/babel?path=packages/babel-runtime) |
| [`babel-register`](/packages/babel-register) | [![npm](https://img.shields.io/npm/v/babel-register.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-register) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-register)](https://david-dm.org/babel/babel?path=packages/babel-register) |
| [`babel-template`](/packages/babel-template) | [![npm](https://img.shields.io/npm/v/babel-template.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-template) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-template)](https://david-dm.org/babel/babel?path=packages/babel-template) |
| [`babel-helpers`](/packages/babel-helpers) | [![npm](https://img.shields.io/npm/v/babel-helpers.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-helpers) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-helpers)](https://david-dm.org/babel/babel?path=packages/babel-helpers) |
| [`babel-code-frame`](/packages/babel-code-frame) | [![npm](https://img.shields.io/npm/v/babel-code-frame.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-code-frame) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-code-frame)](https://david-dm.org/babel/babel?path=packages/babel-code-frame) |

- [`babel-cli`](/packages/babel-cli) is the CLI tool that runs `babel-core` and helps with outputting to a directory, a file, stdout and more (also includes `babel-node`). Check out the [docs](https://babeljs.io/docs/usage/cli/).
- [`babel-types`](/packages/babel-types) is used to validate, build, change AST nodes.
- [`babel-polyfill`](/packages/babel-polyfill) is [literally a wrapper](https://github.com/babel/babel/blob/master/packages/babel-polyfill/src/index.js) around [`core-js`](https://github.com/zloirock/core-js) and [regenerator-runtime](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime). Check out the [docs](https://babeljs.io/docs/usage/polyfill/).
- [`babel-runtime`](/packages/babel-runtime) is similar to the polyfill except that it doesn't modify the global scope and is to be used with [`babel-plugin-transform-runtime`](/packages/babel-plugin-transform-runtime) (usually in library/plugin code). Check out the [docs](https://babeljs.io/docs/plugins/transform-runtime/)
- [`babel-register`](/packages/babel-register) is a way to automatically compile files with babel on the fly by binding to node's require. Check out the [docs](http://babeljs.io/docs/usage/require/)
- [`babel-template`](/packages/babel-template) is a helper function to make AST nodes. Instead you can pass a string representing the code you want to create rather than tediously building them using `babel-types`.
- [`babel-helpers`](/packages/babel-helpers) is a set of premade `babel-template` functions that are used in some babel plugins.
- [`babel-code-frame`](/packages/babel-code-frame) is a standalone package used to generate errors that prints the source code and points to error locations.

### [Presets](http://babeljs.io/docs/plugins/#presets)

After Babel 6, the default transforms were removed; if you don't specify any plugins/presets it will just return the original source code.

The transformer[s] used in Babel are the independent pieces of code that transform specific things. For example: the [`es2015-arrow-functions`](/packages/babel-plugin-transform-es2015-arrow-functions) transform specifically changes arrow functions into a regular function. Presets are just simply an array of plugins that make it easier to run a whole a set of transforms without specifying each one manually.

There are a few presets that we maintain officially.

| Package | Version | Dependencies |
|--------|-------|------------|
| [`babel-preset-es2015`](/packages/babel-preset-es2015) | [![npm](https://img.shields.io/npm/v/babel-preset-es2015.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-preset-es2015) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-preset-es2015)](https://david-dm.org/babel/babel?path=packages/babel-preset-es2015) |
| [`babel-preset-es2016`](/packages/babel-preset-es2016) | [![npm](https://img.shields.io/npm/v/babel-preset-es2016.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-preset-es2016) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-preset-es2016)](https://david-dm.org/babel/babel?path=packages/babel-preset-es2016) |
| [`babel-preset-es2017`](/packages/babel-preset-es2017) | [![npm](https://img.shields.io/npm/v/babel-preset-es2017.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-preset-es2017) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-preset-es2017)](https://david-dm.org/babel/babel?path=packages/babel-preset-es2017) |
| [`babel-preset-latest`](/packages/babel-preset-latest) | [![npm](https://img.shields.io/npm/v/babel-preset-latest.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-preset-latest) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-preset-latest)](https://david-dm.org/babel/babel?path=packages/babel-preset-latest) |
| [`babel-preset-stage-0`](/packages/babel-preset-stage-0) | [![npm](https://img.shields.io/npm/v/babel-preset-stage-0.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-preset-stage-0) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-preset-stage-0)](https://david-dm.org/babel/babel?path=packages/babel-preset-stage-0) |
| [`babel-preset-stage-1`](/packages/babel-preset-stage-1) | [![npm](https://img.shields.io/npm/v/babel-preset-stage-1.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-preset-stage-1) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-preset-stage-1)](https://david-dm.org/babel/babel?path=packages/babel-preset-stage-1) |
| [`babel-preset-stage-2`](/packages/babel-preset-stage-2) | [![npm](https://img.shields.io/npm/v/babel-preset-stage-2.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-preset-stage-2) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-preset-stage-2)](https://david-dm.org/babel/babel?path=packages/babel-preset-stage-2) |
| [`babel-preset-stage-3`](/packages/babel-preset-stage-3) | [![npm](https://img.shields.io/npm/v/babel-preset-stage-3.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-preset-stage-3) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-preset-stage-3)](https://david-dm.org/babel/babel?path=packages/babel-preset-stage-3) |
| [`babel-preset-react`](/packages/babel-preset-react) | [![npm](https://img.shields.io/npm/v/babel-preset-react.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-preset-react) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-preset-react)](https://david-dm.org/babel/babel?path=packages/babel-preset-react) |

We maintain:

- a preset for each yearly release of ECMAScript (Javascript) starting from ES6/ES2015
- a preset for react (JSX/Flow)
- a preset for each [stage (0-3)](http://babeljs.io/docs/plugins/#stage-x-experimental-presets) of the [TC-39 Process](https://tc39.github.io/process-document/) for ECMAScript proposals.

> You can find community maintained presets on [npm](https://www.npmjs.com/search?q=babel-preset)

### [Plugins](http://babeljs.io/docs/plugins)

Plugins are the heart of Babel and what make it work.

> You can find community plugins on [npm](https://www.npmjs.com/search?q=babel-plugin).

#### Transform Plugins

There are many kinds of plugins: ones that convert ES6/ES2015 to ES5, transform to ES3, minification, JSX, flow, experimental features, and more.

| Package | Version | External Deps |
|--------|-------|------------|
| [`babel-plugin-check-es2015-constants`](/packages/babel-plugin-check-es2015-constants) | [![npm](https://img.shields.io/npm/v/babel-plugin-check-es2015-constants.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-check-es2015-constants) | |
| [`babel-plugin-transform-async-functions`](/packages/babel-plugin-transform-async-functions) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-async-functions.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-async-functions) | |
| [`babel-plugin-transform-async-generator-functions`](/packages/babel-plugin-transform-async-generator-functions) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-async-generator-functions.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-async-generator-functions) |
| [`babel-plugin-transform-async-to-generator`](/packages/babel-plugin-transform-async-to-generator) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-async-to-generator.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-async-to-generator) | |
| [`babel-plugin-transform-async-to-module-method`](/packages/babel-plugin-transform-async-to-module-method) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-async-to-module-method.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-async-to-module-method) | |
| [`babel-plugin-transform-class-properties`](/packages/babel-plugin-transform-class-properties) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-class-properties.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-class-properties) | |
| [`babel-plugin-transform-decorators`](/packages/babel-plugin-transform-decorators) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-decorators.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-decorators) | |
| [`babel-plugin-transform-do-expressions`](/packages/babel-plugin-transform-do-expressions) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-do-expressions.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-do-expressions) | |
| [`babel-plugin-transform-es2015-arrow-functions`](/packages/babel-plugin-transform-es2015-arrow-functions) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-arrow-functions.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-arrow-functions) | |
| [`babel-plugin-transform-es2015-block-scoped-functions`](/packages/babel-plugin-transform-es2015-block-scoped-functions) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-block-scoped-functions.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-block-scoped-functions) | |
| [`babel-plugin-transform-es2015-block-scoping`](/packages/babel-plugin-transform-es2015-block-scoping) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-block-scoping.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-block-scoping) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-plugin-transform-es2015-block-scoping)](https://david-dm.org/babel/babel?path=packages/babel-plugin-transform-es2015-block-scoping) |
| [`babel-plugin-transform-es2015-classes`](/packages/babel-plugin-transform-es2015-classes) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-classes.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-classes) | |
| [`babel-plugin-transform-es2015-computed-properties`](/packages/babel-plugin-transform-es2015-computed-properties) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-computed-properties.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-computed-properties) | |
| [`babel-plugin-transform-es2015-destructuring`](/packages/babel-plugin-transform-es2015-destructuring) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-destructuring.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-destructuring) | |
| [`babel-plugin-transform-es2015-duplicate-keys`](/packages/babel-plugin-transform-es2015-duplicate-keys) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-duplicate-keys.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-duplicate-keys) | |
| [`babel-plugin-transform-es2015-for-of`](/packages/babel-plugin-transform-es2015-for-of) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-for-of.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-for-of) | |
| [`babel-plugin-transform-es2015-function-name`](/packages/babel-plugin-transform-es2015-function-name) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-function-name.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-function-name) | |
| [`babel-plugin-transform-es2015-instanceof`](/packages/babel-plugin-transform-es2015-instanceof) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-instanceof.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-instanceof) | |
| [`babel-plugin-transform-es2015-literals`](/packages/babel-plugin-transform-es2015-literals) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-literals.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-literals) | |
| [`babel-plugin-transform-es2015-modules-amd`](/packages/babel-plugin-transform-es2015-modules-amd) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-modules-amd.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-modules-amd) | |
| [`babel-plugin-transform-es2015-modules-commonjs`](/packages/babel-plugin-transform-es2015-modules-commonjs) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-modules-commonjs.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-modules-commonjs) | |
| [`babel-plugin-transform-es2015-modules-systemjs`](/packages/babel-plugin-transform-es2015-modules-systemjs) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-modules-systemjs.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-modules-systemjs) | |
| [`babel-plugin-transform-es2015-modules-umd`](/packages/babel-plugin-transform-es2015-modules-umd) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-modules-umd.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-modules-umd) | |
| [`babel-plugin-transform-es2015-object-super`](/packages/babel-plugin-transform-es2015-object-super) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-object-super.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-object-super) | |
| [`babel-plugin-transform-es2015-parameters`](/packages/babel-plugin-transform-es2015-parameters) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-parameters.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-parameters) | |
| [`babel-plugin-transform-es2015-shorthand-properties`](/packages/babel-plugin-transform-es2015-shorthand-properties) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-shorthand-properties.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-shorthand-properties) | |
| [`babel-plugin-transform-es2015-spread`](/packages/babel-plugin-transform-es2015-spread) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-spread.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-spread) | |
| [`babel-plugin-transform-es2015-sticky-regex`](/packages/babel-plugin-transform-es2015-sticky-regex) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-sticky-regex.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-sticky-regex) | |
| [`babel-plugin-transform-es2015-template-literals`](/packages/babel-plugin-transform-es2015-template-literals) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-template-literals.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-template-literals) | |
| [`babel-plugin-transform-es2015-typeof-symbol`](/packages/babel-plugin-transform-es2015-typeof-symbol) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-typeof-symbol.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-typeof-symbol) | |
| [`babel-plugin-transform-es2015-unicode-regex`](/packages/babel-plugin-transform-es2015-unicode-regex) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es2015-unicode-regex.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es2015-unicode-regex) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-plugin-transform-es2015-unicode-regex)](https://david-dm.org/babel/babel?path=packages/babel-plugin-transform-es2015-unicode-regex) |
| [`babel-plugin-transform-es3-member-expression-literals`](/packages/babel-plugin-transform-es3-member-expression-literals) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es3-member-expression-literals.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es3-member-expression-literals) | |
| [`babel-plugin-transform-es3-property-literals`](/packages/babel-plugin-transform-es3-property-literals) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es3-property-literals.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es3-property-literals) | |
| [`babel-plugin-transform-es5-property-mutators`](/packages/babel-plugin-transform-es5-property-mutators) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-es5-property-mutators.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-es5-property-mutators) | |
| [`babel-plugin-transform-eval`](/packages/babel-plugin-transform-eval) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-eval.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-eval) | |
| [`babel-plugin-transform-exponentiation-operator`](/packages/babel-plugin-transform-exponentiation-operator) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-exponentiation-operator.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-exponentiation-operator) | |
| [`babel-plugin-transform-export-extensions`](/packages/babel-plugin-transform-export-extensions) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-export-extensions.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-export-extensions) | |
| [`babel-plugin-transform-flow-comments`](/packages/babel-plugin-transform-flow-comments) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-flow-comments.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-flow-comments) | |
| [`babel-plugin-transform-flow-strip-types`](/packages/babel-plugin-transform-flow-strip-types) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-flow-strip-types.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-flow-strip-types) | |
| [`babel-plugin-transform-function-bind`](/packages/babel-plugin-transform-function-bind) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-function-bind.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-function-bind) | |
| [`babel-plugin-transform-jscript`](/packages/babel-plugin-transform-jscript) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-jscript.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-jscript) | |
| [`babel-plugin-transform-object-assign`](/packages/babel-plugin-transform-object-assign) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-object-assign.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-object-assign) | |
| [`babel-plugin-transform-object-rest-spread`](/packages/babel-plugin-transform-object-rest-spread) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-object-rest-spread.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-object-rest-spread) | |
| [`babel-plugin-transform-object-set-prototype-of-to-assign`](/packages/babel-plugin-transform-object-set-prototype-of-to-assign) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-object-set-prototype-of-to-assign.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-object-set-prototype-of-to-assign) | |
| [`babel-plugin-transform-proto-to-assign`](/packages/babel-plugin-transform-proto-to-assign) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-proto-to-assign.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-proto-to-assign) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-plugin-transform-proto-to-assign)](https://david-dm.org/babel/babel?path=packages/babel-plugin-transform-proto-to-assign) |
| [`babel-plugin-transform-react-constant-elements`](/packages/babel-plugin-transform-react-constant-elements) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-react-constant-elements.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-react-constant-elements) | |
| [`babel-plugin-transform-react-display-name`](/packages/babel-plugin-transform-react-display-name) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-react-display-name.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-react-display-name) | |
| [`babel-plugin-transform-react-inline-elements`](/packages/babel-plugin-transform-react-inline-elements) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-react-inline-elements.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-react-inline-elements) | |
| [`babel-plugin-transform-react-jsx`](/packages/babel-plugin-transform-react-jsx) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-react-jsx.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-react-jsx) | |
| [`babel-plugin-transform-react-jsx-compat`](/packages/babel-plugin-transform-react-jsx-compat) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-react-jsx-compat.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-react-jsx-compat) | |
| [`babel-plugin-transform-react-jsx-self`](/packages/babel-plugin-transform-react-jsx-self) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-react-jsx-self.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-react-jsx-self) | |
| [`babel-plugin-transform-react-jsx-source`](/packages/babel-plugin-transform-react-jsx-source) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-react-jsx-source.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-react-jsx-source) | |
| [`babel-plugin-transform-regenerator`](/packages/babel-plugin-transform-regenerator) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-regenerator.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-regenerator) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-plugin-transform-regenerator)](https://david-dm.org/babel/babel?path=packages/babel-plugin-transform-regenerator) |
| [`babel-plugin-transform-runtime`](/packages/babel-plugin-transform-runtime) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-runtime.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-runtime) | |
| [`babel-plugin-transform-strict-mode`](/packages/babel-plugin-transform-strict-mode) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-strict-mode.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-strict-mode) | |

#### Syntax Plugins

These just enable the transform plugins to be able to parse certain features (the transform plugins already include the syntax plugins so you don't need both): `babel-plugin-syntax-x`.

### Helpers

These are mostly for internal use in various plugins: `babel-helper-x`.

### Misc Packages

- [`babel`](/packages/babel) the deprecated `babel` package on npm that was used in Babel 5.
- [`babel-messages`](/packages/babel-messages) a package to keep error messages, etc (not always used)

## License

[MIT](https://github.com/babel/babel/blob/master/LICENSE)
