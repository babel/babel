# NOTE: BEFORE OPENING AN ISSUE PLEASE SEE THE [README](https://github.com/babel/babel#readme).

----

<p align="center">
   <strong><a href="#setup">Setup</a></strong>
   |
   <strong><a href="#running-tests">Running tests</a></strong>
   |
   <strong><a href="#workflow">Workflow</a></strong>
   |
   <strong><a href="#dependencies">Dependencies</a></strong>
   |
   <strong><a href="#code-standards">Code Standards</a></strong>
</p>

----

# Contributing

Contributions are always welcome, no matter how large or small. Before
contributing, please read the
[code of conduct](https://github.com/babel/babel/blob/master/CODE_OF_CONDUCT.md).


## Developing

>Note: Babel moves fast. Only the latest release is guaranteed to build correctly.
>Older releases are not officially supported. If you attempt to build them, do that at your own risk.

#### Setup

```sh
$ git clone https://github.com/babel/babel
$ cd babel
$ make bootstrap
```

Then you can either run:

```sh
$ make build-core
```

to build Babel **once** or:

```sh
$ make watch-core
```

to have Babel build itself then incrementally build files on change.

#### Running tests

You can run tests via:

```sh
$ make test
```

This is mostly overkill and you can limit the tests to a select few by directly
running them with `mocha`:

```sh
$ mocha test/core/transformation.js
```

Use mocha's `--grep` option to run a subset of tests by name:

```sh
$ mocha test/core/transformation.js --grep es7
```

If you don't have `mocha` installed globally, you can still use it from Babel's
dependencies in `node_modules`, but make sure `node_modules/.bin` is added to
your [`$PATH`](http://unix.stackexchange.com/questions/26047/how-to-correctly-add-a-path-to-path) environment variable.


#### Workflow

* Fork the repository
* Clone your fork and change directory to it (`git clone git@github.com:yourUserName/babel.git && cd babel`)
* Install the project dependencies (`make bootstrap`)
* Link your forked clone (`npm link`)
* Develop your changes ensuring you're fetching updates from upstream often
* Ensure the test are passing (`make test`)
* Create new pull request explaining your proposed change or reference an issue in your commit message

#### Dependencies

+ [ast-types](http://ghub.io/ast-types) This is required to monkeypatch regenerators AST definitions. Could be improved in the future.

+ [chalk](http://ghub.io/chalk) This is used for terminal color highlighting for syntax errors.

+ [convert-source-map](http://ghub.io/convert-source-map) Turns a source map object into a comment etc.

+ [core-js](http://ghub.io/core-js) Used for the polyfill.

+ [debug](http://ghub.io/debug) Used to output debugging information when NODE_DEBUG is set to babel.

+ [detect-indent](http://ghub.io/detect-indent) This is used in the code generator so it can infer indentation.

+ [estraverse](http://ghub.io/estraverse) The only method on this is attachComments. I'd like to implement our own comment attachment algorithm eventually though.

+ [esutils](http://ghub.io/esutils) Various ES related utilities. Check whether something is a keyword etc.

+ [fs-readdir-recursive](http://ghub.io/fs-readdir-recursive) Recursively search a directory for.

+ [globals](http://ghub.io/globals) A list of JavaScript global variables. This is used by the scope tracking to check for colliding variables.

+ [is-integer](http://ghub.io/is-integer) Checks if something is an integer.

+ [js-tokens](http://ghub.io/js-tokens) This is used to get tokens for syntax error highlighting.

+ [leven](http://ghub.io/leven) A levenstein algorithm to determine how close a word is to another. This is used to offer suggestions when using the utility.undeclaredVariableCheck transformer.

+ [line-numbers](http://ghub.io/line-numbers) Used to produce the code frames in syntax errors.

+ [lodash](http://ghub.io/lodash) Used for various utilities.

+ [minimatch](http://ghub.io/minimatch) This is used to match glob-style ignore/only filters.

+ [output-file-sync](http://ghub.io/output-file-sync) Synchronously writes a file and create its ancestor directories if needed.

+ [path-is-absolute](http://ghub.io/path-is-absolute) Checks if a path is absolute. C:\foo and \foo are considered absolute.

+ [regenerator](http://ghub.io/regenerator) This is used to transform generators/async functions.

+ [regexpu](http://ghub.io/regexpu) Used to transform unicode regex patterns.

+ [repeating](http://ghub.io/repeating) Repeats a string.

+ [shebang-regex](http://ghub.io/shebang-regex) Literally just a regex that matches shebangs.

+ [slash](http://ghub.io/slash) Normalises path separators.

+ [source-map](http://ghub.io/source-map) Generates sourcemaps.

+ [source-map-support](http://ghub.io/source-map-support) Adds source map support to babel-node/babel/register.

+ [strip-json-comments](http://ghub.io/strip-json-comments) Remove comments from a JSON string. This is used for .babelrc files.

+ [to-fast-properties](http://ghub.io/to-fast-properties) A V8 trick to put an object into fast properties mode.

+ [trim-right](http://ghub.io/trim-right) Trims the rightside whitespace.

+ [user-home](http://ghub.io/user-home) Gets the users home directory. This is used to resolve the babel-node/babel/register cache.


#### Code Standards

 * **General**
   * Max of five arguments for functions
   * Max depth of four nested blocks
   * 2-spaced soft tabs

 * **Naming**
   * CamelCase all class names
   * camelBack all variable names

 * **Spacing**
   * Spaces after all keywords
   * Spaces before all left curly braces

 * **Comments**
   * Use JSDoc-style comments for methods
   * Single-line comments for ambiguous code

 * **Quotes**
   * Always use double quotes
   * Only use single quotes when the string contains a double quote

 * **Declaration**
   * No unused variables
   * No pollution of global variables and prototypes
