# JSTransform [![Build Status](https://travis-ci.org/facebook/jstransform.svg?branch=master)](https://travis-ci.org/facebook/jstransform)

A simple utility for pluggable JS syntax transforms using the esprima parser.

* Makes it simple to write and plug-in syntax transformations
* Makes it simple to coalesce multiple syntax transformations in a single pass of the AST
* Gives complete control over the formatting of the output on a per-transformation basis
* Supports source map generation
* Comes pre-bundled with a small set of (optional) ES6 -> ES5 transforms

- - -

**Note:**
If you're looking for a library for writing new greenfield JS transformations, consider looking at [Babel](https://github.com/babel/babel) or [Recast](https://github.com/benjamn/recast) instead of jstransform. We are still supporting jstransform (and intend to for a little while), but longer term we would like to direct efforts toward other open source projects that do a far better job of supporting a multi-pass JS transformation pipeline. This is important when attempting to apply many transformations to a source file. jstransform does a single pass resulting in performance benefits, but the tradeoff is that many transformations are much harder to write.

- - -

## Usage

### Advanced API

```js
var jstranform = require('jstransform')
```

This is the API that jstransform has always supported. It gives very fine control over the transforms you use and what order they are run in. It also allows the use of custom transforms.

#### `jstransform.transform(visitors, code, options={})`

