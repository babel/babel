<p align="center">
  <img alt="6to5" src="http://i.imgur.com/hVl9KRw.png">
</p>

<p align="center">
  <a href="https://travis-ci.org/sebmck/6to5">
    <img alt="Travis Status" src="http://img.shields.io/travis/sebmck/6to5.svg?branch=master&style=flat&amp;label=travis">
  </a>

  <a href="https://codeclimate.com/github/sebmck/6to5">
    <img alt="Code Climate Score" src="http://img.shields.io/codeclimate/github/sebmck/6to5.svg?style=flat">
  </a>

  <a href="https://codeclimate.com/github/sebmck/6to5">
    <img alt="Coverage" src="http://img.shields.io/codeclimate/coverage/github/sebmck/6to5.svg?style=flat">
  </a>

  <a href="https://david-dm.org/sebmck/6to5">
    <img alt="Dependency Status" src="http://img.shields.io/david/sebmck/6to5.svg?style=flat">
  </a>
</p>

**6to5** turns ES6 code into vanilla ES5, so you can use ES6 features **today.**

 - **Readable** - formatting is retained if possible so your generated code is as similar as possible.
 - **Extensible** - with a large range of [plugins](#plugins) and **browser support**.
 - **Lossless** - **source map support** so you can debug your compiled code with ease.
 - **Compact** - maps directly to the equivalent ES5 with **no runtime**[\*](#generators).

## Installation

It's as easy as:

    $ npm install -g 6to5

## Table of Contents

- [Features](#features)
- [Usage](#usage)
  - [Plugins](#plugins)
  - [CLI](#cli)
  - [Node](#node-1)
  - [Browser](#browser)
- [Modules](#modules)
- [Caveats](#caveats)
- [Differences](#differences)

## [Features](FEATURES.md)

 - [Array comprehension](FEATURES.md#array-comprehension)
 - [Arrow functions](FEATURES.md#arrow-functions)
 - [Classes](FEATURES.md#classes)
 - [Computed property names](FEATURES.md#computed-property-names)
 - [Constants](FEATURES.md#constants)
 - [Default parameters](FEATURES.md#default-parameters)
 - [Destructuring](FEATURES.md#destructuring)
 - [For-of](FEATURES.md#for-of)
 - [Generators](FEATURES.md#generators) via [regenerator](https://github.com/facebook/regenerator)
 - [Let scoping](FEATURES.md#let-scoping)
 - [Modules](FEATURES.md#modules)
 - [Numeric literals](FEATURES.md#numeric-literals)
 - [Property method assignment](FEATURES.md#property-method-assignment)
 - [Property name shorthand](FEATURES.md#property-name-shorthand)
 - [Rest parameters](FEATURES.md#rest-parameters)
 - [Spread](FEATURES.md#spread)
 - [Template literals](FEATURES.md#template-literals)
 - [Unicode regex](FEATURES.md#unicode-regex)

## Usage

### Plugins

 - [Broccoli](https://github.com/very-geek/broccoli-6to5-transpiler)
 - [Browserify](https://github.com/sebmck/6to5-browserify)
 - [Brunch](https://github.com/es128/6to5-brunch)
 - [Connect](https://github.com/sebmck/6to5-connect)
 - [Gulp](https://github.com/sindresorhus/gulp-6to5)
 - [Grunt](https://github.com/sindresorhus/grunt-6to5)
 - [Jade](https://github.com/Apoxx/jade-6to5)
 - [webpack](https://github.com/Couto/6to5-loader)

### CLI

Compile the file `script.js` and output it to stdout.

    $ 6to5 script.js

Compile the file `script.js` and output it to `script-compiled.js`.

    $ 6to5 script.js --out-file script-compiled.js

Compile the file `script.js` and output it to `script-compiled.js` and save a
source map to `script-compiled.js.map`.

    $ 6to5 script.js --source-maps --out-file script-compiled.js

Compile the file `script.js` and output it to `script-compiled.js` with a source
map embedded in a comment at the bottom.

    $ 6to5 script.js --source-maps-inline --out-file script-compiled.js

Compile the entire `src` directory and output it to the `lib` directory.

    $ 6to5 src --out-dir lib

Pipe a file in via stdin and output it to `script-compiled.js`

    $ 6to5 --out-file script-compiled.js < script.js

#### Node

Launch a repl.

    $ 6to5-node

Evaluate code.

    $ 6to5-node -e "class Test { }"

Compile and run `test.js`.

    $ 6to5-node test

### Node

```javascript
var to5 = require("6to5");

var result = to5.transform("code();", options);
result.code;
result.map;
result.ast;

to5.transformFileSync("filename.js", options).code;

to5.transformFile("filename.js", options, function (err, result) {

});
```

##### Options

```javascript
{
  // Filename for use in errors etc.
  // Default: "unknown"
  filename: "filename",

  // List of transformers to EXCLUDE.
  // Run `6to5 --help` to see a full list of transformers.
  blacklist: [],

  // List of transformers to ONLY use.
  // Run `6to5 --help` to see a full list of transformers.
  whitelist: [],

  // Module formatter to use
  // Run `6to5 --help` to see a full list of module formatters.
  // Default: "common"
  modules: "common",

  // If truthy, adds a `map` property to returned output.
  // If set to "inline", a comment with a sourceMappingURL directive is added to
  // the bottom of the returned code.
  // Default: false
  sourceMap: true,

  // Set `file` on returned source map.
  // Default: `filename` option.
  sourceMapName: "filename",

  // Set `sources[0]` on returned source map.
  // Default: `filename` option.
  sourceFileName: "filename"
}
```

#### Require hook

All subsequent files required by node with the extensions `.es6` and `.js` will
be transformed by 6to5. The polyfill specified in [Polyfill](#polyfill) is also
required.

```javascript
require("6to5/register");
```

**NOTE:** By default all requires to `node_modules` will be ignored. You can
override this by passing an ignore regex via:

```javascript
require("6to5/register")(/regex/);
```

You can also customise the file extensions that the require hook will use via:

```javascript
require("6to5/register")({
  // optional ignore regex
  ignoreRegex: /regex/,

  // this will remove the currently hooked extensions of .es6 and .js so you'll
  // have to add them back if you want them to be used again
  extensions: [".js", ".es6"]
});
```

### Browser

You can build a browser version of the compiler by running the following in the
6to5 directory:

    $ make build

This will output the files `dist/6to5.js` and `dist/6to5.min.js`.

Just include one of those in the browser and access the transform method via the
global `to5`.

```javascript
to5("class Test {}").code;
```

#### Test

To test 6to5 in your browser run:

    $ make test-browser

And open `test/browser.html` in your browser if it doesn't open automatically.

## [Modules](MODULES.md)

See [Modules - Common](MODULES.md#common-default) for documentation on the
default module formatting.

Alternatively see [Modules](MODULES.md) for all other supported module formatting types.

## Caveats

### Polyfill

6to5 does not include a runtime nor polyfill and it's up to the developer to
include one in compiled browser code.

#### Node

A polyfill is included with the 6to5 module that can be included in node like
so:

```javascript
require("6to5/polyfill");
```

This is simply a wrapper around the
[regenerator runtime](https://github.com/facebook/regenerator/blob/master/runtime.js) and the
[es6-shim](https://github.com/paulmillr/es6-shim) and
[es6-symbol](https://github.com/medikoo/es6-symbol) polyfills.

#### Browser

If you're planning on using 6to5 output in the browser then it's up to you
to include polyfills. [es6-symbol](https://github.com/medikoo/es6-symbol#browser)
and [es6-shim](https://raw.githubusercontent.com/paulmillr/es6-shim/master/es6-shim.js)
fill the vast majority of polyfill concerns.

### For-of

A polyfill is required for for-of functionality that implements `Symbol` and
adds `prototype[Symbol.iterator]` behaviour to built-ins. Using the polyfills
specified in [polyfill](#polyfill) suffices.

### Classes

Built-in classes such as `Date`, `Array` and `DOM` cannot be subclassed due to
limitations in ES5 implementations.

If you're inheriting from a class then static properties are inherited from it
via [\_\_proto\_\_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto),
this is widely supported but you may run into problems with much older browsers.

### Generators

The [regenerator runtime](https://github.com/facebook/regenerator/blob/master/runtime.js)
and an [ES6 polyfill](#polyfill) are required in order for generators to work.

## Differences

### Philosophy

The fundamental concept behind 6to5 is that the generated code must be close as
possible to the original, retaining all the same formatting and readability.

Many other transpilers are just concerned with making the code work while 6to5
is concerned with making sure it works **and** is readable at the same time.

For example, given the following array comprehension:

```javascript
var seattlers = [for (c of customers) if (c.city == "Seattle") { name: c.name, age: c.age }];
```

is generated to the following with 6to5:

```javascript
var seattlers = customers.filter(function (c) {
  return c.city == "Seattle";
}).map(function (c) {
  return {
    name: c.name,
    age: c.age
  };
});
```

The following is what Traceur generates:

```javascript
var seattlers = (function() {
  var c;
  var $__20 = 0,
      $__21 = [];
  for (var $__22 = customers[$traceurRuntime.toProperty(Symbol.iterator)](),
      $__23; !($__23 = $__22.next()).done; ) {
    c = $__23.value;
    if (c.city == "Seattle")
      $traceurRuntime.setProperty($__21, $__20++, {
        name: c.name,
        age: c.age
      });
  }
  return $__21;
}());
```

As you can tell, it's not very pretty, unreadable even. Instead of mapping
directly to a runtime, like other transpilers, 6to5 maps directly to the
equivalent ES5.

I'm not saying 6to5 is for everyone or even suited for everything. Traceur is
better suited if you'd like a full ES6 environment with polyfills and all.

### Comparison to other transpilers

|                              | 6to5 | Traceur | esnext | es6now | es6-transpiler | jstransform |
| ---------------------------- | ---- | ------- | ------ | ------ | -------------- | ----------- |
| No runtime                   | ✓    |         |        |        | ✓              | ✓           |
| Source maps                  | ✓    | ✓       | ✓      |        | ✓              | ✓           |
| No compiler global pollution | ✓    |         | ✓      |        | ✓              | ✓           |
| Arrow functions              | ✓    | ✓       | ✓      | ✓      | ✓              | ✓           |
| Classes                      | ✓    | ✓       | ✓      | ✓      | ✓              | ✓           |
| Computed property names      | ✓    | ✓       | ✓      | ✓      | ✓              |             |
| Constants                    | ✓    | ✓       |        |        | ✓              |             |
| Default parameters           | ✓    | ✓       | ✓      | ✓      | ✓              |             |
| Destructuring                | ✓    | ✓       | ✓      | ✓      | ✓              | ✓           |
| For-of                       | ✓    | ✓       | ✓      | ✓      | ✓              |             |
| Generators                   | ✓    | ✓       | ✓      |        |                |             |
| Let scoping                  | ✓    | ✓       |        |        | ✓              |             |
| Modules                      | ✓    | ✓       |        | ✓      |                |             |
| Property method assignment   | ✓    | ✓       | ✓      | ✓      | ✓              | ✓           |
| Property name shorthand      | ✓    | ✓       | ✓      | ✓      | ✓              | ✓           |
| Rest parameters              | ✓    | ✓       | ✓      | ✓      | ✓              | ✓           |
| Spread                       | ✓    | ✓       | ✓      | ✓      | ✓              |             |
| Template literals            | ✓    | ✓       | ✓      | ✓      | ✓              | ✓           |
| Unicode regex                | ✓    | ✓       |        |        | ✓              |             |

#### [Traceur](https://github.com/google/traceur-compiler)

Traceur requires quite a bulky runtime (~75KB) and produces quite verbose code.
While this can be trimmed down by selectively building the runtime, it's an
unneccesary step when a runtime can be eliminated entirely.

#### [es6now](https://github.com/zenparsing/es6now)

es6now doesn't output sourcemaps. This is cited as a positive as line-to-line
mapping is the goal. This however obviously doesn't retain column mapping
resulting in the output code not being very pleasant.

#### [es6-transpiler](https://github.com/termi/es6-transpiler)

The es6-transpiler compiler requires shims to operate which pollutes the global
scope resulting in possible collisions.

es6-transpiler maps line-by-line, just like es6now, this results in the same
issues such as lack of column information and unpleasant code output.
