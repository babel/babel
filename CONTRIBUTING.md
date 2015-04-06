# Contributing

Contributions are always welcome, no matter how large or small. Before
contributing, please read the
[code of conduct](https://github.com/babel/babel/blob/master/CODE_OF_CONDUCT.md).

## Developing

#### Setup

```sh
$ git clone https://github.com/babel/babel
$ cd babel
$ make bootstrap
```

Then you need to run:

```sh
$ make watch-core
```

This will compile Babel and then sit in the background and on file modification
recompile the necessary files.

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

#### Workflow

* Fork the repository
* Clone your fork and change directory to it (`git clone git@github.com:yourUserName/babel.git && cd babel`)
* Install the project dependencies (`make bootstrap`)
* Link your forked clone (`npm link`)
* Develop your changes ensuring you're fetching updates from upstream often
* Ensure the test are passing (`make test`)
* Create new pull request explaining your proposed change or reference an issue in your commit message

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
