# NOTE: DO NOT OPEN ISSUES FOR QUESTIONS AND SUPPORT. SEE THE README FOR MORE INFO.

----

<p align="center" class="toc">
   <strong><a href="#setup">Setup</a></strong>
   |
   <strong><a href="#running-lintingtests">Running linting/tests</a></strong>
   |
   <strong><a href="#writing-tests">Writing tests</a></strong>
   |
   <strong><a href="#debugging-code">Debugging code</a></strong>
   |
   <strong><a href="#internals">Internals</a></strong>
</p>

----


# Contributing

> Before contributing, please read our [code of conduct](https://github.com/babel/babel/blob/master/CODE_OF_CONDUCT.md).

Contributions are always welcome, no matter how large or small.

## Not sure where to start?

- If you aren't just making a documentation change, you'll probably want to learn a bit about a few topics.
 - [ASTs](https://en.wikipedia.org/wiki/Abstract_syntax_tree) (Abstract Syntax Tree): The Babel AST [spec](https://github.com/babel/babylon/blob/master/ast/spec.md) is a bit different from [ESTree](https://github.com/estree/estree). The differences are listed [here](https://github.com/babel/babylon#output).
 - Check out [`/doc`](https://github.com/babel/babel/tree/master/doc) for information about Babel's internals
 - Check out [the Babel Plugin Handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#babel-plugin-handbook) - core plugins are written the same way as any other plugin!
 - Check out [AST Explorer](http://astexplorer.net/#/scUfOmVOG5) to learn more about ASTs or make your own plugin in the browser
- When you feel ready to jump into the Babel source code, a good place to start is to look for issues tagged with [help-wanted](https://github.com/babel/babel/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) and/or [good first issue](https://github.com/babel/babel/issues?q=is%3Aissue+is%3Aopen+label%3A%22goodfirstissue%22).
- Follow along with what we are working on by joining our Slack, following our announcements on [Twitter](https://twitter.com/babeljs), and reading (or participating!) in our [meeting notes](https://github.com/babel/notes).
- Check out our [website](http://babeljs.io/) and the [repo](https://github.com/babel/website)

## Chat

Feel free to check out the `#discussion`/`#development` channels on our [Slack](https://slack.babeljs.io). Some of us are always online to chat!

## Developing

**Note:** Versions `< 5.1.10` can't be built.

Babel is built for Node 4 and up but we develop using Node 8 and yarn. You can check this with `node -v`.

Make sure that Yarn is installed with version >= `0.28.0`.
Installation instructions can be found here: https://yarnpkg.com/en/docs/install.

### Setup

```sh
$ git clone https://github.com/babel/babel
$ cd babel
$ make bootstrap
```

Then you can either run:

```sh
$ make build
```

to build Babel **once** or:

```sh
$ make watch
```

to have Babel build itself and incrementally build files on change.

You can access the built files for individual packages from `packages/<package-name>/lib`.

If you wish to build a copy of Babel for distribution, then run:

```sh
$ make build-dist
```

### Running linting/tests

You can run lint via:

```sh
# ~6 sec on a MacBook Pro (Mid 2015)
$ make lint
```

You can run eslint's autofix via:

```sh
$ make fix
```

You can run tests + lint for all packages (slow) via:

```sh
# ~46 sec on a MacBook Pro (Mid 2015)
$ make test
```

If you just want to run all tests:

```sh
# ~40 sec on a MacBook Pro (Mid 2015)
$ make test-only
```

Most likely you'll want to focus in on a specific issue.

To run tests for a specific package in [packages](https://github.com/babel/babel/tree/master/packages), you can use the `TEST_ONLY` environment variable:

```sh
$ TEST_ONLY=babel-cli make test
```

`TEST_ONLY` will also match substrings of the package name:

```sh
# Run tests for the babel-plugin-transform-es2015-classes package.
$ TEST_ONLY=es2015-class make test
```

Use the `TEST_GREP` variable to run a subset of tests by name:

```sh
$ TEST_GREP=transformation make test
```

Substitute spaces for hyphens and forward slashes when targeting specific test names:

```sh
$ TEST_GREP="arrow functions destructuring parameters" make test
```

To enable the Node.js debugger added in v6.3.0, set the `TEST_DEBUG` environment variable:

```sh
$ TEST_DEBUG=true make test
```

You can combine `TEST_DEBUG` with `TEST_GREP` or `TEST_ONLY` to debug a subset of tests. If you plan to stay long in the debugger (which you'll likely do!), you may increase the test timeout by editing [test/mocha.opts](https://github.com/babel/babel/blob/master/test/mocha.opts).

To test the code coverage, use:

```sh
$ BABEL_ENV=cov make build
$ ./scripts/test-cov.sh
```


#### Troubleshooting Tests

In case you're not able to reproduce an error on CI locally, it may be due to

 - Node Version: Travis CI runs the tests against all major node versions. If your tests use JavaScript features unsupported by lower versions of node, then use [minNodeVersion option](#writing-tests) in options.json.
 - Timeout: Check the CI log and if the only errors are timeout errors and you are sure that it's not related to the changes you made, ask someone in the slack channel to trigger rebuild on the CI build and it might be resolved

In case you're locally getting errors which are not on the CI, it may be due to

 - Updates in Dependencies: Make sure you run `make bootstrap` before you run `make build` or `make watch` before you run the tests.

### Writing tests

Most packages in [`/packages`](https://github.com/babel/babel/tree/master/packages) have a `test` folder, however some tests might be in other packages or in [`/packages/babel-core`](https://github.com/babel/babel/tree/master/packages/babel-core/test/fixtures).

#### `babel-plugin-x`

All the Babel plugins (and other packages) that have a `/test/fixtures` are written in a similar way.

For example, in [`babel-plugin-transform-exponentiation-operator/test`](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-exponentiation-operator/test):

- There is an `index.js` file. It imports our [test helper](https://github.com/babel/babel/tree/master/packages/babel-helper-plugin-test-runner). (You don't have to worry about this).
- There can be multiple folders under [`/fixtures`](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-exponentiation-operator/test/fixtures)
   - There is an [`options.json`](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-exponentiation-operator/test/fixtures/exponentian-operator/options.json) file whose function is similar to a `.babelrc` file, allowing you to pass in the plugins and settings you need for your tests.
   - For this test, we only need the relevant plugin, so it's just `{ "plugins": ["transform-exponentiation-operator"] }`.
   - If necessary, you can have an `options.json` with different options in each subfolder.

- In each subfolder, you can organize your directory structure by categories of tests. (Example: these folders can be named after the feature you are testing or can reference the issue number they fix)
- Generally, there are two kinds of tests for plugins
   - The first is a simple test of the input and output produced by running Babel on some code. We do this by creating an [`actual.js`](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-exponentiation-operator/test/fixtures/exponentian-operator/binary/actual.js) file and an [`expected.js`](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-exponentiation-operator/test/fixtures/exponentian-operator/binary/expected.js) file.
   - If you need to expect an error, you can ignore creating the `expected.js` file and pass a new `throws` key to the `options.json` that contains the error string that is created.
   - The second and preferred type is a test that actually evaluates the produced code and asserts that certain properties are true or false. We do this by creating an [`exec.js`](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-exponentiation-operator/test/fixtures/exponentian-operator/comprehensive/exec.js) file.

In an actual/expected test, you simply write out the code you want transformed in `actual.js`.

```js
// actual.js
2 ** 2;
```

and the expected output after transforming it with your `options.json` in `expected.js`.

```js
// expected.js
Math.pow(2, 2);
```
In an `exec.js` test, we run or check that the code actually does what it's supposed to do rather than just check the static output.

```js
// exec.js
assert.equal(8, 2 ** 3);
assert.equal(24, 3 * 2 ** 3);
```

If you need to check for an error that is thrown you can add to the `options.json`

```js
// options.json example
{
  "plugins": [["transform-object-rest-spread", { "useBuiltIns": "invalidOption" }]],
  "throws": "transform-object-rest-spread currently only accepts a boolean option for useBuiltIns (defaults to false)"
}
```

If the test requires a minimum Node version, you can add `minNodeVersion` (must be in semver format).

```js
// options.json example
{
  "minNodeVersion": "5.0.0"
}
```

#### Bootstrapping expected output

For both `babel-plugin-x` and `babylon`, you can easily generate an `expected.js`/`expected.json` automatically by just providing `actual.js` and running the tests as you usually would.

```
// Example
- babylon
  - test
    - fixtures
      - comments
        - basic
          - block-trailing-comment
            - actual.js
            - expected.json (will be generated if not created)
```

### Debugging code

A common approach to debugging JavaScript code is to walk through the code using the [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/) debugger.
For illustration purposes, we are going to assume that we need to get a better understanding of [`Generator.generate()`](https://github.com/babel/babel/blob/b5246994b57f06af871be6a63dcc4c6fd41d94d6/packages/babel-generator/src/index.js#L32), which is responsible for generating code for a given AST.
To get a better understanding of what is actually going on for this particular piece of code, we are going to make use of breakpoints.

```diff
generate() {
+ debugger; // breakpoint
  return super.generate(this.ast);
}
```

To include the changes, we have to make sure to build Babel:

```bash
$ make build
```

Next, we need to execute `Generator.generate()`, which can be achieved by running a test case in the `babel-generator` package.
For example, we can run the test case that tests the generation of class declarations:

```bash
$ TEST_DEBUG=true TEST_GREP=ClassDeclaration make test-only

./scripts/test.sh
Debugger listening on port 9229.
Warning: This is an experimental feature and could change at any time.
To start debugging, open the following URL in Chrome:
    chrome-devtools://devtools/remote/serve_file/@60cd6e859b9f557d2312f5bf532f6aec5f284980/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/3cdaebd2-be88-4e7b-a94b-432950ab72d0
```

To start the debugging in Chrome DevTools, open the given URL.
The debugger starts at the first executed line of code, which is Mocha's first line by default.
Click _Resume script execution_ <img src="https://i.imgur.com/TmYBn9d.png" alt="Resume script execution button." width="16"> to jump to the set breakpoint.
Note that the code shown in Chrome DevTools is compiled code and therefore differs.

## Internals
- AST spec ([babylon/ast/spec.md](https://github.com/babel/babylon/blob/master/ast/spec.md))
- Versioning ([doc/design/versioning.md](https://github.com/babel/babel/blob/master/doc/design/versioning.md)
- Monorepo ([doc/design/monorepo.md](https://github.com/babel/babel/blob/master/doc/design/monorepo.md))
- Compiler environment support ([doc/design/compiler-environment-support.md](https://github.com/babel/babel/blob/master/doc/design/compiler-environment-support.md))
- Compiler assumptions ([doc/design/compiler-assumptions.md](https://github.com/babel/babel/blob/master/doc/design/compiler-assumptions.md))
