# Babel Roadmap

> Not everything is set in stone or has an issue for it! Looking to post these to get more people involved or integrate with other projects.

## Ecosystem

### Remake `compat-table` used in preset-env

> https://github.com/kangax/compat-table could use a remake, ideally work with browser vendors on this
    
- There is also https://github.com/mdn/browser-compat-data
- Also use data from test262?
- Run tests against real browsers
- have a data-only format
- Need continued maintainence

### Polyfill behavior

> This is regarding https://github.com/babel/babel/tree/master/packages/babel-preset-env#usebuiltins-usage

- Allow any substitute polyfill instead of `core-js`. You should be able to override anything (custom `Promise`, etc)
- Make `"usage"` option the default after it is stable.

### Build/publish workflow
  - Guide on compiling/publishing ES2015+, .mjs, etc: https://twitter.com/philwalton/status/908082461799616512
  - Support multi-build/folder outputs?

### Codemods for TC39 Proposals

> Lebab/others are already used to convert from ES5 -> ESNext, so incorporate it into Babel itself.

- Refactor [Lebab](https://github.com/lebab/lebab/issues/138) as Babel transforms (can keep the cli since it's a separate tool)
  - Usecase: ES3 -> ES6+ (on source code)
  - Usecase: Remove usage of dropped proposals
  - Usecase: Auto upgrade to the latest version of a proposal spec (if possible)
  - Can we somehow combine forces in: babel-codemod/jscodeshift/lebab, prettier/recast/babel-generator? I really don't want to update all of these: new syntax equals re-writing the printer in all of these places separately/out of sync.

## Increasing the quality of community plugins
- Work with the community to create guides on how to write plugins or understand ASTs, etc
- Analysis of API's/syntax used (Google BigQuery)
- Have #blessed/sanctioned/curated packages according to some standard
  - Can use for smoke tests
  - Official testing package
  - Certain level of coverage, downloads, etc
  - Create a scoped namespace on github/npm for these? like webpack-contrib
  - Can enforce linting rules on apis?
  - Makes ecosystem changes easier if can notify and upgrade these plugins beforehand
  - Create a set of standard tests to verify against (handles all syntax)
  - Documented/tested set of options

### ASTExplorer
- allow custom version of babel-standalone (same as REPL to allow per PR tests)
- integrate with repl? (both are in react)
- auto publish a plugin to npm?
- create tests?
- hook into codesandbox?

---

## Feature

### Performance table for ES6+ (used in babel-preset-env under new option e.g `perf`)

> Add a new option in `preset-env`: will continue to compile if the native support is *slower*. Can setup a threshold, may need to compare against the size difference.

- Use [six-speed](https://github.com/kpdecker/six-speed) repo as a base, needs to apply for ES6 and proposals
- Need continued maintainence

### Compiled Output Stats 

> [#5340](https://github.com/babel/babel/issues/5340) Can show the code size before and after compiling to give a sense of compiled output. Could create suggestions like using "loose" mode or not compiling, etc.

- The [REPL](https://twitter.com/existentialism/status/948940160653291520) just added a before/after code-size
- Maybe difficult to do per transform

### Async Transforms

Support having async plugins. Will require it to be opt-in and for all other plugins to be async.

### Plugin Ordering

- Add `before`/`after` keys for plugins so they can specify order.
- Possibily implement related plugins in the same "plugin" but just expose a flag out to the end-user.

### Babel Helpers (shared code)
- loader should handle these automatically like rollup
- allow 3rd party helpers?  https://github.com/babel/babel/issues/6487
- allow compilation of helpers (write in esnext?) https://github.com/babel/babel/issues/5876

## Repurpose `babel` / create `babel-init`

> We can re-use the `babel` package for a more simplified *0 config™* version

Not sure what this looks like but had this idea for a really long time and didn't really get anywhere - the cli version could just be https://github.com/developit/microbundle for libs? Maybe webpack/parcel would have it covered for apps?

---

## General/Infra

### Run Babel against Spec tests (test262, TS, Flow, JSX)

Better set of tests for stability/spec compliancy.

- The parser (babylon) already has a whitelist of test262 tests
- Need to do the same for the transforms.

### Smoke Tests
- Babel itself https://github.com/babel/babel/issues/6134
- Important community plugins (`babel-plugin-instanbul`, css-in-js)
- `babel-core` integrations (wrappers like `babel-loader`, test frameworks, etc)
- Libraries (`(p)react`, `redux`, `vue`)
- Tools that use individual packages (`debugger.html`, `prepack`)
- OSS Apps (`nylas-mail`)

### Better Debuggability

- Query config for data for other tools
- `babel --settings`
- Validate config better
- Create/expand on new tools like https://github.com/boopathi/babel-time-travel

### Speed
  
> Already working with v8 via https://github.com/v8/web-tooling-benchmark, but can add other representative workloads: jsx/flow/ts/es6+.

Can run these benchmarks for perf PRs, should track some over time.

### Website Rehaul

- Use a blog framework like Gatsby/Docusaurus
- Versioned docs pages: currently we don't have an easy way to show both the documentation for v6, v7, and beyond.
- Translatable docs

#### Expanded Docs
- Real documentation on APIs
- Up to date babel-handbook/merge into rehauled website
- Continue our [videos page](https://babeljs.io/docs/community/videos/)
- Link to common errors pages

#### Better REPL
- Dropdown examples/examples of syntax from github?
- Import any package from npm
- Run any plugin from npm
- Create a plugin from the repl (merge into/with ASTExplorer?)
- Import/Export a `.babelrc` file

### `babel-bot`

> [#43](https://github.com/babel/babel-bot/issues/43) Rewrite it with [probot](https://github.com/probot/probot)

A bot is really useful to do github/maintainer activities automatically.

We haven't updated this in a long time due to Andrew being busy and not setting up the automatic infra on AWS. Switching will make updating actually real so we can add some new features which would save some headache.

References: https://github.com/eslint/eslint-github-bot, https://github.com/open-bot/open-bot

### Expanded Maintainer Guide

> Better onboarding/contributing guide
- Guide to different aspects of contributing with real examples to issues/PRs

---

## Wishlist (might be out of scope/complex)
- Should Babel operate multi-file/take in a dep graph?
- Should Babel use type info (from other things like ts/flow/runtime info)
- AST
  - Can we just move back to acorn + estree?
  - Should we switch to shift?
  - What about binary ast?
  - immutable? https://github.com/babel/babel/issues/4130#issuecomment-245411113
