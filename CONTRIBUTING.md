# Contributing

Contributions are always welcome, no matter how large or small. Before
contributing, please read the
[code of conduct](https://github.com/babel/babel/blob/master/CODE_OF_CONDUCT.md).

## Resources

Check out the [babel-handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#asts) and [ASTExplorer](http://astexplorer.net/) for some info about contributing to this project regarding Abstract Syntax Trees (ASTs).

## Setup local env

> Install yarn beforehand: https://yarnpkg.com/en/docs/install

To start developing on Babylon you only need to install its dependencies:

```bash
git clone https://github.com/babel/babylon
cd babylon
yarn
```

## Tests

### Running tests locally

To run a build, tests and perform lint/flow checks:

```bash
yarn test
```

If you only want to run the tests:

```bash
yarn run test-only
```

Note, this does not actually run a build, so you may have to call `yarn run build` after
performing any changes.

### Running one test

To run only a single test, add `"only": true` to the `options.json` inside any test fixture folder (you may have to create the file if it doesn't exist).
For example, let's say we want to only run the test for the [`test/fixtures/comments/basic/shebang-import`](https://github.com/babel/babylon/tree/7.0/test/fixtures/comments/basic/shebang-import) fixture.

Add `"only": true` to its `options.json`:

```json
{
  "sourceType": "module",
  "only": true
}
```

Then, run the tests using the same command as before:

```bash
yarn run test-only
```

### Checking code coverage locally

To generate code coverage, be sure to set `BABEL_ENV=test` so that code is instrumented during
the rollup build.

```bash
BABEL_ENV=test yarn run build && yarn run test-coverage
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
yarn link
yarn run build
cd ../babel/
make bootstrap
yarn link babylon
cd packages/babel-core/
yarn link babylon
cd ../babel-template/
yarn link babylon
cd ../babel-traverse/
yarn link babylon
cd ../babel-generator/
yarn link babylon
cd ../babel-types/
yarn link babylon
cd ../..
make build
make test
```

From now on Babel will use your local checkout of Babylon for its tests.

## Creating a new plugin (`spec-new`)

> Example: https://github.com/babel/babylon/pull/541

- Create a new issue that describes the proposal (ex: [#538](https://github.com/babel/babylon/issues/538)). Include any relevant information like proposal repo/author, examples, parsing approaches, meeting notes, presentation slides, and more.
- The pull request should include:
  - [ ] An update to the [#plugins](https://github.com/babel/babylon#plugins) part of the readme. Add a new entry to that list for the new plugin flag (and link to the proposal)
  - [ ] If any new nodes or modifications need to be added to the AST, update [ast/spec.md](https://github.com/babel/babylon/blob/master/ast/spec.md)
  - [ ] Make sure you use the `this.hasPlugin("plugin-name-here")` check so that your new plugin code only runs when that flag is turned on (not default behavior)
  - [ ] Add failing/passing tests according to spec behavior
- [ ] Start working about the Babel transform itself!

## Publishing

```sh
# run lerna-changelog from global install and copy it
lerna-changelog
# create tag or specific one (ex: `npm version v7.0.0-beta.16`)
npm version patch
# push to github
git push --follow-tags
# publish (sometimes need `npm publish --tag=next`)
npm publish
# upload changelog to github releases, etc
```
