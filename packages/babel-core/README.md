# @babel/core

> Babel compiler core.


```javascript
var babel = require("@babel/core");
import { transform } from "@babel/core";
import * as babel from "@babel/core";
```

All transformations will use your local configuration files (`.babelrc` or in `package.json`). See [options](#options) to disable it.


## babel.transform(code: string, [options?](#options): Object, callback: Function)

Transforms the passed in `code`. Calling a callback with an object with the generated code,
source map, and AST.

```js
babel.transform(code, options, function(err, result) {
  result; // => { code, map, ast }
});
```

**Example**

```js
babel.transform("code();", options, function(err, result) {
  result.code;
  result.map;
  result.ast;
});
```

### Compat Note:

In Babel 6, this method was synchronous and `transformSync` did not exist. For backward-compatibility,
this function will behave synchronously if no callback is given. If you're starting with Babel 7
and need synchronous behavior, please use `transformSync` since this backward-compat may be dropped in
future major versions of Babel.


## babel.transformSync(code: string, [options?](#options): Object)

Transforms the passed in `code`. Returning an object with the generated code,
source map, and AST.

```js
babel.transformSync(code, options) // => { code, map, ast }
```

**Example**

```js
var result = babel.transformSync("code();", options);
result.code;
result.map;
result.ast;
```


## babel.transformFile(filename: string, [options?](#options): Object, callback: Function)

Asynchronously transforms the entire contents of a file.

```js
babel.transformFile(filename, options, callback)
```

**Example**

```js
babel.transformFile("filename.js", options, function (err, result) {
  result; // => { code, map, ast }
});
```


## babel.transformFileSync(filename: string, [options?](#options): Object)

Synchronous version of `babel.transformFile`. Returns the transformed contents of
the `filename`.

```js
babel.transformFileSync(filename, options) // => { code, map, ast }
```

**Example**

```js
babel.transformFileSync("filename.js", options).code;
```


## babel.transformFromAst(ast: Object, code?: string, [options?](#options): Object, callback: Function): FileNode | null

Given an [AST](https://astexplorer.net/), transform it.

```js
const sourceCode = "if (true) return;";
const parsedAst = babylon.parse(sourceCode, { allowReturnOutsideFunction: true });
babel.transformFromAst(parsedAst, sourceCode, options, function(err, result) {
  const { code, map, ast } = result;
});
```

### Compat Note:

In Babel 6, this method was synchronous and `transformFromAstSync` did not exist. For backward-compatibility,
this function will behave synchronously if no callback is given. If you're starting with Babel 7
and need synchronous behavior, please use `transformFromAstSync` since this backward-compat may be dropped in
future major versions of Babel.


## babel.transformFromAstSync(ast: Object, code?: string, [options?](#options): Object)

Given an [AST](https://astexplorer.net/), transform it.

```js
const sourceCode = "if (true) return;";
const parsedAst = babylon.parse(sourceCode, { allowReturnOutsideFunction: true });
const { code, map, ast } = babel.transformFromAstSync(parsedAst, sourceCode, options);
```

## babel.parse(code: string, [options?](#options): Object)

Given some code, parse it using Babel's standard behavior. Referenced presets and
plugins will be loaded such that optional syntax plugins are automatically
enabled.


## Advanced APIs

Many systems that wrap Babel like to automatically inject plugins and presets,
or override options. To accomplish this goal, Babel exposes several functions
that aid in loading the configuration part-way without transforming.

### babel.loadOptions([options?](#options): Object)

Resolve Babel's options fully, resulting in an options object where:

* `opts.plugins` is a full list of `Plugin` instances.
* `opts.presets` is empty and all presets are flattened into `opts`.
* It can be safely passed back to Babel. Fields like `babelrc` have been set to 
  false so that later calls to Babel will not make a second attempt to load
  config files.

`Plugin` instances aren't meant to be manipulated directly, but often
callers will serialize this `opts` to JSON to use it as a cache key representing
the options Babel has received. Caching on this isn't 100% guaranteed to
invalidate properly, but it is the best we have at the moment.


### babel.loadPartialConfig([options?](#options): Object): PartialConfig

To allow systems to easily manipulate and validate a user's config, this function
resolves the plugins and presets and proceeds no further. The expectation is
that callers will take the config's `.options`, manipulate it as then see fit
and pass it back to Babel again.

* `babelrc: string | void` - The path of the `.babelrc` file, if there was one.
* `babelignore: string | void` - The path of the `.babelignore` file, if there was one.
* `options: ValidatedOptions` - The partially resolved options, which can be manipulated and passed back to Babel again.
  * `plugins: Array<ConfigItem>` - See below.
  * `presets: Array<ConfigItem>` - See below.
  * It can be safely passed back to Babel. Fields like `babelrc` have been set
    to false so that later calls to Babel will not make a second attempt to 
    load config files.
* `hasFilesystemConfig(): boolean` - Check if the resolved config loaded any settings from the filesystem.

[`ConfigItem`](#configitem-type) instances expose properties to introspect the values, but each
item should be treated as immutable. If changes are desired, the item should be
removed from the list and replaced with either a normal Babel config value, or
with a replacement item created by `babel.createConfigItem`. See that
function for information about `ConfigItem` fields.


### babel.createConfigItem(value: string | {} | Function | [string | {} | Function, {} | void], { dirname?: string, type?: "preset" | "plugin" }): ConfigItem

Allows build tooling to create and cache config items up front. If this function
is called multiple times for a given plugin, Babel will call the plugin's function itself
multiple times. If you have a clear set of expected plugins and presets to
inject, pre-constructing the config items would be recommended.


### `ConfigItem` type

Each `ConfigItem` exposes all of the information Babel knows. The fields are:

* `value: {} | Function` - The resolved value of the plugin.
* `options: {} | void` - The options object passed to the plugin.
* `dirname: string` - The path that the options are relative to.
* `name: string | void` - The name that the user gave the plugin instance, e.g. `plugins: [ ['env', {}, 'my-env'] ]` 
* `file: Object | void` - Information about the plugin's file, if Babel knows it.
  * `request: string` - The file that the user requested, e.g. `"@babel/env"`
  * `resolved: string` - The full path of the resolved file, e.g. `"/tmp/node_modules/@babel/preset-env/lib/index.js"`


## Options

<blockquote class="babel-callout babel-callout-info">
  <h4>Babel CLI</h4>
  <p>
    You can pass these options from the Babel CLI like so:
  </p>
  <p>
    <code>babel --name<span class="o">=</span>value</code>
  </p>
</blockquote>

Following is a table of the options you can use:

| Option                   | Default              | Description                     |
| ------------------------ | -------------------- | ------------------------------- |
| `ast`                    | `false`              | Include the AST in the returned object |
| `auxiliaryCommentAfter`  | `null`               | Attach a comment after all non-user injected code |
| `auxiliaryCommentBefore` | `null`               | Attach a comment before all non-user injected code |
| `root`                   | `"."`                | Specify the "root" folder that defines the location to search for "babel.config.js", and the default folder to allow `.babelrc` files inside of.|
| `configFile`             | `undefined`          | The config file to load Babel's config from. Defaults to searching for "babel.config.js" inside the "root" folder. `false` will disable searching for config files.|
| `babelrc`                | `(root)`             | Specify whether or not to use .babelrc and .babelignore files. Not available when using the CLI, [use `--no-babelrc` instead](https://babeljs.io/docs/usage/cli/#babel-ignoring-babelrc). `false` to disable searching, and `true` to always search, a string path of the package to search inside of, or an array of paths to packages to search inside of. |
| `envName`                | env vars             | Defaults to environment variable `BABEL_ENV` if set, or else `NODE_ENV` if set, or else it defaults to `"development"` |
| `code`                   | `true`               | Enable code generation |
| `comments`               | `true`               | Output comments in generated output |
| `compact`                | `"auto"`             | Do not include superfluous whitespace characters and line terminators. When set to `"auto"` compact is set to `true` on input sizes of >500KB |
| `env`                    | `{}`                 | This is an object of keys that represent different environments. For example, you may have: `{ env: { production: { /* specific options */ } } }` which will use those options when the `envName` is `production` |
| `extends`                | `null`               | A path to a `.babelrc` file to extend |
| `filename`               | `"unknown"`          | Filename for use in errors etc |
| `filenameRelative`       | `(filename)`         | Filename relative to `sourceRoot` |
| `generatorOpts`          | `{}`                 | An object containing the options to be passed down to the babel code generator, @babel/generator |
| `getModuleId`            | `null`               | Specify a custom callback to generate a module id with. Called as `getModuleId(moduleName)`. If falsy value is returned then the generated module id is used |
| `highlightCode`          | `true`               | ANSI highlight syntax error code frames |
| `ignore`                 | `null`               | Opposite to the `only` option. `ignore` is disregarded if `only` is specified |
| `inputSourceMap`         | `null`               | A source map object that the output source map will be based on |
| `minified`               | `false`              | Should the output be minified (not printing last semicolons in blocks, printing literal string values instead of escaped ones, stripping `()` from `new` when safe) |
| `moduleId`               | `null`               | Specify a custom name for module ids |
| `moduleIds`              | `false`              | If truthy, insert an explicit id for modules. By default, all modules are anonymous. (Not available for `common` modules) |
| `moduleRoot`             | `(sourceRoot)`       | Optional prefix for the AMD module formatter that will be prepend to the filename on module definitions |
| `only`                   | `null`               | A [glob](https://github.com/isaacs/minimatch), regex, or mixed array of both, matching paths to **only** compile. Can also be an array of arrays containing paths to explicitly match. When attempting to compile a non-matching file it's returned verbatim |
| `parserOpts`             | `{}`                 | An object containing the options to be passed down to the babel parser, babylon |
| `plugins`                | `[]`                 | List of [plugins](https://babeljs.io/docs/plugins/) to load and use |
| `presets`                | `[]`                 | List of [presets](https://babeljs.io/docs/plugins/#presets) (a set of plugins) to load and use |
| `retainLines`            | `false`              | Retain line numbers. This will lead to wacky code but is handy for scenarios where you can't use source maps. (**NOTE:** This will not retain the columns) |
| `shouldPrintComment`     | `null`               | An optional callback that controls whether a comment should be output or not. Called as `shouldPrintComment(commentContents)`. **NOTE:** This overrides the `comment` option when used |
| `sourceFileName`         | `(filenameRelative)` | Set `sources[0]` on returned source map |
| `sourceMaps`             | `false`              | If truthy, adds a `map` property to returned output. If set to `"inline"`, a comment with a sourceMappingURL directive is added to the bottom of the returned code. If set to `"both"` then a `map` property is returned as well as a source map comment appended. **This does not emit sourcemap files by itself!** To have sourcemaps emitted using the CLI, you must pass it the `--source-maps` option |
| `sourceRoot`             | `(moduleRoot)`       | The root from which all sources are relative |
| `sourceType`             | `"module"`           | Indicate the mode the code should be parsed in. Can be one of "script", "module", or "unambiguous". `"unambiguous"` will make Babel attempt to _guess_, based on the presence of ES6 `import` or `export` statements. Files with ES6 `import`s and `export`s are considered `"module"` and are otherwise `"script"`. |
| `wrapPluginVisitorMethod`| `null`               | An optional callback that can be used to wrap visitor methods. **NOTE:** This is useful for things like introspection, and not really needed for implementing anything. Called as `wrapPluginVisitorMethod(pluginAlias, visitorType, callback)`.
