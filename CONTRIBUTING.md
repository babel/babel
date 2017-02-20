# Contributing

Contributions are always welcome, no matter how large or small. Before
contributing, please read the
[code of conduct](https://github.com/babel/babel/blob/master/CODE_OF_CONDUCT.md).

## Setup local env

To start developing on Babylon you only need to install its dependencies:

```bash
npm install
```

## Tests

### Running tests locally

To run a build, tests and perform lint/flow checks:

```bash
npm test
```

If you only want to run the tests:

```bash
npm run test-only
```

Note, this does not actually run a build, so you may have to call `npm run build` after
performing any changes.

### Checking code coverage locally

To generate code coverage, be sure to set `BABEL_ENV=test` so that code is instrumented during
the rollup build.

```bash
BABEL_ENV=test npm run build && npm run test-ci
```

### Writing tests

Writing tests for Babylon is very
[similar to Babel](https://github.com/babel/babel/blob/master/CONTRIBUTING.md#writing-tests).
Inside the `tests/fixtures` folder are categories/groupings of test fixtures (es2015, flow,
etc.). To add a test, create a folder under one of these groupings (or create a new one) with a
descriptive name, and add the following:

* Create an `actual.js` file that contains the code you want Babylon to parse.

* Add an `expected.json` file with the expected parser output. For added convenience, if
  there is no `expected.json` present, the test runner will generate one for you.

## Cross repository changes

If you are making changes to Babylon which make it necessary to also change things in Babel
you will want to link both repositories together. This can be done by doing the following
(assuming you have both Babel and Babylon already checked out):

```bash
cd babylon/
npm link
npm run build
cd ../babel/
make bootstrap
npm link babylon
cd packages/babel-core/
npm link babylon
cd ../../packages/babel-template/
npm link babylon
cd ../../packages/babel-traverse/
npm link babylon
cd ../../packages/babel-generator/
npm link babylon
cd ../..
make build
make test
```

From now on Babel will use your local checkout of Babylon for its tests.
