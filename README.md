<p align="center">
  <a href="https://babeljs.io/">
    <img alt="babel" src="https://raw.githubusercontent.com/babel/logo/master/babel.png" width="546">
  </a>
</p>

<p align="center">
  The compiler for writing next generation JavaScript.
</p>

<p align="center">
  <a href="https://travis-ci.org/babel/babel"><img alt="Travis Status" src="https://img.shields.io/travis/babel/babel/master.svg?label=travis&maxAge=43200"></a>
  <a href="https://circleci.com/gh/babel/babel"><img alt="CircleCI Status" src="https://img.shields.io/circleci/project/github/babel/babel/master.svg?label=circle&maxAge=43200"></a>
  <a href="https://codecov.io/github/babel/babel"><img alt="Coverage Status" src="https://img.shields.io/codecov/c/github/babel/babel/master.svg?maxAge=43200"></a>
  <a href="https://slack.babeljs.io/"><img alt="Slack Status" src="https://slack.babeljs.io/badge.svg"></a>
  <a href="https://www.npmjs.com/package/babel-core"><img alt="npm Downloads" src="https://img.shields.io/npm/dm/babel-core.svg?maxAge=43200"></a>
</p>

<p align="center">
  <a href="#backers"><img alt="Backers on Open Collective" src="https://opencollective.com/babel/backers/badge.svg" /></a>
  <a href="#sponsors"><img alt="Sponsors on Open Collective" src="https://opencollective.com/babel/sponsors/badge.svg" /></a>
    <a href="https://medium.com/friendship-dot-js/i-peeked-into-my-node-modules-directory-and-you-wont-believe-what-happened-next-b89f63d21558"><img alt="Business Strategy Status" src="https://img.shields.io/badge/business%20model-flavortown-green.svg"></a>
</p>

Babel is a community-driven tool that helps you write code in the latest version of JavaScript.

When your supported environments don't support certain features natively, Babel will help you compile those features down to a supported version.

**In**

```js
// ES2015 arrow function
[1, 2, 3].map((n) => n + 1);
```

**Out**

```js
[1, 2, 3].map(function(n) {
  return n + 1;
});
```

