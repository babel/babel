# Woah, what's going on here?

A monorepo, muhahahahahaha. See the [monorepo design doc](/doc/design/monorepo.md) for reasoning.

- [Core Packages](#core-packages)
- [Other](#other)
- [Presets](#presets)
- [Plugins](#plugins)
  - [Transform Plugins](#transform-plugins)
  - [Syntax Plugins](#syntax-plugins)

### Core Packages

| Package | Version | Dependencies |
|--------|-------|------------|
| [`@babel/core`](/packages/babel-core) | [![npm](https://img.shields.io/npm/v/@babel/core.svg)](https://www.npmjs.com/package/@babel/core) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-core)](https://david-dm.org/babel/babel?path=packages/babel-core) |
| [`@babel/parser`](/packages/babel-parser) | [![npm](https://img.shields.io/npm/v/@babel/parser.svg)](https://www.npmjs.com/package/@babel/parser) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-parser)](https://david-dm.org/babel/babel?path=packages/babel-parser) |
| [`@babel/traverse`](/packages/babel-traverse) | [![npm](https://img.shields.io/npm/v/@babel/traverse.svg)](https://www.npmjs.com/package/@babel/traverse) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-traverse)](https://david-dm.org/babel/babel?path=packages/babel-traverse) |
| [`@babel/generator`](/packages/babel-generator) | [![npm](https://img.shields.io/npm/v/@babel/generator.svg)](https://www.npmjs.com/package/@babel/generator) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-generator)](https://david-dm.org/babel/babel?path=packages/babel-generator) |

[`@babel/core`](/packages/babel-core) is the Babel compiler itself; it exposes the `babel.transform` method, where `transformedCode = transform(src).code`.

The compiler can be broken down into 3 parts:
- The parser: [`@babel/parser`](/packages/babel-parser)
- The transformer[s]: All the plugins/presets
  - These all use [`@babel/traverse`](/packages/babel-traverse) to traverse through the AST
- The generator: [`@babel/generator`](/packages/babel-generator)

The flow goes like this:

input string -> `@babel/parser` parser -> `AST` -> transformer[s] -> `AST` -> `@babel/generator` -> output string

Check out the [`babel-handbook`](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#introduction) for more information on this.

#### Other

| Package | Version | Dependencies |
|--------|-------|------------|
| [`@babel/cli`](/packages/babel-cli) | [![npm](https://img.shields.io/npm/v/@babel/cli.svg)](https://www.npmjs.com/package/@babel/cli) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-cli)](https://david-dm.org/babel/babel?path=packages/babel-cli) |
| [`@babel/types`](/packages/babel-types) | [![npm](https://img.shields.io/npm/v/@babel/types.svg)](https://www.npmjs.com/package/@babel/types) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-types)](https://david-dm.org/babel/babel?path=packages/babel-types) |
| [`@babel/polyfill`](/packages/babel-polyfill) | [![npm](https://img.shields.io/npm/v/@babel/polyfill.svg)](https://www.npmjs.com/package/@babel/polyfill) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-polyfill)](https://david-dm.org/babel/babel?path=packages/babel-polyfill) |
| [`@babel/runtime`](/packages/babel-runtime) | [![npm](https://img.shields.io/npm/v/@babel/runtime.svg)](https://www.npmjs.com/package/@babel/runtime) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-runtime)](https://david-dm.org/babel/babel?path=packages/babel-runtime) |
| [`@babel/register`](/packages/babel-register) | [![npm](https://img.shields.io/npm/v/@babel/register.svg)](https://www.npmjs.com/package/@babel/register) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-register)](https://david-dm.org/babel/babel?path=packages/babel-register) |
| [`@babel/template`](/packages/babel-template) | [![npm](https://img.shields.io/npm/v/@babel/template.svg)](https://www.npmjs.com/package/@babel/template) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-template)](https://david-dm.org/babel/babel?path=packages/babel-template) |
| [`@babel/helpers`](/packages/babel-helpers) | [![npm](https://img.shields.io/npm/v/@babel/helpers.svg)](https://www.npmjs.com/package/@babel/helpers) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-helpers)](https://david-dm.org/babel/babel?path=packages/babel-helpers) |
| [`@babel/code-frame`](/packages/babel-code-frame) | [![npm](https://img.shields.io/npm/v/@babel/code-frame.svg)](https://www.npmjs.com/package/@babel/code-frame) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-code-frame)](https://david-dm.org/babel/babel?path=packages/babel-code-frame) |

- [`@babel/cli`](/packages/babel-cli) is the CLI tool that runs `@babel/core` and helps with outputting to a directory, a file, stdout and more (also includes `@babel/node` cli). Check out the [docs](https://babeljs.io/docs/usage/cli/).
- [`@babel/types`](/packages/babel-types) is used to validate, build and change AST nodes.
- [`@babel/polyfill`](/packages/babel-polyfill) is [literally a wrapper](/packages/babel-polyfill/src/index.js) around [`core-js`](https://github.com/zloirock/core-js) and [regenerator-runtime](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime). Check out the [docs](https://babeljs.io/docs/usage/polyfill/).
- [`@babel/runtime`](/packages/babel-runtime) is similar to the polyfill except that it doesn't modify the global scope and is to be used with [`@babel/plugin-transform-runtime`](/packages/babel-plugin-transform-runtime) (usually in library/plugin code). Check out the [docs](https://babeljs.io/docs/plugins/transform-runtime/).
- [`@babel/register`](/packages/babel-register) is a way to automatically compile files with Babel on the fly by binding to Node.js `require`. Check out the [docs](http://babeljs.io/docs/usage/require/).
- [`@babel/template`](/packages/babel-template) is a helper function that allows constructing AST nodes from a string presentation of the code; this eliminates the tedium of using `@babel/types` for building AST nodes.
- [`@babel/helpers`](/packages/babel-helpers) is a set of pre-made `@babel/template` functions that are used in some Babel plugins.
- [`@babel/code-frame`](/packages/babel-code-frame) is a standalone package used to generate errors that print the source code and point to error locations.

### [Presets](http://babeljs.io/docs/plugins/#presets)

After Babel 6, the default transforms were removed; if you don't specify any plugins/presets, Babel will just return the original source code.

The transformer[s] used in Babel are the independent pieces of code that transform specific things. For example: the [`es2015-arrow-functions`](/packages/babel-plugin-transform-arrow-functions) transform specifically changes arrow functions into regular functions. A preset is simply an array of plugins that make it easier to run a whole a set of transforms without specifying each one manually.

| Package | Version | Dependencies | Description |
|--------|-------|------------|---|
| [`@babel/preset-env`](/packages/babel-preset-env) | [![npm](https://img.shields.io/npm/v/@babel/preset-env.svg)](https://www.npmjs.com/package/@babel/preset-env) | [![Dependency Status](https://david-dm.org/babel/babel/status.svg?path=packages/babel-preset-env)](https://david-dm.org/babel/babel?path=packages/babel-preset-env) | automatically determines plugins and polyfills you need based on your supported environments |

> You can find community maintained presets on [npm](https://www.npmjs.com/search?q=babel-preset)

### [Plugins](http://babeljs.io/docs/plugins)

Plugins are the heart of Babel and what make it work.

> You can find community plugins on [npm](https://www.npmjs.com/search?q=babel-plugin).

#### Transform Plugins

There are many kinds of plugins: ones that convert ES6/ES2015 to ES5, transform to ES3, minification, JSX, flow, experimental features, and more. Check out our [website for more](http://babeljs.io/docs/plugins/#transform-plugins).

#### Syntax Plugins

These just enable the transform plugins to be able to parse certain features (the transform plugins already include the syntax plugins so you don't need both): `@babel/plugin-syntax-x`. Check out our [website for more](http://babeljs.io/docs/plugins/#syntax-plugins).

### Helpers

These are mostly for internal use in various plugins: `@babel/helper-x`.
