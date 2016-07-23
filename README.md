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
</p>

## Docs?

<p align="center">Check out our website: http://babeljs.io/</p>

## Looking for support?

<p align="center">For questions and support please visit the <a href="https://discuss.babeljs.io/">discussion forum</a>, <a href="https://slack.babeljs.io/">Slack community</a>, or <a href="http://stackoverflow.com/questions/tagged/babeljs">StackOverflow</a>.</p>

## Want to report a bug or request a feature?

> We are in the process of moving our issues from phabricator back to github issues! Check out https://github.com/babel/phabricator-to-github for more info

<p align="center">Bugs and feature requests should be posted at <a href="https://phabricator.babeljs.io/">phabricator.babeljs.io</a>.</p>

> You can directly translate a github issue to phabricator; just add a T to the beginning of the issue.

```
https://phabricator.babeljs.io/T2168
corresponds to
https://github.com/babel/babel/issues/2168
```

## Want to report an issue with [babeljs.io](https://babeljs.io) (the website)?

<p align="center">
  For documentation and website issues please visit the <a href="https://github.com/babel/babel.github.io">babel.github.io</a> repo.
</p>

## Want to contribute to Babel?

<p align="center">
  Check out our <a href="https://github.com/babel/babel/blob/master/CONTRIBUTING.md">CONTRIBUTING.md.</a> If you have already joined slack, join our <a href="https://babeljs.slack.com/messages/development">#development</a> channel!
</p>

## Packages

The Babel repo is managed as a [monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md); it's composed of many npm packages.

### Core Packages

| Package | Version | Dependencies | DevDependencies |
|--------|-------|------------|----------|
| [`babel-core`](/packages/babel-core) | [![npm](https://img.shields.io/npm/v/babel-core.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-core) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-core)](https://david-dm.org/babel/babel?path=packages/babel-core) | [![devDependency Status](https://david-dm.org/babel/babel/dev-status.svg?path=packages/babel-core)](https://david-dm.org/babel/babel?path=packages/babel-core#info=devDependencies) |
| [`babylon`](https://github.com/babel/babylon) | [![npm](https://img.shields.io/npm/v/babylon.svg?maxAge=2592000)](https://www.npmjs.com/package/babylon) | [![Dependency Status](https://david-dm.org/babel/babylon.svg)](https://david-dm.org/babel/babylon) | [![devDependency Status](https://david-dm.org/babel/babylon/dev-status.svg)](https://david-dm.org/babel/babylon#info=devDependencies) |
| [`babel-traverse`](/packages/babel-traverse) | [![npm](https://img.shields.io/npm/v/babel-traverse.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-traverse) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-traverse)](https://david-dm.org/babel/babel?path=packages/babel-traverse) | [![devDependency Status](https://david-dm.org/babel/babel/dev-status.svg?path=packages/babel-traverse)](https://david-dm.org/babel/babel?path=packages/babel-traverse#info=devDependencies) |
| [`babel-types`](/packages/babel-types) | [![npm](https://img.shields.io/npm/v/babel-types.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-types) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-types)](https://david-dm.org/babel/babel?path=packages/babel-types) | [![devDependency Status](https://david-dm.org/babel/babel/dev-status.svg?path=packages/babel-types)](https://david-dm.org/babel/babel?path=packages/babel-types#info=devDependencies) |
| [`babel-generator`](/packages/babel-generator) | [![npm](https://img.shields.io/npm/v/babel-generator.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-generator) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-generator)](https://david-dm.org/babel/babel?path=packages/babel-generator) | [![devDependency Status](https://david-dm.org/babel/babel/dev-status.svg?path=packages/babel-generator)](https://david-dm.org/babel/babel?path=packages/babel-generator#info=devDependencies) |

`babel-core` is the compiler itself.

It is the package that exposes the `babel.transform` method, where `babel.transform(srcCode, opts) -> distCode`

The compiler can be broken down into 3 parts:
- The parser: [`babylon`](https://github.com/babel/babylon) (actually moved to a seperate repo)
- The transformer[s]: All the plugins/presets
  - These all use [`babel-traverse`](/packages/babel-traverse) to traverse through the AST
  - and [`babel-types`](/packages/babel-types) to validate, build, change AST nodes
- The generator: [`babel-generator`](/packages/babel-generator)

Check out the [`babel-handbook`](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#introduction) for more information on this.

### Presets

### Plugins

#### Transform Plugins

#### Syntax Plugins

### Helpers (mostly for internal/plugin use)

## License

[MIT](https://github.com/babel/babel/blob/master/LICENSE)
