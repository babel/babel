# babel-preset-env [![npm](https://img.shields.io/npm/v/babel-preset-env.svg)](https://www.npmjs.com/package/babel-preset-env) [![travis](https://img.shields.io/travis/babel/babel-preset-env/master.svg)](https://travis-ci.org/babel/babel-preset-env) [![npm-downloads](https://img.shields.io/npm/dm/babel-preset-env.svg)](https://www.npmjs.com/package/babel-preset-env) [![codecov](https://img.shields.io/codecov/c/github/babel/babel-preset-env/master.svg?maxAge=43200)](https://codecov.io/github/babel/babel-preset-env)

> A Babel preset that compiles [ES2015+](https://github.com/tc39/proposals/blob/master/finished-proposals.md) down to ES5 by automatically determining the Babel plugins and polyfills you need based on your targeted browser or runtime environments.

```sh
npm install babel-preset-env --save-dev
```

Without any configuration options, babel-preset-env behaves exactly the same as babel-preset-latest (or babel-preset-es2015, babel-preset-es2016, and babel-preset-es2017 together).

```json
{
  "presets": ["env"]
}
```

You can also configure it to only include the polyfills and transforms needed for the browsers you support. Compiling only what's needed can make your bundles smaller and your life easier.

This example only includes the polyfills and code transforms needed for the last two versions of each browser, and versions of Safari greater than or equal to 7. We use [browserslist](https://github.com/ai/browserslist) to parse this information, so you can use [any valid query format supported by browserslist](https://github.com/ai/browserslist#queries).

```json
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}
```

Similarly, if you're targeting Node.js instead of the browser, you can configure babel-preset-env to only include the polyfills and transforms necessary for a particular version:

```json
{
  "presets": [
    ["env", {
      "targets": {
        "node": "6.10"
      }
    }]
  ]
}
```

For convenience, you can use `"node": "current"` to only include the necessary polyfills and transforms for the Node.js version that you use to run Babel:

```json
{
  "presets": [
    ["env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
}
```

- [How it Works](#how-it-works)
- [Install](#install)
- [Usage](#usage)
- [Options](#options)
- [Examples](#examples)
- [Caveats](#caveats)
- [Other Cool Projects](#other-cool-projects)

## How it Works

### Determine environment support for ECMAScript features

Use external data such as [`compat-table`](https://github.com/kangax/compat-table) to determine browser support. (We should create PRs there when necessary)

![](https://cloud.githubusercontent.com/assets/588473/19214029/58deebce-8d48-11e6-9004-ee3fbcb75d8b.png)

We can periodically run [build-data.js](https://github.com/babel/babel-preset-env/blob/master/scripts/build-data.js) which generates [plugins.json](https://github.com/babel/babel-preset-env/blob/master/data/plugins.json).

Ref: [#7](https://github.com/babel/babel-preset-env/issues/7)

### Maintain a mapping between JavaScript features and Babel plugins

> Currently located at [plugin-features.js](https://github.com/babel/babel-preset-env/blob/master/data/plugin-features.js).

This should be straightforward to do in most cases. There might be cases where plugins should be split up more or certain plugins aren't standalone enough (or impossible to do).

### Support all plugins in Babel that are considered `latest`

> Default behavior without options is the same as `babel-preset-latest`.

It won't include `stage-x` plugins. env will support all plugins in what we consider the latest version of JavaScript (by matching what we do in [`babel-preset-latest`](http://babeljs.io/docs/plugins/preset-latest/)).

Ref: [#14](https://github.com/babel/babel-preset-env/issues/14)

### Determine the lowest common denominator of plugins to be included in the preset

If you are targeting IE 8 and Chrome 55 it will include all plugins required by IE 8 since you would need to support both still.

### Support a target option `"node": "current"` to compile for the currently running node version.

For example, if you are building on Node 6, arrow functions won't be converted, but they will if you build on Node 0.12.

### Support a `browsers` option like autoprefixer.

Use [browserslist](https://github.com/ai/browserslist) to declare supported environments by performing queries like `> 1%, last 2 versions`.

Ref: [#19](https://github.com/babel/babel-preset-env/pull/19)

### Browserslist support.

[Browserslist](https://github.com/ai/browserslist) is a library used to share a supported list of browsers between different front-end tools like [autoprefixer](https://github.com/postcss/autoprefixer), [stylelint](https://stylelint.io/), [eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat) and many others.

By default, babel-preset-env will use [browserslist config sources](https://github.com/ai/browserslist#queries).

For example, to enable only the polyfills and plugins needed for a project targeting *last 2 versions* and *IE10*:

**.babelrc**
```json
{
  "presets": [
    ["env", {
      "useBuiltIns": true
    }]
  ]
}
```

**browserslist**
```
Last 2 versions
IE 10
```

or

**package.json**
```
"browserslist": "last 2 versions, ie 10"
```

Browserslist config will be ignored if: 1) `targets.browsers` was specified 2) or with `ignoreBrowserslistConfig: true` option ([see more](#ignoreBrowserslistConfig)):

#### Targets merging.

1. If [targets.browsers](#browsers) is defined - the browserslist config will be ignored. The browsers specified in `targets` will be merged with [any other explicitly defined targets](#targets). If merged, targets defined explicitly will override the same targets received from `targets.browsers`.

2. If [targets.browsers](#browsers) is _not_ defined - the program will search browserslist file or `package.json` with `browserslist` field. The search will start from the working directory of the process or from the path specified by the `configPath` option, and go up to the system root. If both a browserslist file and configuration inside a `package.json` are found, an exception will be thrown.

3. If a browserslist config was found and other targets are defined (but not [targets.browsers](#browsers)), the targets will be merged in the same way as `targets` defined explicitly with `targets.browsers`.

## Install

With [npm](https://www.npmjs.com):

```sh
npm install --save-dev babel-preset-env
```

Or [yarn](https://yarnpkg.com):

```sh
yarn add babel-preset-env --dev
```

## Usage

The default behavior without options runs all transforms (behaves the same as [babel-preset-latest](https://babeljs.io/docs/plugins/preset-latest/)).

```json
{
  "presets": ["env"]
}
```

## Options

For more information on setting options for a preset, refer to the [plugin/preset options](http://babeljs.io/docs/plugins/#plugin-preset-options) documentation.

### `targets`

`{ [string]: number | string }`, defaults to `{}`.

Takes an object of environment versions to support.

Each target environment takes a number or a string (we recommend using a string when specifying minor versions like `node: "6.10"`).

Example environments: `chrome`, `opera`, `edge`, `firefox`, `safari`, `ie`, `ios`, `android`, `node`, `electron`.

The [data](https://github.com/babel/babel-preset-env/blob/master/data/plugins.json) for this is generated by running the [build-data script](https://github.com/babel/babel-preset-env/blob/master/scripts/build-data.js) which pulls in data from [compat-table](https://kangax.github.io/compat-table).

### `targets.node`

`number | string | "current" | true`

If you want to compile against the current node version, you can specify `"node": true` or `"node": "current"`, which would be the same as `"node": process.versions.node`.

### `targets.browsers`

`Array<string> | string`

A query to select browsers (ex: last 2 versions, > 5%) using [browserslist](https://github.com/ai/browserslist).

Note, browsers' results are overridden by explicit items from `targets`.

### `spec`

`boolean`, defaults to `false`.

Enable more spec compliant, but potentially slower, transformations for any plugins in this preset that support them.

### `loose`

`boolean`, defaults to `false`.

Enable "loose" transformations for any plugins in this preset that allow them.

### `modules`

`"amd" | "umd" | "systemjs" | "commonjs" | false`, defaults to `"commonjs"`.

Enable transformation of ES6 module syntax to another module type.

Setting this to `false` will not transform modules.

### `debug`

`boolean`, defaults to `false`.

Outputs the targets/plugins used and the version specified in [plugin data version](https://github.com/babel/babel-preset-env/blob/master/data/plugins.json) to `console.log`.

### `include`

`Array<string>`, defaults to `[]`.

An array of plugins to always include.

Valid options include any:

- [Babel plugins](https://github.com/babel/babel-preset-env/blob/master/data/plugin-features.js) - both with (`babel-plugin-transform-es2015-spread`) and without prefix (`transform-es2015-spread`) are supported.

- [Built-ins](https://github.com/babel/babel-preset-env/blob/master/data/built-in-features.js), such as `map`, `set`, or `object.assign`.

This option is useful if there is a bug in a native implementation, or a combination of a non-supported feature + a supported one doesn't work.

For example, Node 4 supports native classes but not spread. If `super` is used with a spread argument, then the `transform-es2015-classes` transform needs to be `include`d, as it is not possible to transpile a spread with `super` otherwise.

> NOTE: The `include` and `exclude` options _only_ work with the [plugins included with this preset](https://github.com/babel/babel-preset-env/blob/master/data/plugin-features.js); so, for example, including `transform-do-expressions` or excluding `transform-function-bind` will throw errors. To use a plugin _not_ included with this preset, add them to your [config](https://babeljs.io/docs/usage/babelrc/) directly.

### `exclude`

`Array<string>`, defaults to `[]`.

An array of plugins to always exclude/remove.

The possible options are the same as the `include` option.

This option is useful for "blacklisting" a transform like `transform-regenerator` if you don't use generators and don't want to include `regeneratorRuntime` (when using `useBuiltIns`) or for using another plugin like [fast-async](https://github.com/MatAtBread/fast-async) instead of [Babel's async-to-gen](http://babeljs.io/docs/plugins/transform-async-generator-functions/).

### `useBuiltIns`

`"usage"` | `"entry"` | `false`, defaults to `false`.

A way to apply `babel-preset-env` for polyfills (via `babel-polyfill`).

```sh
npm install babel-polyfill --save
```

#### `useBuiltIns: 'usage'`

Adds specific imports for polyfills when they are used in each file. We take advantage of the fact that a bundler will load the same polyfill only once.

**In**

a.js

```js
var a = new Promise();
```

b.js

```js
var b = new Map();
```

**Out (if environment doesn't support it)**

```js
import "babel-polyfill/core-js/modules/es6.promise";
var a = new Promise();
```

```js
import "babel-polyfill/core-js/modules/es6.map";
var b = new Map();
```

**Out (if environment supports it)**

```js
var a = new Promise();
```

```js
var b = new Map();
```

#### `useBuiltIns: 'entry'`

> NOTE: Only use `require("babel-polyfill");` once in your whole app.
> Multiple imports or requires of `babel-polyfill` will throw an error since it can cause global collisions and other issues that are hard to trace.
> We recommend creating a single entry file that only contains the `require` statement.

This option enables a new plugin that replaces the statement `import "babel-polyfill"` or `require("babel-polyfill")` with individual requires for `babel-polyfill` based on environment.

**In**

```js
import "babel-polyfill";
```

**Out (different based on environment)**

```js
import "babel-polyfill/core-js/modules/es7.string.pad-start";
import "babel-polyfill/core-js/modules/es7.string.pad-end";
```

#### `useBuiltIns: false`

Don't add polyfills automatically per file, or transform `import "babel-polyfill"` to individual polyfills.

### `forceAllTransforms`

`boolean`, defaults to `false`.

<p><details>
  <summary><b>Example</b></summary>

  With Babel 7's .babelrc.js support, you can force all transforms to be run if env is set to `production`.

  ```js
  module.exports = {
    presets: [
      ["env", {
        targets: {
          chrome: 59,
          edge: 13,
          firefox: 50,
        },
        // for uglifyjs...
        forceAllTransforms: process.env === "production"
      }],
    ],
  };
  ```
</details></p>


> NOTE: `targets.uglify` is deprecated and will be removed in the next major in
favor of this.

By default, this preset will run all the transforms needed for the targeted
environment(s). Enable this option if you want to force running _all_
transforms, which is useful if the output will be run through UglifyJS or an
environment that only supports ES5.

> NOTE: Uglify has a work-in-progress "Harmony" branch to address the lack of
ES6 support, but it is not yet stable.  You can follow its progress in
[UglifyJS2 issue #448](https://github.com/mishoo/UglifyJS2/issues/448).  If you
require an alternative minifier which _does_ support ES6 syntax, we recommend
using [babel-minify](https://github.com/babel/minify).

### `configPath`

`string`, defaults to `process.cwd()`

The starting point where the config search for browserslist will start, and ascend to the system root until found.

### `ignoreBrowserslistConfig`

`boolean`, defaults to `false`

Toggles whether or not [browserslist config sources](https://github.com/ai/browserslist#queries) are used, which includes searching for any browserslist files or referencing the browserslist key inside package.json. This is useful for projects that use a browserslist config for files that won't be compiled with Babel.

---

## Examples

### Export with various targets

```js
export class A {}
```

#### Target only Chrome 52

**.babelrc**

```json
{
  "presets": [
    ["env", {
      "targets": {
        "chrome": 52
      }
    }]
  ]
}
```

**Out**

```js
class A {}
exports.A = A;
```

#### Target Chrome 52 with webpack 2/rollup and loose mode

**.babelrc**

```json
{
  "presets": [
    ["env", {
      "targets": {
        "chrome": 52
      },
      "modules": false,
      "loose": true
    }]
  ]
}
```

**Out**

```js
export class A {}
```

#### Target specific browsers via browserslist

**.babelrc**

```json
{
  "presets": [
    ["env", {
      "targets": {
        "chrome": 52,
        "browsers": ["last 2 versions", "safari 7"]
      }
    }]
  ]
}
```

**Out**

```js
export var A = function A() {
  _classCallCheck(this, A);
};
```

#### Target latest node via `node: true` or `node: "current"`

**.babelrc**

```json
{
  "presets": [
    ["env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
}
```

**Out**

```js
class A {}
exports.A = A;
```

### Show debug output

**.babelrc**

```json
{
  "presets": [
    [ "env", {
      "targets": {
        "safari": 10
      },
      "modules": false,
      "useBuiltIns": true,
      "debug": true
    }]
  ]
}
```

**stdout**

```sh
Using targets:
{
  "safari": 10
}

Modules transform: false

Using plugins:
  transform-exponentiation-operator {}
  transform-async-to-generator {}

Using polyfills:
  es7.object.values {}
  es7.object.entries {}
  es7.object.get-own-property-descriptors {}
  web.timers {}
  web.immediate {}
  web.dom.iterable {}
```

### Include and exclude specific plugins/built-ins

> always include arrow functions, explicitly exclude generators

```json
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      },
      "include": ["transform-es2015-arrow-functions", "es6.map"],
      "exclude": ["transform-regenerator", "es6.set"]
    }]
  ]
}
```

## Issues

If you get a `SyntaxError: Unexpected token ...` error when using the [object-rest-spread](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-object-rest-spread) transform then make sure the plugin has been updated to, at least, `v6.19.0`.
