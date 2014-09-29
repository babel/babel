<p align="center">
  <img alt="6to5" src="http://i.imgur.com/hVl9KRw.png">
</p>

<p align="center">
  <a href="https://travis-ci.org/sebmck/6to5">
    <img alt="Travis Status" src="http://img.shields.io/travis/sebmck/6to5.svg?style=flat&amp;label=travis">
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

 - **Fast** - [10x faster than Traceur](#performance).
 - **Extensive** - with Browserify support, Node API, Connect Middleware and a CLI.
 - **Lossless** - source map support so you can debug your compiled code with ease.
 - **Compact** - maps directly to the equivalent ES5 with **no runtime required**.
 - **Concise** - does not pollute scope with unneccesary variables.

## Features

| Name                                                                 | Implemented |
| -------------------------------------------------------------------- | ----------- |
| [Arrow functions](FEATURES.md#arrow-functions)                       | ✓           |
| [Classes](FEATURES.md#classes)                                       | ✓           |
| [Default parameters](FEATURES.md#default-parameters)                 | ✓           |
| [Spread](FEATURES.md#spread)                                         | ✓           |
| [Block binding](FEATURES.md#block-binding)                           | ✓           |
| [Property method assignment](FEATURES.md#property-method-assignment) | ✓           |
| [Rest parameters](FEATURES.md#rest-parameters)                       | ✓           |
| [Template literals](FEATURES.md#template-literals)                   | ✓           |
| [Modules](FEATURES.md#modules)                                       | ✓           |
| [Property name shorthand](FEATURES.md#property-name-shorthand)       | ✓           |
| [Computed property names](FEATURES.md#computed-property-names)       | ✓           |
| [Constants](FEATURES.md#constants)                                   | ✓           |
| [Destructuring assignment](FEATURES.md#destructuring-assignment)     |             |
| [Array comprehension](FEATURES.md#array-comprehension)               |             |
| [Generators](FEATURES.md#generators)                                 |             |

## Installation

    $ npm install -g 6to5

## Usage

### CLI

Compile the file `script.js` and output it to `script-compiled.js`.

    $ 6to5 script.js -o script-compiled.js

Compile the entire `src` directory and output it to the `lib` directory.

    $ 6to5 src -d lib

Compile the file `script.js` and output it to stdout.

    $ 6to5 script.js

### Browserify

    $ browserify script.js -t 6to5/browserify --outfile bundle.js

### Node

```javascript
var to5 = require("6to5");

to5.transform("code();");

to5.transformFileSync("script.js");

to5.transformFile("script.js", function (err, data) {

});
```

##### Options

```javascript
to5.transform("code();", {
  // List of transformers to EXCLUDE
  // This is a camelised version of the name found in `features`
  // eg. "Arrow functions" is "arrowFunctions"
  blacklist: [],

  // List of transformers to ONLY use.
  // See `blacklist` for naming scheme.
  whitelist: [],

  // Append source map and comment to bottom of returned output.
  sourceMap: false,

  // Filename for use in errors etc.
  filename: "unknown",

  // Format options
  // See https://github.com/Constellation/escodegen/wiki/API for options.
  format: {}
});
```

#### Require hook

All subsequent files required by node will be transformed into ES5 compatible
code.

```javascript
require("6to5/register");
```

#### Connect Middleware

```javascript
var to5 = require("6to5");

app.use(to5.middleware({
  options: {
    // options to use when transforming files
  },
  src: "assets",
  dest: "cache"
}));

app.use(connect.static("cache"));
```

#### Browserify

```javascript
var to5 = require("6to5");
browserify()
  .transform(to5.browserify)
  .require("script.js", { entry: true })
  .bundle({ debug: true })
  .pipe(fs.createWriteStream("bundle.js"));
```

## Comparison to Traceur

### Performance