**`visitors`**
Array of visitors. See [the React JSX visitors](https://github.com/facebook/jstransform/blob/master/visitors/react-jsx-visitors.js) as an example of what a visitor looks like.

**`code`**
String of code to be transformed.

**`options`**
Object with options that will be passed through to esprima and transforms.

#### `jstransform.Syntax`

This is the `Syntax` object re-exported from `esprima`. This is available because visitors will need access to this in order to effectively write transforms. By re-exporting we avoid the problem of conflicting versions of esprima being used.


### Simple API

```js
var simple = require('jstransform/simple')
```

The simple API was added to mirror the new command line interface. It works similarly to how `react-tools` worked - there is no need to know exactly which transforms to run. Instead transforms are selected automatically based on the options.

#### `simple.transform(code, options={})`

**`code`**
String of code to be transformed.

**`options`**
Object with options. Available options are:

option | values | default
-------|--------|--------
`react` | `true`: enable React transforms (JSX, displayName) | `false`
`es6` | `true`: enable ES6 transforms | `false`
`es7` | `true`: enable ES7 transforms | `false`
`harmony` | `true`: shortcut to enable ES6 & ES7 transforms | `false`
`utility` | `true`: enable utility transforms (trailing commas in objects, arrays) | `false`
`target` | `es3`: generate ES3 compatible code<br>`es5`: generate ES5 compatible code | `es5`
`stripTypes` | `true`: strips out Flow type annotations | `false`
`sourceMap` | `true`: generate and return a Source Map | `false`
`sourceMapInline` | `true`: append inline source map at the end of the transformed source | `false`
`sourceFilename` | the output filename for the source map | `"source.js"`
`es6module` | `true`: parses the file as an ES6 module | `false`
`nonStrictEs6module` | `true`: parses the file as an ES6 module, except disables implicit strict-mode (i.e. CommonJS modules et al are allowed) | `false`

*Returns:* An Object with the following:

**`code`**: the transformed code

**`sourceMap`**: the source map object or `null`

#### `simple.transformFile(file, options={}, callback)`

**`file`**
String of path to a file to transform. Will be passed directly to `fs.readFile`.

**`options`**
See `transform` API.

**`callback`**
Function to call with the result, where `result` is return value of `transform`.

```js
callback(err, result)
```

#### `simple.transformFileSync(file, options={})`

The same as `transformFile` but the file is read synchronously.


### CLI

JSTransform now ships with a CLI. It was taken from the `react-tools` CLI so should be very familiar.

```sh
% jstransform --help

  Usage: jstransform [options] <source directory> <output directory> [<module ID> [<module ID> ...]]

  Options:

    -h, --help                               output usage information
    -V, --version                            output the version number
    -c, --config [file]                      JSON configuration file (no file or - means STDIN)
    -w, --watch                              Continually rebuild
    -x, --extension <js | coffee | ...>      File extension to assume when resolving module identifiers
    --relativize                             Rewrite all module identifiers to be relative
    --follow-requires                        Scan modules for required dependencies
    --use-provides-module                    Respect @providesModules pragma in files
    --cache-dir <directory>                  Alternate directory to use for disk cache
    --no-cache-dir                           Disable the disk cache
    --source-charset <utf8 | win1252 | ...>  Charset of source (default: utf8)
    --output-charset <utf8 | win1252 | ...>  Charset of output (default: utf8)
    --react                                  Turns on the React JSX and React displayName transforms
    --es6                                    Turns on available ES6 transforms
    --es7                                    Turns on available ES7 transforms
    --harmony                                Shorthand to enable all ES6 and ES7 transforms
    --utility                                Turns on available utility transforms
    --target [version]                       Specify your target version of ECMAScript. Valid values are "es3" and "es5". The default is "es5". "es3" will avoid uses of defineProperty and will quote reserved words. WARNING: "es5" is not properly supported, even with the use of es5shim, es5sham. If you need to support IE8, use "es3".
    --strip-types                            Strips out type annotations.
    --es6module                              Parses the file as a valid ES6 module. (Note that this means implicit strict mode)
    --non-strict-es6module                   Parses the file as an ES6 module, except disables implicit strict-mode. (This is useful if you're porting non-ES6 modules to ES6, but haven't yet verified that they are strict-mode safe yet)
    --source-map-inline                      Embed inline sourcemap in transformed source
    --source-filename                        Filename to use when generating the inline sourcemap. Will default to filename when processing files
```

## Examples

### Advanced API

#### Using a pre-bundled or existing transform:

```js
/**
 * Reads a source file that may (or may not) contain ES6 classes, transforms it
 * to ES5 compatible code using the pre-bundled ES6 class visitors, and prints 
 * out the result.
 */
var es6ClassVisitors = require('jstransform/visitors/es6-class-visitors').visitorList;
var fs = require('fs');
var jstransform = require('jstransform');

var originalFileContents = fs.readFileSync('path/to/original/file.js', 'utf-8');

var transformedFileData = jstransform.transform(
  es6ClassVisitors,
  originalFileContents
);

console.log(transformedFileData.code);
```

#### Using multiple pre-bundled or existing transforms at once:

```js
/**
 * Reads a source file that may (or may not) contain ES6 classes *or* arrow
 * functions, transforms them to ES5 compatible code using the pre-bundled ES6 
 * visitors, and prints out the result.
 */
var es6ArrowFuncVisitors = require('jstransform/visitors/es6-arrow-function-visitors').visitorList;
var es6ClassVisitors = require('jstransform/visitors/es6-class-visitors').visitorList;
var jstransform = require('jstransform');

// Normally you'd read this from the filesystem, but I'll just use a string here
// to simplify the example.
var originalFileContents = "var a = (param1) => param1; class FooClass {}";

var transformedFileData = jstransform.transform(
  es6ClassVisitors.concat(es6ArrowFuncVisitors),
  originalFileContents
);

// var a = function(param1)  {return param1;}; function FooClass(){"use strict";}
console.log(transformedFileData.code);
```

#### Writing a simple custom transform:

```js
/**
 * Creates a custom transformation visitor that prefixes all calls to the
 * `eval()` function with a call to `alert()` saying how much of a clown you are
 * for using eval.
 */
var jstransform = require('jstransform');
var utils = require('jstransform/src/utils');

var Syntax = jstransform.Syntax;

function visitEvalCallExpressions(traverse, node, path, state) {
  // Appends an alert() call to the output buffer *before* the visited node
  // (in this case the eval call) is appended to the output buffer
  utils.append('alert("...eval?...really?...");', state);

  // Now we copy the eval expression to the output buffer from the original
  // source
  utils.catchup(node.range[1], state);
}
visitEvalCallExpressions.test = function(node, path, state) {
  return node.type === Syntax.CallExpression
         && node.callee.type === Syntax.Identifier
         && node.callee.name === 'eval';
};

// Normally you'd read this from the filesystem, but I'll just use a string here
// to simplify the example.
var originalFileContents = "eval('foo');";

var transformedFileData = jstransform.transform(
  [visitEvalCallExpressions], // Multiple visitors may be applied at once, so an
                              // array is always expected for the first argument
  originalFileContents
);

// alert("...eval?...really?...");eval('foo');
console.log(transformedFileData.code);
```

### Simple API

#### Reading a file and applying tranforms

```js
var simple = require('jstransform/simple');
var fs = require('fs');

var originalCode = fs.readFileSync('path/to/file.js');

// Apply all available ES6 transforms
var transformed = simple.transform(originalCode, {es6: true});
console.log(transformed.code);

// Apply ES6 and ES7, generating ES3 compatible code (for IE8)
transformed = simple.transform(originalCode, {harmony: true, target: 'es3'});
console.log(transformed.code);
```


## Migration Guide

### Simple API

If you are coming from `react-tools` and using Node, the APIs are very similar. There are a couple important differences.

1. JSX will not be tranformed by default! You must specify `react: true` in the options.
2. The return value of `transform` is not the same. `react-tools.transform` only returned the resulting code. `simple.transform` always returns and object with a `code` property. However, if you were using `react-tools.transformWithDetails`, `simple.transform` is essentially the same.

### CLI

These are virtually identical but again, there are some important difference.

1. JSX will not be transformed by default! You must specify `--react`.
2. We are using a different executable - `jstransform` - (`jsx` doesn't make sense here).
3. There are a numbr of new options available. Namely `--utility`, `--es6` and `--es7` (`--harmony` is still available and will enable both).