Try it out at our [REPL](https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=latest&code=%5B1%2C2%2C3%5D.map(n%20%3D%3E%20n%20%2B%201)%3B&experimental=true&loose=true&spec=false&playground=false&stage=0) and follow us at [@babeljs](https://twitter.com/babeljs).

- [FAQ](#faq)
- [Packages](#packages)
  - [Core Packages](#core-packages)
  - [Other](#other) 
  - [Presets](#presets)
  - [Plugins](#plugins)
    - [Transform Plugins](#transform-plugins)
    - [Syntax Plugins](#syntax-plugins)
  - [Misc Packages](#misc-packages)
- [Team](#team)
- [License](#license)

# FAQ

## Docs?

Check out our website: [babeljs.io](http://babeljs.io/)

## Looking for support?

For questions and support please visit our [discussion forum](https://discuss.babeljs.io/), sign up for our [Slack community](https://slack.babeljs.io/), or [StackOverflow](http://stackoverflow.com/questions/tagged/babeljs).

## Want to report a bug or request a feature?

Bugs and feature requests can be posted at https://github.com/babel/babel/issues.

> We've moved our issues from phabricator back to github issues!

Former phabricator issue URLs now automatically redirect to their corresponding Github issue:

https://phabricator.babeljs.io/T2168 mostly corresponds to https://github.com/babel/babel/issues/2168.

## Want to report an issue with [babeljs.io](https://babeljs.io) (the website)?

For documentation and website issues please visit the [babel/website](https://github.com/babel/website) repo.

## Want to contribute to Babel?

Check out our [CONTRIBUTING.md](https://github.com/babel/babel/blob/master/CONTRIBUTING.md). If you have already joined Slack, join our [#development](https://babeljs.slack.com/messages/development) channel!

You can also start by checking out the issues with the [help-wanted](https://github.com/babel/babel/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) label.

Our discussions/notes/roadmap: [babel/notes](https://github.com/babel/notes)
Our progress on TC39 proposals: [babel/proposals](https://github.com/babel/proposals)

## Packages

The Babel repo is managed as a [monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md) that is composed of many npm packages.

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
- [`babel-types`](/packages/babel-types) is used to validate, build and change AST nodes.
- [`babel-polyfill`](/packages/babel-polyfill) is [literally a wrapper](https://github.com/babel/babel/blob/master/packages/babel-polyfill/src/index.js) around [`core-js`](https://github.com/zloirock/core-js) and [regenerator-runtime](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime). Check out the [docs](https://babeljs.io/docs/usage/polyfill/).
- [`babel-runtime`](/packages/babel-runtime) is similar to the polyfill except that it doesn't modify the global scope and is to be used with [`babel-plugin-transform-runtime`](/packages/babel-plugin-transform-runtime) (usually in library/plugin code). Check out the [docs](https://babeljs.io/docs/plugins/transform-runtime/).
- [`babel-register`](/packages/babel-register) is a way to automatically compile files with Babel on the fly by binding to Node.js `require`. Check out the [docs](http://babeljs.io/docs/usage/require/).
- [`babel-template`](/packages/babel-template) is a helper function that allows constructing AST nodes from a string presentation of the code; this eliminates the tedium of using `babel-types` for building AST nodes.
- [`babel-helpers`](/packages/babel-helpers) is a set of pre-made `babel-template` functions that are used in some Babel plugins.
- [`babel-code-frame`](/packages/babel-code-frame) is a standalone package used to generate errors that print the source code and point to error locations.

### [Presets](http://babeljs.io/docs/plugins/#presets)

After Babel 6, the default transforms were removed; if you don't specify any plugins/presets, Babel will just return the original source code.

The transformer[s] used in Babel are the independent pieces of code that transform specific things. For example: the [`es2015-arrow-functions`](/packages/babel-plugin-transform-es2015-arrow-functions) transform specifically changes arrow functions into regular functions. A preset is simply an array of plugins that make it easier to run a whole a set of transforms without specifying each one manually.

| Package | Version | Dependencies | Description |
|--------|-------|------------|---|
| [`babel-preset-env`](https://github.com/babel/babel-preset-env) | [![npm](https://img.shields.io/npm/v/babel-preset-env.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-preset-env) | [![Dependency Status](https://david-dm.org/babel/babel-preset-env.svg)](https://david-dm.org/babel/babel-preset-env) | automatically determines plugins and polyfills you need based on your supported environments |

> You can find community maintained presets on [npm](https://www.npmjs.com/search?q=babel-preset)

### [Plugins](http://babeljs.io/docs/plugins)

Plugins are the heart of Babel and what make it work.

> You can find community plugins on [npm](https://www.npmjs.com/search?q=babel-plugin).

#### Transform Plugins

There are many kinds of plugins: ones that convert ES6/ES2015 to ES5, transform to ES3, minification, JSX, flow, experimental features, and more. Check out our [website for more](http://babeljs.io/docs/plugins/#transform-plugins).

#### Syntax Plugins

These just enable the transform plugins to be able to parse certain features (the transform plugins already include the syntax plugins so you don't need both): `babel-plugin-syntax-x`. Check out our [website for more](http://babeljs.io/docs/plugins/#syntax-plugins).

### Helpers

These are mostly for internal use in various plugins: `babel-helper-x`.

## Team

### Core members

[![Babel](https://avatars.githubusercontent.com/u/9637642?s=64)](https://github.com/babel) | [![Daniel Tschinder](https://avatars.githubusercontent.com/u/231804?s=64)](https://github.com/danez) | [![Logan Smyth](https://avatars.githubusercontent.com/u/132260?s=64)](https://github.com/loganfsmyth) | [![Henry Zhu](https://avatars.githubusercontent.com/u/588473?s=64)](https://github.com/hzoo) | 
|---|---|---|---|
Babel | Daniel Tschinder | Logan Smyth | Henry Zhu |
:octocat: [@babel](https://github.com/babel) | [@danez](https://github.com/danez) | [@loganfsmyth](https://github.com/loganfsmyth) | [@hzoo](https://github.com/hzoo) |
:bird: [@babeljs](https://twitter.com/babeljs) | [@TschinderDaniel](https://twitter.com/TschinderDaniel) | [@loganfsmyth](https://twitter.com/loganfsmyth) | [@left_pad](https://twitter.com/left_pad) |

### Members

[![Andrew Levine](https://avatars.githubusercontent.com/u/5233399?s=64)](https://github.com/drewml) | [![Boopathi Rajaa](https://avatars.githubusercontent.com/u/294474?s=64)](https://github.com/boopathi) | [![Brian Ng](https://avatars.githubusercontent.com/u/56288?s=64)](https://github.com/existentialism) | [![Dan Harper](https://avatars.githubusercontent.com/u/510740?s=64)](https://github.com/danharper) | [![diogo franco](https://avatars.githubusercontent.com/u/73085?s=64)](https://github.com/kovensky) | [![Aaron Ang](https://avatars1.githubusercontent.com/u/7579804?s=64)](https://github.com/aaronang) | [![Artem Yavorsky](https://avatars2.githubusercontent.com/u/1521229?s=64)](https://github.com/yavorsky) |
|---|---|---|---|---|---|---|
| Andrew Levine | Boopathi Rajaa | Brian Ng | Dan Harper | Diogo Franco | Aaron Ang | Artem Yavorsky |
| [@drewml](https://github.com/drewml) | [@boopathi](https://github.com/boopathi) | [@existentialism](https://github.com/existentialism) | [@danharper](https://github.com/danharper) | [@kovensky](https://github.com/kovensky) | [@aaronang](https://github.com/aaronang) | [@yavorsky](https://github.com/yavorsky) |
| [@drewml](https://twitter.com/drewml) | [@heisenbugger](https://twitter.com/heisenbugger) | [@existentialism](https://twitter.com/existentialism) | [@DanHarper7](https://twitter.com/DanHarper7) | [@kovnsk](https://twitter.com/kovnsk) | [@_aaronang](https://twitter.com/_aaronang) | [@yavorsky_](https://twitter.com/yavorsky_) |

[![Juriy Zaytsev](https://avatars.githubusercontent.com/u/383?s=64)](https://github.com/kangax) | [![Kai Cataldo](https://avatars.githubusercontent.com/u/7041728?s=64)](https://github.com/kaicataldo) | [![Moti Zilberman](https://avatars.githubusercontent.com/u/2246565?s=64)](https://github.com/motiz88) | [![Sven Sauleau](https://avatars3.githubusercontent.com/u/1493671?s=64)](https://github.com/xtuc) | [![Samuel Reed](https://avatars3.githubusercontent.com/u/1197375?s=64)](https://github.com/STRML) | [![Sergey Rubanov](https://avatars1.githubusercontent.com/u/1507086?s=64)](https://github.com/chicoxyzzy) |
|---|---|---|---|---|---|
| Juriy Zaytsev | Kai Cataldo | Moti Zilberman | Sven Sauleau | Samuel Reed | Sergey Rubanov |
| [@kangax](https://github.com/kangax) | [@kaicataldo](https://github.com/kaicataldo) | [@motiz88](https://github.com/motiz88) | [@xtuc](https://github.com/xtuc) | [@STRML](https://github.com/STRML) | [@chicoxyzzy](https://github.com/chicoxyzzy) |
| [@kangax](https://twitter.com/kangax) | [@kai_cataldo](https://twitter.com/kai_cataldo) | [@motiz88](https://twitter.com/motiz88) | [@svensauleau](https://twitter.com/svensauleau) | [@STRML_](https://twitter.com/STRML_) | [@chicoxyzzy](https://twitter.com/chicoxyzzy) |

### Non-Human Members

[<img src="https://github.com/babel/babel-bot/raw/master/babel-bot.png" height="64">](https://github.com/babel-bot) | 
|---|
| Babel Bot |
| [@babel-bot](https://github.com/babel-bot) |
| [@babeljs](https://twitter.com/babeljs) |

### Inactive members

[![Amjad Masad](https://avatars.githubusercontent.com/u/587518?s=64)](https://github.com/amasad) | [![James Kyle](https://avatars.githubusercontent.com/u/952783?s=64)](https://github.com/thejameskyle) | [![Jesse McCarthy](https://avatars.githubusercontent.com/u/129203?s=64)](https://github.com/jmm) | [![Sebastian McKenzie](https://avatars.githubusercontent.com/u/853712?s=64)](https://github.com/kittens) (Creator) | 
|---|---|---|---|
Amjad Masad | James Kyle | Jesse McCarthy | Sebastian McKenzie | 
[@amasad](https://github.com/amasad) | [@thejameskyle](https://github.com/thejameskyle) | [@jmm](https://github.com/jmm) | [@sebmck](https://twitter.com/sebmck) |
| [@amasad](https://twitter.com/amasad) | [@thejameskyle](https://twitter.com/thejameskyle) | [@mccjm](https://twitter.com/mccjm) | [@kittens](https://github.com/kittens) 


# Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/babel#backer)]

<a href="https://opencollective.com/babel/backer/0/website" target="_blank"><img src="https://opencollective.com/babel/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/babel/backer/1/website" target="_blank"><img src="https://opencollective.com/babel/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/babel/backer/2/website" target="_blank"><img src="https://opencollective.com/babel/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/babel/backer/3/website" target="_blank"><img src="https://opencollective.com/babel/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/babel/backer/4/website" target="_blank"><img src="https://opencollective.com/babel/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/babel/backer/5/website" target="_blank"><img src="https://opencollective.com/babel/backer/5/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/6/website" target="_blank"><img src="https://opencollective.com/babel/backer/6/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/7/website" target="_blank"><img src="https://opencollective.com/babel/backer/7/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/8/website" target="_blank"><img src="https://opencollective.com/babel/backer/8/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/9/website" target="_blank"><img src="https://opencollective.com/babel/backer/9/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/10/website" target="_blank"><img src="https://opencollective.com/babel/backer/10/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/11/website" target="_blank"><img src="https://opencollective.com/babel/backer/11/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/12/website" target="_blank"><img src="https://opencollective.com/babel/backer/12/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/13/website" target="_blank"><img src="https://opencollective.com/babel/backer/13/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/14/website" target="_blank"><img src="https://opencollective.com/babel/backer/14/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/15/website" target="_blank"><img src="https://opencollective.com/babel/backer/15/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/16/website" target="_blank"><img src="https://opencollective.com/babel/backer/16/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/17/website" target="_blank"><img src="https://opencollective.com/babel/backer/17/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/18/website" target="_blank"><img src="https://opencollective.com/babel/backer/18/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/19/website" target="_blank"><img src="https://opencollective.com/babel/backer/19/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/20/website" target="_blank"><img src="https://opencollective.com/babel/backer/20/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/21/website" target="_blank"><img src="https://opencollective.com/babel/backer/21/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/22/website" target="_blank"><img src="https://opencollective.com/babel/backer/22/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/23/website" target="_blank"><img src="https://opencollective.com/babel/backer/23/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/24/website" target="_blank"><img src="https://opencollective.com/babel/backer/24/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/25/website" target="_blank"><img src="https://opencollective.com/babel/backer/25/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/26/website" target="_blank"><img src="https://opencollective.com/babel/backer/26/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/27/website" target="_blank"><img src="https://opencollective.com/babel/backer/27/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/28/website" target="_blank"><img src="https://opencollective.com/babel/backer/28/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/29/website" target="_blank"><img src="https://opencollective.com/babel/backer/29/avatar.svg"></a>

# Sponsors

Become a sponsor and get your logo on our README on Github with a link to your site. [[Become a sponsor](https://opencollective.com/babel#sponsor)]

<a href="https://opencollective.com/babel/sponsor/0/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/babel/sponsor/1/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/babel/sponsor/2/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/babel/sponsor/3/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/babel/sponsor/4/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/4/avatar.svg"></a>
 <a href="https://opencollective.com/babel/sponsor/5/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/5/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/6/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/6/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/7/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/7/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/8/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/8/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/9/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/9/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/10/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/10/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/11/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/11/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/12/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/12/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/13/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/13/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/14/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/14/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/15/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/15/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/16/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/16/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/17/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/17/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/18/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/18/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/19/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/19/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/20/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/20/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/21/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/21/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/22/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/22/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/23/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/23/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/24/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/24/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/25/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/25/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/26/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/26/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/27/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/27/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/28/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/28/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/29/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/29/avatar.svg"></a>

## License

[MIT](https://github.com/babel/babel/blob/master/LICENSE)
