# es6-transpiler.js
es6 -> es5

## status

Beta

## Goal

 * different output than [traceur-compiler](https://github.com/google/traceur-compiler):
     1. no runtime library (only polyfills if needed)
     1. no try/catch for block binding
     1. spread:
       * via `.concat`
       * should respect Iterator protocol
       * spread is operator, not a function
     1. minimal count of temporary variables
     1. termination stage for temporary variables
     1. es6 RegExp support
     1. and others
 * output should support [Closure Compiler](https://code.google.com/p/closure-compiler/)
 * line-to-line input/output mapping

## Supported

 * classes
 * generator comprehensions
 * destructuring (with default values)
 * block binding (let / const)
   * loops: fresh lexical environment per iteration
 * function default parameters and rest
 * arrow functions
 * spread (with iterator protocol)
 * for-of (with iterator protocol)
 * array comprehensions (with iterator protocol)
 * string templates (with tags support)
 * object literals:
   * methods
   * shorthands
   * computed properties
 * binary/octal numericLiteral
 * unicode code point escapes
 * RegExp:
   * 'y' flag support (in runtime via polyfill)
   * 'u' flag support:
     * full transpiler-time support: [negative] astral symbols (surrogate pairs) ranges, \D, \W, '.' etc captures astral symbols
     * partial runtime support see: [Not supported](#not-supported)

Static scope analysis and transpilation of ES6 block scoped `const` and `let` variables to ES3 based on [olov/defs](https://github.com/olov/defs).

## Not supported

 * modules
 * generators
 * symbols
 * RegExp:
   * 'u' flag in runtime (via polyfill) for the newly generated patterns:
     1. \D, \W, '.' etc not supported
     1. negative astral symbols (surrogate pairs) ranges

## Supported iterator protocol

```javascript
var obj = {a: 1, b: 2, c: 3};
var Symbol_iterator = typeof Symbol !== 'undefined' && Symbol.iterator || "@@iterator";
obj[Symbol_iterator] = function() {
	var iterableObject = this;
	var keys = ["a", "b", "c"];

	return {
		next: function() {
			var currentKey = keys.shift();

			return {
				value: currentKey ? iterableObject[currentKey] : void 0
				, done: !currentKey
			}
		}
	}
}
```

## Installation

Install using npm

	npm install es6-transpiler

Or just using [Grunt task](https://github.com/termi/grunt-es6-transpiler) (see below).

## Usage

For the output code works you need an implementation of Object.create in the target browser.
You can get it here: [es5-shim](https://github.com/kriskowal/es5-shim/) or copy and past this code:
```
if(!Object.create)Object.create = function(_prototype) {//[Warning!!!]This is PURE and UNSAFE implementation of Object.create
	var Type = function () {};
	Type.prototype = _prototype;
	var _object = new Type();
	_object.__proto__ = _prototype;

	return _object;
};
```

### Grunt task

[Grunt](http://gruntjs.com/) task can be fount here: https://github.com/termi/grunt-es6-transpiler

Install:
`npm install grunt-es6-transpiler`

Usage:
```javascript
grunt.loadNpmTasks('grunt-es6-transpiler');

grunt.initConfig({
  "es6-transpiler": {
    test: {
        src: 'test.js'
        , dest: 'test.es5.js'
    }
  },
})
```

### Gulp task

[Gulp](http://gulpjs.com/) task can be fount here: https://github.com/sindresorhus/gulp-es6-transpiler

Install:
`npm install --save-dev gulp-es6-transpiler`

Usage:
```javascript
var gulp = require('gulp');
var es6transpiler = require('gulp-es6-transpiler');

gulp.task('default', function () {
    gulp.src('src/app.js')
        .pipe(es6transpiler())
        .pipe(gulp.dest('dist'));
});
```

### In console

Run it as `es6toes5 <input file>`. Or `node --harmony es6toes5 <input file>`. Also you can run a compiled es5 version `node build/es5/es6toes5 <input file>`.
The errors (if any) will go to stderr, the transpiled source to `stdout`, so redirect it like `es6toes5 file.js > output.js`.

### Node.js / Using as a library

require("es6-transpiler").run(\<Options\>)

Options is:

	{
		filename: string // input file
		src: string // input source if not filename
		outputToConsole: boolean // if true -> result would be outputted to console
		outputFilename: string // if specific -> result would be written to file
	}
Other options below in "Options" section.

```javascript
var es6tr = require("./es6-transpiler");
var result = es6tr.run({filename: "test.js"});
console.log(result.src);//result
```
result object is:

    {
        src: string or "" // on success
        errors: array of error messages or [] // on errors
        stats: statistics object
        ast: transformed ast // ast tree from esprima
        getNeedfulList: <function: Array.<string>> // list of necessary polyfills
        getNeedfulLib: <function: string> // text of necessary polyfills
        getFullLib: <function: string> // text of all available polyfills
    }

## Options

Example of `options` object:

    {
    	//described above:
    	//"filename" or "src": "string"
    	//outputToConsole: false
    	//outputFilename: true

        "environments": ["node", "browser"],

        "globals": {
            "my": false,
            "hat": true
        },
        "disallowVars": false,
        "disallowDuplicated": true,
        "disallowUnknownReferences": true,
        "includePolyfills": <boolean> | <"full">,
        "polyfillsSeparator": <string>
    }

`globals` lets you list your program's globals, and indicate whether they are
writable (`true`) or read-only (`false`), just like `jshint`.

`environments` lets you import a set of pre-defined globals, here `node` and
`browser`. These default environments are borrowed from `jshint` (see
[jshint_globals/vars.js](https://github.com/olov/defs/blob/master/jshint_globals/vars.js)).

`disallowVars` (defaults to `false`) can be enabled to make
usage of `var` an error.

`disallowDuplicated` (defaults to `true`) errors on duplicated
`var` definitions in the same function scope.

`disallowUnknownReferences` (defaults to `true`) errors on references to
unknown global variables.

`includePolyfills` (defaults to `false`) insert polyfills in the output file.
`true` - insert only the necessary polyfills. `"full"` -  insert all available polyfills.

`polyfillsSeparator` (default - empty string) any string that should be inserted before polyfills library.

## License
`MIT`, see [LICENSE](LICENSE) file.


## Example

See tests


## Compatibility
`es6-transpiler.js` strives to transpile your program as true to the ES6 semantics as
possible, while being as maximally non-intrusive as possible.


### Referenced (inside closure) before declaration
`es6-transpiler.js` detects the vast majority of cases where a variable is referenced prior to
its declaration. The one case it cannot detect is the following:

```javascript
function printx() { console.log(x); }
printx(); // illegal
let x = 1;
printx(); // legal
```

The first call to `printx` is not legal because `x` hasn't been initialized at that point
of *time*, which is impossible to catch reliably with statical analysis.
`v8 --harmony` will detect and error on this via run-time checking. `es6-transpiler.js` will
happily transpile this example (`let` => `var` and that's it), and the transpiled code
will print `undefined` on the first call to `printx`. This difference should be a very
minor problem in practice.

## TODO
 1. Generators support
 1. Modules support
 1. 'pre-es6-node10', 'pre-es6-chrome20' and 'pre-es6-ff24' output modes
