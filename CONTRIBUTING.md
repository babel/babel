# NOTE: DO NOT OPEN ISSUES FOR QUESTIONS AND SUPPORT. SEE THE README FOR MORE INFO.

----

<p align="center">
   <strong><a href="#setup">Setup</a></strong>
   |
   <strong><a href="#running-tests">Running tests</a></strong>
   |
   <strong><a href="#internals">Internals</a></strong>
</p>

----

# Contributing

Contributions are always welcome, no matter how large or small. Before
contributing, please read the
[code of conduct](https://github.com/babel/babel/blob/master/CODE_OF_CONDUCT.md).

## Developing

**Note:** Versions `< 5.1.10` can't be built. Make sure you are on npm 3.

#### Setup

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

to have Babel build itself then incrementally build files on change.

If you wish to build a copy of Babel for distribution then run:

```sh
$ make build-dist
```

and access the files from `packages/babel-core/dist`.

#### Running tests

You can run tests for all packages via:

```sh
$ make test
```

This is mostly overkill and you can limit the package to a select by using the `TEST_ONLY` environment variable:

```sh
$ TEST_ONLY=babel-cli make test
```

Use the `TEST_GREP` variable to run a subset of tests by name:

```sh
$ TEST_GREP=transformation make test
```

To test the code coverage, use:

```sh
$ make test-cov
```

#### Writing tests

Most packages in [`/packages`](/packages) have a `test` folder.
Some tests might be in different packages or in [`/packages/babel-core`](/packages/babel-core/test/fixtures).

##### `babel-plugin-x`

All the babel plugins (and other packages) that have a `/test/fixtures` are written in a similar way.

For example in [`babel-plugin-transform-exponentiation-operator/test`](/packages/babel-plugin-transform-exponentiation-operator/test)

- There is an `index.js` file. It imports our [test helper](/packages/babel-helper-plugin-test-runner). (You don't have to worry about this).
- There can be multiple folders under [`/fixtures`](/packages/babel-plugin-transform-exponentiation-operator/test/fixtures)
   - There is an [`options.json`](/packages/babel-plugin-transform-exponentiation-operator/test/fixtures/exponentian-operator/options.json) is basically a `.babelrc` file to pass in the plugins and settings you need for your tests.
   - For this test, we only need the relevant plugin, so it's just `{ "plugins": ["transform-exponentiation-operator"] }`.
   - If necessary, you can specify a different `options.json` for each sub folder if you need different options.

- In each sub-folder, you can actually write out your different categories of tests. (You can name this by the feature you are testing, or you can reference the issue number)
- There are mainly two kinds of tests for plugins.
   - One is a simple test of input/output by Babel. We do this by creating an [`actual.js`](packages/babel-plugin-transform-exponentiation-operator/test/fixtures/exponentian-operator/binary/actual.js) (the code before transformation) and [`expected.js`](/packages/babel-plugin-transform-exponentiation-operator/test/fixtures/exponentian-operator/binary/expected.js).
   - The other type is a test to actually evaluate code an assert certain properties are true or not (this is usually better). We do this by creating an [`exec.js`](/packages/babel-plugin-transform-exponentiation-operator/test/fixtures/exponentian-operator/comprehensive/exec.js).

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
In an `exec.js` test, we might want to actually run/check the code does what it's supposed to do rather than just check output.

```js
// exec.js
assert.equal(8, 2 ** 3);
assert.equal(24, 3 * 2 ** 3);
```
   
##### `babylon`

For `babylon` specifically, you can easily generate an `expected.json` automatically by just providing the `actual.js` and running `make test-only` like normal.

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

#### Internals

Please see [`/doc`](/doc) for internals documentation relevant to developing babel.
