# Changelog

> **Tags:**
> - :boom:       [Breaking Change]
> - :eyeglasses: [Spec Compliancy]
> - :rocket:     [New Feature]
> - :bug:        [Bug Fix]
> - :memo:       [Documentation]
> - :house:      [Internal]
> - :nail_care:  [Polish]

_Note: Gaps between patch versions are faulty, broken or test releases._

See [CHANGELOG - 6to5](/.github/CHANGELOG-6to5.md) for the pre-4.0.0 version changelog.

## 6.26.0 (2017-08-16)

> Backports for some folks (also other's when we accidently merged PRs from both 6.x/master)
> Lesson learned: just use `master` and backport on another branch.

#### :eyeglasses: Spec Compliancy
* `babel-core`, `babel-generator`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-flow-strip-types`, `babel-traverse`, `babel-types`
  * [#6081](https://github.com/babel/babel/pull/6081) Flow opaque type 6.x backport. ([@jbrown215](https://github.com/jbrown215))

#### :rocket: New Feature
* `babel-cli`
  * [#5796](https://github.com/babel/babel/pull/5796) Allow --inspect-brk option to be used with babel-node [6.x backport]. ([@noinkling](https://github.com/noinkling))

#### :bug: Bug Fix
* `babel-plugin-transform-es2015-modules-commonjs`
  * [#5811](https://github.com/babel/babel/pull/5811) Fix 5768. ([@joshwnj](https://github.com/joshwnj))
  * [#5469](https://github.com/babel/babel/pull/5469) Fix commonjs exports with destructuring.. ([@yavorsky](https://github.com/yavorsky))
* `babel-types`
  * [#5693](https://github.com/babel/babel/pull/5693) Hoist toSequenceExpression's convert helper. ([@jridgewell](https://github.com/jridgewell))

#### :memo: Documentation
* `babel-plugin-transform-class-properties`
  * [#6005](https://github.com/babel/babel/pull/6005) FIX access to the prototype of an instance. ([@shuaibird](https://github.com/shuaibird))
* `babel-plugin-transform-runtime`
  * [#5857](https://github.com/babel/babel/pull/5857) Fix typos in README.md. ([@danny-andrews](https://github.com/danny-andrews))
* `babel-plugin-transform-regenerator`
  * [#5852](https://github.com/babel/babel/pull/5852) Fix babel-plugin-transform-regenerator README. ([@k15a](https://github.com/k15a))
* Other
  * [#5788](https://github.com/babel/babel/pull/5788) Add a section on troubleshooting [skip ci]. ([@peey](https://github.com/peey))
  * [#5755](https://github.com/babel/babel/pull/5755) Fix broken tables in README.md. ([@u9lyfish](https://github.com/u9lyfish))
* `babel-generator`, `babel-plugin-transform-es2015-arrow-functions`, `babel-plugin-transform-es2015-modules-commonjs`, `babel-plugin-transform-es2015-spread`, `babel-plugin-transform-runtime`, `babel-register`
  * [#5613](https://github.com/babel/babel/pull/5613) Backport doc changes. ([@xtuc](https://github.com/xtuc))

#### :house: Internal
* `babel-traverse`
  * [#5965](https://github.com/babel/babel/pull/5965) Remove unused functions from renamer.js.. ([@mcav](https://github.com/mcav))
  * [#5363](https://github.com/babel/babel/pull/5363) Increase the code coverage for traverse evaluation. ([@ssuman](https://github.com/ssuman))
* Other
  * [#5938](https://github.com/babel/babel/pull/5938) Remove codecov node package and use bash uploader. ([@existentialism](https://github.com/existentialism))

#### Committers: 19
- Artem Yavorsky ([yavorsky](https://github.com/yavorsky))
- Brian Ng ([existentialism](https://github.com/existentialism))
- Danny Andrews ([danny-andrews](https://github.com/danny-andrews))
- Henry Zhu ([hzoo](https://github.com/hzoo))
- Jeffrey Wear ([wearhere](https://github.com/wearhere))
- Jordan Brown ([jbrown215](https://github.com/jbrown215))
- Josh Johnston ([joshwnj](https://github.com/joshwnj))
- Justin Ridgewell ([jridgewell](https://github.com/jridgewell))
- Konstantin Pschera ([k15a](https://github.com/k15a))
- Malcolm ([noinkling](https://github.com/noinkling))
- Marcus Cavanaugh ([mcav](https://github.com/mcav))
- Peeyush Kushwaha ([peey](https://github.com/peey))
- Philipp Friedenberger ([MrSpider](https://github.com/MrSpider))
- Samuel Reed ([STRML](https://github.com/STRML))
- Shuaibird Hwang ([shuaibird](https://github.com/shuaibird))
- Suman ([ssuman](https://github.com/ssuman))
- Sven SAULEAU ([xtuc](https://github.com/xtuc))
- jonathan schatz ([modosc](https://github.com/modosc))
- u9lyfish@gmail.com ([u9lyfish](https://github.com/u9lyfish))

## 6.25.0 (2017-06-08)

Just backporting a few things.

#### :rocket: New Feature
* `babel-plugin-transform-react-display-name`
  * [#5780](https://github.com/babel/babel/pull/5780) Backport support for createReactClass with transform-react-display-name. ([@kentor](https://github.com/kentor))
  * [#5554](https://github.com/babel/babel/pull/5554) Updated transform-react-display-name for createReactClass addon. ([@bvaughn](https://github.com/bvaughn))
* `babel-generator`, `babel-plugin-transform-flow-strip-types`, `babel-types`
  * [#5653](https://github.com/babel/babel/pull/5653) Port flow object spread from #418 to 6.x. ([@kittens](https://github.com/kittens))

#### :bug: Bug Fix
* `babel-types`
  * [#5770](https://github.com/babel/babel/pull/5770) Backport array & object pattern fixes to 6.x. ([@citycide](https://github.com/citycide))

#### :nail_care: Polish
* `babel-traverse`
  * [#5615](https://github.com/babel/babel/pull/5615) Update deprecation warning on flow bindings. ([@kassens](https://github.com/kassens))

#### Committers: 5
- Bo Lingen ([citycide](https://github.com/citycide))
- Brian Vaughn ([bvaughn](https://github.com/bvaughn))
- Jan Kassens ([kassens](https://github.com/kassens))
- Kenneth Chung ([kentor](https://github.com/kentor))
- Sebastian McKenzie ([kittens](https://github.com/kittens))

## 6.24.0 (2017-03-13)

A quick release for 2 features:

- Thanks to @rwjblue, there is now a `noInterop` option for our `es2015-modules` transform to remove the `interopRequireDefault` and `interopRequireWildcard` helpers.

Input

```js
import foo from "foo";
foo;
```

Regular Output

```js
var _foo = require("foo");
var _foo2 = _interopRequireDefault(_foo);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_foo2.default;
```

Output with option `noInterop`

```js
"use strict";
var _foo = require("foo");
(0, _foo.default)();
```

> This also helps [ember-cli migrate to Babel 6](https://github.com/ember-cli/ember-cli/pull/6828).

- @izaakschroeder has added `dirname` to the preset constructor which presets can use to resolve things relative to files.

Example usage of `fileContext.dirname` in a preset

```js
module.exports = function preset (context, options, fileContext) {
  if (/resolve-addons-relative-to-file$/.test(fileContext.dirname)) {
    return {
      plugins: ['plugin-here'],
    };
  }
  return {};
};
```

> This will help out with reusing a [`browserslist` file for babel-preset-env](https://github.com/babel/babel-preset-env/issues/26) and for plugins like https://github.com/tleunen/babel-plugin-module-resolver.

#### :rocket: New Feature
* `babel-plugin-transform-es2015-modules-amd`, `babel-plugin-transform-es2015-modules-commonjs`
  * [#5427](https://github.com/babel/babel/pull/5427) Backport `noInterop` flag for modules to 6.x. ([@rwjblue](https://github.com/rwjblue))
* `babel-core`
  * [#4834](https://github.com/babel/babel/pull/4834) Pass `dirname` as extra metadata to preset constructor. ([@izaakschroeder](https://github.com/izaakschroeder))

#### :bug: Bug Fix
* `babel-generator`
  * [#5453](https://github.com/babel/babel/pull/5453) Keep parentheses for logical expression when in await expression. ([@aaronang](https://github.com/aaronang))
  * [#5339](https://github.com/babel/babel/pull/5339) Wrap some generated do expressions in parens. ([@zjmiller](https://github.com/zjmiller))
* `babel-generator`, `babel-plugin-transform-object-rest-spread`
  * [#5322](https://github.com/babel/babel/pull/5322) Fix for-await printing. ([@danez](https://github.com/danez))

#### :memo: Documentation

* [#5449](https://github.com/babel/babel/pull/5449) Fixed broken links in README.md [skip-ci]. ([@sethbergman](https://github.com/sethbergman))
* [#5409](https://github.com/babel/babel/pull/5409) Fix transform-object-rest-spread README. ([@existentialism](https://github.com/existentialism))
* [#5379](https://github.com/babel/babel/pull/5379) Lint code snippets in READMEs. ([@xtuc](https://github.com/xtuc))
* [#5334](https://github.com/babel/babel/pull/5334) Shorthand properties examples. ([@bhoule](https://github.com/bhoule))
* [#5329](https://github.com/babel/babel/pull/5329) Update CONTRIBUTING.md with respect to coverage check [skip ci]. ([@zjmiller](https://github.com/zjmiller))

#### :house: Internal
* Other
  * [#5338](https://github.com/babel/babel/pull/5338) Improve babel-generator's code coverage. ([@alxpy](https://github.com/alxpy))
  * [#5336](https://github.com/babel/babel/pull/5336) Enable codecov partial coverage. ([@danez](https://github.com/danez))
  * [#5350](https://github.com/babel/babel/pull/5350) Remove redundant NODE_ENV=test in Makefile. ([@aaronang](https://github.com/aaronang))
  * [#5312](https://github.com/babel/babel/pull/5312) [skip ci] Add devEngines to package.json. ([@yavorsky](https://github.com/yavorsky))
* `babel-cli`
  * [#5342](https://github.com/babel/babel/pull/5342) Add test for passing arguments to babel-node (#5163). ([@outsideris](https://github.com/outsideris))
* `babel-traverse`
  * [#5296](https://github.com/babel/babel/pull/5296) Add test for reference paths. ([@jasonLaster](https://github.com/jasonLaster))

#### Committers: 14
- Aaron Ang ([aaronang](https://github.com/aaronang))
- Alex Kuzmenko ([alxpy](https://github.com/alxpy))
- Artem Gurzhii ([artemgurzhii](https://github.com/artemgurzhii))
- Artem Yavorsky ([yavorsky](https://github.com/yavorsky))
- Brendan Houle ([bhoule](https://github.com/bhoule))
- Brian Ng ([existentialism](https://github.com/existentialism))
- Daniel Tschinder ([danez](https://github.com/danez))
- Izaak Schroeder ([izaakschroeder](https://github.com/izaakschroeder))
- Jason Laster ([jasonLaster](https://github.com/jasonLaster))
- JeongHoon Byun (aka Outsider) ([outsideris](https://github.com/outsideris))
- Robert Jackson ([rwjblue](https://github.com/rwjblue))
- Seth Bergman ([sethbergman](https://github.com/sethbergman))
- Sven SAULEAU ([xtuc](https://github.com/xtuc))
- Zachary Miller ([zjmiller](https://github.com/zjmiller))

## 6.23.1 (2017-02-13)

Regression: Revert https://github.com/babel/babel/pull/5306 since it made a backwards-incompatible change.

## 6.23.0 (2017-02-13)

#### :rocket: New Feature
* `babel-plugin-transform-react-constant-elements`
  * [#4812](https://github.com/babel/babel/pull/4812) feature: Support pure expressions in transform-react-constant-elements. ([@STRML](https://github.com/STRML))
* `babel-preset-flow`, `babel-preset-react`
  * [#5288](https://github.com/babel/babel/pull/5288) Add new flow preset. ([@thejameskyle](https://github.com/thejameskyle))
* `babel-traverse`
  * [#5230](https://github.com/babel/babel/pull/5230) Add path/family sibling traversal methods. ([@chitchu](https://github.com/chitchu))
* `babel-plugin-transform-es2015-block-scoping`
  * [#5236](https://github.com/babel/babel/pull/5236) Add option to block-scoping to throw on slow code. ([@spicyj](https://github.com/spicyj))

#### :bug: Bug Fix
* `babel-core`, `babel-traverse`
  * [#5050](https://github.com/babel/babel/pull/5050) Rewrite Hub as interface #5047. ([@yongxu](https://github.com/yongxu))
* `babel-plugin-transform-es2015-for-of`
  * [#5298](https://github.com/babel/babel/pull/5298) Fix loose for-of with label. ([@jridgewell](https://github.com/jridgewell))
* `babel-plugin-transform-react-constant-elements`, `babel-traverse`
  * [#5153](https://github.com/babel/babel/pull/5153) Fix react constant elements bindings. ([@STRML](https://github.com/STRML))
  * [#5143](https://github.com/babel/babel/pull/5143) Fix PathHoister hoisting JSX member expressions on "this".. ([@STRML](https://github.com/STRML))
* `babel-plugin-transform-do-expressions`, `babel-traverse`
  * [#5030](https://github.com/babel/babel/pull/5030) Prevent multiple return statements in a loop when replacing expressions. ([@existentialism](https://github.com/existentialism))
* `babel-register`
  * [#5260](https://github.com/babel/babel/pull/5260) Fix TypeError with babel-register's cache. ([@xtuc](https://github.com/xtuc))
* `babel-traverse`
  * [#5206](https://github.com/babel/babel/pull/5206) Deopt evaluation of undefined with a local binding. Closes [#5204](https://github.com/babel/babel/issues/5204). ([@boopathi](https://github.com/boopathi))
* `babel-plugin-transform-runtime`
  * [#5195](https://github.com/babel/babel/pull/5195) Don't transpile ES7 symbol properties. ([@taion](https://github.com/taion))
* `babel`
  * [#5258](https://github.com/babel/babel/pull/5258) checks if babel is installed globally and displays correct cli message. ([@xtina-starr](https://github.com/xtina-starr))
* `babel-generator`
  * [#5270](https://github.com/babel/babel/pull/5270) Emit parens for await of ternary expressions. ([@erikdesjardins](https://github.com/erikdesjardins))
  * [#5193](https://github.com/babel/babel/pull/5193) Fix missing parens when function expressions is tag. ([@existentialism](https://github.com/existentialism))
* `babel-plugin-transform-es2015-modules-commonjs`
  * [#5235](https://github.com/babel/babel/pull/5235) Limit export node default assignment stack size #4323. ([@mattste](https://github.com/mattste))

#### :memo: Documentation
* `babel-*`
  * [#5244](https://github.com/babel/babel/pull/5244) Normalize options sections in docs [skip ci]. ([@existentialism](https://github.com/existentialism))
  * [#5216](https://github.com/babel/babel/pull/5216) Remove link to REPL. ([@xtuc](https://github.com/xtuc))
* Other
  * [#5242](https://github.com/babel/babel/pull/5242) Add our business model [skip ci]. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-transform-es2015-spread`
  * [#5227](https://github.com/babel/babel/pull/5227) Add example to spread README [skip ci]. ([@finkef](https://github.com/finkef))
* `babel-plugin-transform-flow-strip-types`
  * [#5212](https://github.com/babel/babel/pull/5212) Remove REPL link transform-flow-strip-types doc. ([@xtuc](https://github.com/xtuc))
* `babel-plugin-transform-regenerator`
  * [#5202](https://github.com/babel/babel/pull/5202) Fix transform-regenerator README. ([@xtuc](https://github.com/xtuc))
* `babel-plugin-transform-es2015-arrow-functions`
  * [#5200](https://github.com/babel/babel/pull/5200) Fix transform-es2015-arrow-functions code blocks on the website. ([@xtuc](https://github.com/xtuc))
  * [#5194](https://github.com/babel/babel/pull/5194) Fix transform-es2015-arrow-functions README. ([@xtuc](https://github.com/xtuc))

#### :house: Internal
* `babel-core`
  * [#5302](https://github.com/babel/babel/pull/5302) Add charset so tests work with convert-source-map@>1.4. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-core`, `babel-traverse`
  * [#5050](https://github.com/babel/babel/pull/5050) Rewrite Hub as interface #5047. ([@yongxu](https://github.com/yongxu))
* `babel-generator`
  * [#5255](https://github.com/babel/babel/pull/5255) codegen performance: use trim instead of lodash/trimEnd. ([@jwbay](https://github.com/jwbay))
* `babel-types`
  * [#5181](https://github.com/babel/babel/pull/5181) Remove uses of lodash/compact. ([@zertosh](https://github.com/zertosh))
* `babel-*`
  * [#5265](https://github.com/babel/babel/pull/5265) Re-enable the max-len ESLint rule.. ([@loganfsmyth](https://github.com/loganfsmyth))
* Other
  * [#5264](https://github.com/babel/babel/pull/5264) Add a sublime project file. ([@loganfsmyth](https://github.com/loganfsmyth))
  * [#5182](https://github.com/babel/babel/pull/5182) Run coverage only once. ([@existentialism](https://github.com/existentialism))
  * [#5165](https://github.com/babel/babel/pull/5165) Add Node 7 to CI. ([@chicoxyzzy](https://github.com/chicoxyzzy))

#### Committers: 20
- Andres Suarez ([zertosh](https://github.com/zertosh))
- Ben Alpert ([spicyj](https://github.com/spicyj))
- Boopathi Rajaa ([boopathi](https://github.com/boopathi))
- Brian Ng ([existentialism](https://github.com/existentialism))
- Christina ([xtina-starr](https://github.com/xtina-starr))
- Erik Desjardins ([erikdesjardins](https://github.com/erikdesjardins))
- Fabian Finke ([finkef](https://github.com/finkef))
- Henry Zhu ([hzoo](https://github.com/hzoo))
- Jimmy Jia ([taion](https://github.com/taion))
- Justin Ridgewell ([jridgewell](https://github.com/jridgewell))
- Logan Smyth ([loganfsmyth](https://github.com/loganfsmyth))
- Matt Stewart ([mattste](https://github.com/mattste))
- Samuel Reed ([STRML](https://github.com/STRML))
- Sergey Rubanov ([chicoxyzzy](https://github.com/chicoxyzzy))
- Sven SAULEAU ([xtuc](https://github.com/xtuc))
- Vicente Jr Yuchitcho ([chitchu](https://github.com/chitchu))
- Yongxu Ren ([yongxu](https://github.com/yongxu))
- [jwbay](https://github.com/jwbay)
- james kyle ([thejameskyle](https://github.com/thejameskyle))
- Łukasz Lityński ([hex13](https://github.com/hex13))

## 6.22.2 (2017-01-19)

#### :bug: Bug Fix

* `babel-cli`
  * Fix issue with `babel-node` throwing errors when passed non-"-" args [#5162](https://github.com/babel/babel/pull/5162).

## 6.22.1 (2017-01-19)

#### :bug: Bug Fix

* `babel-traverse`
  * Temporary fix with `babel-traverse` via [#5019](https://github.com/babel/babel/pull/5019) for transform-react-constant-elements.

## 6.22.0 (2017-01-19)

A quick update since it's been over a month already: adds support for shorthand import syntax in Flow + some fixes!

We'll be merging in our current 7.0 PRs on a 7.0 branch soon and I'l be making some more issues (most should be beginner-friendly).

To follow our progress check out our [7.0 milestone](https://github.com/babel/babel/milestone/9), the [wiki](https://github.com/babel/babel/wiki/Babel-7) and upcoming announcements on [twitter](https://twitter.com/babeljs)!

We support stripping out and generating the new shorthand import syntax in Flow (parser support was added in [babylon@6.15.0](https://github.com/babel/babylon/releases/tag/v6.15.0).

```js
import {
  someValue,
  type someType,
  typeof someOtherValue,
} from "blah";
```

#### :rocket: New Feature
* `babel-generator`, `babel-types`
  * [#5110](https://github.com/babel/babel/pull/5110) Validate importKind and ensure code generation exists.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-plugin-transform-flow-strip-types`, `babel-traverse`
  * [#5035](https://github.com/babel/babel/pull/5035) Strip Flow's new shorthand import-type specifiers. ([@jeffmo](https://github.com/jeffmo))
* `babel-core`
  * [#4729](https://github.com/babel/babel/pull/4729) Add resolvePlugin and resolvePreset methods to babel-core API. ([@rmacklin](https://github.com/rmacklin))

#### :bug: Bug Fix
* `babel-plugin-transform-object-rest-spread`
  * [#5151](https://github.com/babel/babel/pull/5151) Avoid duplicating impure expressions in object rest destructuring. ([@erikdesjardins](https://github.com/erikdesjardins))

```js
const { x, ...y } = foo();
```

Old Behavior

```js
const { x } = foo();
const y = _objectWithoutProperties(foo(), ["x"]);
```

New/Expected Behavior

```js
const _ref = foo(); // should only be called once
const { x } = _ref;
const y = _objectWithoutProperties(_ref, ["x"]);
```

* `babel-cli`
  * [#4790](https://github.com/babel/babel/pull/4790) fixes invalid line offsets in merged sourcemaps. ([@peterm0x](https://github.com/peterm0x))
* `babel-plugin-transform-object-rest-spread`
  * [#5088](https://github.com/babel/babel/pull/5088) fix: plugin-transform-object-rest-spread param with default value. ([@christophehurpeau](https://github.com/christophehurpeau))

Accounts for default values in object rest params

```js
function fn({a = 1, ...b} = {}) {
  return {a, b};
}
```

* `babel-plugin-transform-es2015-destructuring`
  * [#5093](https://github.com/babel/babel/pull/5093) Ensure array is always copied during destructure. ([@existentialism](https://github.com/existentialism))

```js
const assign = ([...arr], index, value) => {
  arr[index] = value
  return arr
}

const arr = [1, 2, 3]
assign(arr, 1, 42)
console.log(arr) // [1, 2, 3]
```

* `babel-plugin-transform-es2015-function-name`
  * [#5008](https://github.com/babel/babel/pull/5008) Don't try to visit ArrowFunctionExpression, they cannot be named. ([@Kovensky](https://github.com/Kovensky))

Input

```js
export const x = ({ x }) => x;
export const y = function () {};
```

Output

```js
export const x = ({ x }) => x;
export const y = function y() {};
```

* `babel-types`
  * [#5068](https://github.com/babel/babel/pull/5068) Fix getBindingIdentifiers in babel-types. ([@rtsao](https://github.com/rtsao))
* `babel-cli`
  * [#3698](https://github.com/babel/babel/pull/3698) Watch mode should wait for file write. (T7411) ([@hayeah](https://github.com/hayeah))

#### :nail_care: Polish
* `babel-traverse`
  * [#5076](https://github.com/babel/babel/pull/5076) Optimize removal-hooks for ArrowFunctions. ([@danez](https://github.com/danez))
* `babel-generator`, `babel-plugin-transform-exponentiation-operator`
  * [#5026](https://github.com/babel/babel/pull/5026) Remove unnecessary spaces around template element. ([@chicoxyzzy](https://github.com/chicoxyzzy))

#### :memo: Documentation
* Other
  * [#5144](https://github.com/babel/babel/pull/5144) Fix dependency status extension.. ([@yavorsky](https://github.com/yavorsky))
  * [#5136](https://github.com/babel/babel/pull/5136) Add babel-preset-env to maintained list.. ([@yavorsky](https://github.com/yavorsky))
* `babel-core`
  * [#5101](https://github.com/babel/babel/pull/5101) Document babelrc option. ([@novemberborn](https://github.com/novemberborn))
  * [#5114](https://github.com/babel/babel/pull/5114) Update babel-core options in README. ([@existentialism](https://github.com/existentialism))
* `babel-plugin-syntax-class-constructor-call`
  * [#5130](https://github.com/babel/babel/pull/5130) update syntax-class-constructor-call documentation. ([@xtuc](https://github.com/xtuc))
* `babel-plugin-transform-es2015-duplicate-keys`, `babel-plugin-transform-es2015-parameters`
  * [#5111](https://github.com/babel/babel/pull/5111) Fixes some inconsistent documentation. ([@xtuc](https://github.com/xtuc))
* `babel-plugin-transform-es2015-computed-properties`, `babel-plugin-transform-es2015-for-of`
  * [#5096](https://github.com/babel/babel/pull/5096) Add examples to computed-props and for-of READMEs [skip ci]. ([@existentialism](https://github.com/existentialism))
* `babel-plugin-transform-class-properties`
  * [#5077](https://github.com/babel/babel/pull/5077) Static function call result comment does not match variable content [skip ci]. ([@kasn](https://github.com/kasn))
* Other
  * [#5070](https://github.com/babel/babel/pull/5070) Fix typo in README.md. ([@nomicos](https://github.com/nomicos))
  * [#5031](https://github.com/babel/babel/pull/5031) remove plugin links, just use the website [skip ci]. ([@hzoo](https://github.com/hzoo))
  * [#5011](https://github.com/babel/babel/pull/5011) Add Team section [skip ci]. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-transform-es2015-classes`, `babel-plugin-transform-function-bind`
  * [#5061](https://github.com/babel/babel/pull/5061) Fix some doc lint issues. ([@existentialism](https://github.com/existentialism))
* `babel-helpers`
  * [#5059](https://github.com/babel/babel/pull/5059) Fix incorrect snippet language in babel-helpers. ([@xtuc](https://github.com/xtuc))
* `babel-preset-react`
  * [#5051](https://github.com/babel/babel/pull/5051) Adding more info to the Install section. ([@gitanupam](https://github.com/gitanupam))
* `babel-plugin-check-es2015-constants`, `babel-plugin-transform-es2015-modules-umd`, `babel-plugin-transform-es2015-typeof-symbol`, `babel-register`
  * [#5045](https://github.com/babel/babel/pull/5045) Fix some README links. ([@existentialism](https://github.com/existentialism))
* `babel-core`
  * [#5014](https://github.com/babel/babel/pull/5014) Update babel-core's README. ([@xtuc](https://github.com/xtuc))

#### :house: Internal
* `babel-*`
  * [#5129](https://github.com/babel/babel/pull/5129) Bump eslint-config-babel and fix lint. ([@existentialism](https://github.com/existentialism))
  * [#5138](https://github.com/babel/babel/pull/5138) Refactor packages to use ES modules instead of CJS. ([@chicoxyzzy](https://github.com/chicoxyzzy))
  * [#5113](https://github.com/babel/babel/pull/5113) Kaicataldo enable prefer const. ([@hzoo](https://github.com/hzoo))
* `babel-helper-transform-fixture-test-runner`
  * [#5135](https://github.com/babel/babel/pull/5135) Run Babel's unittests in a custom sandbox.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-cli`, `babel-core`, `babel-generator`, `babel-helper-define-map`, `babel-register`, `babel-runtime`, `babel-types`
  * [#5043](https://github.com/babel/babel/pull/5043) Replace "lodash/is*" and "lodash/each" with native equivalents. ([@zertosh](https://github.com/zertosh))
* `babel-cli`, `babel-generator`, `babel-helper-fixtures`, `babel-helper-transform-fixture-test-runner`, `babel-preset-es2015`, `babel-runtime`, `babel-traverse`
  * [#5042](https://github.com/babel/babel/pull/5042) Use native or lodash util module where full "lodash" is required. ([@zertosh](https://github.com/zertosh))
* `babel-code-frame`
  * [#5094](https://github.com/babel/babel/pull/5094) babel-code-frame: Upgrade to js-tokens@3. ([@lydell](https://github.com/lydell))
* `babel-plugin-transform-react-jsx`
  * [#5100](https://github.com/babel/babel/pull/5100) Fix broken repository url. ([@batista](https://github.com/batista))
* `babel-plugin-transform-decorators`
  * [#5038](https://github.com/babel/babel/pull/5038) Remove unused dependency. ([@zertosh](https://github.com/zertosh))
* `babel-plugin-transform-es2015-computed-properties`
  * [#5053](https://github.com/babel/babel/pull/5053) Remove unused define-map helper from computed-properties. ([@existentialism](https://github.com/existentialism))
* `babel-cli`
  * [#5027](https://github.com/babel/babel/pull/5027) Dependencies: Upgrade glob to v7. ([@ysangkok](https://github.com/ysangkok))

#### Committers: 23, First PRs: 10
- Andres Suarez ([zertosh](https://github.com/zertosh))
- Andrii Bida ([nomicos](https://github.com/nomicos)) First PR!
- Anthony Zotti ([amZotti](https://github.com/amZotti)) First PR!
- Anupam ([gitanupam](https://github.com/gitanupam)) First PR!
- Artem Yavorsky ([yavorsky](https://github.com/yavorsky)) First PR!
- Brian Ng ([existentialism](https://github.com/existentialism))
- Christophe Hurpeau ([christophehurpeau](https://github.com/christophehurpeau))
- Daniel Tschinder ([danez](https://github.com/danez))
- Diogo Franco ([Kovensky](https://github.com/Kovensky))
- Erik Desjardins ([erikdesjardins](https://github.com/erikdesjardins))
- Henry Zhu ([hzoo](https://github.com/hzoo))
- Howard Yeh ([hayeah](https://github.com/hayeah)) First PR!
- Janus Troelsen ([ysangkok](https://github.com/ysangkok)) First PR!
- Jeff Morrison ([jeffmo](https://github.com/jeffmo))
- Karsten Gohm ([kasn](https://github.com/kasn)) First PR!
- Logan Smyth ([loganfsmyth](https://github.com/loganfsmyth))
- Mark Wubben ([novemberborn](https://github.com/novemberborn)) First PR!
- Peter Mikula ([peterm0x](https://github.com/peterm0x))
- Ryan Tsao ([rtsao](https://github.com/rtsao)) First PR!
- Sergey Rubanov ([chicoxyzzy](https://github.com/chicoxyzzy))
- Simon Lydell ([lydell](https://github.com/lydell))
- Sven SAULEAU ([xtuc](https://github.com/xtuc))
- Sérgio Batista ([batista](https://github.com/batista)) First PR!
- [rmacklin](https://github.com/rmacklin)

## 6.21.1 (2016-12-17)

#### :bug: Bug Fix
* `babel-helper-builder-react-jsx`, `babel-plugin-transform-react-jsx`
  * [#5015](https://github.com/babel/babel/pull/5015) Revert the introduction of a new error message that ended up introducing its own error ([@loganfsmyth](https://github.com/loganfsmyth))

## 6.21.0 (2016-12-16)

#### :rocket: New Feature
* `babel-generator`
  * [#4979](https://github.com/babel/babel/pull/4979) `babel-generator`: Expose raw mappings. ([@davidaurelio](https://github.com/davidaurelio))

Exposes raw mappings when source map generation is enabled. To avoid the cost of source map generation for consumers of the raw mappings only, `.map` is changed to a getter that generates the source map lazily on first access.

Raw mappings can be useful for post-processing source maps more efficiently by avoiding one decoding/encoding cycle of the b64 vlq mappings. This will be used in the React Native packager.

```js
let generator = require("babel-generator");
let generated = generator(ast, { sourceMaps: true }, sources);

// generated.rawMappings
[
  {
    name: undefined,
    generated: { line: 1, column: 0 },
    source: "inline",
    original: { line: 1, column: 0 }
  },
  ...
]
```

#### :bug: Bug Fix
* `babel-generator`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-flow-strip-types`
  * [#4872](https://github.com/babel/babel/pull/4872) Print Flow optional & type annotations in function params with defaults. ([@danharper](https://github.com/danharper))

Works with generator, transform-flow-comments, flow-strip-types.

```js
function foo(numVal: number = 2) {}
```

* `babel-generator`, `babel-plugin-transform-es2015-modules-amd`, `babel-plugin-transform-es2015-modules-umd`
  * [#4873](https://github.com/babel/babel/pull/4873) Ensure directives get printed in block statements. ([@existentialism](https://github.com/existentialism))

```js
let blockStatement = t.blockStatement(
  [],
  [t.directive(t.directiveLiteral("use strict"))]
);
```

* `babel-generator`, `babel-helper-builder-react-jsx`, `babel-plugin-transform-react-jsx`, `babel-types`
  * [#4988](https://github.com/babel/babel/pull/4988) Add `JSXSpreadChildren` but throw in JSX transform plugin. ([@jridgewell](https://github.com/jridgewell))

Will still error with `Spread children are not supported.`

```js
<div>{...this.props.children}</div>;
```

* `babel-plugin-transform-es2015-block-scoping`, `babel-plugin-transform-react-constant-elements`, `babel-traverse`
  * [#4940](https://github.com/babel/babel/pull/4940) Fix React constant element bugs. ([@appden](https://github.com/appden))

When multiple declarators are present in a declaration, we want to insert the constant element inside the declaration rather than placing it before because it may rely on a declarator inside that same declaration.

```js
function render() {
  const bar = "bar", renderFoo = () => <foo bar={bar} baz={baz} />, baz = "baz";

  return renderFoo();
}
```

When block scoped variables caused the block to be wrapped in a closure, the variable bindings remained in parent function scope, which caused the JSX element to be hoisted out of the closure.

```js
function render(flag) {
  if (flag) {
    let bar = "bar";

    [].map(() => bar);

    return <foo bar={bar} />;
  }

  return null;
}
```

* `babel-plugin-transform-es2015-parameters`
  * [#3572](https://github.com/babel/babel/pull/3572) Fix default parameter - rest parameter edge case. ([@jridgewell](https://github.com/jridgewell))

Was erroring if the rest parameter shared the same name as a default identifier for a param, needed to be deopt'd.

```js
const a = 1;
function rest(b = a, ...a) {
  assert.equal(b, 1);
}
rest(undefined, 2)
```

* `babel-plugin-transform-es2015-for-of`, `babel-traverse`
  * [#5007](https://github.com/babel/babel/pull/5007) Bail on sharing comments with siblings if key is a string. ([@existentialism](https://github.com/existentialism))

```js
myLabel: //woops
for (let a of b) {
  continue myLabel;
}
```

#### :memo: Documentation
* Other
  * [#4989](https://github.com/babel/babel/pull/4989) Fix links in CONTRIBUTING.md. ([@abouthiroppy](https://github.com/abouthiroppy))
* `babel-plugin-transform-runtime`
  * [#4991](https://github.com/babel/babel/pull/4991) make installing runtime/transform-runtime clearer [skip ci]. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-transform-es2015-unicode-regex`
  * [#4983](https://github.com/babel/babel/pull/4983) Add example to es2015-unicode-regex. ([@existentialism](https://github.com/existentialism))

#### :house: Internal
* `babel-helper-transform-fixture-test-runner`, `babel-plugin-syntax-trailing-function-commas`
  * [#4999](https://github.com/babel/babel/pull/4999) babel-helper-transform-fixture-test-runner: pass require as a global. ([@hzoo](https://github.com/hzoo))

Allows running `require()` in exec.js tests like for [babel/babel-preset-env#95](https://github.com/babel/babel-preset-env/pull/95)

* Other
  * [#5005](https://github.com/babel/babel/pull/5005) internal: don't run watch with the test env (skip building with code …. ([@hzoo](https://github.com/hzoo))

#### Committers: 9
- Andrey Marchenko ([Tom910](https://github.com/Tom910))
- Babel Bot ([babel-bot](https://github.com/babel-bot))
- Brian Ng ([existentialism](https://github.com/existentialism))
- Dan Harper ([danharper](https://github.com/danharper))
- David Aurelio ([davidaurelio](https://github.com/davidaurelio))
- Henry Zhu ([hzoo](https://github.com/hzoo))
- Justin Ridgewell ([jridgewell](https://github.com/jridgewell))
- Scott Kyle ([appden](https://github.com/appden))
- Yuta Hiroto ([abouthiroppy](https://github.com/abouthiroppy))

## v6.20.3 (2016-12-08)

#### :cry: Regression

* `babel-plugin-transform-async-to-generator`
 * [#4978](https://github.com/babel/babel/pull/4978) Calculate the correct arity for async functions with destructuring. (fixes [#4977](https://github.com/babel/babel/issues/4977)) ([@loganfsmyth](https://github.com/loganfsmyth))

## v6.20.2 (2016-12-08)

#### :cry: Regression

Issue: https://github.com/babel/babel/issues/4972 again. Fixed by reverting part of the original PR in [babel/babel#4883](https://github.com/babel/babel/pull/4883).

## v6.20.1 (2016-12-08)

#### :cry: Regression

Issue: https://github.com/babel/babel/issues/4972

The way that [babel/babel#4883](https://github.com/babel/babel/pull/4883) changed visiting SpreadProperty (which didn't need to modified) caused an infinite loop. Added `path.stop` which ended up not fixing it correctly.

## v6.20.0 (2016-12-08)

> If you missed it, please check out our latest blog post: [The State of Babel](http://babeljs.io/blog/2016/12/07/the-state-of-babel). Talks about where we can possibly move forward as a project and how you can help!

- Maybe fix that crazy babel-generator deopt message you've all probably seen!
- Change to `babel-code-frame` for [facebookincubator/create-react-app#1101](https://github.com/facebookincubator/create-react-app/issues/1101)
- Change to `babel-generator` for [webpack/webpack#3413](https://github.com/webpack/webpack/pull/3413)
- Move implementation of Regenerator back to the original repo.

---

You've probably seen this more than a few times and had no idea what it meant...

```
[BABEL] Note: The code generator has deoptimised the styling of "app.js" as it exceeds the max of "100KB".
```

Generating code used to get really slow as file size increased. We've mostly fixed that, but we still automatically fall back to compact output on large files. We're going to bump the limit to 500KB and if there aren't issues just remove it.

---

[Ben Newman, @benjamn](https://github.com/benjamn): wrote [Regenerator](https://github.com/facebook/regenerator) while at Facebook. It used a bunch of other libraries such as `ast-types` but has now been rewritten as a standalone **Babel plugin** (also thanks to [Sebastian's](https://github.com/kittens) previous work in [facebook/regenerator#222](https://github.com/facebook/regenerator/pull/222)). We're also moving the implementation of Regenerator back into the original repository since Ben is the creator/maintainer.

#### :rocket: New Feature
* `babel-traverse`
  * [#4876](https://github.com/babel/babel/pull/4876) Add `getBindingIdentifierPaths`/`getOuterBindingIdentifierPaths`. ([@boopathi](https://github.com/boopathi))

Returns `Array<Path>` rather than `Array<Node>`.

- `path.getBindingIdentifierPaths()`
- `path.getOuterBindingIdentifierPaths()`

```js
traverse(parse(`
  var a = 1, {b} = c, [d] = e, function f() {};
`), {
  VariableDeclaration(path) {
    let nodes = path.getBindingIdentifiers(); // a, d, b
    let paths = path.getBindingIdentifierPaths();
  },
  FunctionDeclaration(path) {
    let outerNodes = path.getOuterBindingIdentifiers(); // f
    let outerPaths = path.getOuterBindingIdentifierPaths();
  }
});
```

* `babel-code-frame`
  * [#4913](https://github.com/babel/babel/pull/4913) Add `forceColor` option to `babel-code-frame`. ([@Timer](https://github.com/Timer))

> Forcibly syntax highlight the code as JavaScript (for non-terminals); overrides `highlightCode`. For [facebookincubator/create-react-app#1101](https://github.com/facebookincubator/create-react-app/issues/1101)

Usage

```js
const result = codeFrame(rawLines, lineNumber, colNumber, {
  forceColor: true
});
```

#### :bug: Bug Fix
* `babel-plugin-transform-es2015-block-scoping`
  * [#4880](https://github.com/babel/babel/pull/4880) Add (and fix) failing test of function parameter bindings in a catch block. ([@benjamn](https://github.com/benjamn))

**In**

```js
try {
  foo();
} catch (x) {
  function harmless(x) {
    return x;
  }
}
```

**Correct Out**

```js
try {
  foo();
} catch (x) {
  var harmless = function (x) {
    return x;
  };
}
```

* `babel-helper-remap-async-to-generator`, `babel-plugin-transform-async-generator-functions`, `babel-plugin-transform-async-to-generator`
  * [#4901](https://github.com/babel/babel/pull/4901) Only base async fn arity on non-default/non-rest params - Closes [#4891](https://github.com/babel/babel/issues/4891). ([@loganfsmyth](https://github.com/loganfsmyth))

```js
// both length's should be 0
const foo = (...args) => { }
console.log(foo.length)  // 0
const asyncFoo = async (...args) => { }
console.log(asyncFoo.length)  // 0
```

* `babel-generator`, `babel-types`
  * [#4945](https://github.com/babel/babel/pull/4945) Add `babel-generator` support for `Import`. ([@TheLarkInn](https://github.com/TheLarkInn))

> Relevant for webpack 2 support of `Import`. Just allows Babel to print it correctly.

```js
import("module.js");
```

* `babel-plugin-transform-object-rest-spread`
  * [#4883](https://github.com/babel/babel/pull/4883) Fix for object-rest with parameters destructuring nested rest. ([@christophehurpeau](https://github.com/christophehurpeau))

```js
function a5({a3, b2: { ba1, ...ba2 }, ...c3}) {}
```

* `babel-traverse`
  * [#4875](https://github.com/babel/babel/pull/4875) Fix `path.evaluate` for references before declarations. ([@boopathi](https://github.com/boopathi))

```js
// should deopt if ids are referenced before the bindings
var a = b + 2; var b = 2 + 2;
```

* `babel-core`, `babel-generator`, `babel-helper-transform-fixture-test-runner`, `babel-plugin-transform-object-rest-spread`
  * [#4858](https://github.com/babel/babel/pull/4858) Fix bug + Generate test fixtures if no expected.js. ([@hzoo](https://github.com/hzoo))
* `babel-types`
  * [#4853](https://github.com/babel/babel/pull/4853) Preserve null in `babel-types` `t.clone` and `t.deepClone` ([@NTillmann](https://github.com/NTillmann))

#### :nail_care: Polish
* `babel-generator`
  * [#4862](https://github.com/babel/babel/pull/4862) Fix identation with empty leading `ObjectTypeProperty`. ([@existentialism](https://github.com/existentialism))

#### :memo: Documentation
* `Various Packages`
  * [#4938](https://github.com/babel/babel/pull/4938) Update babel-core documentation. ([@xtuc](https://github.com/xtuc))
  * [#4939](https://github.com/babel/babel/pull/4939) Add example to transform-react-display-name docs. ([@existentialism](https://github.com/existentialism))
  * [#4931](https://github.com/babel/babel/pull/4931) Update plugins READMEs from babel.github.io [skip ci]. ([@raspo](https://github.com/raspo))
  * [#4926](https://github.com/babel/babel/pull/4926) Update transform-es2015 READMEs from babel.github.io [skip ci]. ([@existentialism](https://github.com/existentialism))
  * [#4930](https://github.com/babel/babel/pull/4930) Update transform-object-rest-spread's README from babel.github.io [skip ci]. ([@lukyth](https://github.com/lukyth))
  * [#4929](https://github.com/babel/babel/pull/4929) Update transform-object-assign's README from babel.github.io [skip ci]. ([@lukyth](https://github.com/lukyth))
  * [#4928](https://github.com/babel/babel/pull/4928) mention [skip ci] in PR template. ([@hzoo](https://github.com/hzoo))
  * [#4925](https://github.com/babel/babel/pull/4925) Tweak example in transform-jsx-source README [skip ci]. ([@existentialism](https://github.com/existentialism))
  * [#4919](https://github.com/babel/babel/pull/4919) Update async READMEs from babel.github.io [skip-ci]. ([@existentialism](https://github.com/existentialism))
  * [#4917](https://github.com/babel/babel/pull/4917) Fix some React transform README issues [skip-ci]. ([@existentialism](https://github.com/existentialism))
  * [#4903](https://github.com/babel/babel/pull/4903) Update React transform READMEs from babel.github.io [skip ci]. ([@existentialism](https://github.com/existentialism))
  * [#4884](https://github.com/babel/babel/pull/4884) Readme updates from babel.github.io [skip ci]. ([@hzoo](https://github.com/hzoo))

#### :house: Internal
* `babel-plugin-transform-regenerator`
  * [#4881](https://github.com/babel/babel/pull/4881) Use `regenerator-transform` to implement `babel-plugin-transform-regenerator`. ([@benjamn](https://github.com/benjamn))
* `babel-traverse`
  * [#4934](https://github.com/babel/babel/pull/4934) Hoist `generateDeclaredUidIdentifier` helper function. ([@jridgewell](https://github.com/jridgewell))
* `babel-polyfill`
  * [#4966](https://github.com/babel/babel/pull/4966) update `regenerator-runtime` in `babel-polyfill`. ([@zloirock](https://github.com/zloirock))
* `babel-runtime`
  * [#4877](https://github.com/babel/babel/pull/4877) Upgrade `regenerator-runtime` to version 0.10.0. ([@benjamn](https://github.com/benjamn))
* `babel-plugin-syntax-trailing-function-commas`
  * [#4936](https://github.com/babel/babel/pull/4936) Add `test` to `babel-plugin-syntax-trailing-function-commas` `.npmignore` ([@wtgtybhertgeghgtwtg](https://github.com/wtgtybhertgeghgtwtg))
* `babel-helper-fixtures`
  * [#4907](https://github.com/babel/babel/pull/4907) Remove `shouldIgnore` check. ([@danez](https://github.com/danez))
* `babel-core`, `babel-traverse`
  * [#4897](https://github.com/babel/babel/pull/4897) Fix eslint. ([@danez](https://github.com/danez))
* `babel-generator`
  * [#4965](https://github.com/babel/babel/pull/4965) Raise limit on code size before compacting ([@existentialism](https://github.com/existentialism))

#### Committers: 17
- Ben Newman ([benjamn](https://github.com/benjamn))
- Benjamin E. Coe ([bcoe](https://github.com/bcoe))
- Boopathi Rajaa ([boopathi](https://github.com/boopathi))
- Brian Ng ([existentialism](https://github.com/existentialism))
- Christophe Hurpeau ([christophehurpeau](https://github.com/christophehurpeau))
- Daniel Tschinder ([danez](https://github.com/danez))
- Denis Pushkarev ([zloirock](https://github.com/zloirock))
- Henry Zhu ([hzoo](https://github.com/hzoo))
- Joe Haddad ([Timer](https://github.com/Timer))
- Justin Ridgewell ([jridgewell](https://github.com/jridgewell))
- Kanitkorn Sujautra ([lukyth](https://github.com/lukyth))
- Logan Smyth ([loganfsmyth](https://github.com/loganfsmyth))
- Nikolai Tillmann ([NTillmann](https://github.com/NTillmann))
- Sean Larkin ([TheLarkInn](https://github.com/TheLarkInn))
- Sven SAULEAU ([xtuc](https://github.com/xtuc))
- Tommaso ([raspo](https://github.com/raspo))
- [wtgtybhertgeghgtwtg](https://github.com/wtgtybhertgeghgtwtg)

## v6.19.0 (2016-11-16)

#### :rocket: New Feature
* `babel-plugin-transform-object-rest-spread`
  * [#4755](https://github.com/babel/babel/pull/4755) Make the plugin work standalone with parameters/destructuring plugins. ([@hzoo](https://github.com/hzoo))

This rewrite fixes a long standing issue where the object-rest-spread plugin was depending on 2 other plugins to compile `RestProperty`. This is important given the assumption that plugins should be independent and is vital for the use of [babel-preset-env](https://github.com/babel/babel-preset-env/) since new environments support destructuring natively.

*RestProperty*

- [x] Parameters
``` js
function a({ b, ...c }) {}
```
- [x] VariableDeclaration
```js
const { a, ...b } = c;
```
- [x] ExportNamedDeclaration
```js
export var { a, ...b } = c;
```
- [x] CatchClause
```js
try {} catch ({a, ...b}) {}
```
- [x] AssignmentExpression
```js
({a, ...b} = c);
```
- [x] ForXStatement
```js
for ({a, ...b} of []) {}
```

*SpreadProperty*

- [x] ObjectExpression
```js
var a = { ...b, ...c }
```

* `babel-plugin-transform-class-properties`
  * [#4544](https://github.com/babel/babel/pull/4544) Greater spec compliance for class properties with the new `spec` option. ([@motiz88](https://github.com/motiz88))

Usage
```js
{
  "plugins": [
    ["transform-class-properties", {
      "spec": true
    }]
  ]
}
```

- Class properties are compiled to use `Object.defineProperty`
- Static fields are now defined even if they are not initialized

In
```js
class Foo {
  static bar;
}
```

Out
```js
var Foo = function Foo() {
  babelHelpers.classCallCheck(this, Foo);
};

Object.defineProperty(Foo, "bar", {
  enumerable: true,
  writable: true,
  value: undefined
});
```
* `babel-traverse`
  * [#4836](https://github.com/babel/babel/pull/4836) Add path utilities `isAncestor` and `isDescendant`. ([@boopathi](https://github.com/boopathi))

We've added 2 similar "ancestry" path methods to `path.findParent`:

`path.isAncestor`/`path.isDescenant`

Usage:
```js
let programPath, numberPath;
traverse(ast, {
  Program(path) { programPath = path; },
  NumberPath(path) { numberPath = path; },
});

programPath.isAncestor(numberPath); // true
numberPath.isDescendant(programPath); // true
```

  * [#4835](https://github.com/babel/babel/pull/4835) Add `clearCache` and `clearPath` as separate APIs under traverse. ([@boopathi](https://github.com/boopathi))

Usage:
```js
traverse.clearCache(); // clears both path's and scope cache
traverse.clearCache.clearPath();
traverse.clearCache.clearScope();
```

* `babel-generator`
  * [#4827](https://github.com/babel/babel/pull/4827) Add `jsonCompatibleStrings` option to generator. ([@kangax](https://github.com/kangax))

Usage:
```js
{
  "generatorOpts": {
    "jsonCompatibleStrings": true // defaults to false
  }
}
```

Set to true for the generator to use `jsesc` with `"json": true`. This will make it print `"\u00A9"` vs. `"©"`;

  * [#3547](https://github.com/babel/babel/pull/3547) Added `flowUsesCommas` option for object types. ([@sampepose](https://github.com/sampepose))

Usage:
```js
{
  "generatorOpts": {
    "flowCommaSeparator": true // defaults to false
  }
}
```

Currently there are 2 supported syntaxes (`,` and `;`) in Flow Object Types. The use of commas is in line with the more popular style and matches how objects are defined in Javascript, making it a bit more natural to write.

```js
var a: { param1: number; param2: string }
var a: { param1: number, param2: string }
```

* `babel-types`
  * [#3553](https://github.com/babel/babel/pull/3553) Start babel-types tests, add `isNodesEquivalent`. ([@hzoo](https://github.com/hzoo))

`t.isNodesEquivalent`

Usage:

```js
assert(t.isNodesEquivalent(parse("1 + 1"), parse("1+1")) === true);
```

* `babel-plugin-transform-es2015-modules-systemjs`
  * [#4789](https://github.com/babel/babel/pull/4789) Support `import()` as contextual import in system module format. ([@guybedford](https://github.com/guybedford))

Support stage-2 `import()` in systemjs.

It does not compile by default; you'll want to add the stage-2 preset or explicitly include `babel-plugin-syntax-dynamic-import`.

```js
export function lazyLoadOperation () {
  return import('./x')
  .then(function (x) {
    x.y();
  });
}
```

#### :bug: Bug Fix
* `babel-generator`
  * [#4830](https://github.com/babel/babel/pull/4830) Bug fix for printing minified literals. ([@shinew](https://github.com/shinew))

Will print the shorter of the `NumericLiteral`s if using the `minified` option.

Input
```js
5e1;
5e4;
```

Output
```js
50;
5e4;
```

* `babel-plugin-transform-es2015-modules-systemjs`
  * [#4832](https://github.com/babel/babel/pull/4832) Fix system transformer to ensure consistent modules iteration. ([@guybedford](https://github.com/guybedford))

Fixes inconsistent modules iteration for numeric imports

```js
import "2"; // should be imported first
import "1"; // second
```

* `babel-plugin-transform-es2015-destructuring`, `babel-plugin-transform-react-constant-elements`
  * [#4813](https://github.com/babel/babel/pull/4813) Fix binding kind of destructured variables.. ([@STRML](https://github.com/STRML))

Fixes an issue with destructuring parameters being hoisted incorrectly.

Input
```
function render({ text }) {
  return () => (<Component text={text} />);
}
```

Output
```
function render(_ref) {
  let text = _ref.text;
  var _ref2 = <Component text={text} />;
  return () => _ref2;
}
```

#### :memo: Documentation
* Other
  * [#4802](https://github.com/babel/babel/pull/4802) Add toc [skip ci]. ([@hzoo](https://github.com/hzoo))

#### :house: Internal
* `babel-plugin-transform-async-to-generator`
  * [#4837](https://github.com/babel/babel/pull/4837) Fix crlf to lf. ([@lion-man44](https://github.com/lion-man44))
* Other
  * [#4807](https://github.com/babel/babel/pull/4807) Chore: FLOW command in makefile and logic in .travis.yml(issue#4710).. ([@sstern6](https://github.com/sstern6))

#### Committers: 10
- Boopathi Rajaa ([boopathi](https://github.com/boopathi))
- Guy Bedford ([guybedford](https://github.com/guybedford))
- Henry Zhu ([hzoo](https://github.com/hzoo))
- Juriy Zaytsev ([kangax](https://github.com/kangax))
- Moti Zilberman ([motiz88](https://github.com/motiz88))
- Sam Pepose ([sampepose](https://github.com/sampepose))
- Samuel Reed ([STRML](https://github.com/STRML))
- Scott Stern ([sstern6](https://github.com/sstern6))
- Shine Wang ([shinew](https://github.com/shinew))
- lion ([lion-man44](https://github.com/lion-man44))

## v6.18.2 (2016-11-01)

Weird publishing issue with v6.18.1, same release.

#### :bug: Bug Fix
* `babel-core`
  * [#4773](https://github.com/babel/babel/pull/4773) Fix Valid example to be actually valid. ([@Kovensky](https://github.com/Kovensky))

> The error message was actually invalid!

```bash
Invalid:
  { "presets": [{ "option": "value" }] }
Valid:
  {
    "presets": [
      ["presetName", { "option": "value" }] // the preset should be wrapped in `[ ]`
    ]
  }
```

#### :house: Internal
* `babel-helper-fixtures`, `babel-helper-transform-fixture-test-runner`
  * [#4797](https://github.com/babel/babel/pull/4797) Allow relative paths in babelrc options in options.json. ([@hzoo](https://github.com/hzoo))
* Other
  * [#4796](https://github.com/babel/babel/pull/4796) Update eslint, use codeframe formatter. ([@hzoo](https://github.com/hzoo))
  * [#4792](https://github.com/babel/babel/pull/4792) Update flow-bin to version 0.34.0 🚀. ([@greenkeeperio-bot](https://github.com/greenkeeperio-bot))
  * [#4776](https://github.com/babel/babel/pull/4776) Update chai to version 3.5.0 🚀. ([@greenkeeperio-bot](https://github.com/greenkeeperio-bot))
* `babel-plugin-transform-async-to-generator`
  * [#4793](https://github.com/babel/babel/pull/4793) Fix async-to-generator/object-method-with-arrows line endings. ([@jridgewell](https://github.com/jridgewell))

#### Commiters: 4
- Diogo Franco ([Kovensky](https://github.com/Kovensky))
- Greenkeeper ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Henry Zhu ([hzoo](https://github.com/hzoo))
- Justin Ridgewell ([jridgewell](https://github.com/jridgewell))

## v6.18.1 (2016-11-01)

Weird publishing issue with v6.18.1, re-released as v6.18.2.

## v6.18.0 (2016-10-24)

#### :rocket: New Feature
* `babel-generator`, `babel-plugin-transform-flow-strip-types`
  * [#4697](https://github.com/babel/babel/pull/4697) Add variance node type and generate property variance annotations. ([@samwgoldman](https://github.com/samwgoldman))

Check out the [blog post](https://flowtype.org/blog/2016/10/04/Property-Variance.html) and [flow docs](https://flowtype.org/docs/variance.html) for more info:

```js
type T = { +p: T };
interface T { -p: T };
declare class T { +[k:K]: V };
class T { -[k:K]: V };
class C2 { +p: T = e };
```

* `babel-core`, `babel-traverse`
  * [#4746](https://github.com/babel/babel/pull/4746) Support ObjectExpression in static path evaluation. ([@motiz88](https://github.com/motiz88))

```js
// in
{['a' + 'b']: 10 * 20, 'z': [1, 2, 3]}
// out
{ab: 200, z: [1, 2, 3]}
```

* `babel-plugin-syntax-dynamic-import`, `babel-preset-stage-2`
  * [#4699](https://github.com/babel/babel/pull/4699) [import()] Initial support for dynamic-import. ([@kesne](https://github.com/kesne))

Parser support was added in https://github.com/babel/babylon/releases/tag/v6.12.0.

Just the plugin to enable it in babel.

```js
// install
$ npm install babel-plugin-syntax-dynamic-import --save-dev
```

or use the new `parserOpts`

```js
// .babelrc
{
  "parserOpts": {
    "plugins": ['dynamicImport']
  }
}
```

* `babel-helper-builder-react-jsx`, `babel-plugin-transform-react-jsx`
  * [#4655](https://github.com/babel/babel/pull/4655) Add `useBuiltIns` option to helper-builder-react-jsx. ([@existentialism](https://github.com/existentialism))

Previously we added a `useBuiltIns` for object-rest-spread so that it use the native/built in version if you use a polyfill or have it supported natively.

This change just uses the same option from the plugin to be applied with spread inside of jsx.

```js
// in
var div = <Component {...props} foo="bar" />
// out
var div = React.createElement(Component, Object.assign({}, props, { foo: "bar" }));
```

* `babel-generator`, `babel-traverse`, `babel-types`
  * [#4724](https://github.com/babel/babel/pull/4724) Add `EmptyTypeAnnotation`. ([@samwgoldman](https://github.com/samwgoldman))

`EmptyTypeAnnotation`

Added in flow [here](https://github.com/facebook/flow/commit/c603505583993aa953904005f91c350f4b65d6bd) and in babylon [here](https://github.com/babel/babylon/pull/171).

```js
function f<T>(x: empty): T {
  return x;
}
f(); // nothing to pass...
```

* `babel-traverse`
  * [#4758](https://github.com/babel/babel/pull/4758) Make getBinding ignore labels; add Scope#getLabel, Scope#hasLabel, Scope#registerLabel. ([@kangax](https://github.com/kangax))

Track `LabeledStatement` separately (not part of bindings).

#### :bug: Bug Fix

> Will give examples of code that was fixed below

* `babel-plugin-transform-react-inline-elements`, `babel-traverse`
  * [#4765](https://github.com/babel/babel/pull/4765) Don't treat `JSXIdentifier` in `JSXMemberExpression` as HTML tag. Closes [#4027](https://github.com/babel/babel/issues/4027). ([@DrewML](https://github.com/DrewML))

```js
// issue with imported components that were JSXMemberExpression
import { form } from "./export";

function ParentComponent() {
  return <form.TestComponent />;
}
```

* `babel-plugin-transform-es2015-modules-commonjs`, `babel-plugin-transform-react-inline-elements`
  * [#4763](https://github.com/babel/babel/pull/4763) Handle remapping of JSXIdentifier to MemberExpression in CommonJS transform. Closes [#3728](https://github.com/babel/babel/issues/3728). ([@DrewML](https://github.com/DrewML))

```js
import { Modal } from "react-bootstrap";
export default CustomModal = () => <Modal.Header>foobar</Modal.Header>;
```

* `babel-plugin-transform-es2015-for-of`
  * [#4736](https://github.com/babel/babel/pull/4736) Fix replacing for-of if inside label. ([@danez](https://github.com/danez))

```js
if ( true ) {
  loop: for (let ch of []) {}
}
```

* `babel-core`
  * [#4502](https://github.com/babel/babel/pull/4502) Make special case for class property initializers in `shadow-functions`. ([@motiz88](https://github.com/motiz88))

```
class A {
  prop1 = () => this;
  static prop2 = () => this;
  prop3 = () => arguments;
}
```

  * [#4631](https://github.com/babel/babel/pull/4631) fix(shouldIgnore): filename normalization should be platform sensitive. ([@rozele](https://github.com/rozele))
* `babel-helper-remap-async-to-generator`, `babel-plugin-transform-async-generator-functions`
  * [#4719](https://github.com/babel/babel/pull/4719) Fixed incorrect compilation of async iterator methods. ([@Jamesernator](https://github.com/Jamesernator))

```js
// in
class C {
  async *g() { await 1; }
}
// out
class C {
  g() { // was incorrectly outputting the method with a generator still `*g(){`
    return _asyncGenerator.wrap(function* () {
      yield _asyncGenerator.await(1);
    })();
  }
}
```

* `babel-plugin-check-es2015-constants`, `babel-plugin-transform-es2015-destructuring`, `babel-plugin-transform-es2015-modules-commonjs`, `babel-plugin-transform-es2015-parameters`
  * [#4690](https://github.com/babel/babel/pull/4690) Consolidate contiguous var declarations in destructuring transform. ([@motiz88](https://github.com/motiz88))

```js
// was wrapping variables in an IIFE incorrectly
for ( let i = 0, { length } = list; i < length; i++ ) {
    console.log( i + ': ' + list[i] )
}
```

* `babel-plugin-transform-es2015-parameters`
  * [#4666](https://github.com/babel/babel/pull/4666) Fix error when constructor default arg refers to self or own static property. ([@danharper](https://github.com/danharper))

```js
// was producing invalid code
class Ref {
  static nextId = 0
  constructor(id = ++Ref.nextId, n = id) {
    this.id = n
  }
}

assert.equal(1, new Ref().id)
assert.equal(2, new Ref().id)
```

  * [#4674](https://github.com/babel/babel/pull/4674) Handle side effects correctly in rest params index expressions (#4348). ([@motiz88](https://github.com/motiz88))

```js
function first(...values) {
    let index = 0;
    return values[index++]; // ++ was happening twice
}

console.log(first(1, 2));
```

* `babel-plugin-transform-es2015-block-scoping`
  * [#4669](https://github.com/babel/babel/pull/4669) Fix block scoping transform for declarations in labeled statements. ([@motiz88](https://github.com/motiz88))

```js
let x = 10;
if (1)
{
    ca: let x = 20;
}
```

* `babel-helper-explode-assignable-expression`, `babel-plugin-transform-exponentiation-operator`
  * [#4672](https://github.com/babel/babel/pull/4672) Avoid repeating impure (template) literals when desugaring **= (#4403). ([@motiz88](https://github.com/motiz88))

```js
a[`${b++}`] **= 1;
```

  * [#4642](https://github.com/babel/babel/pull/4642) Exclude super from being assign to ref variable. ([@danez](https://github.com/danez))
* `babel-plugin-transform-es2015-shorthand-properties`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-flow-strip-types`

```js
foo = {
  bar() {
    return super.baz **= 12;
  }
}
```

  * [#4670](https://github.com/babel/babel/pull/4670) Retain return types on ObjectMethods in transform-es2015-shorthand-properties. ([@danharper](https://github.com/danharper))

```js
// @flow
var obj = {
  method(a: string): number {
    return 5 + 5;
  }
};
```

* `babel-helper-define-map`, `babel-plugin-transform-es2015-classes`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-flow-strip-types`
  * [#4668](https://github.com/babel/babel/pull/4668) Retain method return types on transform-es2015-classes (Closes [#4665](https://github.com/babel/babel/issues/4665)). ([@danharper](https://github.com/danharper))

```js
// @flow
class C {
  m(x: number): string {
    return 'a';
  }
}
```

#### :nail_care: Polish
* `babel-plugin-check-es2015-constants`, `babel-plugin-transform-es2015-destructuring`, `babel-plugin-transform-es2015-modules-commonjs`, `babel-plugin-transform-es2015-parameters`
  * [#4690](https://github.com/babel/babel/pull/4690) Consolidate contiguous var declarations in destructuring transform. ([@motiz88](https://github.com/motiz88))

```js
// in
const [a, b] = [1, 2];
// out
var a = 1,
    b = 2;
```

* `babel-plugin-transform-es2015-parameters`
  * [#4738](https://github.com/babel/babel/pull/4738) Avoid unnecessary +0 in transform-es2015-parameters. ([@existentialism](https://github.com/existentialism))

```js
// was outputting an extra `index++ + 0`
function first(...values) {
  var index = 0;
  return values[index++];
}
```

* `babel-generator`
  * [#4646](https://github.com/babel/babel/pull/4646) Change babel-generator to output `boolean` instead of `bool` for the `BooleanTypeAnnotation` AST node. ([@existentialism](https://github.com/existentialism))

```js
var a: Promise<boolean>[];
// instead of
var a: Promise<bool>[];
```

* `babel-core`
  * [#4685](https://github.com/babel/babel/pull/4685) Better error messaging when preset options are given without a corresponding preset. ([@kaicataldo](https://github.com/kaicataldo))

> We've had a few reports of users not wrapping a preset in `[]` when passing in options so we added an extra error message for this.

```
ReferenceError: [BABEL] /test.js: Unknown option: base.loose2. Check out http://babeljs.io/docs/usage/options/ for more information about options.

A common cause of this error is the presence of a configuration options object without the corresponding preset name. Example:

Invalid:
  `{ presets: [{option: value}] }`
Valid:
  `{ presets: ["pluginName", {option: value}] }`

For more detailed information on preset configuration, please see http://babeljs.io/docs/plugins/#pluginpresets-options.
```

  * [#4688](https://github.com/babel/babel/pull/4688) Update babel parser options. ([@existentialism](https://github.com/existentialism))

#### Documentation
* Other
  * [#4653](https://github.com/babel/babel/pull/4653) Tweak license for GitHub display. ([@existentialism](https://github.com/existentialism))

So that our MIT License [shows up](https://github.com/blog/2252-license-now-displayed-on-repository-overview).

#### :house: Internal
* `babel-cli`
  * [#4725](https://github.com/babel/babel/pull/4725) Remove babel-doctor from babel-cli. ([@kaicataldo](https://github.com/kaicataldo))

It's a one-time use tool (helpful after the initial release when upgrading from v5 to v6) that doesn't need to be a part of `babel-cli`. We'll publish it as a standalone package it someone asks for it.
* Other
  * [#4764](https://github.com/babel/babel/pull/4764) Add TEST_DEBUG env var option for test.sh, to enable node 6 debugger. ([@DrewML](https://github.com/DrewML))
  * [#4762](https://github.com/babel/babel/pull/4762) Update browserify to version 13.1.1 🚀. ([@greenkeeperio-bot](https://github.com/greenkeeperio-bot))
  * [#4748](https://github.com/babel/babel/pull/4748) Add clean-all command to reinstall node_modules. ([@kaicataldo](https://github.com/kaicataldo))
  * [#4744](https://github.com/babel/babel/pull/4744) Fix line endings on checkout. ([@nhajidin](https://github.com/nhajidin))
  * [#4730](https://github.com/babel/babel/pull/4730) Add .gitattributes forcing LF line endings. ([@motiz88](https://github.com/motiz88))
  * [#4676](https://github.com/babel/babel/pull/4676) Remove travis short-circuit script. ([@motiz88](https://github.com/motiz88))
* `babel-traverse`, `babel-types`
  * [#4742](https://github.com/babel/babel/pull/4742) Increase test coverage. ([@motiz88](https://github.com/motiz88))
* `babel-cli`, `babel-core`, `babel-helper-fixtures`, `babel-register`
  * [#4731](https://github.com/babel/babel/pull/4731) Replace `path-exists` with `fs.existsSync`. ([@SimenB](https://github.com/SimenB))
* `babel-helper-transform-fixture-test-runner`
  * [#4735](https://github.com/babel/babel/pull/4735) Automatically generate missing expected.js fixtures. ([@motiz88](https://github.com/motiz88))
  * [#4664](https://github.com/babel/babel/pull/4664) 🚀 Update chai to version 3.0.0. ([@danez](https://github.com/danez))
* `babel-cli`, `babel-code-frame`, `babel-core`, `babel-generator`, `babel-helper-transform-fixture-test-runner`, `babel-preset-es2015`, `babel-template`, `babel-traverse`
  * [#4734](https://github.com/babel/babel/pull/4734) Change usage of "suite"/"test" in unit-tests to "describe"/"it". ([@DrewML](https://github.com/DrewML))
* `babel-cli`, `babel-code-frame`, `babel-core`, `babel-generator`, `babel-plugin-transform-es2015-modules-commonjs`, `babel-preset-es2015`, `babel-template`, `babel-traverse`
  * [#4732](https://github.com/babel/babel/pull/4732) Run ESLint on test files, and fix lint errors in test files.. ([@DrewML](https://github.com/DrewML))
* `babel-cli`, `babel-core`
  * [#4727](https://github.com/babel/babel/pull/4727) Update tests for changed error messages in Babylon. ([@motiz88](https://github.com/motiz88))
  * [#4564](https://github.com/babel/babel/pull/4564) Enable babel for tests. ([@danez](https://github.com/danez))
* `babel-cli`, `babel-core`, `babel-plugin-transform-es2015-modules-systemjs`, `babel-preset-es2015`
  * [#4721](https://github.com/babel/babel/pull/4721) update eslint-config, fixes, add commands. ([@hzoo](https://github.com/hzoo))
* `babel-register`
  * [#4660](https://github.com/babel/babel/pull/4660) 🚀 Update home-or-tmp to version 2.0.0. ([@danez](https://github.com/danez))
* `babel-cli`
  * [#4680](https://github.com/babel/babel/pull/4680) Update: Eslint to 3.0 and update CI builds (Closes [#4638](https://github.com/babel/babel/issues/4638)). ([@gyandeeps](https://github.com/gyandeeps))
  * [#4662](https://github.com/babel/babel/pull/4662) 🚀 Update fs-readdir-recursive to 1.0.0. ([@danez](https://github.com/danez))
* `babel-core`
  * [#4649](https://github.com/babel/babel/pull/4649) 🚀 Update json5 to version 0.5.0. ([@danez](https://github.com/danez))
  * [#4650](https://github.com/babel/babel/pull/4650) 🚀 Remove shebang dependency. ([@danez](https://github.com/danez))
* `babel-generator`
  * [#4652](https://github.com/babel/babel/pull/4652) 🚀 Update detect-indent to version 4.0.0. ([@danez](https://github.com/danez))
* `babel-traverse`
  * [#4651](https://github.com/babel/babel/pull/4651) 🚀 Update globals to version 9.0.0. ([@danez](https://github.com/danez))

#### Commiters: 17
- Andrew Levine ([DrewML](https://github.com/DrewML))
- Brian Ng ([existentialism](https://github.com/existentialism))
- Dan Harper ([danharper](https://github.com/danharper))
- Daniel Tschinder ([danez](https://github.com/danez))
- Eric Rozell ([rozele](https://github.com/rozele))
- Greenkeeper ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Gyandeep Singh ([gyandeeps](https://github.com/gyandeeps))
- Henry Zhu ([hzoo](https://github.com/hzoo))
- Jordan Gensler ([kesne](https://github.com/kesne))
- Juriy Zaytsev ([kangax](https://github.com/kangax))
- Kai Cataldo ([kaicataldo](https://github.com/kaicataldo))
- Moti Zilberman ([motiz88](https://github.com/motiz88))
- Nazim Hajidin ([nhajidin](https://github.com/nhajidin))
- Sam Goldman ([samwgoldman](https://github.com/samwgoldman))
- Simen Bekkhus ([SimenB](https://github.com/SimenB))
- [Jamesernator](https://github.com/Jamesernator)
- [sugargreenbean](https://github.com/sugargreenbean)

## v6.17.0 (2016-10-01)

#### :eyeglasses: Spec Compliancy
* `babel-preset-stage-2`, `babel-preset-stage-3`
  * [#4617](https://github.com/babel/babel/pull/4617) Move async-generators to stage-3. ([@hzoo](https://github.com/hzoo))

> https://github.com/tc39/proposals/commit/96f8d79dac33575e24f6ac3ec2082efe75d519ba

Specification repo: https://github.com/tc39/proposal-async-iteration

Asynchronous Iteration was already added in [6.16.0](http://babeljs.io/blog/2016/09/28/6.16.0#spec-compliancy) under stage-2 but it was moved to stage-3 at the [latest TC-39 meeting](https://github.com/tc39/agendas/blob/master/2016/09.md#agenda-for-the-54th-meeting-of-ecma-tc39).

```js
// async generator syntax
async function* agf() {}
// for-await statement
async function f() {
  for await (let x of y) {
    g(x);
  }
}
```

To use it as a standalone plugin:
```js
{
  "plugins": ["transform-async-generator-functions"]
}
```

With the stage-3 preset (or below):
```js
{
  "presets": ["stage-3"]
}
```

  * [#4611](https://github.com/babel/babel/pull/4611) Move object-rest-spread to stage-3. ([@hzoo](https://github.com/hzoo))

Similarly, [object-rest-spread](http://babeljs.io/docs/plugins/transform-object-rest-spread/) is now also at stage-3.

> https://twitter.com/sebmarkbage/status/781564713750573056
> https://github.com/tc39/proposals/commit/142ac3ce7f3f56989800260f029b76afe4a02e57

```js
// Rest properties
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }

// Spread properties
let n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }
```

To use it as a standalone plugin:
```js
{
  "plugins": ["transform-object-rest-spread"]
}
```

With the stage-3 preset (or below):
```js
{
  "presets": ["stage-3"]
}
```

#### :rocket: New Feature
* `babel-generator`
  * [#4621](https://github.com/babel/babel/pull/4621) Add retainFunctionParens option. ([@kangax](https://github.com/kangax))

References:
- https://github.com/nolanlawson/optimize-js
- https://github.com/rollup/rollup/pull/774

Adds a `retainFunctionParens` to `babel-generator`. This option will retain the parentheses around an IIFE.

```js
// parens are stripped without the option
__d('x', (function () {}));
```

#### :bug: Bug Fix
* `babel-core`
  * [#4635](https://github.com/babel/babel/pull/4635) Forward bound shadowed function when hoisting identifiers. ([@danez](https://github.com/danez))
  * [#4620](https://github.com/babel/babel/pull/4620) Resolve presets with named exports correctly. ([@danez](https://github.com/danez))
* `babel-generator`
  * [#4633](https://github.com/babel/babel/pull/4633) Fixed babel/babel#4632 - missing parentheses around yield expression …. ([@bjouhier](https://github.com/bjouhier))
* `babel-plugin-transform-es2015-parameters`
  * [#4636](https://github.com/babel/babel/pull/4636) Fix rest parameters with flow type casting. ([@danez](https://github.com/danez))
* `babel-plugin-transform-flow-comments`
  * [#4623](https://github.com/babel/babel/pull/4623) Fix regression in transform-flow-comments for class properties. ([@danharper](https://github.com/danharper))

First PR!
- Bruno Jouhier ([bjouhier](https://github.com/bjouhier))

## v6.16.0 (2016-09-28)

Babel 6.16: Happy 2nd Birthday 🎂!

#### :eyeglasses: Spec Compliancy

* `babel-core`, `babel-generator`, `babel-helper-remap-async-to-generator`, `babel-helpers`, `babel-plugin-transform-async-generator-functions`, `babel-types`, `babel-preset-stage-2`, ...
  * [#3473](https://github.com/babel/babel/pull/3473) via [#4576](https://github.com/babel/babel/pull/4576) Implement support for async generator functions and for-await statements. ([@zenparsing](https://github.com/zenparsing))

This change implements the [async iteration proposal](https://github.com/tc39/proposal-async-iteration), currently at stage 2 (and pushing to stage 3 at the current TC-39 meeting). It includes the following features:

- Transforms async generator functions (`async function* g() { }`) to wrapped generator functions, similar to the current async-to-generator transform.
```js

async function* agf() {
  this;
  await 1;
  yield 2;
  return 3;
}
```

- Transforms `for-await` statements into for loops containing yield expressions.

```js
async function f() {
  for await (let x of y) {
    g(x);
  }
}
```

Example Usage

```js
async function* genAnswers() {
  var stream = [ Promise.resolve(4), Promise.resolve(9), Promise.resolve(12) ];
  var total = 0;
  for await (let val of stream) {
    total += await val;
    yield total;
  }
}

function forEach(ai, fn) {
  return ai.next().then(function (r) {
    if (!r.done) {
      fn(r);
      return forEach(ai, fn);
    }
  });
}

var output = 0;
return forEach(genAnswers(), function(val) { output += val.value })
.then(function () {
  assert.equal(output, 42);
});
```

* `babel-core`, `babel-generator`, `babel-plugin-transform-class-properties`, `babel-template`, `babel-traverse`, `babel-types`
  * [#4500](https://github.com/babel/babel/pull/4500) Computed class properties. ([@motiz88](https://github.com/motiz88))

Parser support was added in [babylon@6.11.0](https://github.com/babel/babylon/releases/tag/v6.11.0) with [babel/babylon#121](https://github.com/babel/babylon/pull/121)

```js
// Example
class Foo {
  [x]
  ['y']
}

class Bar {
  [p]
  [m] () {}
}
```

* `babel-generator`
  * [#3702](https://github.com/babel/babel/pull/3702) flow plugin: generate exact object type annotations. ([@bhosmer](https://github.com/bhosmer))

Parser support was added in [babylon@6.10.0](https://github.com/babel/babylon/releases/tag/v6.10.0) with [babel/babylon#104](https://github.com/babel/babylon/pull/104)

```js
// Example
var a : {| x: number, y: string |} = { x: 0, y: 'foo' };
```

#### :rocket: New Feature

* `babel-core`, `babel-generator`
  * [#3561](https://github.com/babel/babel/pull/3561) babel-core: add options for different parser/generator. ([@hzoo](https://github.com/hzoo))

Babel will now also take the options: `parserOpts` and `generatorOps` (as objects).

`parserOpts` will pass all properties down to the default `babylon` parser. You can also pass a `parser` option to substitute for a different parser.

This will allow passing down any of `babylon's` [options](https://github.com/babel/babylon#options):

```js
{
  "parserOpts": {
    "allowImportExportEverywhere": true,
    "allowReturnOutsideFunction": true,
    "sourceType": "module",
    "plugins": ["flow"]
  }
}
```

Another use case (the main reason for doing this), is to be able to use [recast](https://github.com/benjamn/recast) with Babel.

```json
{
  "parserOpts": {
    "parser": "recast"
  },
  "generatorOpts": {
    "generator": "recast"
  }
}
```

* `babel-core`
  * [#4542](https://github.com/babel/babel/pull/4542) Add support for preset organization shortcuts. ([@nkt](https://github.com/nkt))

```js
{
  presets: ["@org/babel-preset-name"], // actual package
  presets: ["@org/name"] // shorthand name
}
```

* `babel-plugin-transform-object-rest-spread`
  * [#4491](https://github.com/babel/babel/pull/4491) object rest spread useBuiltIns option. ([@hzoo](https://github.com/hzoo))

`useBuiltIns` - Do not use Babel's helper's and just transform to use the built-in method (Disabled by default).

```js
{
  "plugins": [
    ["transform-object-rest-spread", { "useBuiltIns": true }]
  ]
}

// source
z = { x, ...y };
// compiled
z = Object.assign({ x }, y);
```

* `babel-code-frame`
  * [#4561](https://github.com/babel/babel/pull/4561) babel-code-frame: add options for linesBefore, linesAfter. ([@hzoo](https://github.com/hzoo))

`babel-code-frame` is a standalone package that we use in Babel when reporting errors.

Now there is an [option](https://github.com/babel/babel/blob/master/packages/babel-code-frame/README.md#options) to specify the number of lines above and below the error

```
  1 | class Foo {
> 2 |   constructor()
    |                ^
  3 | }
```

* `babel-core`, `babel-preset-es2015`, `babel-preset-es2016`, `babel-preset-es2017`, `babel-preset-latest`, `babel-preset-react`, `babel-preset-stage-0`, `babel-preset-stage-1`, `babel-preset-stage-2`, `babel-preset-stage-3`
  * [#3695](https://github.com/babel/babel/pull/#3695) via [#4566](https://github.com/babel/babel/pull/4566) Allow presets to be ES6 default exports ([@johanssj](https://github.com/johanssj))

We previously made presets with commonjs exports

```js
module.exports = {
  plugins: [
    require("babel-plugin-syntax-trailing-function-commas")
  ]
};
```

Now you can use export default as well

```js
import transformExponentiationOperator from "babel-plugin-transform-exponentiation-operator";
export default {
  plugins: [
    transformExponentiationOperator
  ]
};
```

#### :bug: Bug Fix
* `babel-helpers`, `babel-plugin-transform-es2015-typeof-symbol`
  * [#3686](https://github.com/babel/babel/pull/3686) Fix `typeof Symbol.prototype`. ([@brainlock](https://github.com/brainlock))

```js
// `typeof Symbol.prototype` should be 'object'
typeof Symbol.prototype === 'object'
```

* `babel-cli`
  * [#3456](https://github.com/babel/babel/pull/3456) Use the real sourcemap API and handle input sourcemaps - Fixes [#7259](https://github.com/babel/babel/issues/7259). ([@loganfsmyth](https://github.com/loganfsmyth))
  * [#4507](https://github.com/babel/babel/pull/4507) Only set options in cli if different from default. ([@danez](https://github.com/danez))

Fix an issue with defaults not being overidden. This was causing options like `comments: false` not to work correctly.

  * [#4508](https://github.com/babel/babel/pull/4508) Support custom ports for V8 --inspect. ([@andykant](https://github.com/andykant))
  * [#4562](https://github.com/babel/babel/pull/4562) Fixes [#2299](https://github.com/babel/babel/issues/2299): Prevent REPL from printing implicit 'use strict'. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-transform-es2015-function-name`, `babel-traverse`
  * [#4524](https://github.com/babel/babel/pull/4524) Fix default export with arrows and function naming. ([@danharper](https://github.com/danharper))

```js
// wasn't exporting correctly before
export default ({ onClick }) => {
  return <div onClick={() => onClick()}></div>;
}
```

* `babel-plugin-transform-es2015-modules-commonjs`
  * [#4511](https://github.com/babel/babel/pull/4511) Fix UpdateExpression handling in es2015-modules-commonjs, resolve #4462. ([@motiz88](https://github.com/motiz88))
  * [#4518](https://github.com/babel/babel/pull/4518) fix default exported classes without a name. ([@danez](https://github.com/danez))

```js
export default class {};
// wasn't correctly transforming to
exports["default"] = class {}
// with the es3-tranforms
```

* `babel-plugin-transform-flow-strip-types`, `babel-types`
  * [#4521](https://github.com/babel/babel/pull/4521) Fix striping of typeParameters from arrow functions. ([@danez](https://github.com/danez))

```js
// <X> wasn't stripped out
const find = <X> (f: (x:X) => X, xs: Array<X>): ?X => (
  xs.reduce(((b, x) => b ? b : f(x) ? x : null), null)
)
```

* `babel-generator`, `babel-plugin-transform-flow-comments`
  * [#4504](https://github.com/babel/babel/pull/4504) Flow: Fix generating arrow functions with param. ([@danharper](https://github.com/danharper))
* `babel-register`
  * [#3685](https://github.com/babel/babel/pull/3685) Allow overwritting of sourceRoot. ([@danez](https://github.com/danez))
  * [#4577](https://github.com/babel/babel/pull/4577) babel-register: update source-map-support to latest. ([@MoOx](https://github.com/MoOx))
* `babel-core`
  * [#4570](https://github.com/babel/babel/pull/4570) Fix fileName options passed to babylon. ([@DatenMetzgerX](https://github.com/DatenMetzgerX))
* `babel-traverse`
  * [#4534](https://github.com/babel/babel/pull/4534) Fix issue with minified libraries and code coverage. ([@withinboredom](https://github.com/withinboredom))
* `babel-plugin-transform-es2015-destructuring`
  * [#4552](https://github.com/babel/babel/pull/4552) Fix destructuring evaluation with call expressions. ([@danez](https://github.com/danez))

We noticed that we can not make this optimizations if there are function calls or member expressions on the right hand side of the assignment since the function call or the member expression (which might be a getter with side-effect) could potentially change the variables we are assigning to.

```js
[x, y] = [a(), obj.x];
// was tranforming to
x = a();
y = obj.x;
// now transforms to
var _ref = [a(), obj.x];
x = _ref[0];
y = _ref[1];
```

* `babel-types`
  * [#4587](https://github.com/babel/babel/pull/4587) Prevent flow-strip-types/flow-comments from removing entire ClassProperty. ([@danharper](https://github.com/danharper))

#### :nail_care: Polish
  * `babel-code-frame`
    * [#4579](https://github.com/babel/babel/pull/4579) babel-code-frame: Highlight strings with green (not red). ([@lydell](https://github.com/lydell))
    * [#4572](https://github.com/babel/babel/pull/4572) Improve syntax highlighting colors. ([@lydell](https://github.com/lydell))

Before

<img width="611" alt="screen shot 2016-09-27 at 11 12 47 am" src="https://cloud.githubusercontent.com/assets/588473/18879735/6ba2820a-84a3-11e6-9e3f-fa8612620867.png">

After

<img width="611" alt="screen shot 2016-09-27 at 3 50 02 pm" src="https://cloud.githubusercontent.com/assets/588473/18889266/38829f96-84ca-11e6-8a19-0a39e440a0d3.png">

  * `babel-core`
    * [#4517](https://github.com/babel/babel/pull/4517) If loading a preset fails, show its name/path (#4506). ([@motiz88](https://github.com/motiz88))
  * `babel-helper-replace-supers`
    * [#4520](https://github.com/babel/babel/pull/4520) Remove unused `thisReference` argument to `getSuperProperty`. ([@eventualbuddha](https://github.com/eventualbuddha))
  * `babel-generator`
    * [#4478](https://github.com/babel/babel/pull/4478) babel-generator: Ensure ASCII-safe output for string literals. ([@mathiasbynens](https://github.com/mathiasbynens))
  * `babel-core`, `babel-plugin-transform-es2015-arrow-functions`, `babel-plugin-transform-es2015-destructuring`, `babel-plugin-transform-es2015-modules-commonjs`, `babel-plugin-transform-es2015-parameters`
    * [#4515](https://github.com/babel/babel/pull/4515) Flip default parameter template. ([@jridgewell](https://github.com/jridgewell))
  * `babel-core`, `babel-helpers`
    * [#3653](https://github.com/babel/babel/pull/3653) Removed unnecessary 'return' statements. ([@ksjun](https://github.com/ksjun))

#### :house: Internal

Cleanup tests, remove various unused dependencies, do not run CI with only readme changes.

* `babel-plugin-transform-es2015-modules-amd`, `babel-plugin-transform-es2015-modules-commonjs`, `babel-plugin-transform-es2015-modules-umd`
  * [#4543](https://github.com/babel/babel/pull/4543) Remove duplicate default error. ([@kaicataldo](https://github.com/kaicataldo))
* `babel-generator`, `babel-plugin-transform-es2015-modules-amd`, `babel-plugin-transform-es2015-modules-commonjs`, `babel-plugin-transform-es2015-modules-systemjs`, `babel-plugin-transform-es2015-modules-umd`, `babel-plugin-transform-flow-strip-types`
  * [#4538](https://github.com/babel/babel/pull/4538) Fix tests with duplicate named exports. ([@kaicataldo](https://github.com/kaicataldo))
* `babel-plugin-transform-es2015-function-name`
  * [#4532](https://github.com/babel/babel/pull/4532) Add tests for other module formats, from #4524. ([@danharper](https://github.com/danharper))
* `babel-plugin-transform-es2015-parameters`, `babel-traverse`
  * [#4519](https://github.com/babel/babel/pull/4519) Replace phabricator tickets with github ones in code comments. ([@danez](https://github.com/danez))
* `babel-polyfill`
  * [#3694](https://github.com/babel/babel/pull/3694) Use plain js to do the pre/postpublish for the polyfill. ([@danez](https://github.com/danez))
* `babel-preset-es2015`
  * [#4501](https://github.com/babel/babel/pull/4501) Remove ES2015 tests than do not parse in ES2016. ([@TimothyGu](https://github.com/TimothyGu))
* `babel-plugin-transform-regenerator`
  * [#3703](https://github.com/babel/babel/pull/3703) Remove unused regenerator deps. ([@hzoo](https://github.com/hzoo))
* `babel-code-frame`
  * [#3699](https://github.com/babel/babel/pull/3699) babel-code-frame: babel-runtime not necessary. ([@hzoo](https://github.com/hzoo))
  * [#3696](https://github.com/babel/babel/pull/3696) Satisfy the "space-infix-ops" eslint rule. ([@gigabo](https://github.com/gigabo))
* `babel-helper-transform-fixture-test-runner`
  * [#4560](https://github.com/babel/babel/pull/4560) Remove unused dependency babel-register. ([@danez](https://github.com/danez))
  * [#3669](https://github.com/babel/babel/pull/3669) Do not include babel-register in test helper. ([@danez](https://github.com/danez))
* Other
  * [#3693](https://github.com/babel/babel/pull/3693) remove unused packages (devDeps). ([@hzoo](https://github.com/hzoo))
  * [#3681](https://github.com/babel/babel/pull/3681) Update shelljs to version 0.7.4 🚀. ([@greenkeeperio-bot](https://github.com/greenkeeperio-bot))
  * [#4547](https://github.com/babel/babel/pull/4547) Internal: cancel build with only .md changes. ([@hzoo](https://github.com/hzoo))
  * [#4565](https://github.com/babel/babel/pull/4565) Only exit if the TRAVIS_COMMIT_RANGE  is not empty. ([@danez](https://github.com/danez))

#### Commiters: 20

First PRs!
- Alberto Piai ([brainlock](https://github.com/brainlock))
- Andy Kant ([andykant](https://github.com/andykant))
- Basil Hosmer ([bhosmer](https://github.com/bhosmer))
- Bo Borgerson ([gigabo](https://github.com/gigabo))
- Dan Harper ([danharper](https://github.com/danharper))
- Kay J. ([ksjun](https://github.com/ksjun))
- Maxime Thirouin ([MoOx](https://github.com/MoOx))
- Micha Reiser ([DatenMetzgerX](https://github.com/DatenMetzgerX))
- Moti Zilberman ([motiz88](https://github.com/motiz88))
- Rob Landers ([withinboredom](https://github.com/withinboredom))
- Timothy Gu ([TimothyGu](https://github.com/TimothyGu))
- zenparsing ([zenparsing](https://github.com/zenparsing))

## v6.15.0 (2016-08-31)

[#3612](https://github.com/babel/babel/pull/3612) The main change is an option to `transform-runtime` for a custom path which will be used in [create-react-app](https://github.com/facebookincubator/create-react-app). Also some bug fixes.

```js
{
  "plugins": ["transform-runtime", {
    "moduleName": "my-custom-babel-runtime"
  }]
}
```

[#3689](https://github.com/babel/babel/pull/3689) Adds a `preserveComments` option to `babel-template`.

It's [@ben-eb](https://github.com/ben-eb), [@d4rkr00t](https://github.com/d4rkr00t), and [@ryb73](https://github.com/ryb73) first PRs!

#### New Feature
* `babel-plugin-transform-runtime`
  * [#3612](https://github.com/babel/babel/pull/3612) Add an option for custom runtime. ([@gaearon](https://github.com/gaearon))
* `babel-template`, `babel-traverse`, `babel-types`
  * [#3689](https://github.com/babel/babel/pull/3689) Add support for preserving comments in babel-template. ([@ben-eb](https://github.com/ben-eb))

#### Bug Fix
* `babel-plugin-transform-es2015-block-scoping`
  * [#3662](https://github.com/babel/babel/pull/3662) Block scoping: fix remapping (Fixes [#7525](https://github.com/babel/babel/issues/7525)). ([@ryb73](https://github.com/ryb73))
* `babel-types`
  * [#3687](https://github.com/babel/babel/pull/3687) Fix t.toExpression converting arrow functions to function expressions without block body. ([@boopathi](https://github.com/boopathi))
* `babel-traverse`
  * [#3629](https://github.com/babel/babel/pull/3629) Fix bug - undefined reference for export declaration. ([@boopathi](https://github.com/boopathi))
* `babel-helper-builder-binary-assignment-operator-visitor`, `babel-plugin-transform-es2015-classes`
  * [#3647](https://github.com/babel/babel/pull/3647) T7537: can not call super in constructor with conditional branch. ([@d4rkr00t](https://github.com/d4rkr00t))

#### Documentation
* Other
  * [#3679](https://github.com/babel/babel/pull/3679) Mention how arrow functions' `spec` uses `.bind`. ([@Kovensky](https://github.com/Kovensky))

#### Internal
* `babel-traverse`, `babel-types`
  * [#3676](https://github.com/babel/babel/pull/3676) Remove the cycle from babel-types/babel-traverse.. ([@loganfsmyth](https://github.com/loganfsmyth))

## v6.14.0 (2016-08-23) TAKE ME TO FLAVOR TOWN

Lots of stuff in this release!

- [#3624](https://github.com/babel/babel/pull/3624) A new preset for `es2017`: it includes the 2 previous stage-3 plugins: async/await (via [transform-async-to-generator](http://babeljs.io/docs/plugins/transform-async-to-generator)) and [trailing commas in functions](http://babeljs.io/docs/plugins/syntax-trailing-function-commas). (thanks to @bettiolo for the npm package)

```bash
npm install babel-preset-es2017 --save-dev
```

```js
// .babelrc
{ "presets": ["es2017"] }
```

- [#3625](https://github.com/babel/babel/pull/3625), [#3673](https://github.com/babel/babel/pull/3673) A new preset called `latest` that transforms ES2015+ (currently ES2015, ES2016, ES2017). You can also pass options down to the `es2015` preset.

> We also will be working on getting a target/env (autoprefixer) preset soon.

```bash
npm install babel-preset-latest --save-dev
```

```js
// .babelrc
{ "presets": ["latest"] }
// with options
{ "presets": [
  ["latest", {
    "es2015": {
      "modules": false
    }
  }]
] }
```

- [#3671](https://github.com/babel/babel/pull/3671) We also are including a `spec` option for the `es2015` preset since the [arrow function](http://babeljs.io/docs/plugins/transform-es2015-arrow-functions/)/[template string](http://babeljs.io/docs/plugins/transform-es2015-template-literals/) plugins support this option.

> `spec` for arrow functions uses `.bind(this)`, instead of renaming, to make `this` available inside the transformed function. It also adds a runtime check to make sure they are not instantiated (since they transform into bound regular functions).
> `spec` for template literals wraps all expressions in `String` rather than simple string concatenation.

```js
// .babelrc
{
  "presets": [
    ["es2015", { "spec": true }]
  ]
}
```

- [#3659](https://github.com/babel/babel/pull/3659) @kittens added an optional `wrapPluginVisitorMethod` callback to transform to allow for performance tracking/introspection of plugins. More docs will be added on the [website](babeljs.io) soon.

- [#3658](https://github.com/babel/babel/pull/3658) sourcemaps will also now have a `names` field for identifiers to allow debuggers to do re-aliasing of mangled identifiers.

- [#3518](https://github.com/babel/babel/pull/3518) For spec compilancy, we now will throw on a file with multiple export default.

### Notable Bug Fixes

- [#3527](https://github.com/babel/babel/pull/3527) Fix class inheritance in IE <=10 without `loose` mode.
- [#3644](https://github.com/babel/babel/pull/3644) Support the `ignore` config option in `.babelrc`.
- [#3655](https://github.com/babel/babel/pull/3655) Flow-only class props were not be stripped without `transform-class-properties`.

#### Guy Fieri
* `babel-core`
  * [#3641](https://github.com/babel/babel/pull/3641) Fix exports of babel-core. ([@thejameskyle](https://github.com/thejameskyle))
  * [#3646](https://github.com/babel/babel/pull/3646) Remove Guy Fieri from Babel's source code. ([@jdan](https://github.com/jdan))

#### Commiters: 17

It's also a lot folk's first PR (or first code PR)!

- Adam Leventhal ([ahl](https://github.com/ahl))
- Boopathi Rajaa ([boopathi](https://github.com/boopathi))
- Diogo Franco ([Kovensky](https://github.com/Kovensky))
- Jordan Scales ([jdan](https://github.com/jdan))
- Kai Cataldo ([kaicataldo](https://github.com/kaicataldo))
- Marcelo Jorge Vieira ([marcelometal](https://github.com/marcelometal))
- Paul O’Shannessy ([zpao](https://github.com/zpao))
- Sota Yamashtia ([sotayamashita](https://github.com/sotayamashita))
- Thomas Aylott ([subtleGradient](https://github.com/subtleGradient))

#### New Feature
* `babel-preset-es2015`
  * [#3671](https://github.com/babel/babel/pull/3671) Support 'spec' option on `babel-preset-es2015`. ([@Kovensky](https://github.com/Kovensky))
* `babel-preset-latest`
  * [#3673](https://github.com/babel/babel/pull/3673) add options to `babel-preset-latest`. ([@hzoo](https://github.com/hzoo))
  * [#3625](https://github.com/babel/babel/pull/3625) Create `babel-preset-latest`. ([@sotayamashita](https://github.com/sotayamashita))
* `babel-preset-es2017`
  * [#3624](https://github.com/babel/babel/pull/3624) Add es2017-preset. ([@sotayamashita](https://github.com/sotayamashita))
* `babel-core`, `babel-traverse`
  * [#3659](https://github.com/babel/babel/pull/3659) Add `wrapPluginVisitorMethod` option to allow introspection and metrics tracking of plugins. ([@kittens](https://github.com/kittens))
* `babel-cli`, `babel-core`, `babel-generator`, `babel-plugin-transform-regenerator`, `babel-template`, `babel-traverse`
  * [#3658](https://github.com/babel/babel/pull/3658) Generate names field for identifiers to get correct names mappings. ([@kittens](https://github.com/kittens))
* `babel-generator`, `babel-types`
  * [#3570](https://github.com/babel/babel/pull/3570) Add support for the new declare module.exports of flow. ([@danez](https://github.com/danez))

#### Spec Compliancy
* `babel-plugin-transform-es2015-modules-amd`, `babel-plugin-transform-es2015-modules-commonjs`, `babel-plugin-transform-es2015-modules-umd`
  * [#3518](https://github.com/babel/babel/pull/3518) Throw error for multiple exports default. ([@kaicataldo](https://github.com/kaicataldo))

#### Bug Fix
* `babel-core`, `babel-helper-replace-supers`, `babel-plugin-transform-class-properties`, `babel-plugin-transform-es2015-classes`, `babel-plugin-transform-es2015-function-name`, `babel-plugin-transform-es2015-object-super`, `babel-plugin-transform-es2015-parameters`
  * [#3527](https://github.com/babel/babel/pull/3527) Fix class inheritance in IE <=10 (T3041). ([@danez](https://github.com/danez))
* `babel-cli`
  * [#3644](https://github.com/babel/babel/pull/3644) Fixes [#6726](https://github.com/babel/babel/issues/6726) ignore config option. ([@subtleGradient](https://github.com/subtleGradient))
* `babel-plugin-transform-es2015-modules-systemjs`
  * [#3650](https://github.com/babel/babel/pull/3650) System.register update expression consistency. ([@guybedford](https://github.com/guybedford))
* `babel-generator`
  * [#3663](https://github.com/babel/babel/pull/3663) Use arrow syntax for ObjectTypeProperty FunctionTypeAnnotations. ([@zpao](https://github.com/zpao))
* `babel-register`
  * [#3608](https://github.com/babel/babel/pull/3608) Set sourceRoot in babel-register transform to fix paths in stacks. ([@danez](https://github.com/danez))
* `babel-plugin-transform-es2015-block-scoping`
  * [#3618](https://github.com/babel/babel/pull/3618) incorrect handling of returns nested in switch cases. ([@ahl](https://github.com/ahl))
* `babel-traverse`
  * [#3559](https://github.com/babel/babel/pull/3559) Fix bug where redeclaration of var doesn't deopt. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-transform-flow-strip-types`
  * [#3655](https://github.com/babel/babel/pull/3655) Strip flow-only class props without needing transform-class-properties.. ([@loganfsmyth](https://github.com/loganfsmyth))

#### Documentation
* Other
  * [#3651](https://github.com/babel/babel/pull/3651) Fixed typo in README.md. ([@marcelometal](https://github.com/marcelometal))

#### Internal
* `babel-preset-es2015`, `babel-preset-latest`
  * [#3674](https://github.com/babel/babel/pull/3674) Latest tests. ([@hzoo](https://github.com/hzoo))
* `babel-preset-es2015`
  * [#3672](https://github.com/babel/babel/pull/3672) Fixes modules test to actually test modules. ([@Kovensky](https://github.com/Kovensky))
  * [#3640](https://github.com/babel/babel/pull/3640) Update test name to reflect reality.. ([@eventualbuddha](https://github.com/eventualbuddha))
* Other
  * [#3668](https://github.com/babel/babel/pull/3668) Ensure correct version of babel installed for preset options. ([@danez](https://github.com/danez))
  * [#3645](https://github.com/babel/babel/pull/3645) Add es2015 loose mode back. ([@hzoo](https://github.com/hzoo))
  * [#3639](https://github.com/babel/babel/pull/3639) Use es2015 loose mode after publish. ([@hzoo](https://github.com/hzoo))

## v6.13.2 (2016-08-05)

Hi again, just fixing up logic from the backwards-compatibility fix which broke options in presets.
Also added more tests and will update Babel to use the new preset options after this release.

#### Bug Fix
* `babel-core`, `babel-preset-es2015`
  * [#3638](https://github.com/babel/babel/pull/3638) [Bug Fix] option manager: val = val.buildPreset should be before the check if the preset supports options ([@christophehurpeau](https://github.com/christophehurpeau))

## v6.13.1 (2016-08-04)

We had a regression in our new babel-preset-es2015@6.13.0 that made it unexpectedly backward-incompatible. This release introduces a new alternative plugin-options approach that is uglier but supports backward-compatiblity. Ideally new plugins would use the new `module.exports = function(babel, options){ }` approach and simple skip supporting `babel-core@<6.13.x`.

#### Bug Fix
* `babel-core`, `babel-preset-es2015`
  * [#3635](https://github.com/babel/babel/pull/3635) Fix backward-compatibility of babel-preset-es2015. ([@loganfsmyth](https://github.com/loganfsmyth))

## v6.13.0 (2016-08-04)

> Since the last release we've created https://github.com/babel/notes to track discussions on our slack and high level features/changes that could be added - definetely check it out if you're interested in Babel's development!

Some small but very important additions in this release:

### Preset options ([babel/notes](https://github.com/babel/notes/blob/master/2016-07/july-31.md#preset-options-pr-3331))

Initially, presets were supposed to be one-off sets of plugins that didn't have any configuration. If you wanted to do something different you would make your own presets. There are [> 600 presets](https://www.npmjs.com/search?q=babel-preset-) on npm now. We want to give users more flexibility in certain cases: like when you want to pass the same option to multiple presets or to remove a default plugin.

### `loose` and `modules` options for `babel-preset-es2015` ([#3331](https://github.com/babel/babel/pull/3331), [#3627](https://github.com/babel/babel/pull/3627))

This has been rather annoying. Having to install `babel-preset-es2015-loose-native-modules` seems rather crazy when it could be an option.

With [#3627](https://github.com/babel/babel/pull/3627), you can pass 2 options in:

- `loose` - Enable "loose" transformations for any plugins in this preset that allow them (Disabled by default).
- `modules` - Enable transformation of ES6 module syntax to another module type (Enabled by default to `"commonjs"`).
Can be `false` to not transform modules, or one of `["amd", "umd", "systemjs", "commonjs"]`

```js
// for loose and native modules
{
  presets: [
    ["es2015", { "loose": true, "modules": false }]
  ]
}
```

### Updates to `babel-preset-stage-2`
- [#3613](https://github.com/babel/babel/pull/3613) Move the [decorators transform](http://babeljs.io/docs/plugins/transform-decorators).
  - [#3626](https://github.com/babel/babel/pull/3626) Make a more informative error message when using the default decorators transform and link to the [legacy transform](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy)
- [#3611](https://github.com/babel/babel/pull/3611) Move [class properties transform](http://babeljs.io/docs/plugins/transform-class-properties/).

### Coming Up

- `babel-preset-es2017`, `babel-preset-latest` (still deciding the name), supporting codemods, and more!

#### New Feature
* `babel-core`, `babel-preset-es2015`
  * [#3627](https://github.com/babel/babel/pull/3627) es2015: transpile the preset, modify modules option to support "amd,umd,systemjs" as well, tests. ([@hzoo](https://github.com/hzoo))
  * [#3331](https://github.com/babel/babel/pull/3331) Support passing options to presets.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-preset-stage-1`, `babel-preset-stage-2`
  * [#3613](https://github.com/babel/babel/pull/3613) Move decorators to stage 2. ([@doug-wade](https://github.com/doug-wade))
  * [#3611](https://github.com/babel/babel/pull/3611) Move `babel-plugin-transform-class-properties` to stage 2. ([@kripod](https://github.com/kripod))

#### Bug Fix
* `babel-traverse`
  * [#3557](https://github.com/babel/babel/pull/3557) Fix bug where `path.evaluate` treats repeated identifiers as undefined. ([@erikdesjardins](https://github.com/erikdesjardins))

#### Polish
* `babel-plugin-transform-decorators`
  * [#3626](https://github.com/babel/babel/pull/3626) Show a more informative error message when using the decorator transf…. ([@hzoo](https://github.com/hzoo))

#### Internal
* `babel-types`
  * [#3628](https://github.com/babel/babel/pull/3628) Missing FlowType definition opts.deprecatedAlias. ([@kpman](https://github.com/kpman))
* `babel-plugin-syntax-async-functions`, `babel-plugin-syntax-async-generators`, `babel-plugin-syntax-class-constructor-call`, `babel-plugin-syntax-class-properties`, `babel-plugin-syntax-decorators`, `babel-plugin-syntax-do-expressions`, `babel-plugin-syntax-exponentiation-operator`, `babel-plugin-syntax-export-extensions`, `babel-plugin-syntax-flow`, `babel-plugin-syntax-function-bind`, `babel-plugin-syntax-function-sent`, `babel-plugin-syntax-jsx`, `babel-plugin-syntax-object-rest-spread`, `babel-plugin-syntax-trailing-function-commas`
  * [#3604](https://github.com/babel/babel/pull/3604) Misc: remove deps from syntax plugins. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-transform-inline-environment-variables`, `babel-plugin-transform-member-expression-literals`, `babel-plugin-transform-merge-sibling-variables`, `babel-plugin-transform-minify-booleans`, `babel-plugin-transform-node-env-inline`, `babel-plugin-transform-property-literals`, `babel-plugin-transform-remove-console`, `babel-plugin-transform-remove-debugger`, `babel-plugin-transform-simplify-comparison-operators`, `babel-plugin-transform-undefined-to-void`
  * [#3621](https://github.com/babel/babel/pull/3621) transfer minify plugins (will be in another repo). ([@hzoo](https://github.com/hzoo))
* Other
  * [#3622](https://github.com/babel/babel/pull/3622) Update mocha to version 3.0.0 🚀. ([@greenkeeperio-bot](https://github.com/greenkeeperio-bot))

#### Commiters: 7
- Daniel Tseng ([kpman](https://github.com/kpman))
- Douglas Wade ([doug-wade](https://github.com/doug-wade))
- Erik Desjardins ([erikdesjardins](https://github.com/erikdesjardins))
- Greenkeeper ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Henry Zhu ([hzoo](https://github.com/hzoo))
- Kristóf Poduszló ([kripod](https://github.com/kripod))
- Logan Smyth ([loganfsmyth](https://github.com/loganfsmyth))

## v6.12.0 (2016-07-27)

- Add a `helpers: false` option to `transform-runtime` to not bundle in babel helpers.
- Add a `exactGlobals` option to `modules-umd`
- Fix a regression with `modules-systemjs`
- Fix a hoisting issue with `react-constant-elements` (@kittens is back!)

#### Bug Fix
* `babel-plugin-transform-react-constant-elements`, `babel-traverse`
  * [#3596](https://github.com/babel/babel/pull/3596) Fix React constant elements transform from hoisting elements to positions where their referenced bindings haven't been evaluated yet. ([@kittens](https://github.com/kittens))
* `babel-plugin-transform-es2015-modules-systemjs`
  * [#3602](https://github.com/babel/babel/pull/3602) Fix: use correct identifier in template - Fixes [#7509](https://github.com/babel/babel/issues/7509). ([@hzoo](https://github.com/hzoo))

#### New Feature
* `babel-plugin-transform-runtime`
  * [#3603](https://github.com/babel/babel/pull/3603) Add `helpers: false` option to babel-plugin-transform-runtime. ([@kittens](https://github.com/kittens))
* `babel-plugin-transform-es2015-modules-umd`
  * [#3534](https://github.com/babel/babel/pull/3534) Add `exactGlobals` option to transform-es2015-modules-umd plugin to enable more flexibility in specifying global names. ([@rmacklin](https://github.com/rmacklin))

#### Commiters: 3
- Henry Zhu ([hzoo](https://github.com/hzoo))
- Sebastian McKenzie ([kittens](https://github.com/kittens))
- rmacklin ([rmacklin](https://github.com/rmacklin))

## v6.11.6 (2016-07-26)

- Reverts [#3523](https://github.com/babel/babel/pull/3523) since it caused some issues with code coverage tools.
- Update readme to explain Babel packages

#### Bug Fix
* `babel-register`
  * [#3599](https://github.com/babel/babel/pull/3599) Revert "Correct source map paths for babel-register.". ([@hzoo](https://github.com/hzoo))
* `babel-plugin-transform-es2015-modules-systemjs`
  * [#3594](https://github.com/babel/babel/pull/3594) systemjs: hoist named function exports - Fixes [#6973](https://github.com/babel/babel/issues/6973). ([@asapach](https://github.com/asapach))

#### Documentation
* Other
  * [#3593](https://github.com/babel/babel/pull/3593) Add badges. ([@hzoo](https://github.com/hzoo))

#### Commiters: 3
- Aliaksei Sapach ([asapach](https://github.com/asapach))
- Henry Zhu ([hzoo](https://github.com/hzoo))

## v6.11.5 (2016-07-23)

Thanks to Rob Eisenberg ([EisenbergEffect](https://github.com/EisenbergEffect)), Keyan Zhang ([keyanzhang](https://github.com/keyanzhang)), Rolf Timmermans ([rolftimmermans](https://github.com/rolftimmermans)), Thomas Grainger ([graingert](https://github.com/graingert)),

we have  few fixes: fix `babel-register` file paths on error, infer class name for classes with class properties, fix `export *` to account for previously compiled modules.

#### Bug Fix
* `babel-plugin-transform-es2015-modules-amd`, `babel-plugin-transform-es2015-modules-commonjs`, `babel-plugin-transform-es2015-modules-systemjs`, `babel-plugin-transform-es2015-modules-umd`
  * [#3591](https://github.com/babel/babel/pull/3591) Fix buildExportAll to account for commonjs/amd/systemjs. ([@hzoo](https://github.com/hzoo)) - thanks ([@EisenbergEffect](https://github.com/EisenbergEffect)) and ([@jmm](https://github.com/jmm))
* `babel-register`
  * [#3523](https://github.com/babel/babel/pull/3523) Correct source map paths for babel-register. ([@rolftimmermans](https://github.com/rolftimmermans))
  * [#3588](https://github.com/babel/babel/pull/3588) Fix typo in config: sourceMaps -> sourceMap. ([@graingert](https://github.com/graingert))
* `babel-plugin-transform-class-properties`
  * [#3589](https://github.com/babel/babel/pull/3589) Infer class name for classes that have static property initializer(s). ([@keyanzhang](https://github.com/keyanzhang))

## v6.11.4 (2016-07-20)

In this release among other things are some more optimizations for babel-generator ([#3584](https://github.com/babel/babel/pull/3584), [#3580](https://github.com/babel/babel/pull/3580)) as well as refactors.

[@jamestalmage](https://github.com/jamestalmage) did some awesome clean for OptionsManager and some tests which may help future improvements to `babel-register` performance.

#### Bug Fix
* `babel-plugin-transform-remove-console`, `babel-plugin-transform-remove-debugger`, `babel-traverse`
  * [#3583](https://github.com/babel/babel/pull/3583) Add block if parent is non-block statement for remove-console/debugger. ([@jhen0409](https://github.com/jhen0409))
* `babel-plugin-transform-regenerator`
  * [#3586](https://github.com/babel/babel/pull/3586) Avoid duplicated identifier sharing location - Fixes [#7436](https://github.com/babel/babel/issues/7436). ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-cli`
  * [#3578](https://github.com/babel/babel/pull/3578) Support all variations of v8Flags in babel-node. ([@danez](https://github.com/danez))

#### Polish
* `babel-core`
  * [#3564](https://github.com/babel/babel/pull/3564) Extract config file resolution from OptionsManager . ([@jamestalmage](https://github.com/jamestalmage))
* `babel-generator`, `babel-plugin-transform-es2015-modules-commonjs`
  * [#3584](https://github.com/babel/babel/pull/3584) babel-generator: More refactoring and optimizations. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-plugin-transform-es2015-parameters`
  * [#3574](https://github.com/babel/babel/pull/3574) Default parameters cleanup. ([@jridgewell](https://github.com/jridgewell))
* `babel-generator`
  * [#3581](https://github.com/babel/babel/pull/3581) babel-generator: Misc cleanup and stale code removal. ([@loganfsmyth](https://github.com/loganfsmyth))
  * [#3580](https://github.com/babel/babel/pull/3580) Further optimize babel-generator Buffer. ([@jridgewell](https://github.com/jridgewell))

#### Commiters: 6
- Daniel Tschinder ([danez](https://github.com/danez))
- Henry Zhu ([hzoo](https://github.com/hzoo))
- James Talmage ([jamestalmage](https://github.com/jamestalmage))
- Jhen-Jie Hong ([jhen0409](https://github.com/jhen0409))
- Justin Ridgewell ([jridgewell](https://github.com/jridgewell))
- Logan Smyth ([loganfsmyth](https://github.com/loganfsmyth))

## v6.11.3 (2016-07-13)

The main fix is @loganfsmyth's changes of some parts in babel-generator in [#3565](https://github.com/babel/babel/pull/3565) to fix issues with exponential code generation times in certain cases.

Items: the size of the array being generated
Time: The time in ms to generate the code
Length: The number of characters in the output code

| Items | Old Time  | New Time | Length |
|-------|-------|----------|--------|
| 2     | 9     | 7        | 239    |
| 4     | 2     | 5        | 465    |
| 8     | 6     | 5        | 917    |
| 16    | 6     | 6        | 1840   |
| 32    | 15    | 11       | 3696   |
| 64    | 25    | 3        | 7408   |
| 128   | 93    | 13       | 14917  |
| 256   | 380   | 18       | 30149  |
| 512   | 1399  | 45       | 60613  |
| 1024  | 5301  | 63       | 121614 |
| 2048  | 20676 | 117      | 246542 |

- Fix rest param optimization bug
- Allow disabling "use strict" when using the cjs module transform.
- Fix typo with es2016 preset

#### Bug Fix
* `babel-plugin-transform-es2015-parameters`
  * [#3573](https://github.com/babel/babel/pull/3573) Fix error in rest parameter length optimization. ([@jridgewell](https://github.com/jridgewell))
* `babel-generator`
  * [#3567](https://github.com/babel/babel/pull/3567) Use the first item in the queue since it is the most recent.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-plugin-transform-es2015-modules-commonjs`, `babel-plugin-transform-strict-mode`
  * [#3562](https://github.com/babel/babel/pull/3562) Adds strictMode option to strict-mode transform. ([@thejameskyle](https://github.com/thejameskyle))
* `babel-preset-es2016`
  * [#3563](https://github.com/babel/babel/pull/3563) Use the proper transform plugin for preset-es2016.. ([@loganfsmyth](https://github.com/loganfsmyth))

#### Polish
* `babel-generator`
  * [#3566](https://github.com/babel/babel/pull/3566) Remove unused Position#unshift. ([@jridgewell](https://github.com/jridgewell))
  * [#3565](https://github.com/babel/babel/pull/3565) Make the code generator write-only to avoid exponential time generation. ([@loganfsmyth](https://github.com/loganfsmyth))

#### Commiters: 3
- James Kyle ([thejameskyle](https://github.com/thejameskyle))
- Justin Ridgewell ([jridgewell](https://github.com/jridgewell))
- Logan Smyth ([loganfsmyth](https://github.com/loganfsmyth))

## v6.11.2 (2016-06-28)

#### Bug Fix

- [#3558](https://github.com/babel/babel/pull/3558) Fix non-unique 'ref' binding name for async functions. ([@loganfsmyth](https://github.com/loganfsmyth))

## v6.11.1 (2016-06-27)

#### Bug Fix

- [#3552](https://github.com/babel/babel/pull/3552) Remove `jsx-self` plugin from the react preset for now. ([@hzoo](https://github.com/hzoo))

#### Documentation

- `babel-types` Update docs + scripts @ForbesLindesay

## v6.11.0 (2016-06-26)

- In this release, there's now an `es2016` preset which includes the [exponentiation operator](http://babeljs.io/docs/plugins/transform-exponentiation-operator/) (thanks for ([@ysmood](https://github.com/ysmood)) for giving us the npm package).
- The `trailing-function-commas` plugin has been moved from `stage-2` preset to `stage-3` preset.
- `babel-plugin-transform-react-jsx-self` has been added to the `react` preset in `development` mode. There is a new dev warning being added in react and this plugin adds the `__self={this}` JSX attribute to all JSX elements.
- `babel-plugin-es2015-unicode-regex` has it's `regexpu-core` dependency updated to `2.x`.
- Babel now uses [lerna 2.x](https://github.com/lerna/lerna)!

#### New Feature
* `babel-preset-es2016`
  * [#3531](https://github.com/babel/babel/pull/3531) Add `es2016` preset. ([@chicoxyzzy](https://github.com/chicoxyzzy))
* `babel-preset-stage-2`, `babel-preset-stage-3`
  * [#3522](https://github.com/babel/babel/pull/3522) Promote `trailing-function-commas` to stage 3. ([@jacobrask](https://github.com/jacobrask))
* `babel-plugin-transform-react-jsx-self`, `babel-preset-react`
  * [#3540](https://github.com/babel/babel/pull/3540) Added jsx-self babel transform plugin. ([@jimfb](https://github.com/jimfb))

#### Spec Compliancy
* `babel-plugin-transform-es2015-unicode-regex`
  * [#3338](https://github.com/babel/babel/pull/3338) Update to `regexpu-core@2.0.0` for ES2016 compliance. ([@mathiasbynens](https://github.com/mathiasbynens))

#### Bug Fix
* `babel-plugin-transform-react-jsx-self`
  * [#3550](https://github.com/babel/babel/pull/3550) Fix some mistakes in the jsx-self transform. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-generator`
  * [#3548](https://github.com/babel/babel/pull/3548) Fix incorrect Flow object whitespacing. ([@sampepose](https://github.com/sampepose))

#### Internal
* Other
  * [#3509](https://github.com/babel/babel/pull/3509) Build: use lerna 2.x beta. ([@hzoo](https://github.com/hzoo))
* `babel-code-frame`
  * [#3533](https://github.com/babel/babel/pull/3533) `babel-code-frame`: Upgrade to `js-tokens@2`. ([@lydell](https://github.com/lydell))

#### Commiters: 9
- Henry Zhu ([hzoo](https://github.com/hzoo))
- Jacob Rask ([jacobrask](https://github.com/jacobrask))
- Jesse McCarthy ([jmm](https://github.com/jmm))
- Jim ([jimfb](https://github.com/jimfb))
- Logan Smyth ([loganfsmyth](https://github.com/loganfsmyth))
- Mathias Bynens ([mathiasbynens](https://github.com/mathiasbynens))
- Sam Pepose ([sampepose](https://github.com/sampepose))
- Sergey Rubanov ([chicoxyzzy](https://github.com/chicoxyzzy))
- Simon Lydell ([lydell](https://github.com/lydell))

## 6.10.4 (2016-06-21)

#### Bug Fix
* `babel-traverse`
  * Fix NodePath#evaluate to avoid a possible max-recursion-depth from an evaluation cycle ([@kittens](https://github.com/kittens))

#### Internal
* `babel-core`
  * Bump the from `2.x` to `3.x` for `minimatch` to avoid a deprecation warning ([@theJian](https://github.com/theJian))

## 6.10.3 (2016-06-18)

#### Bug Fix
* `babel-plugin-transform-es2015-modules-commonjs`
  * [#3532](https://github.com/babel/babel/pull/3532) Allow export statements with no export specifiers ([@loganfsmyth](https://github.com/loganfsmyth))

## 6.10.2 (2016-06-17)

@loganfsmyth made some awesome optimizations and better whitespace handling for `babel-generator` again (~10-15% performance improvement)!

Also a small fix for [`babel/babel-eslint#321`](https://github.com/babel/babel-eslint/issues/321)

#### Bug Fix
* `babel-types`
  * [#3529](https://github.com/babel/babel/pull/3529) "name" should not be visited for TypeParameter. ([@danez](https://github.com/danez))

#### Internal
* Other
  * [#3528](https://github.com/babel/babel/pull/3528) cleanup transpiled files in `make clean` - Fixes [#7434](https://github.com/babel/babel/issues/7434) [skip ci]. ([@hzoo](https://github.com/hzoo))
* `babel-generator`
  * [#3492](https://github.com/babel/babel/pull/3492) Refactor space insertion and remove some unneeded function options. ([@loganfsmyth](https://github.com/loganfsmyth))

## 6.10.1 (2016-06-11)

#### Bug Fixes

* [#3525](https://github.com/babel/babel/pull/3525): Remove the nonfunctional -s shorthand for `--skip-initial-build` ([@lxe](https://github.com/lxe))
* [#3526](https://github.com/babel/babel/pull/3526): Fix an issue with the switch handing from PR #3490 ([@loganfsmyth](https://github.com/loganfsmyth))

## 6.10.0 (2016-06-11)

#### New Feature
* `babel-cli`: Add a new option `--skip-initial-build`  ([#3489](https://github.com/babel/babel/pull/3489)) ([@lxe](https://github.com/lxe))

- Do not compile files before watching

```sh
$ babel src -d dest --watch --skip-initial-build
```

#### Bug Fix
* `babel-plugin-transform-es2015-block-scoping`: Create a new lexical environment inside switch statement blocks for identifier bindings ([#3490](https://github.com/babel/babel/pull/3490), [T7324](https://phabricator.babeljs.io/T7324)) ([@jayphelps](https://github.com/jayphelps))

```js
let foo = false;

switch (true) {
  default:
    let foo = true;
}

alert(foo); // should be false
```

* `babel-types`, `babel-generator`: Support changes in flow parsing in babylon

Add support for a `TypeParameter` node.

```js
type A<T = string> = T;
class A<S = number, T: ?string = string> {};
```

#### Documentation
* Clean up language/consistency in CONTRIBUTING.md ([#3517](https://github.com/babel/babel/pull/3517)) ([@kaicataldo](https://github.com/kaicataldo))
* Fix up broken links in monorepo.md ([#3519](https://github.com/babel/babel/pull/3519)) ([@koenkivits](https://github.com/koenkivits))

## 6.9.2 (2016-05-29)

Fixup missing dependency.

#### Bug Fix
* `babel-runtime`: Fix an issue with getting `Cannot find module 'regenerator-runtime'` because it was set as a devDependency instead of a dependency.

## 6.9.1 (2016-05-29)

Just 2 fixes this release!
- A class property fix (set `this` correctly when using async arrow function class properties without a super class).
- A fix for `react-constant-elements` plugin to help optimize react more (the plugin wasn't applying to JSX with text).

Also, thanks to [@mucsi96](https://github.com/mucsi96) for catching the extraneous code coverage comments we were leaving when publishing!

> We are removing/deprecating `babel-regenerator-runtime` in favor of depending on the original `regenerator-runtime` since the differences are resolved. Thanks to ([@benjamn](https://github.com/benjamn)) for the suggestion to maintain it (and for originally creating it!).

#### Bug Fix
* `babel-core`
  * [#3508](https://github.com/babel/babel/pull/3510) Assign `_this` to `this` when there is no `Superclass` in a `Class` when using class properties. Fixes T7364. ([@ehjay](https://github.com/ehjay))

The fix correctly set this: `var _this;` -> `var _this = this;`

```js
// input
class MyClass {
  myAsyncMethod = async () => {
    console.log(this);
  }
}

// output
class MyClass {
  constructor() {
    var _this = this; // _this wasn't being set to `this`
    this.myAsyncMethod = babelHelpers.asyncToGenerator(function* () {
      console.log(_this);
    });
  }
}
```

* `babel-plugin-transform-react-constant-elements`, `babel-types`
  * [#3510](https://github.com/babel/babel/pull/3510) Make JSXText Immutable. Fixes T7251. ([@le0nik](https://github.com/le0nik))

JSX with text in it was not being hoisted as other constant elements.

```text
// input
var Foo = React.createClass({
  render() {
    return <div>Text</div>; // text wasn't considered constant
  }
});

// output
var _ref = <div>Text</div>;

var Foo = React.createClass({
  render() {
    return _ref;
  }
});
```

#### Internal

* [#3513](https://github.com/babel/babel/pull/3513) Make sure the env is production when publishing. ([@hzoo](https://github.com/hzoo))

* `babel-regenerator-runtime`
  * [#3507](https://github.com/babel/babel/pull/3507) babel-regenerator-runtime license field. ([@leipert](https://github.com/leipert))
* `babel-core`
  * [#3446](https://github.com/babel/babel/pull/3446) Use more ideal mocha hooks in babel-core/test/api. ([@jmm](https://github.com/jmm))
* `babel-polyfill`, `babel-regenerator-runtime`, `babel-runtime`
  * [#3494](https://github.com/babel/babel/pull/3494) Use `regenerator-runtime` from npm; removed `babel-regenerator-runtime` fork since there aren't differences anymore. ([@benjamn](https://github.com/benjamn))

## 6.9.0 (2016-05-17)

- Update `core-js` from `2.1.0` to `2.4.0`. Check the [releases](https://github.com/zloirock/core-js/releases) for more info.
- Add a `systemGlobal` option in the systemjs transform.

```js
["transform-es2015-modules-systemjs", {
  // outputs scoped_system.register(...)
  "systemGlobal": "scoped_system" // defaults to System.register
}]
```

- Bug fixes for `class-properties` and `react-jsx-source` plugins.

#### New Feature
* `babel-types`
  * [#3470](https://github.com/babel/babel/pull/3470) Add validation of type fields for parameter decorators. ([@shuhei](https://github.com/shuhei))
* `babel-plugin-transform-runtime`, `babel-polyfill`, `babel-register`, `babel-runtime`
  * [#3480](https://github.com/babel/babel/pull/3480) Update `core-js` to `2.4.0`. ([@zloirock](https://github.com/zloirock))
* `babel-plugin-transform-es2015-modules-systemjs`
  * [#3482](https://github.com/babel/babel/pull/3482) Add `systemGlobal` option to allow changing the `System` in `System.register` to be `systemGlobal`. Also move `use strict` wrapping. ([@guybedford](https://github.com/guybedford))

#### Bug Fix
* `babel-plugin-transform-react-jsx-source`
  * [#3504](https://github.com/babel/babel/pull/3504) Skip adding `__source` if it already exists. ([@frantic](https://github.com/frantic))
* `babel-plugin-transform-class-properties`
  * [#3486](https://github.com/babel/babel/pull/3486) Add `path.ensureBlock` for `ArrowFunctionExpression` in a `ClassExpression` when there is a `ClassProperty`. ([@jhen0409](https://github.com/jhen0409))
* `babel-traverse`
  * [#3465](https://github.com/babel/babel/pull/3465) don't double count binding references. ([@amasad](https://github.com/amasad))
* `babel-plugin-transform-es2015-parameters`
  * [#3481](https://github.com/babel/babel/pull/3481) also visit `ClassProperty` for rest param deopt check, fixes [T7311](https://phabricator.babeljs.io/T7311). ([@jayphelps](https://github.com/jayphelps))

#### Documentation
* [#3498](https://github.com/babel/babel/pull/3498) Fix grammar in CHANGELOG. ([@graingert](https://github.com/graingert))

#### Internal

Upgrade to lodash 4.

* `babel-traverse`
  * [#3501](https://github.com/babel/babel/pull/3501) Remove repeating dependency from babel-traverse. ([@dlwalsh](https://github.com/dlwalsh))
* `babel-helper-fixtures`
  * [#3502](https://github.com/babel/babel/pull/3502) Replace trim-right with _.trimEnd in babel-helper-fixtures. ([@dlwalsh](https://github.com/dlwalsh))
* `babel-generator`
  * [#3500](https://github.com/babel/babel/pull/3500) Remove micro dependencies in favour of lodash functions for babel-generator. ([@dlwalsh](https://github.com/dlwalsh))
* `babel-cli`, `babel-core`, `babel-generator`, `babel-helper-builder-react-jsx`, `babel-helper-define-map`, `babel-helper-fixtures`, `babel-helper-regex`, `babel-helper-transform-fixture-test-runner`, `babel-plugin-transform-es2015-block-scoping`, `babel-plugin-transform-es2015-function-name`, `babel-plugin-transform-proto-to-assign`, `babel-preset-es2015`, `babel-register`, `babel-runtime`, `babel-template`, `babel-traverse`, `babel-types`
  * [#3315](https://github.com/babel/babel/pull/3315) Upgrade to lodash 4. ([@forivall](https://github.com/forivall))

Thanks to amasad, dlwalsh, forivall, frantic, graingert, guybedford, jayphelps, jhen0409, loganfsmyth, shuhei, zloirock!

## 6.8.0 (2016-05-02)

**Babel is now compiled with Babel 6!**

![](http://i.imgur.com/7drHiqr.gif)

### Why this is relevant

TLDR: This fixes the npm deduping issues regarding babel-runtime 5 and 6.

- Because all Babel packages were compiled with Babel 5 and using babel-runtime@5, npm can't dedupe any of them if a consumer of Babel also added a dependency on babel-runtime@6.

Example:

```
└─┬ babel-plugin-transform-exponentiation-operator@6.5.0
  ├─┬ babel-helper-builder-binary-assignment-operator-visitor@6.6.5
  │ ├─┬ babel-helper-explode-assignable-expression@6.6.5
  │ │ └── babel-runtime@5.8.38
  │ └── babel-runtime@5.8.38
  ├─┬ babel-plugin-syntax-exponentiation-operator@6.5.0
  │ └── babel-runtime@5.8.38
  └── babel-runtime@5.8.38
```

Now it should be more like:

```
└─┬ babel-runtime@6.8.0
└─┬ babel-plugin-transform-exponentiation-operator@6.8.0
  ├─┬ babel-helper-builder-binary-assignment-operator-visitor@6.8.0
  │ ├─┬ babel-helper-explode-assignable-expression@6.8.0
  ├─┬ babel-plugin-syntax-exponentiation-operator@6.8.0
```

Related issues: [T7252](https://phabricator.babeljs.io/T7252), [T7275](https://phabricator.babeljs.io/T7275), [T6689](https://phabricator.babeljs.io/T6689), [sindresorhus/ava#660](https://github.com/sindresorhus/ava/issues/660), [vuejs/vue-loader#96](https://github.com/vuejs/vue-loader/issues/96), etc.

#### Internal
* [#3438](https://github.com/babel/babel/pull/3438) Self host on babel6. ([@hzoo](https://github.com/hzoo))
* [#3477](https://github.com/babel/babel/pull/3477) turn transform into a simple `for` loop. ([@mattkrick](https://github.com/mattkrick))

#### Misc
* [#3484](https://github.com/babel/babel/pull/3484) Travis: add node 6, remove iojs. ([@hzoo](https://github.com/hzoo))
* [#3491](https://github.com/babel/babel/pull/3491) babel-template is an implementation of quasiquotes. ([@rektide](https://github.com/rektide))
* [#3479](https://github.com/babel/babel/pull/3479) Remove unused import in README ([@oliviertassinari](https://github.com/oliviertassinari))

## 6.7.7 (2016-04-20)

#### Bug Fix

* `babel-code-frame`
  * [#3464](https://github.com/babel/babel/pull/3464) - Handle tab-indented code when marking errors ([@lydell](https://github.com/lydell))

* `babel-core`
  * [#3422](https://github.com/babel/babel/pull/3422) - Insert `this` references in `constructor` after `super()` ([@loganfsmyth](https://github.com/loganfsmyth))

* `babel-generator`
  * [#3463](https://github.com/babel/babel/pull/3475) - Better sourcemaps for function bodies ([@loganfsmyth](https://github.com/loganfsmyth))

#### Misc

* `babel-plugin-transform-es2015-modules-commonjs`
  * [#3457](https://github.com/babel/babel/pull/3457) - Some new tests ([@hzoo](https://github.com/hzoo))

* `babel-generator`, `babel-types`
  * [#3475](https://github.com/babel/babel/pull/3475) - Performance improvements for the code generator ([@loganfsmyth](https://github.com/loganfsmyth))


## 6.7.6 (2016-04-08)

* `babel-traverse`
  * [#3458](https://github.com/babel/babel/pull/3458): Revert PR [#3433](https://github.com/babel/babel/pull/3433) which introduced https://phabricator.babeljs.io/T7272 ([@loganfsmyth](https://github.com/loganfsmyth))


## 6.7.5 (2016-04-07)

#### Bug Fix

* `babel-traverse`
  * [#3433](https://github.com/babel/babel/pull/3433): Only attempt to rename export declarations, not expressions. ([@loganfsmyth](https://github.com/loganfsmyth))

* `babel-core`/`babel-cli`
  * [#3448](https://github.com/babel/babel/pull/3448): Make sure input to path.{dir,base}name is a string. ([@addaleax](https://github.com/addaleax))
  * [#3451](https://github.com/babel/babel/pull/3451): Handle input sourcemaps with mappings to nothing to better support sourcemaps from other tools in a pipeline. ([@loganfsmyth](https://github.com/loganfsmyth))

* `babel-helper-builder-react-jsx`
  * [#3444](https://github.com/babel/babel/pull/3444): Preserve whitespace in JSXExpressionContainer StringLiteral children. ([@drd](https://github.com/drd))

* `babel-generator`
  * [#3421](https://github.com/babel/babel/pull/3421): Wrap parens around default exports starting with function/class. ([@loganfsmyth](https://github.com/loganfsmyth))

#### Misc

* `babel-plugin-transform-runtime`
  * [#3258](https://github.com/babel/babel/pull/3258): Expanded documentation ([@trodrigues](https://github.com/trodrigues))
  * [#3441](https://github.com/babel/babel/pull/3441): Improve babel-code-frame. Kill the line-numbers dependency. ([@lydell](https://github.com/lydell))

* `babel-traverse`
  * [#3442](https://github.com/babel/babel/pull/3442): Remove the old NodePath validation check ([@loganfsmyth](https://github.com/loganfsmyth))
  * [#3447](https://github.com/babel/babel/pull/3447): Stop traversing when target type is found. ([@nkzawa](https://github.com/nkzawa))

## 6.7.4 (2016-03-22)

#### Bug Fix
* `babel-traverse`
  * [#3419](https://github.com/babel/babel/pull/3419): Keep the context stack balanced to ensure that contexts are properly popped off. ([@loganfsmyth](https://github.com/loganfsmyth))

    This bug was causing issues internally because the context system relies on the queues being balanced when deciding what nodes need to be re-processed and which do not. When it becomes imbalanced, nodes can be forgotten or skipped, causing issues like https://phabricator.babeljs.io/T7199 which broke ES6 modules on IE8 with the ES3 transforms.

  * [#3420](https://github.com/babel/babel/pull/3420): Invalidate the scope cache when nodes are moved. ([@loganfsmyth](https://github.com/loganfsmyth))

    This bug was causing scoping issues in some cases if a node was moved to a new location that was not nested inside a new scope. When this case was hit, the old cached scope would be used, causing issues like https://phabricator.babeljs.io/T7194, https://phabricator.babeljs.io/T6934, and https://phabricator.babeljs.io/T6728.

* `babel-runtime`
  * [#3424](https://github.com/babel/babel/pull/3424): Fix an issue causing runtime breakage on IE8. ([@zloirock](https://github.com/zloirock))

* `babel-plugin-transform-react-jsx`
  * [#3430](https://github.com/babel/babel/pull/3430): Stop the JSX transform from using an AST node in two places. ([@amasad](https://github.com/amasad))

#### Misc

* `babel-traverse`
  * [#3432](https://github.com/babel/babel/pull/3432): Fix a spelling mistake in an error message. ([@simeonwillbanks](https://github.com/simeonwillbanks))

#### Internal
* [#3400](https://github.com/babel/babel/pull/3400): Fix an issue that could cause a local clone of Babel to error out if the github repo was in a location with a parent `.babelrc` file. ([@callumlocke](https://github.com/callumlocke))
* [#3431](https://github.com/babel/babel/pull/3431): Fix an issue that was causing the local-development watcher to occasionally rebuild with the incorrect file content. ([@loganfsmyth](https://github.com/loganfsmyth))
* [#3436](https://github.com/babel/babel/pull/3436): Update our linting utility version. ([@hzoo](https://github.com/hzoo))
* [#3437](https://github.com/babel/babel/pull/3437): Remove an unused dependency. ([@hzoo](https://github.com/hzoo))
* `babel-core`
  * [#3429](https://github.com/babel/babel/pull/3429): Avoid potential side-effects in a test. ([@amasad](https://github.com/amasad))


## 6.7.3 (2016-03-22)

* `babel-code-frame`
  * Dropped problematic `line-numbers` dependency which was broken due to the unexpected unpublishing of its dependency `left-pad@0.0.3`.


## 6.7.3 (2016-03-10)

#### Bug Fix
* `babel-traverse`
  * Fix a bug which caused the new Flow binding warning to show more often than expected ([@amasad](https://github.com/amasad)).


## 6.7.2 (2016-03-10)

Flow fix, mention babylon move

#### Bug Fix
* `babel-traverse`
  * [#3414](https://github.com/babel/babel/pull/3414): Warn on Flow-based bindings and don't count as a const violation. (@amasad)

We are treating static type information as part of the runtime scope information. So a Flow type declaration was being considered a binding on the scope. This was specifically problematic when we thinking that we're overwriting a binding:

The following code:
```js
declare class foo {}
const foo = 1;
```

Will result in the error: `"foo" is read-only`

Since removing support for flow-based bindings would be a breaking change, in this release I'm adding a warning whenever someone tries to use Flow types as bindings.

#### Internal
* `babel-code-frame`, `babel-generator`, `babel-messages`, `babel-plugin-undeclared-variables-check`, `babel-polyfill`, `babel-register`, `babel-traverse`, `babel-types`
  * [#3410](https://github.com/babel/babel/pull/3410) add test to npmignores [ci skip]. ([@hzoo](https://github.com/hzoo))
* `babylon`
  * [#3413](https://github.com/babel/babel/pull/3413) move babylon to https://github.com/babel/babylon. ([@kittens](https://github.com/kittens))


## 6.7.1 (2016-03-09)

#### Bug Fix
* `babel-plugin-transform-es2015-block-scoping`
  * [#3411](https://github.com/babel/babel/pull/3411) Fixes [T7197](https://phabricator.babeljs.io/T7197): Move bindings without losing any information.

The following code:
```js
let foo = () => {
  foo = () => { };
};

foo();
```

Was generating:

```js
var foo = function foo() {
  foo = function foo() {};
};

foo();
```

Notice how the function name `foo` was is shadowing the upper scope variable. This was fixed and the generated code now is:

```js
var _foo = function foo() {
  _foo = function foo() {};
};

_foo();
```

## 6.7.0 (2016-03-08)

Notable changes:
- Various async function fixes (const read-only error, wrong this, etc)
- Proper sourcemaps for import/export statements
- Moved internal Babel cache out of the AST

#### New Feature
* `babel-traverse`
  * [#3393](https://github.com/babel/babel/pull/3393) Move NodePath cache out of the AST. ([@amasad](https://github.com/amasad))

Move cache into a clearable WeakMap, adds `traverse.clearCache` and `traverse.copyCache`. This doubles as a bug fix because previously reusable AST Nodes would carry their cache with them even if they're used across multiple files and transform passes.

* `babel-generator`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-flow-strip-types`, `babylon`
  * [#3385](https://github.com/babel/babel/pull/3385) Add support for Flow def-site variance syntax. ([@samwgoldman](https://github.com/samwgoldman))

```js
// examples
class C<+T,-U> {}
function f<+T,-U>() {}
type T<+T,-U> = {}
```

This syntax allows you to specify whether a type variable can appear in
a covariant or contravariant position, and is super useful for, say,
`Promise`. @samwgoldman can tell you more 😄.

* `babel-generator`, `babylon`
  * [#3323](https://github.com/babel/babel/pull/3323) Source-map support for multiple input source files. ([@divmain](https://github.com/divmain))

More docs on this in the [`babel-generator` README](https://github.com/babel/babel/blob/master/packages/babel-generator/README.md#ast-from-multiple-sources)

#### Bug Fix
* `babel-traverse`
  * [#3406](https://github.com/babel/babel/pull/3406) Update scope info after block-scoping transform [T2892](https://phabricator.babeljs.io/T2892). ([@amasad](https://github.com/amasad))

Make sure all existing let/const bindings are removed and replaced with vars after the block-scoping plugin is run.

This fixes: `SyntaxError: src/foo.js: "baz" is read-only (This is an error on an internal node. Probably an internal error. Location has been estimated.)`

```js
async function foo() {
  async function bar() {
    const baz = {}; // was creating a read-only error
  }
}
```

* `babel-core`, `babel-traverse`, `babel-helper-remap-async-to-generator`, `babel-helper-replace-supers`, `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-async-to-module-method`
  * [#3405](https://github.com/babel/babel/pull/3405) Fix shadow function processing for async functions ([@loganfsmyth](https://github.com/loganfsmyth))

Should fix the majority of issues dealing with async functions and use of parameters, `this`, and `arguments`.

```js
// fixes
class Test {
  static async method2() {
    setTimeout(async (arg) => {
      console.log(this); // was showing undefined with arg
    });
  }

  async method2() {
    setTimeout(async (arg) => {
      console.log(this); // was showing undefined with arg
    });
  }
}
```

* `babel-helper-remap-async-to-generator`, `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-async-to-module-method`
  * [#3381](https://github.com/babel/babel/pull/3381) Fix named async FunctionExpression scoping issue.. ([@keijokapp](https://github.com/keijokapp))

The problem is that the name `bar` of `FunctionExpression` is only visible inside that function, not in `foo` or `ref`.

```js
// input
var foo = async function bar() {
  console.log(bar);
};


// before
var foo = function () {
  var ref = babelHelpers.asyncToGenerator(function* () {
    console.log(bar);
  });

  return function bar() {
    return ref.apply(this, arguments);
  };
}();

// now
var foo = function () {
  var ref = babelHelpers.asyncToGenerator(function* () {
    console.log(bar);
  });

  function bar() {
    return ref.apply(this, arguments);
  }

  return bar
}();
```


* `babel-plugin-transform-es2015-parameters`
  * [#3375](https://github.com/babel/babel/pull/3375) Fix errors in parameters rest transformation [T7138](https://phabricator.babeljs.io/T7138). ([@jmm](https://github.com/jmm))

Many fixes to rest params: `function asdf(...rest) { ... }`

* `babel-template`
  * [#3363](https://github.com/babel/babel/pull/3363) Fix usage in IE <= 9 ([@danez](https://github.com/danez))

* `babel-plugin-transform-es2015-modules-commonjs`
  * [#3409](https://github.com/babel/babel/pull/3409) Fix source map generation for import and export statement.


#### Internal
* `babel-plugin-transform-es2015-modules-commonjs`
  * [#3383](https://github.com/babel/babel/pull/3383) Test for regression with exporting an arrow function with a default param. ([@hzoo](https://github.com/hzoo))

#### Commiters: 6

amasad, divmain, hzoo, jmm, keijokapp, loganfsmyth, samwgoldman


## 6.6.5 (2016-03-04)

And.. some more bug fixes!

#### Bug Fix
* `babel-plugin-transform-es2015-computed-properties`
  * [#3396](https://github.com/babel/babel/pull/3396) Fixes [T7183](https://phabricator.babeljs.io/T7183): Object accessors after computed property were broken. ([@AgentME](https://github.com/AgentME))

```js
// lead to `ReferenceError: b is not defined` at runtime
var obj = {
  ["a"]: 5,
  set b(x) { console.log('set b', x); }
};

obj.b = 55;
```

* `babel-plugin-transform-object-rest-spread`, `babel-types`
  * [#3395](https://github.com/babel/babel/pull/3395) Recognize object rest properties as binding identifiers - Fixes [T7178](https://phabricator.babeljs.io/T7178). ([@loganfsmyth](https://github.com/loganfsmyth))

```js
import props from 'props';
console.log(props);

(function(){
  const { ...props } = this.props;

  console.log(props); // props was referencing the imported props rather than in object spread
})();
```

* `babel-plugin-transform-es2015-block-scoping`
  * [#3389](https://github.com/babel/babel/pull/3389) Update scope binding info after transforming block-scoped bindings. ([@amasad](https://github.com/amasad))

Scope binding info wasn't updated after converting const/let/block bindings to var which could lead to errors with other transforms.

#### Internal
* [#3398](https://github.com/babel/babel/pull/3398) Revert "Remove flow". ([@amasad](https://github.com/amasad))
* [#3397](https://github.com/babel/babel/pull/3397) Make sure lib is clean before publishing. ([@hzoo](https://github.com/hzoo))
* `babel-core`, `babel-plugin-transform-es2015-block-scoping`, `babel-plugin-transform-es2015-classes`
  * [#3399](https://github.com/babel/babel/pull/3399) use `flow` instead of `flow-comments`. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-transform-es2015-modules-amd`, `babel-plugin-transform-es2015-modules-commonjs`, `babel-plugin-transform-es2015-modules-umd`
  * [#3391](https://github.com/babel/babel/pull/3391) Make buildExportAll generate pure ES5 code.. ([@benjamn](https://github.com/benjamn))

#### Commiters: 5
AgentME, amasad, benjamn, hzoo, loganfsmyth

## 6.6.4 (2016-03-02)

Some more fixes!

#### Bug Fix
* `babel-plugin-transform-es2015-duplicate-keys`
  * [#3388](https://github.com/babel/babel/pull/3388) Partial T7173 Fix: Prevent accessors being seen as duplicates of each other. ([@AgentME](https://github.com/AgentME))

```js
// sample code that was erroring
const obj = {
  set a (a) {
    values.a = a;
  },
  get a () {
    return values.a;
  }
};
```

* `babel-core`
  * [#3350](https://github.com/babel/babel/pull/3350) Make Babel actually resolve plugins relative to where they were specified (via .babelrc).. ([@skevy](https://github.com/skevy))

```js
// .babelrc
{
  "plugins": ["./myPluginDir/somePlugin.js"]
}
```

Babel will now resolve the plugin above relative to the directory that contains the .babelrc file rather than the `process.cwd()`.

#### Internal
* `A lot of packages`
  * [#3392](https://github.com/babel/babel/pull/3392) Remove flow. ([@samwgoldman](https://github.com/samwgoldman))

Since users were getting error reports since Babel's codebase wasn't typechecking correctly. (Ref [T7114](https://phabricator.babeljs.io/T7114)) - Will be adding it back into the codebase itself soon.

## 6.6.3 (2016-03-01)

#### Bug Fix

- `babel-plugin-transform-es2015-modules-commonjs`, `babel-traverse`
  - [#3387](https://github.com/babel/babel/pull/3387) Fix regression with [T7165](https://phabricator.babeljs.io/T7165) - let is not being transpiled when using export all (block-scoping transform wasn't run) ([@loganfsmyth](https://github.com/loganfsmyth))

```js
// example code
`export * from './a'`
```

## 6.6.2 (2016-03-01)

#### Bug Fix

- `babel-plugin-transform-es2015-modules-commonjs`, `babel-traverse`
  - [#3386](https://github.com/babel/babel/pull/3386) Fix regression with [T7160](https://phabricator.babeljs.io/T7160) - exported arrow functions with default parameters ([@loganfsmyth](https://github.com/loganfsmyth))

```js
// example code
export var bar = (gen, ctx = null) => {}
```

## 6.6.1 (2016-02-29)

#### Bug Fix

- `babel-runtime`, `babel-polyfill`: Fix publishing issue (wasn't updated from before).

## 6.6.0 (2016-02-29) "core-js 2, better error feedback"

Whoo a :frog: leap day release!

![](http://i.imgur.com/XmMMZKg.gif)

### exports.default fix

We finally fixed both [T2817](https://phabricator.babeljs.io/T2817), [T6863](https://phabricator.babeljs.io/T6863) where using both `transform-es3-member-expression-literals` and `transform-es2015-modules-commonjs`!

```js
exports.default = {};
// was not to transformed to
exports["default"] = {};
```

You should be able to remove `es3ify` (a useful workaround for this issue). Thanks everyone for your patience, and much thanks to @loganfsmyth for the fix!

### More helpful error messages
- If you are using a .babelrc with babel 5 options that were removed (there is a specific message for each one)

```bash
# before
ReferenceError: [BABEL] unknown: Unknown option: base.stage
# now
ReferenceError: [BABEL] unknown: Using removed Babel 5 option: base.stage
- Check out the corresponding stage-x presets http://babeljs.io/docs/plugins/#presets
# another example
ReferenceError: [BABEL] unknown: Using removed Babel 5 option: base.externalHelpers
- Use the `external-helpers` plugin instead. Check out http://babeljs.io/docs/plugins/external-helpers/
```

- If you are trying to use a babel 5 plugin

```bash
# before
babel Plugin is not a function
# now
The object-assign Babel 5 plugin is being run with Babel 6.
```

### core-js
- `core-js` was updated to `^2.1.0`.

---

#### New Feature

##### New plugin `babel-plugin-transform-es2015-duplicate-keys`

* `babel-plugin-transform-es2015-duplicate-keys`, `babel-preset-es2015`
  * [#3280](https://github.com/babel/babel/pull/3280) Fixes [T2462](https://phabricator.babeljs.io/T2462), compile duplicate keys in objects to valid strict ES5. ([@AgentME](https://github.com/AgentME))

`babel-plugin-transform-es2015-duplicate-keys` is a new plugin that is included in the es2015 preset. It was added since ES5 doesn't allow duplicate properties (it is valid in ES2015 strict mode however).

It will compile objects with duplicate keys to computed properties, which can be compiled with the `transform-es2015-computed-properties` plugin.

Example:

```js
// .babelrc
{ "plugins": ["transform-es2015-duplicate-keys"] }
// Input
var x = { a: 5, "a": 6 };
// Output
var x = { a: 5, ["a"]: 6 };
```

##### New `globals` option for `transform-es2015-modules-umd`

* `babel-plugin-transform-es2015-modules-umd`
  * [#3366](https://github.com/babel/babel/pull/3366) [UMD] Fixed T6832. ([@clayreimann](https://github.com/clayreimann))

```js
// Adds a new plugin option to let you override the names of globals
// .babelrc
{
  "plugins": [
    ["transform-es2015-modules-umd", {
      "globals": {
        "es6-promise": "Promise"
      }
    }]
  ]
}
```

#### Bug Fix
* `babel-plugin-transform-es2015-modules-commonjs`, `babel-traverse`
  * [#3368](https://github.com/babel/babel/pull/3368) Fix the module plugin to properly requeue so the ES3 transforms can work. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babylon`
  * [#3355](https://github.com/babel/babel/pull/3355) Clean up babylon bundle to allow it to be re-bundled - Fixes [T6930](https://phabricator.babeljs.io/T6930). ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-generator`
  * [#3358](https://github.com/babel/babel/pull/3358) Fix generator with empty token list and force a newline for line comments in concise mode. ([@gzzhanghao](https://github.com/gzzhanghao))
* `babel-plugin-transform-es2015-parameters`
  * [#3249](https://github.com/babel/babel/pull/3249) Assignment to rest param element triggers error T6932. ([@jmm](https://github.com/jmm))

```js
// .babelrc
{ plugins: ["transform-es2015-parameters"] }

// Fixes an internal error with the code:
function x (...items) {
  items[0] = 0;
}
```

* `babel-helper-remap-async-to-generator`, `babel-plugin-transform-es2015-parameters`
  * [#3336](https://github.com/babel/babel/pull/3336) Fixes [T3077](https://phabricator.babeljs.io/T3077) (incorrect _arguments for async arrow functions with rest params). ([@erikdesjardins](https://github.com/erikdesjardins))

```js
// .babelrc
{
  "plugins": ["external-helpers", "transform-es2015-parameters", "transform-async-to-generator"]
}

// Fixes an issue with using incorrect `arguments`
var x = async (...rest) => {
  if (noNeedToWork) return 0;
  return rest;
};
```

* `babel-plugin-transform-regenerator`, `babel-traverse`
  * [#3359](https://github.com/babel/babel/pull/3359) Queue regeneratorRuntime so it is transformed before Program#exit. ([@loganfsmyth](https://github.com/loganfsmyth))

Fixes the `_regeneratorRuntime is not defined` error when using `transform-runtime`/`transform-regenerator` (this happened when using polyfillable code in `core-js`.

* `babylon`
  * [#3356](https://github.com/babel/babel/pull/3356) Properly fail to parse >== and <== - Fixes [T2921](https://phabricator.babeljs.io/T2921). ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-plugin-transform-es2015-block-scoping`
  * [#3346](https://github.com/babel/babel/pull/3346) Rename scope bindings during block scope transform. ([@schmod](https://github.com/schmod))
* `babel-generator`
  * [#3380](https://github.com/babel/babel/pull/3380) Fix: Add parens for unary arrow function. ([@hzoo](https://github.com/hzoo))

```js
// input
void (() => {});
// correct output
void (() => {});
// wrong
void () => {};
```

* `babel-generator`
  * [#3379](https://github.com/babel/babel/pull/3379) Fix: invalid codegen for non decimal numeric literals in MemberExpression. ([@hzoo](https://github.com/hzoo))

```js
// input
(0xFFFF).toString()
// correct output
0xFFFF.toString()
// wrong
0xFFFF..toString()
```

#### Documentation
* `babel-plugin-transform-regenerator`
  * [#3370](https://github.com/babel/babel/pull/3370) Adds repository field to babel-plugin-transform-regenerator. ([@siroky](https://github.com/siroky))
* `babel-plugin-transform-object-set-prototype-of-to-assign`
  * [#3369](https://github.com/babel/babel/pull/3369) fix babel-plugin-transform-proto-to-assign readme url. ([@tiemevanveen](https://github.com/tiemevanveen))
* `babel-cli`
  * [#3357](https://github.com/babel/babel/pull/3357) Fix typo: sorucemap -> sourcemap. ([@forivall](https://github.com/forivall))

#### Internal
* [#3378](https://github.com/babel/babel/pull/3378) Remove Flow annotations and pragmas. ([@samwgoldman](https://github.com/samwgoldman))
* [#3361](https://github.com/babel/babel/pull/3361) Switch to kcheck*, fix some lint rules. ([@kittens](https://github.com/kittens))
* `babel-plugin-transform-runtime`, `babel-polyfill`, `babel-register`, `babel-runtime`
  * [#3340](https://github.com/babel/babel/pull/3340) update core-js. ([@zloirock](https://github.com/zloirock))

#### Polish
* `babel-core`, `babel-traverse`
  * [#3365](https://github.com/babel/babel/pull/3365) Replace arrow expression body with block statement. ([@jridgewell](https://github.com/jridgewell))
* `babel-core`
  * [#3362](https://github.com/babel/babel/pull/3362) Show a better error when trying to use a babel 5 plugin. ([@hzoo](https://github.com/hzoo))
* `babel-core`
  * [#3377](https://github.com/babel/babel/pull/3377) Give specific error messages for babel 5 options that were removed in babel 6. ([@hzoo](https://github.com/hzoo))

---

We have 15 committers this release!

Thanks to: AgentME, clayreimann, erikdesjardins, forivall, gzzhanghao, hzoo, jmm, jridgewell, kittens, loganfsmyth, samwgoldman, schmod, siroky, tiemevanveen, zloirock

## 6.5.2 (2016-02-12) "Who needs semicolons anyway” ¯\\_(ツ)_/¯

Changes to note:

- Reverting the class properties semicolon parser error.
- Fix regression with plugin ordering with `babel-register`.

#### Spec Compliancy
* `babel-plugin-transform-class-properties`, `babylon`
  * [#3332](https://github.com/babel/babel/pull/3332) Revert to standard ASI behavior for class properties. ([@loganfsmyth](https://github.com/loganfsmyth))

#### Bug Fix
* `babel-core`, `babel-register`
  * [#3348](https://github.com/babel/babel/pull/3348) Merge config options into list after babelrc options - fixes [T7079](https://phabricator.babeljs.io/T7079). ([@loganfsmyth](https://github.com/loganfsmyth))
  * This fixes a regression from [#3168](https://github.com/babel/babel/pull/3168)
* `babel-plugin-transform-es2015-spread`
  * [#3326](https://github.com/babel/babel/pull/3326) Fix spread to work with `super` method calls. ([@eetulatja](https://github.com/eetulatja))

  ```js
  // input
  super.method(...args);
  // wrong output
  super.method.apply(super, babelHelpers.toConsumableArray(args));
  // new fixed output
  super.method.apply(this, babelHelpers.toConsumableArray(args));
  ```


* `babel-plugin-transform-function-bind`, `babel-types`
  * [#3334](https://github.com/babel/babel/pull/3334) Check `BindExpression` callee for reference - fixes [T6984](https://phabricator.babeljs.io/T6984). ([@loganfsmyth](https://github.com/loganfsmyth))

#### Documentation
* `babel-register`
  * [#3342](https://github.com/babel/babel/pull/3342) babel-register: update README.md. ([@rstacruz](https://github.com/rstacruz))
* `babel-plugin-transform-async-to-module-method`, `babel-plugin-transform-es2015-arrow-functions`, `babel-plugin-transform-es2015-classes`, `babel-plugin-transform-es2015-computed-properties`, `babel-plugin-transform-es2015-for-of`, `babel-plugin-transform-es2015-modules-commonjs`, `babel-plugin-transform-es2015-spread`, `babel-plugin-transform-es2015-template-literals`, `babel-plugin-transform-react-jsx`, `babel-plugin-transform-regenerator`, `babel-plugin-transform-runtime`, `babel-plugin-transform-strict-mode`
  * [#3345](https://github.com/babel/babel/pull/3345) Update all plugin readmes with options. ([@hzoo](https://github.com/hzoo))
* [#3352](https://github.com/babel/babel/pull/3352) Fix a typo. ([@pra85](https://github.com/pra85))

#### Internal
* `babel`
  * [#3337](https://github.com/babel/babel/pull/3337) Don't preferGlobal on the `babel` package.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babylon`
  * [#3351](https://github.com/babel/babel/pull/3351) Add class properties test with a generator method that results in a p…. ([@hzoo](https://github.com/hzoo))
* [#3344](https://github.com/babel/babel/pull/3344) Travis: Remove 0.10, since it's covered by Circle. ([@hzoo](https://github.com/hzoo))
* [#3343](https://github.com/babel/babel/pull/3343) Travis CI: Switch from deprecated `stable` NodeJS to latest 4.x.x & 5.x.x. ([@ntwb](https://github.com/ntwb))
* [#3341](https://github.com/babel/babel/pull/3341) bin-version-check is unnecessary now. ([@chicoxyzzy](https://github.com/chicoxyzzy))
* [#3339](https://github.com/babel/babel/pull/3339) Know how to write good shell scripts. ([@hzoo](https://github.com/hzoo))

## 6.5.1 (2016-02-08) Daddy does a release.

 * **Bug Fix**
   * bc2f84f3712a4bcf5619161955c5597298db5c5b Fix options being ignored in `babel-register`.
   * #3329 Fix `ExportSpecifier` node validator validating `imported` instead of `exported`.
 * **Polish**
   * #3333 Improve the error messaging for using the wrong CLI script.

## 6.5.0 (2016-02-07)

Happy Superbowl Sunday! There's many contributors (17 + core) this release!

### A traversal per preset (Experimental)

> This is an experimental feature that will most likely change.
> Depending on usage/feedback, we will switch the way this is used to instead define a explicit preset-level config flag (rather than the global one below). This will give more control over how you want to use this option.

[@DmitrySoshnikov](https://github.com/DmitrySoshnikov) added a new option you can put in your `.babelrc`!

```js
{
  passPerPreset: true,
  presets: [
    {
      plugins: ['plugin-1']
    },
    'preset-2',
    {
      plugins: ['plugin-2']
    }
  ]
}
// this will create 3 traversals
```

`passPerPreset: true` will modify how babel traverses through plugins. Instead of a single traversal in which all plugins/presets are merged together, each preset will get their own traversal.

This allows users to have a specific order to how presets/plugins are applied and can help avoid potential collisions between plugins (and probably some known issues).

---

### More Speeeeeeed

![](http://comicsalliance.com/files/2012/03/tumblrm0beomkppg1r5ur0ho1500.gif)

[@gzzhanghao](https://github.com/gzzhanghao) made some awesome changes to improve our code generator's performance (`babel-generator`). The original issue is [here](https://phabricator.babeljs.io/T6884).

Based on his test (on parsing `jquery.js`), performance improved ~3x.

```
===== origin/master (ms) =====
babylon 265
babel generator 2238 <-- old
acorn 107
escodegen 355
esprima 95
escodegen 322
===== Optimized (ms) =====
babylon 296
babel generator 662 <-- new
acorn 113
escodegen 355
esprima 106
escodegen 317
```

A big change had to do with keeping `this.last` as an instance variable in the buffer instead of `this.buf[this.buf.length -1]`.

> You can read more about his changes [here](https://github.com/babel/babel/pull/3283#discussion-diff-50198857).  Hoping to see more PR's like this!

We will try to setup some perf tests soon to track these stats for the future (or you can help!).

#### New Feature

+ `babel-core`
  + [#3168](https://github.com/babel/babel/pull/3168) Use the `babelrc` option in `babel-register`. ([@CrocoDillon](https://github.com/CrocoDillon))
+ `babel-core`
  + [#3281](https://github.com/babel/babel/pull/3281) `passPerPreset` option in `.babelrc`: if `true`, babel will create a new traversal for each preset. ([@DmitrySoshnikov](https://github.com/DmitrySoshnikov))
+ `babel-helper-transform-fixture-test-runner`, `babel-plugin-transform-react-jsx-source`
  + [#3285](https://github.com/babel/babel/pull/3285) Hoist the current file name (an absolute path) for `transform-react-jsx-source` . ([@frantic](https://github.com/frantic))

This plugin (useful for tooling) will turn

```js
// this/file.js
<sometag />
```

into

```js
var _jsxFileName = "this/file.js"; // the output will be an absolute path
var x = <sometag __source={{
  fileName: _jsxFileName,
  lineNumber: 1
}} />;
```

+ `babel-template`
  + [#3304](https://github.com/babel/babel/pull/3304) Allow passing in `babylon` options into `babel-template`. (issue [T7046](phabricator.babeljs.io/T7046)) ([@jamestalmage](https://github.com/jamestalmage))
+ `babel-core`
  + [#3313](https://github.com/babel/babel/pull/3313) Add `babel.analyze` - an api sugar for getting back metadata from babel. ([@kittens](https://github.com/kittens))

```js
// analyse not analyze :D
// usage
babel.analyse("foobar;", {}, {
  Program: function (path) {
    path.mark("category", "foobar");
  }
}).marked[0].message // outputs "foobar"
```

+ `babylon`
  + [#3319](https://github.com/babel/babel/pull/3319) Add support for leading pipes in Flow type alias RHS syntax ([@jeffmo](https://github.com/jeffmo))

```js
// allows for either `|` or `&`
type union =
 | {type: "A"}
 | {type: "B"}
;
```

> This was added in [flow](https://github.com/facebook/flow/) in [`7fb56ee9d8`](https://github.com/facebook/flow/commit/7fb56ee9d87517973b4ab32f180ff968c99dded5).

#### Bug Fix

> Code samples below each bullet

+ `babel-helper-define-map`, `babel-helper-function-name`, `babel-plugin-transform-es2015-classes`
  + [#3298](https://github.com/babel/babel/pull/3298) Set `NOT_LOCAL_BINDING` symbol on all inferred function names. (issue [T7010](https://phabricator.babeljs.io/T7010), regression of [#3274](https://github.com/babel/babel/pull/3274)) ([@amasad](https://github.com/amasad))

```js
// When the same name as a method in a class is used

class Foo {
  constructor(val) {
    this._val = val;
  }
  foo2() {
    return foo2(this._val); // was erroring since foo2 is used
  }
}
```

+ `babel-helper-remap-async-to-generator`, `babel-plugin-transform-async-to-generator`
  + [#3297](https://github.com/babel/babel/pull/3297) Fixes the wrong `this` for nested arrow functions. (Issue [T2765#72428](https://phabricator.babeljs.io/T2765#72428)) ([@horpto](https://github.com/horpto))

```js
// nested arrow functions
class A {
  async method() {
    () => {
      () => this; // `this` in nested arrow function was incorrect
    }
  }
}
```

+ `babel-template`
  + [#3314](https://github.com/babel/babel/pull/3314) Only strip node info if no `node.loc`. Fixes an issue with sourcemap generation for SystemJS with `babel-template`. (Issue [T6903](https://phabricator.babeljs.io/T6903)) ([@guybedford](https://github.com/guybedford))

+ `babel-traverse`
  + [#3300](https://github.com/babel/babel/pull/3300) Fix an issue with transpiling generator functions with default arguments. (Issue [T2776](https://phabricator.babeljs.io/T2776)) ([@gzzhanghao](https://github.com/gzzhanghao))

```js
// a generator with a default argument
export class Test {
    *memberGenerator(arg = 0) {
        console.log(arg);
    }
    start() {
        this.memberGenerator(1).next();
    }
}
```

+ `babel-generator`
  + [#3311](https://github.com/babel/babel/pull/3311) Consider arrow functions when parenthesizing object expressions. (Issue [T7047](https://phabricator.babeljs.io/T7047)) ([@amasad](https://github.com/amasad))

```js
var fn = () => ({}).key;
```

+ `babel-helper-remap-async-to-generator`, `babel-plugin-transform-es2015-modules-commonjs`
  + [#3312](https://github.com/babel/babel/pull/3312) Fix async functions not being hoisted. (Issue [T6882](https://phabricator.babeljs.io/T6882)) ([@erikdesjardins](https://github.com/erikdesjardins))

```js
foo();

async function foo() {} // this should be hoisted above foo();
```

+ `babel-generator`
  + [#3324](https://github.com/babel/babel/pull/3324) Parenthesize the `in` in a for-loop init, even in the case when it is nested. ([@zjmiller](https://github.com/zjmiller))

```js
// nested for loop
for (function(){for(;;);} && (a in b);;);
```

+ `babylon`
  + [#3305](https://github.com/babel/babel/pull/3305) Fix: Arrow functions with trailing comma + return type parsing error.  ([Issue T7052](https://phabricator.babeljs.io/T7052)) ([@jviereck](https://github.com/jviereck))

```js
const X = (
  props: SomeType,
): ReturnType => (
  3
);
```

#### Documentation
+ [#3321](https://github.com/babel/babel/pull/3321) Docs: add information on writing tests in babylon. ([@hzoo](https://github.com/hzoo))
+ [#3308](https://github.com/babel/babel/pull/3308) Update compiler-environment-support.md. ([@sappharx](https://github.com/sappharx))
+ [#3293](https://github.com/babel/babel/pull/3293) ast/spec: update `Decorator` property. ([@hzoo](https://github.com/hzoo))
+ [#3295](https://github.com/babel/babel/pull/3295) ast/spec: add `BindExpression`. ([@hzoo](https://github.com/hzoo))
+ [#3287](https://github.com/babel/babel/pull/3287) Correct use of possessive case. ([@nettofarah](https://github.com/nettofarah))
+ [#3301](https://github.com/babel/babel/pull/3301) ast/spec: add `Literal` and `Pattern` interfaces, update `Identifier` interface. ([@jmm](https://github.com/jmm))

#### Internal
+ [#3317](https://github.com/babel/babel/pull/3317) `make
publish`: add `make build` in case it wasn't run. ([@hzoo](https://github.com/hzoo))
+ `babel-generator`
  + [#3316](https://github.com/babel/babel/pull/3316) Simplify `babel-generator/node/index.js`. ([@forivall](https://github.com/forivall))
+ `babel-core`, `babel-generator`, `babel-traverse`, `babel-types`,`babylon`
  + [#3186](https://github.com/babel/babel/pull/3186) Add more flow types, update flow, eslint, babel-eslint, only run flow on node 5. ([@hzoo](https://github.com/hzoo))
+ `babel-core`
  + [#3318](https://github.com/babel/babel/pull/3318) Add a test for #3303. ([@hzoo](https://github.com/hzoo))
+ `babel-plugin-transform-async-to-generator`
  + [#3290](https://github.com/babel/babel/pull/3290) Add a test for [T3026](phabricator.babeljs.io/T3026). ([@AgentME](https://github.com/AgentME))
+ `babel-generator`
  + [#3299](https://github.com/babel/babel/pull/3299) Add a test to ensure that we do not break mutli-byte handling. ([@robcolburn](https://github.com/robcolburn))
+ `babel-cli`
  + [#3307](https://github.com/babel/babel/pull/3307) Make the `chokidar` dependency optional. ([@josh](https://github.com/josh))
+ `babel-types`
  + [#3294](https://github.com/babel/babel/pull/3294) `WithStatements` can have statements as bodies. ([@amasad](https://github.com/amasad))
+ `babel-types`
  + [#3292](https://github.com/babel/babel/pull/3292) `UnaryExpressions` are never not prefix. ([@amasad](https://github.com/amasad))

#### Polish
+ `babel-generator`
  + [#3283](https://github.com/babel/babel/pull/3283) Improve generator performance. (Issue [T6884](phabricator.babeljs.io/T6884)) ([@gzzhanghao](https://github.com/gzzhanghao))

## 6.4.6 (2016-01-20)

* **Bug Fix**
 * `babel-helper-remap-async-to-generator`: [#3288](https://github.com/babel/babel/pull/3288) Async arrow functions should compile to regular functions because they reference `arguments`.

## 6.4.5 (2016-01-19)

* **Bug Fix**
 * `babel-plugin-transform-es2015-modules-commonjs`: [#3118](https://github.com/babel/babel/pull/3118) Fix bad import hoisting interaction (copy `_blockHoist` values) regarding import statements. ([T6738](https://phabricator.babeljs.io/T6738)). Thanks @benjamn for your patience for this one!
   - This fixes:
    ```js
    var _templateObject = (0, _taggedTemplateLiteral3.default)(["foo"], ["foo"]); // this should come after _taggedTemplateLiteral 2 and 3
    var _taggedTemplateLiteral2 = require("babel-runtime/helpers/taggedTemplateLiteral");
    var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

    tag(_templateObject);
    ```
 * `babel-types`, `babel-plugin-transform-es2015-modules-commonjs`, `babel-generator`: [#3183](https://github.com/babel/babel/pull/3183) Fix various source map issues. ([T6851](https://phabricator.babeljs.io/T6851)). Thanks for your work @kpdecker! Committed as [`de51bf5`](https://github.com/babel/babel/commit/de51bf5486bd038455d3d450ff34aa86111c3b91)
 * `babel-helper-remap-async-to-generator`: [#3257](https://github.com/babel/babel/pull/3257) Fix issue with using `this` inside an arrow function ([T2765](https://phabricator.babeljs.io/T2765)). Thanks @horpto!
   - This fixes:
    ```js
    class A {
      async method() {
        () => this; // this `this` wasn't being transpiled correctly
      }
    }
    ```
 * `babylon`: [#3272](https://github.com/babel/babel/pull/3272) Dedupe parser opts from passsed in multiple times. ([T3084](https://phabricator.babeljs.io/T3084)). Thanks @AgentME!
   - This fixes a specific issue with the [react preset](https://babeljs.io/docs/plugins/preset-react/) since it includes `syntax-flow` and `transform-flow-strip-types` which caused an issue with the flow types not to be stripped and the general case of other people are including the flow syntax option in their own plugins.
 * `babel-helper-define-map`, `babel-traverse`, `babel-plugin-transform-es2015-classes`: [#3274](https://github.com/babel/babel/pull/3274) Prevent method names in classes from being locally bound to the transformed function body. ([T6712](https://phabricator.babeljs.io/T6712)). Thanks @willheslam for helping to debug and coming up with alternative solutions for this issue!
   - This fixes:
    ```js
      SyntaxError: index.js: "foo" is read-only (This is an error on an internal node. Probably an internal error. Location has been estimated.)
      1 | class Component {
      2 |   foo() {
      3 |     const foo = obj;
      4 |   }
      5 | }
      6 |
    ```
 * `babel-helpers`: [#3276](https://github.com/babel/babel/pull/3276) Add missing return statements to `asyncToGenerator` helper.
 * `babel-plugin-transform-es2015-modules-commonjs`: [#3282](https://github.com/babel/babel/pull/3282) Fixes an issue with using `default` as a specifier in an export.
   - This fixes an issue with:
    ```js
    export {default as foo} from "foo";
    ```

* **Documentation**
 * `babel-traverse`: [#3269](https://github.com/babel/babel/pull/3269) Document visitors.explode. Thanks @forivall!

* **Internal**
 * `babel-plugin-transform-es2015-parameters`: [#3263](https://github.com/babel/babel/pull/3263) Test coverage.
 * `babel-core`: [#3268](https://github.com/babel/babel/pull/3268) Add a test for ([T2892](https://phabricator.babeljs.io/T2892)).
 * [#3275](https://github.com/babel/babel/pull/3275) Temporarily change flow types to fix lint.
 * [#3277](https://github.com/babel/babel/pull/3277) Fixup Makefile `.bin` references. Thanks @charliesome!
 * [#3278](https://github.com/babel/babel/pull/3278) Use local bin references instead of implied global in Makefile.
 * `babylon`: [#3284](https://github.com/babel/babel/pull/3284) Add some more flow types. Thanks @bmeck!

* **Polish**
 * `babel-plugin-transform-es2015-parameters`: [#3264](https://github.com/babel/babel/pull/3264) Simplify code, add comments.

## 6.4.4 (2016-01-13)

* `babel-plugin-transform-regenerator`: Publishing issue ([T2892](https://phabricator.babeljs.io/T2892)).

## 6.4.3 (2016-01-13)

* **Bug Fix**
 * `babel-plugin-transform-es2015-typeof-symbol`: [#3250](https://github.com/babel/babel/pull/3250) The typeof transform should always use the global `Symbol`.
 * `babel-plugin-transform-es2015-modules-amd`: [#3252](https://github.com/babel/babel/pull/3252) Stop leaking directives
 * `babel-pluginn-transform-es2015-unicode-regex`: [#3259](https://github.com/babel/babel/pull/3259) Use only `regexpu-core` instead of all of `regexpu`
 * `babel-generator`: [Fix minified labeledStatement printing](https://github.com/babel/babel/commit/0d9459dbb65f7a717d97ec8c723935ae9a83bcf1)
 * `babel-plugin-transform-regenerator`: [#3162](https://github.com/babel/babel/pull/3162) Make sure babel helper picks up `regeneratorRuntime`

* **Polish**
 * `babel-types`: [#3261](https://github.com/babel/babel/pull/3261) Add ArrayExpression.elements.default
 * `babel-register`: [#3232](https://github.com/babel/babel/pull/3232) Make sure the cache file's directory exists

* **Documentation**
 * `babel-generator-options`: [#3251](https://github.com/babel/babel/pull/3251) Document babel-generator options

## 6.4.2 (2016-01-06)

* **Bug Fix**
 * `babylon`: [#3244](https://github.com/babel/babel/pull/3244) fix error location for class properties with a missing semicolon (Ref [#3225](https://github.com/babel/babel/pull/3225)).
 * `babel-plugin-transform-es2015-parameters`: [#3246](https://github.com/babel/babel/pull/3246) Support expressions in rest arg access for `arguments.length` optimization.
 * `babel-generator`: [#3247](https://github.com/babel/babel/pull/3247) Parenthesize await/yield expression in `BinaryExpression` (Ref [#3229](https://github.com/babel/babel/pull/3229)).

## 6.4.1 (2016-01-06)

* **Bug Fix**
 * `babel-types`: [#3245](https://github.com/babel/babel/pull/3245) Temporarily revert adding the `Binary` alias [#3217](https://github.com/babel/babel/pull/3217) and tests.

## 6.4.0 (2016-01-06)

Thanks to @samwgoldman for all the new flow support!

* **New Feature**
 * `babylon`, `babel-types`, `babel-generator`: [#3202](https://github.com/babel/babel/pull/3202) Add support for `this` flow type.
 * `babylon`, `babel-types`, `babel-generator`: [#3236](https://github.com/babel/babel/pull/3236) Add support for `export interface` flow syntax.
 * `babylon`, `babel-types`, `babel-generator`, `babel-plugin-transform-flow-strip-types`, `babel-plugin-transform-flow-comments`: [#3230](https://github.com/babel/babel/pull/3230) Add support for `declare type` and `declare interface` flow syntax.
 * `babylon`, `babel-types`, `babel-generator`, `babel-plugin-transform-flow-strip-types`, `babel-plugin-transform-flow-comments`: [#3203](https://github.com/babel/babel/pull/3203) Add support for flow mixins.
 * `babel-cli`: [#3221](https://github.com/babel/babel/pull/3221): Handle `--nolazy` flag.
 * `babel-plugin-transform-es2015-modules-systemjs`: [#3166](https://github.com/babel/babel/pull/3166) Add `__moduleName` support to `System.register`. Thanks @guybedford!

* **Bug Fix**
 * `babel-plugin-transform-es2015-parameters`: [#3214](https://github.com/babel/babel/pull/3214) Bugfix for `arguments.length` optimization having the wrong length. Thanks @fabiomcosta!
 * `babylon`: [#3220](https://github.com/babel/babel/pull/3220) Don't parse parenthesized string as a `Directive`.
 * `babel-helpers`: [#3218](https://github.com/babel/babel/pull/3218) Defer to the built-in `typeof` if support for Symbols exists. Thanks @jdalton!
 * `babel-generator`: [#3213](https://github.com/babel/babel/pull/3213) Fix various parentheses bugs.
 * `babel-plugin-transform-react-display-name`: [#3216](https://github.com/babel/babel/pull/3216) More relaxed `displayName` inference.
 * `babel-helper-function-name`: [#3215](https://github.com/babel/babel/pull/3215) Set function names from `AssignmentExpression`. Thanks @spicyj!
 * `babel-generator`: [#3210](https://github.com/babel/babel/pull/3210) Use a print stack to determine in parenthesis needs to be added.
 * `babel-plugin-transform-runtime`: [#3235](https://github.com/babel/babel/pull/3235) Ensure `opts.polyfill = false` behaves correctly for all visitors. Thanks @guybedford!
 * `babel-plugin-transform-runtime`: Ensure `regenerator` option doesn't cancel out core-js polyfill.
 * `babel-generator`: [#3229](https://github.com/babel/babel/pull/3229) Check for parentheses for `AwaitExpressions` and fix over-parentheses in `YieldExpressions`.

* **Breaking Change** (Accidental)
 * `babylon`: [#3225](https://github.com/babel/babel/pull/3225) throw parse error if class properties do not have a semicolon.
 * `babel-types`: [#3195](https://github.com/babel/babel/pull/3195) Allow `JSXText` node in `JSXElement` children property and remove `StringLiteral`.

* **Documentation**
 * `babel-generator`: [#3240](https://github.com/babel/babel/pull/3240) Fix small in babel-generator README sample code. Thanks @athaeryn!

* **Internal**
 * `babel-plugin-external-helpers`: [#3205](https://github.com/babel/babel/pull/3205) Renamed from `babel-plugin-external-helpers-2` due to someone taking the npm name beforehand.
 * [#3233](https://github.com/babel/babel/pull/3233) Update LICENSE end date to 2016. Thanks @maclover7!
 * `babylon`: [#3204](https://github.com/babel/babel/pull/3204) Prevent users from patching by building it.
 * `babel-types`: [#3217](https://github.com/babel/babel/pull/3217) Add `Binary` alias to `AssignmentExpression`.

## 6.3.26

* **Bug Fix**
 * `babel-plugin-transform-es2015-parameters`: [#3191](https://github.com/babel/babel/pull/3191) Fix the order of arguments initialization (fixes [T6809](http://phabricator.babeljs.io/T6809))
 * `babel-traverse`: [#3198](https://github.com/babel/babel/pull/3198) In `evaluate()`, it should not mistake lack of confidence for falsy

* **Spec Compliancy**
 * `babylon`, `babel-generator`, `babel-plugin-transform-regenerator`: [#3190](https://github.com/babel/babel/pull/3190): Remove `await *` from `babylon` and raise an error for that syntax since it was removed from the proposal and was causing an issue at runtime but not at compile time (fixes [T6688](http://phabricator.babeljs.io/T6688)).

* **Internal**
 * Fix gulp build path to work on windows (fixes [T6855](http://phabricator.babeljs.io/T6855)).
 * `babel`: [#3193](https://github.com/babel/babel/pull/3193) Point users to the cli docs
 * `babel-core`: [#3196](https://github.com/babel/babel/pull/3196) Add a test for checking plugins/presets are resolved relative to `filename`

## 6.3.25

* **Bug Fix**
 * `babylon`: [#3187](https://github.com/babel/babel/pull/3187) Multiple `"use strict"` in function causes outer scope to be parsed as strict
 * `babel-generator`: [#3188](https://github.com/babel/babel/pull/3188) Correctly set `format.quotes` to `opts.quotes`
 * `babel-generator`: [#3189](https://github.com/babel/babel/pull/3189) JSX attributes should use double qoutes
 * `babel-traverse`: [#3192](https://github.com/babel/babel/pull/3192) Fixed static evaluation bug

* **Internal**
 * `babel-plugin-transform-es2015-parameters`: [#3165](https://github.com/babel/babel/pull/3165) Optimize `arguments` access

## 6.3.24

* **Bug Fix**
 * [#3184](https://github.com/babel/babel/pull/3184) Fixed overly permissive type inference.

## 6.3.22-6.3.23

 > Skipped 6.3.22.

* **Internal**
 * Renamed the `Flow Comments` plugin from `babel-plugin-flow-comments` to `babel-plugin-transform-flow-comments` for naming consistency.

## 6.3.21

 * **Bug Fix**
  * `babel-generator`: [#3173](https://github.com/babel/babel/pull/3173) Fix unhandled new-precedence edge cases regarding parentheses (fixes [T6829](https://phabricator.babeljs.io/T6829)).
  * `babel-generator`: [#3180](https://github.com/babel/babel/pull/3180) Handle nested `IfStatement` with an `alternate.
  * `babel-generator`: [#3182](https://github.com/babel/babel/pull/3182) Parenthesize `ArrowFunctionExpression` when part of a `LogicalExpression` or `BinaryExpression` (fixes [T6836](https://phabricator.babeljs.io/T6836)).
  * `babel-traverse`: [#3171](https://github.com/babel/babel/pull/3171) Fix infinite recursion bug with `introspection` method.
  * `transform-es2015-function-name`: [#3176](https://github.com/babel/babel/pull/3176) Stop transforming `ObjectMethod` (`MethodDefinition`) to a `FunctionExpression` since the `transform-es2015-shorthand-properties` plugin already does it.
  * `transform-es2015-parameters`: [#3143](https://github.com/babel/babel/pull/3143) Optimizations for `RestElement` such as using `arguments.length` (fixes [T6774](https://phabricator.babeljs.io/T6774)).

 * **Documentation**
  * `babel-core`: [#3177](https://github.com/babel/babel/pull/3177) Clarify description of `comments` file config.

 * **Internal**
  * `*`: [#3179](https://github.com/babel/babel/pull/3179) Update flow to 0.20.0 and add `@noflow` until types are added in.
  * `babel-generator`: [#3178](https://github.com/babel/babel/pull/3178) Fix type annotation for `shouldPrintComment`.

## 6.3.20

 * **Bug Fix**
  * `babel-generator`: [#3170](https://github.com/babel/babel/pull/3170) Fix invalid code generation for numeric `MemberExpression` (`5.toString()` -> `5..toString()`).
  * `babel-types`: [#3172](https://github.com/babel/babel/pull/3172) Add `Expression` alias to `BindExpression`.

## 6.3.19

 * **New Feature**
  * `babel-plugin-flow-comments`: [#3157](https://github.com/babel/babel/pull/3157) Move `babel-plugin-flow-comments` to the babel repo and update for babel 6.

 * **Bug Fix**
  * `babel-runtime`: [#3142](https://github.com/babel/babel/pull/3142) Add a custom transform for `babel-runtime` builds to avoid circular dependencies (Fixes the `babel-runtime/helpers/typeof` issue).
  * `babel-traverse`: [#3161](https://github.com/babel/babel/pull/3161) Only rename the *outer function bindings on name conflict.
  * `babel-generator`: [#3167](https://github.com/babel/babel/pull/3167) Use the left most node from the right to check if we need spaces in `BinaryExpressions`.

## 6.3.18

 * **Bug Fix**
  * `babylon`: [#3107](https://github.com/babel/babel/pull/3107) Fix incorrect directive parsing
  * `babel-generator`: [#3158](https://github.com/babel/babel/pull/3158) Parenthesize object expression when it may end up at the start of an expression
  * `babel-plugin-transform-regenerator`: [#3160](https://github.com/babel/babel/pull/3160) Fix typo

 * **Polish**
  * `babel-types`: [#2933](https://github.com/babel/babel/pull/2933) Generate documentation for babel-types.
  * `babel-plugin-transform-es2015-parameter`: [#2833](https://github.com/babel/babel/pull/2833) Optimize `arguments` usage.
  * `babel-messages`: [#3123](https://github.com/babel/babel/pull/3123) clarify `traverseNeedsParent` message.

## 6.3.17

 * **Bug Fix**
  * `babel-types`: [#3153](https://github.com/babel/babel/pull/3153) DoWhileStatement should take node type `Statement` as body.

 * **New Feature**
  * `babel-generator`: [#3152](https://github.com/babel/babel/pull/3152) Add a new minified format option to do possibly dangerous byte saving.

 * **Internal**
  * `babel-traverse`: [#3151](https://github.com/babel/babel/pull/3151) Support ObjectProperty in `Scope.isPure`

 * **Polish**
  * `babel-cli`: [#3150](https://github.com/babel/babel/pull/3150) Do not prefer global when installing babel-cli

## 6.3.16

 * **Bug Fix**
  * `babel-traverse`:
    * [#3137](https://github.com/babel/babel/pull/3137) Set the correct `parent` and `parentPath` for new a `NodePath` (fixes an issue with `export * from './a'` and `es2015-modules-commonjs`).
  * `babel-generator`:
    * [#3145](https://github.com/babel/babel/pull/3146) Always print `""` in `compact` mode for consistency (gzip). Will be changed in a new mode (a supserset of `compact`) in a later patch.
    * [#3146](https://github.com/babel/babel/pull/3146) Don't print comments in `compact` mode.
    * [#3147](https://github.com/babel/babel/pull/3147) Don't print parentheses on `throw` statements with `SequenceExpression`.

 * **Internal**
  * `babel-traverse`:
    * [#3138](https://github.com/babel/babel/pull/3138) Support `UnaryExpression` in `isPure` check.

## 6.3.15

 * **Bug Fix**
  * `babel-generator`:
    * [#3111](https://github.com/babel/babel/pull/3111) Compact Mode: remove unnecessary `()` from a `NewExpressions` when possible (`new x()` -> `new x`).
  * `babel-helper-function-name`:
    * [#3138](https://github.com/babel/babel/pull/3138) Skip name inference on certain uses of classes until we can handle them.
  * `babel-traverse`:
    * [#3141](https://github.com/babel/babel/pull/3141) Fix bug with evaluating an expression on its own binding.
  * `babel-plugin-transform-es2015-destructuring`:
    * [#3136](https://github.com/babel/babel/pull/3136) Seperate the destructuring statement from the export statement before converting.
  * `babel-plugin-transform-es2015-classes`:
    * [#3134](https://github.com/babel/babel/pull/3134) Ensure default exports have a name before splitting them.
    * [#3135](https://github.com/babel/babel/pull/3135) Pass `async` and `generator` properties when converting a `ClassMethod`.

## 6.3.14

 * **Bug Fix**
  * `babel-traverse`:
    * [#3133](https://github.com/babel/babel/pull/3133) Fix regression with scope in switch statement (fixes an issue with `transform-es2015-spread`). Related to [#3127](https://github.com/babel/babel/pull/3127).

## 6.3.8-6.3.13

 Testing [lerna](https://github.com/sebmck/lerna) - A tool for managing JavaScript projects with multiple packages.

 * **Bug Fix**
  * `babylon`, `babel-types`, `babel-generator`:
    * [#3130](https://github.com/babel/babel/pull/3130) Add support for `NullLiteralTypeAnnotation` (`null` literal type) in flow.

## 6.3.2

 * **Bug Fix**
  * `babel-core`:
    * [#3108](https://github.com/babel/babel/pull/3108) Omit sourcemaps that cannot be used and fix source path.
  * `babel-register`:
    * [#3116](https://github.com/babel/babel/pull/3116) Disable processing `.babelrc` a second time.
  * `babel-traverse`:
    * [#3127](https://github.com/babel/babel/pull/3127) Ensure we always push into a `BlockStatement` (fixes a `babel-plugin-transform-class-properties` issue).
  * `babel-plugin-transform-class-properties`:
    * [#3113](https://github.com/babel/babel/pull/3113) Fix issue with using static class properties.
  * `babel-plugin-transform-es2015-classes`:
    * [#3112](https://github.com/babel/babel/pull/3112) Fix issue with `return super()` in class constructor causing a `super() hasn't been called` error.
  * `babel-plugin-transform-inline-environment-variables`:
    * Fix typo with `replaceWith`.
  * `babel-plugin-transform-regenerator`:
    * [#3119](https://github.com/babel/babel/pull/3119) Ensure that generator functions always have an `Identifier` (fixes an issue with exporting a generator as a default).

## 6.3.1

 * **Bug Fix**
  * `babel-generator`:
    * [#3121](https://github.com/babel/babel/pull/3121) Fix spacing in binary expression when right is a binary expression and has a unary on the left in compact mode. Ex: `(a+(+b*2))` should be -> `a+ +b*2`

## 6.3.0

 * **Bug Fix**
  * Fix use of old `literal` to use `stringLiteral` in babel-types.
  * Fix issue with `babel-template` crashing in IE due to unpopulated error stack.
  * Check for empty decorators list in `transform-class-properties`
  * Fix babylon parser not allowing multiple parameters in arrow functions with flow types
  * Fix exported async functions being hoisted and as a result being undefined.

 * **Polish**
  * Add validation to more JSX node types.
  * Add validation for CallExpression, NewExpression, SequenceExpression, ArrayExpression, and TemplateLiteral.
  * Add `ObjectMember` abstract type to AST for `ObjectProperty` and `ObjectMethod`.
  * Optimize `asyncToGenerator` helper template.
  * Respect spacing for assignment, binary expressions, and while loop in compact mode.
  * Fix up semicolon omission in compact mode.

## 6.2.2

 * **Bug Fix**
  * Fix ES2015 classes being revisited twice causing state issues when inside.

## 6.2.1

 * **Polish**
  * Add `dirname` to unknown plugin resolution error.

## 6.2.0

 * **New Feature**
  * Add support for `function.sent`.
 * **Internal**
  * Bump `invariant` depenency version.
 * **Polish**
  * Infer filename from the base directory when resolving plugins and presets.
  * Allow JSX pragma to be specified in line comments.
 * **Bug Fix**
  * Print a block when encountering consequents that are if statements.
  * Fix some issues related to printing of auxiliary comments.

## 6.1.21

 * **Bug Fix**
  * Add check to avoid revisiting classes.
 * **Internal**
  * Add internal aliases for plugins for debugging.
 * **Bug Fix**
  * Avoid duplicate auxiliary starts if inside an aux section.

## 6.1.20

 * **Polish**
  * Only infer whitespace when we've been passed tokens in the code generator.
  * Refactor JSX inlining to reduce parsing cost.
 * **Bug Fix**
  * Fix queueing of nested paths being pushed onto the priority queue.

## 6.1.19

 * **Bug Fix**
  * Add config check to `package.json` `babel` reading.
  * Fix source maps merging.
  * Ignore callee supers when doing spread compilation
* **Polish**
  * Add hard error when we see decorators.

## 6.1.4

 * **Bug Fix**
  * Fix class transformation bug for export declarations with no `id`.
  * Fix regenerator plugin being passed an invalid function `id`.
  * Add support for async to generator helper on object and class methods.
  * Fix looking up undefined nodes when walking back up the tree in typeof symbol plugin.
  * Fix accidental serialisation of template literals in the code generator when the object of a member expression.
  * Add missing `Expression` alias to `TypeCastExpression`.
  * Move `children` prop pushing to after props to ensure correct order in the react inline elements plugin.
  * Fix `buildExternalHelpers` script ignoring non-underscored helpers.
  * Fix exported classes with static class properties.
 * **Spec Compliancy**
  * Add support for computed mutators in `babel-plugin-transform-es2015-computed-properties`.
 * **Polish**
  * Make interop for plugins with the `__esModule` work for all plugins no matter how they're imported/specified.
  * Make it illegal for plugins to specify a catch-all `enter`/`exit` visitor method.
  * Ignore `babel-runtime` version mismatch in `babel-doctor`.
  * Omit `defaultProps` helper when there are no props in the react inline elements plugin.
  * Add validators for ES2015 export nodes.
  * Add missing core node validators.
  * Update `runtime` plugin `core-js` definitions.
 * **Internal**
  * Add `babel-plugin-transform-react-display-name` to the `react` preset.
  * Clean up scope cache.
  * Move `babel/register` into a separate `babel-register` package.
  * Add `react-jsx-source` plugin and add it to the `react` preset.

## 6.1.3

 * **Internal**
  * Add `allowTopLevelThis` option to `babel-plugin-transform-es2015-modules-commonjs`.

## 6.1.2

 * **Bug Fix**
  * Fix bug where the parser wouldn't allow typed annotated default parametesr in arrow functions.
  * Add existence check to `NodePath#has` to ensure safeness when making comparisons.
  * Protect against replacing a class expression with a name inferred version that would
    result in it never being transformed.
  * When transforming JSX to an inline object, make sure invalid identifier keys are quoted.
  * Fix recursion in async to generator transforms due to referring to the inner generator function.
  * Convert arrow functions to normal functions when remapping to a generator.
  * Fix source map merging.
  * Add line break test to the `updateContext` of `name` tokens in the parser to fix parsing of JSX and regexs with ASI.
  * Fix object rest/spread in arrow function parameters not being allowed in the parser.
  * Ensure that unaries are parenthesised the same as function expressions.
 * **Internal**
  * Move `Symbol.hasInstance` transform out of `babel-plugin-es2015-symbols` to `babel-plugin-es2015-instanceof` as it has nothing to do with symbols.
  * Add `babel-browser` package with the browser build.
 * **Polish**
  * Add npm 3 check to `babel-doctor`.
  * Autoclear the `babel/register` cache when it gets too big to be serialised.
 * **Spec Compliancy**
  * Add support for flow existential type parameters.

## 6.1.1

 * **Bug Fix**
  * Stop looking for configs in `babel-doctor` when we get to the root.

## 6.1.0

 * **New Feature**
  * Add `babel-doctor` CLI.

## 6.0.20

 * **Bug Fix**
  * In the callable class constructor plugin, don't transform derived classes as the constructor call cannot be inherited.
  * Fix JSX inline elements plugin from attempting to create properties out of JSX containers.
  * Fix infinite recursion error when attempting to resolve the execution status of functions that contain references to themselves.

## 6.0.19

 * **Bug Fix**
  * Fix function paths not being accurate.
 * **Polish**
  * Change `t.getOuterBindingIdentifiers` to completely ignore function expressions as they cause no outer bindings to be set.
  * Clean up `auxiliaryComment` option.

## 6.0.18

 * **Polish**
  * Add error when calling builder methods with too many arguments than it can take.
  * Rename `RegexLiteral` node to `RegExpLiteral`.
  * Rename `NumberLiteral` node to `NumericLiteral`.
 * **Bug Fix**
  * Make all fields of a `ForStatement` optional.

## 6.0.17

 * **Polish**
  * Add `Symbol` existence check to `typeof` helper.
 * **Bug Fix**
  * When merging options, take precedence over the current array.
  * Fix export of parameters when renaming the binding of exported functions.
  * Fix minify booleans plugin.
  * Fix simplify comparison operator plugin.
  * Don't include children if it's empty in react inline elements plugin.

## 6.0.16

 * **Internal**
  * Instead of throwing on a foreign node path. Ignore it and create a new one.
 * **Bug Fix**
  * Ensure there's a newline after prepended original shebang.
  * Ignore non-origin template nodes when replacing placeholders in `babel-template`.
  * Fix `runtime` plugin helper generation.
  * Fix bug where async class methods weren't having their `await`s converted to `yield`s in the async to generator helper.

## 6.0.15

 * **Bug Fix**
  * Fix async function remap helper from outputing incorrect calls causing wrong scoping.

## 6.0.14

 * **Spec Compliancy**
  * Update exponentiation operator precedence.
  * Fix parser bug where arrow functions have a higher precedence than they should.
 * **Bug Fix**
  * Fix SystemJS module formatter exporting function parameters.
  * Ensure that invalid identifier JSX attribute keys are quoted when transforming to calls.
  * Fix ES3 property literal plugin.
  * Fix parameters after defaults in arrow functions refering to the wrong `arguments`.

## 6.0.13

 * **Bug Fix**
  * Don't consider uncomputed object method property identifier to be a reference.

## 6.0.12

 * **Bug Fix**
  * Rename misspelt `babel-plugin-transform-class-constructor-call` package.
  * Add strict mode plugin to module transforms.
  * Only ignore cloning of plugin instances when cloning babelrc configs.
  * Add shebang to bin file in `babel` complain package.
  * Remove asserts from `babel-transform-regenerator` as we may have multiple packages interacting.
  * Add `babel-plugin-transform-es2015-modules-commonjs` to `babel-preset-es2015`.

## 6.0.0

 * **Internal**
  * Split up internals into packages.
 * **Breaking Change**
  * Remove `loose` option in favor of plugin options.
  * Remove `optional`, `whitelist` and `blacklist` options since plugins are now explicitly defined.
  * Plugins now just return a plain object rather than construct a `Plugin` instance.
  * Change the signature of visitor methods to `.call(state, path, state)` rather than `.call(path, node, parent, scope, state)`.
  * All plugin traversals are now merged for performance.
  * The `MethodDefinition` node type has been renamed to `ClassMethod` and it's `FunctionExpression` `value` property has been coerced into the main method node.
  * The `Property` node type has been renamed to `ObjectProperty`.
  * The `Property` node type with the boolean flag `method` has been renamed to `ObjectMethod` and it's `FunctionExpression` `value` property has been coerced into the main method node.
  * The `Literal` node type has been unoverloaded and split into `BooleanLiteral`, `RegExpLiteral`, `NumericLiteral`, `StringLiteral` and `NullLiteral`.
  * The `SpreadProperty` (from `object-rest-spread`) node type has been split into `RestProperty` (for `ObjectPattern`) and `SpreadProperty` (for `ObjectExpression`)
  * Remove `module.exports` export interop for CommonJS module formatter.
  * `externalHelpers` option has been moved into the plugin `babel-plugin-external-helpers-2`.
  * Remove ability to use `enter`/`exit` catch-all handlers in plugins.
 * **New Feature**
  * Add plugin options.
  * Add callable class constructor.

## 5.8.26

 * **Internal**
  * Republish to get fix for runtime `typeof-react-element` helper.

## 5.8.25

 * **Internal**
  * Rename `define` method to avoid webpack assuming those files are AMD.

## 5.8.24

 * **Spec Compliancy**
  * Updated `optimisation.react.inlineElements` transformer to React 0.14 output. Thanks [@spicyj](https://github.com/spicyj)!
 * **Polish**
  * Add support for evaluating more static nodes. Thanks [@hzoo](https://github.com/hzoo)!

## 5.8.23

 * **Bug Fix**
  * Fix a bug where pushed scope bindings weren't properly being registered.

## 5.8.22

 * **Bug Fix**
  * Fix bug causing regexes to cause a syntax error after a block.
 * **Internal**
  * Expose `File`.

## 5.8.21

 * **New Feature**
  * Add support for Flow export types.
 * **Bug Fix**
  * Fix flow type annotations on object properties being lost.
  * Fix bug effecting nested arrow functions.
  * Check valid `export default` `function`/`class` token when parsing export default before converting to a declaration to avoid turning expressions into declarations.
 * **Polish**
  * Add an exception to non-existent bindings when checking if we need to wrap block scoping blocks in a closure.
  * Make comment retainment for multiple replacement nodes more predictable.
 * **Internal**
  * Remove `operator` property from `AssignmentPattern` nodes.
  * Update `es7.asyncFunctions` and `es7.objectRestSpread` to stage 2.

## 5.8.13-5.8.20

**The CHANGELOG was broken for these releases. Git tags were not pushed in the correct order and are therefore incorrect. It's recommended you NOT use any versions within this range.**

 * **New Feature**
  * Add `es6.spec.modules` transformer.
 * **Bug Fix**
  * Don't register export declarations as a module binding.
  * Register import bindings to the specifier instead of the declaration.
  * `export *` should not export `default`.
  * Clear `rawValue from JSX attribute values to avoid outputting the raw source verbatim.
  * Add support for boolean flow literals.
  * Fix bug where files that babel can compile weren't being written when ignored with the `--copy-files` flag.
  * Create new raw identifiers instead of cloning the original user one when exploding export specifiers to fix source map issues resulting in incorrect locations.
  * Break on hitting a terminator paren triggering character to avoid pushing multiple starting parens.
  * Consider comment starting character to be a terminatorless separator to avoid starting comments breaking terminatorless nodes.
 * **Internal**
  * Use `json5` for parsing `.babelrc` files and `JSON` for `package.json`.
  * Update Regenerator dependency to `0.8.35`.
  * Remove flow types from being scope tracked.
 * **Polish**
  * Only register export declarations in scope tracking if they're of a valid type.
  * Only output code frame and message on syntax errors in CLI.
  * Set decorated initialisers that have no `initialiser` to `undefined`.
  * Optimise common `typeof` cases in `es6.spec.symbols` transformer.

## 5.8.12

 * **Bug Fix**
  * Fix bug in lookahead causing decorators to be cleared.

## 5.8.11

 * **Bug Fix**
  * Check if module options are nully instead of falsy to allow empty strings as `moduleRoot` etc.
  * Fix bug where reassigning the rest parameter wouldn't result in a deoptimisation.

## 5.8.9

 * **Bug Fix**
  * Fix issue in parser where the flow plugin wasn't using state to refer to whether it as in a type or not causing lookaheads to cause breakages.

## 5.8.8

 * **Bug Fix**
  * Fix comments not being attached if they're touching the start of their node.

## 5.8.7

 * Never published, environment issues, again.

## 5.8.6

 * **Bug Fix**
  * Remove `rawValue` for JSX inner text.

## 5.8.5

 * **Polish**
  * Rewrite parentheses insertion for terminatorless nodes such as `BreakStatement` to be much more stable and cleaner.
  * Use `Object.setPrototypeOf` and fallback to `__proto__` in `inherits` helper.

## 5.8.2-5.8.4

Issues with publish process.

## 5.8.1

 * **Bug Fix**
  * Fix regression where async arrow functions couldn't have type annotation parameters.
  * Output type annotations of type instantiation parameters.
 * **Polish**
  * Prepend to highest loop when performing rest parameter allocation optimisation.
  * Add comment attachment to parser.
  * Add support for retaining inner comments of empty blocks.

## 5.8.0

 * Never released due to publish environment issues.

## 5.7.4

 * **Bug Fix**
  * Fix comments containg `@flow` being completely removed from output rather than just the specific directive.

## 5.7.3

 * **Bug Fix**
  * Add shim file for broken file path that old versions of the CLI would attempt to use.

## 5.7.2

 * **Bug Fix**
  * Fix performance issue in code generator when comment columns would attempt to match up in `compact` mode causing large amounts of whitespace.
  * Fix single line comments not outputting a newline in `compact` mode.
 * **Polish**
  * Add support for flow return types for arrow functions.

## 5.7.1

 * **Bug Fix**
  * Add back mistakenly removed `replaceWithSourceString` method.

## 5.7.0

 * **Bug Fix**
  * Deopt on spread elements when performing array destructuring unpack optimisation.
 * **New Feature**
  * Add `shouldPrintComment` option to control comment output.
  * Add `.babelignore` file to be consistent with other tools.
  * Allow `.babelrc` configs to be specified via `package.json`.
 * **Polish**
  * Don't ignore comments when using `compact: true` option.
  * Add support for Flow `import typeof`.
  * Fix incorrect inheritance method position when using loose mode classes and constructor isn't the first item.
 * **Internal**
  * Completely fork Acorn with `babylon`.
  * Rewrite build system to accommodate for multiple packages.

## 5.6.17

 * **Bug Fix**
  * Fix `CodeGenerator.findCommonStringDelimiter` causing a stack overflow.

## 5.6.16

 * **Internal**
  * Fix `recast` version to avoid pulling in a newer version.
 * **New Feature**
  * Add support for functions in `util.shouldIgnore`.
 * **Polish**
  * Strip flow directives in flow transformer.
  * Add a check for out of bounds default parameters, drastically improving performance and removes engine deoptimisations.
  * Various performance optimisations by [@samccone](https://github.com/samccone) 💅✨
  * Delay `this` assignment when referencing this inside an arrow function pre-bare super in derived class constructors.
  * Split up class body pushing if the constructor is in the wrong order.
 * **Bug Fix**
  * Fix hoisting of `ForInStatement` `init` variables in `system` module formatter.
  * `PathHoister`: Don't hoist to the same function as their original paths function parent.
  * `PathHoister`: Push each violation paths ancestry to the breakOnScopePaths collection to avoid constant hoisting to nested paths.fix tail call recursion on functions with less arguments than parameters.
  * Disallow `super.*` before `super()` in derived class constructors.
  * Properly regenerate scope for replaced nodes. Thanks [@loganfsmyth](https://github.com/loganfsmyth)!
  * Move up template literal simplification logic to avoid breaking on single elements.

## 5.6.13-5.6.15

 * Setting up automatic Travis releases.

## 5.6.12

 * **Bug Fix**
  * Fix finding parent for top-level shadowed functions.

## 5.6.11

 ** **Internal**
  * Merge `es6.parameters.rest` and `es6.parameters.default` transformers. See commit [c0fd4c1f9e0b18231f585c4fa793e4cb0e01aed1](https://github.com/babel/babel/commit/c0fd4c1f9e0b18231f585c4fa793e4cb0e01aed1) for more info.

## 5.6.10

 * **Bug Fix**
  * Fix faulty internal require check.
 * **Polish**
  * Add support for trailing commas in arrow function parameter lists.

## 5.6.8

 * **Bug Fix**
  * Fix binary expressions colliding with unary expression operators in compact mode.
  * Fix node properties being set to `null` when using computed properties.

## 5.6.7

 * **Bug Fix**
  * Fix hoisting of `ForXStatement` `left` `var`s when inserting a block scoping IIFE.
 * **Polish**
  * Combine all leading computed property initialisers into the root object in loose mode.
 * **Internal**
  * Deprecate returning of replacement strings from visitor methods.

## 5.6.6

 * **Bug Fix**
  * Fix weird parser bug where `void` type annotations were being parsed as keywords causing the tokeniser to lose track of context.

## 5.6.5

 * **Bug Fix**
  * Fix nested functions causing rest parameter optimisation to not properly detect when it should deopt on a reference.
 * **Internal**
  * Update Regenerator `0.8.31`.

## 5.6.4

 * **Internal**
  * Add `ParenthesizedExpression` node type.

## 5.6.3

 * **Bug Fix**
  * Fix rest parameter array allocation loop being incorrectly aliased.

## 5.6.2

 * **Bug Fix**
  * Fix method key literals not turning into computed member expression in loose mode.
  * Elect rest parameters in spread element position as candidates instead of replacing them in place.

## 5.6.0

 * **Bug Fix**
  * Fix istanbul interop for register hook when registering for non-existence extension.
  * Fix super class constructor call differing for no constructor in derived classes.
  * Disable module import receiver when in loose mode.
  * Fix duplicate filenames when using `babel` CLI when passing multiple matching patterns.
  * Register labels as bindings to fix undeclared variable checks.
 * **Polish**
  * Remove unnecessary string binary expressions when transforming template literals.
  * Support module live bindings in arbitary positions not in Program statement position.
  * Throw error when attemping to replace a `Program` root node with another node not of type `Program`.
  * Optimise rest parameters in spread element position and allocate rest array at the earliest common ancestor of all references.
  * Generate original number representation when value was not changed.
  * Check for invalid binding identifiers when generating inferred method names.
  * Don't terminate CLI when watching files fail compilation on init.
 * **New Feature**
  * Add new plugin API.
 * **Internal**
  * Split react displayName addition into a plugin.
  * Add check for `JSXMemberExpression` to `t.isReferenced`.
  * Move `validation.undeclaredVariableCheck` transformer up.
  * Start great core-to-plugin exodus.
  * Add `BindingIdentifier` virtual type.
  * Hidden class optimisations.
  * Array allocation optimisations.
  * Update `regenerator`.
  * Update `js-tokens`.
  * Sync with upstream Acorn.

## 5.5.8

 * **Internal**
  * Remove extremely unprofessional and harsh error message for those hotlinking to `resolve-rc`.

## 5.5.7

 * **Bug Fix**
  * Push newline after decorators when doing code gen.
  * Rewriting error handling to normalise options before merging them.
  * Remove duplicate keys in `alias-keys.json` causing errors in strict mode.
  * Fix `$ babel --help` not showing optional transformers as such.
 * **New Feature**
  * Add `auxiliaryCommentBefore` and `auxiliaryCommentAfter` options.

## 5.5.6

 * **Bug Fix**
  * Fix `let` binding collision in loop head not properly replacing `AssignmentExpression`s.

## 5.5.5

 * **Bug Fix**
  * Fix `file.opts` not being set before `file.log.deprecate` was called causing a `ReferenceError` as it was checking for a property on it.

## 5.5.4

 * **Bug Fix**
  * Add back missing `shouldIgnore` check.
  * Log message on deprecated options rather than throw an error.
  * Fix name of `auxiliaryComment` option when attempting Istanbul interop in `babel/register`.

## 5.5.3

 * **Bug Fix**
  * Fix weird state bug when traversing overa  `node` `ClassProperty` instead of `path` in the `es6.classes` transformer.

## 5.5.2

 * **Bug Fix**
  * Fix `NodePath#isPure` on `Property` nodes.
  * Use cwd instead of entry file directory when working out relative directory for `babel/register`.
 * **Internal**
  * Add scary warning for those few who choose to use the WIP experimental transformers.

## 5.5.1

 * **Bug Fix**
  * Remove `ClassProperty` nodes always in the `Flow` transformer. This is fine now since class properties aren't supported in any engine that supports classes but the `es7.classProperties` transformer will need to be updated in the future to desugar to ES6 classes instead of relying on the `es6.classes` transformer from being ran.

## 5.5.0

 * **Bug Fix**
  * Allow pushing declarations to `SwitchStatement`s.
  * Fix `minification.removeDebugger` to remove `DebuggerStatement`s rather than `ExpressionStatement`s with an identifier of `debugger`.
  * Check LHS in `ForInStatement` and `ForOfStatement` for constant violations.
  * Register function `id` as a reference when naming methods to avoid collisions.
  * Support key literals when checking for the existence of `displayName` property when attempting to add it for `React.createClass`.
  * Remove `ExportDefaultSpecifier` check from `t.isDefaultSpecifier`.
  * Don't consider `JSXIdentifier` HTML tag identifiers to be references.
 * **Polish**
  * Update `minification.deadCodeElimination` transformer to remove all statements after completion statements.
  * Update `minification.deadCodeElimination` transformer to not inline single used bindings that exist in different scopes.
  * When performing Istanbul interop in `babel/register`, add the auxiliary comment `"istanbul ignore text"` to get more accurate coverage.
  * Add `--nolazy` argument to `babel-node`.
  * Add support for `cluster` forking.
  * Perform scope tracking in a single pass instead of multiple.
  * Smarten up type inferrence and resolution to support the whole array of language constructs.
  * Optimise module metadata retrieval into a single pass.
  * Ignore trailing commas when inferring newlines.
  * Rename `minification.inlineExpressions` transformer to `minification.constantFolding`.
  * Check path relative to entry file when checking to see if we're inside `node_modules` when using `babel/register`.
  * Upgrade `regenerator`.

## 5.4.7

 * **Bug Fix**
  * Don't consider `JSXAttribute` `names` to be valid `ReferencedIdentifier`s.

## 5.4.6

 * **Bug Fix**
  * Fix `spec.functionName` transformer incorrectly attempting to rename a binding that doesn't exist as it's a global.
 * **Internal**
  * Deprecate custom module formatters.

## 5.4.5

 * **Bug Fix**
  * Add `JSXIdentifier` as a valid `ReferencedIdentifier` visitor virtual type.
  * Ignore `CallExpression` `_prettyCall` when the `retainLines` option is enabled.
  * Inherit comments to new declaration node when exploding module declarations.
  * Fix `es6.tailCall` transformer failing on calls that exceed the max parameters of the function.

## 5.4.4

 * **Bug Fix**
  * Fix bug where replacing variable declarations in the head of a `for` loop would turn them into `ExpressionStatement`s.
  * Fix renaming of assignment expressions that were non-identifiers ie. patterns.
  * Force space before `class` `id` to avoid breaking named classes when using `compact` mode.
  * Add assignment pattern explosion to avoid initial duplicate nodes.
  * Ignore this and arguments when performing TCO on shadowed functions.
 * **Polish**
  * Rename `sourceMapName` option to `sourceMapTarget`. Thanks [@getify](https://github.com/getify)!
  * Better detection of completion records, ignore those in `Function`s.
  * Clarified descriptions of the options that are enabled by default.
  * Resolve `\`babel-plugin-${name}\`` plugin names **before** just checking the `name`. Thanks [@jquense](https://github.com/jquense)!
  * Update AMD module formatter to add import default remapping.

## 5.4.3

 * **Bug Fix**
  * Fix `module` being incorrectly rewritten when used as in an export declaration.
  * When performing single-reference inlining, ensure that the single reference isn't a child of the binding itself.
  * Fix a bug in `minification.deadCodeElimination` where a new binding instance was being created for local class bindings instead of just inheriting the parent one.
  * Fix bug with paren printing in `compact` and `retainLines` mode where a left paren was already printed before catching up.
 * **Internal**
  * Handle contexts for paths much better. This will ensure that the path node location info is in sync.

## 5.4.2

 * **Polish**
  * `ignore` and `only` patterns are now **very** liberal. The pattern can now exist anywhere in the path.

## 5.4.1

 * **Bug Fix**
  * Add missing `slash` dependency. Thanks [@browncolyn](https://github.com/browncolyn)!
 * **Polish**
  * Clean up `shouldIgnore` algorithm to work how you'd expect rather than being a hacky piece of shit. It now crawls the entire path, checking each section of it against the input ignore/only patterns. This means that the pattern `foo` will ignore the paths `foo/bar.js`, `bar/foo` etc.

## 5.4.0

 * **New Feature**
  * Added [function bind syntax](https://github.com/zenparsing/es-function-bind) behind stage 0. Thanks [@RReverser](https://github.com/rreverser)!
  * Added `env` option. Especially handy when using the `.babelrc`.
 * **Bug Fix**
  * Fix files not properly being ignored when `babel.transform` ignores them when using `$ babel`.
  * Fix scope tracking registering loop head bindings to their `VariableDeclaration` instead of `VariableDeclarator`.
 * **Polish**
  * Normalise path separators for souce map paths when using `$ babel`.
  * Rework `PathHoister` to ignore global references and to not deopt on reassignments to referenced bindings, instead it tries to hoist to the highest scope.
  * Added missing exponential operator inlining. Thanks [@nkt](https://github.com/nkt)!
  * Optimise `regenerator` transformer. Thanks [@benjamn](https://github.com/benjamn)!

## 5.3.3

 * **Bug Fix**
  * Fix `minification.deadCodeElimination` transformer incorrectly trying to inline import declarations.
  * Fix `minification.inlineExpression` transformer getting into an infinite loop.

## 5.3.2

 * **Bug Fix**
  * Fix patterns not being considered when hoisting variables in the `es6.blockScoping` transformer.

## 5.3.1

 * **Bug Fix**
  * Fix unique export specifiers not being cloned when exploding class and function exports,
 * **Polish**
  * Turn import remaps to sequence expressions to remove their context and improve performance.

## 5.3.0

**Speeeeeeed**

![gifs lol](https://31.media.tumblr.com/568205a0e37ae15eca510fa639589a59/tumblr_n8kw8kpcSb1sg6cg8o1_500.gif)

 * **Spec Compliancy**
  * Allow trailing param commas for methods when using the `es7.trailingCommas` transformer.
 * **Bug Fix**
  * Fix `es6.blockScoping` transformer not properly ignoring `break` in `SwitchCase`.
  * Fix lookahead context saving to avoid weird tokenizer state.
  * Explode duplicate identifiers in export/import specifiers and property shorthand to create unique objects.
  * Skip loose mode for class methods when they have decorators.
  * When removing nodes, share their comments with their siblings.
  * Properly hoist temp param declarations when doing TCO.
 * **Internal**
  * Add `--harmony_generators` flag to `$ babel-node`.
  * Internal AST traversals have been minimised **drastically**. Transformers have been grouped together which means entire tree traversals are much fewer. Visiting nodes is now also skipped if the traversal context can detect that the handler is a noop. This sames precious cycles as it avoids constructing traversal paths and creating a new traversal context. See issues [#1472](https://github.com/babel/babel/issues/1472) and [#1486](https://github.com/babel/babel/issues/1486) for related discussion.
 * **Polish**
  * Move many `utility` transformers to `minification`.

## 5.2.17

 * **Bug Fix**
  * Fix auxiliary comments not properly being attached to function declaration helpers.
  * Add `Super` node type to `ast-types` patch.
  * Ignore parameter bindings when attempting to inline them in the `minification.deadCodeElimination` transformer.
  * Correct `extensions` arguments when using the Babel CLI.

## 5.2.16

 * **Bug Fix**
  * Fix plugins being disabled when using the whitelist.
  * Fix correct function scope being passed to `nameMethod.property` when inferring the function name for class methods.
  * Fix incorrect extensions reference causing weird issues when using the Babel CLI.
  * Fix destructuring param reference replacements not inheriting from their original param.
 * **Spec Compliancy**
  * Fix order that method decorators are ran in.

## 5.2.15

 * **Bug Fix**
  * Fix initializer descriptor add attempt if it doesn't exist.

## 5.2.14

 * **Bug Fix**
  * Fix bug with initializer decorators where the descriptors weren't being defined if there was no `initializer` property.
 * **Internal**
  * Expose `retainLines` option to CLI.
  * Fix `retainLines` option not being taken into consideration when doing multiple variable declaration declarators generation.
  * Expose minified and unminified copies of dist scripts.

## 5.2.13

 * **Bug Fix**
  * Fix `ExportDeclaration`s being incorrectly removed when using the `utility.deadCodeElimination` transformer.
  * Fix position of `utility` transformers.
 * **New Feature**
  * Add built-in `esquery` support.
 * **Internal**
  * Consolidate notion of "virtual types".

## 5.2.12

 * **Polish**
  * Make UID generation based on module declarations **much** nicer.
 * **Internal**
  * Remove internal check for traversal path replacement of self. This is a pattern that **could** come up in the wild and it could lead to pretty nasty code and may lead to internal regressions as the test coverage isn't 100% :( Instead, just put it in the fast path.

## 5.2.11

 * **Internal**
  * Rename `getModuleName` option to `getModuleId`, doh.

## 5.2.10

 * **Bug Fix**
  * Fix numerous issues in `replaceWithSourceString`. Thanks [@pangratz](https://github.com/pangratz)!
 * **New Feature**
  * Add `getModuleName` option. Thanks [@jayphelps](https://github.com/jayphelps)!

## 5.2.9

 * **Bug Fix**
  * Fix `_blockHoist` transformer incorrectly sorting nodes on shitty environments that aren't spec compliant in their key order.
  * Fix broken `parse` API method reference to an undeclared import.

## 5.2.7

 * **Bug Fix**
  * Move `utility.deadCodeElimination` transformer up to avoid race conditions.
  * Fix shorthand property scope binding renaming.
 * **Polish**
  * Turn helper variable declarations into function declarations if possible.
 * **Internal**
  * Removed native inheritance support from classes.
  * Added `replaceWithSourceString` path API.
  * Split up `es3.propertyLiterals` and `es3.memberExpressionLiterals` transformers to `minfication.propertyLiterals` and `es3.memberExpressionLiterals`.

## 5.2.6

 * **Internal**
  * Fix transformer aliases being accidently set as deprecated ones.
  * Expose `Pipeline` as `TransformerPipeline` instead.

## 5.2.5

 * **Bug Fix**
  * Fix `parse` API not adding all the correct pipeline transformers.

## 5.2.4

 * **Bug Fix**
  * Fix race condition with the Node API being loaded awkwardly and not being able to initialise itself when used in the browser.
 * **Internal**
  * Expose `transform.pipeline`.

## 5.2.3

 * **Bug Fix**
  * Fix plugin containers being called with an undefined import. Thanks [@timbur](https://github.com/timbur)!
  * Allow Flow object separators to be commas. Thanks [@monsanto](https://github.com/monsanto)!
  * Add missing `Statement` and `Declaration` node aliases to flow types.

## 5.2.2

 * **Internal**
  * Allow `util.arrayify` to take arbitrary types and coerce it into an array.

## 5.2.1

 * **Bug Fix**
  * Fix regression in `node/register` that caused `node_modules` to not be ignored.

## 5.2.0

 * **Bug Fix**
  * Fix plugin strings splitting arbitrarily on `:` which caused full paths on Windows to fail as they include `:` after the drive letter.
  * Call class property `initializer`s with their target instead of their descriptor.
  * Fix `ignore` and `only` not properly working on Windows path separators. Thanks [@stagas](https://github.com/stagas)!
  * Fix `resolveRc` running on files twice causing issues. Thanks [@lukescott](https://github.com/lukescott)!
  * Fix shorthand properties not correctly being target for `isReferenced` checks. Thanks [@monsanto](https://github.com/monsanto)!
 * **Polish**
  * Allow passing an array of globs to `babel/register` `only` and `ignore` options. Thanks [@Mark-Simulacrum](https://github.com/Mark-Simulacrum)!
  * When inferring function names that collide with upper bindings, instead of doing the wrapper, instead rename them.
  * Consider constant-like variable declaration functions to always refer to themselves so TOC can be performed.
  * Process globs manually when using `$ babel` as some shells such as Windows don't explode them. Thanks [@jden](https://github.com/jden)!
  * Add alternative way to execute plugins via a closure that's called with the current Babel instance.
 * **Internal**
  * Remove multiple internal transformers in favor of directly doing things when we need to. Previously, declarations such as `_ref` that we needed to create in specific scopes were done at the very end via the `_declarations` transformer. Now, they're done and added to the scope **right** when they're needed. This gets rid of the crappy `_declarations` property on scope nodes and fixes the crappy regenerator bug where it was creating a new `BlockStatement` so the declarations were being lost.
  * Rework transformer traversal optimisation. Turns out that calling a `check` function for **every single node** in the AST is ridiculously expensive. 300,000 nodes timesed by ~30 transformers meant that it took tens of seconds to perform while it's quicker to just do the unnecessary traversal. Seems obvious in hindsight.
 * **New Feature**
  * Add `jscript` transformer that turns named function expressions into function declarations to get around [JScript's horribly broken function expression semantics](https://kangax.github.io/nfe/#jscript-bugs). Thanks [@kondi](https://github.com/kondi)!
  * Add `@@hasInstance` support to objects when using the `es6.spec.symbols` transformer.
  * Add `retainLines` option that retains the line (but not the columns!) of the input code.

## 5.1.13

 * **Polish**
  * Remove symbol check from `defineProperty` helper.

## 5.1.12

 * **Bug Fix**
  * Fix `resolveModuleSource` not being ran on `ExportAllDeclaration`s.
  * Fix `.babelrc` being resolved multiple times when using the require hook.
  * Fix parse error on spread properties in assignment position.
  * Fix `externalHelpers` option being incorrectly listed as type `string`.
 * **Internal**
  * Upgrade `core-js` to `0.9.0`.
 * **Spec Compliancy**
  * Fix object decorators not using the `initializer` pattern.
  * Remove property initializer descriptor reflection.

## 5.1.11

 * **Bug Fix**
  * Memoise and bind member expression decorators.
  * Move JSX children cleaning to opening element visitor. Fixes elements not being cleaned in certain scenarios.
  * Consider `SwitchStatement`s to be `Scopable`.
  * Fix `bluebirdCoroutines` calling `interopRequireWildcard` before it's defined.
  * Add space to `do...while` code generation.
  * Validate `super` use before `this` on `super` exit rather than entrance.
 * **Polish**
  * Add Babel name to logger.

## 5.1.10

 * **Bug Fix**
  * Remove `makePredicate` from acorn in favor of an `indexOf`.
  * Remove statements to expression explosion when inserting a block statement.
 * **Internal**
  * Remove runtime compatibility check.

## 5.1.9

 * **Bug Fix**
  * Fix class property initializers with `undefined` values not being correctly writable.
  * Fix self inferring generators incorrectly causing a stack error.
  * Fix default export specifiers not triggering AMD `module` argument inclusion.
  * Fix assignments not having their module references properly remapped.
 * **Internal**
  * Upgrade to latest `acorn`.
 * **Polish**
  * Make invalid LHS pattern error messages nicer.

## 5.1.8

 * **Bug Fix**
  * Only make parenthesized object pattern LHS illegal.

## 5.1.7

 * **Internal**
  * Add `parse` node API.

## 5.1.6

 * **Bug Fix**
  * Fix `runtime` built-in catchall not properly checking for local variables.

## 5.1.5

 * **Internal**
  * Bump `core-js` version.

## 5.1.4

 * **Polish**
  * Add missing `Reflect` methods to runtime transformer.

## 5.1.3

 * **Internal**
  * Switch entirely to vanilla regenerator.
  * Clean up and make the parsing of decorators stateless.
 * **Bug Fix**
  * Don't do TCO on generators and async functions.
  * Add missing `core-js` runtime definitions.

## 5.1.2

 * **Bug Fix**
  * Add `getIterator` and `isIterable` to `babel-runtime` build script.

## 5.1.1

 * **Bug Fix**
  * Add missing runtime symbol definitions.

## 5.1.0

 * **Bug Fix**
  * Fix super reference when using decorators.
  * Don't do array unpack optimisation when member expressions are present.
  * Add missing descriptors for undecorated class properties.
  * Don't consider `arguments` and `eval` valid function names when doing function name inferrence.
  * Fix scope tracking of constants in loop heads.
  * Parse `AwaitExpression` as a unary instead of an assignment.
  * Fix regex evaluation when attempting static evaluation.
  * Don't emit tokens when doing a lookahead.
  * Add missing `test` declaration to `utility.deadCodeElimination` transformer.
 * **Internal**
  * Upgrade `regenerator` to the latest and use my branch with the hope of eventually switching to vanilla regenerator.
  * Add support for the replacement of for loop `init`s with statements.
  * Upgrade dependencies.
 * **Polish**
  * When adding the scope IIFE when using default parameters, don't shadow the function expression, just `apply` `this` and `arguments` if necessary.
  * Use path basename as non-default import fallback.
 * **New Feature**
  * Add [trailing function comma proposal](https://github.com/jeffmo/es-trailing-function-commas). Thanks [@AluisioASG](https://github.com/AluisioASG)!
  * Add support for object literal decorators.
  * Make core-js modular when using the `runtime` transformer.

## 5.0.12

 * **Bug Fix**
  * Fix incorrect remapping of module references inside of a function id redirection container.

## 5.0.11

 * **Bug Fix**
  * Fix new `for...of` loops not properly inheriting their original loop.
 * **Internal**
  * Disable scope instance cache.
 * **Polish**
  * Allow comments in `.babelrc` JSON.

## 5.0.9

 * **Polish**
  * Use `moduleId` for UMD global name if available.
 * **Bug Fix**
  * Fix UMD global `module` variable shadowing the `amd`/`common` `module` variable.
  * Fix Flow param type annotation regression.
  * Fix function name collision `toString` wrapper. Thanks [@alawatthe](https://github.com/alawatthe)!

## 5.0.8

 * **Bug Fix**
  * Fix falsy static class properties not being writable.
  * Fix block scoping collisions not properly detecting modules and function clashes.
  * Skip `this` before `super` for derived constructors on functions.

## 5.0.7

 * **New Feature**
  * Add `--ignore` and `--only` support to the CLI.
 * **Bug Fix**
  * Remove `HOMEPATH` environment variable from home resolution in `babel/register` cache.
 * **Internal**
  * Disable WIP path resolution introducing infinite recursion in some code examples.
 * **Polish**
  * Add live binding to CommonJS default imports.

## 5.0.6

 * **Bug Fix**
  * Fix mangling of import references that collide with properties on `Object.prototype`.
  * Fix duplicate declarations incorrectly being reported for `var`.

## 5.0.5

 * **Internal**
  * Upgrade `core-js`.
 * **Bug Fix**
  * Fix arrays not being supported in `util.list`.

## 5.0.4

 * **Polish**
  * Check for top level `breakConfig` in `resolveRc`.

## 5.0.3

 * **Bug Fix**
  * Make relative location absolute before calling `resolveRc`.
 * **Internal**
  * Switch to global UID registry.
  * Add `breakConfig` option to prevent Babel from erroring when hitting that option.

## 5.0.1

 * **Bug Fix**
  * Fix duplicate declaration regression.
  * Fix not being able to call non-writable methods.

## 5.0.0

 * **New Feature**
  * Decorators based on [@wycat's](https://github.com/wycats) [stage 1 proposal](https://github.com/wycats/javascript-decorators).
  * Class property initializers based on [@jeffmo's](https://github.com/jeffmo) [stage 0 proposal](https://gist.github.com/jeffmo/054df782c05639da2adb).
  * Export extensions based on [@leebyron's](https://github.com/leebyron) [stage 1 proposal](https://github.com/leebyron/ecmascript-more-export-from).
  * UMD module formatter now supports globals.
  * Add `es3.runtime`, `optimisation.react.inlineElements` and `optimisation.react.constantElements` transformers.
  * Add stage option that replaces the experimental one.
  * Allow ES7 transformer to be enabled via `optional` instead of only via `stage`.
  * Infer string quotes to use in the code generator.
  * Consider `export { foo as default  };` to be the same as `export default foo;`.
  * Add `nonStandard` option that can be set to `false` to remove parser support for JSX and Flow.
  * Add `jsxPragma` option.
  * Automatically generate CLI options based on internal API options.
  * Add support for `.babelrc` on absolute paths.
  * Plugin API!
 * **Internal**
  * Export `options` in browser API.
  * Rewritten parser.
  * Don't block hoist when runtime transformer is enabled in system module formatter.
  * Rewritten the internal traversal and node replacement API to use "paths" that abstracts out node relationships.
 * **Polish**
  * JSX output is now more inline with the official JSX transformer.
  * Hoist block scoping IIFE - this improves memory usage and performance.
  * Better IIFE detection - references are now checked to see if they're referencing the binding we're searching for.
  * Check for import reassignments in constants transformer.
  * Make method definitions with expression bodies illegal.
  * Save register cache on tick instead of `SIGINT`.
  * Enable strict mode on babel-node eval flag.
 * **Bug Fixes**
  * Add support for live bindings. This change also increases the reliablity of export specifier renaming.
  * Add support for super update and non equals assignment expressions.
  * Rename shadow constructor binding in classes.
  * Seed next iteration bindings with previous fresh bindings when reassinging loop block scoped variables.
  * Fix new expression spread referencing the wrong constructor.
  * Call `resolveModuleSource` on dynamic imports.
  * Added `param` to list of duplicate declaration kinds.
 * **Breaking Changes**
  * The Babel playground has been removed.
  * ES7 Abstract References have been removed.
  * Experimental option has been removed in favor of a stage option.
  * Rename `returnUsedHelpers` to `metadataUsedHelpers`.

## 4.7.16

 * **Bug Fix**
  * Fix constructor spreading of typed arrays.
  * Fix break/continue/return aliasing of non-loops in block scoping transformer.

## 4.7.15

 * **Bug Fix**
  * Fix constructor spreading of collections.

## 4.7.14

 * **Bug Fix**
  * Fix constructor spreading of `Promise`.
 * **Internal**
  * Deprecate remaining playground transformers and abstract references.

## 4.7.13

 * **Bug Fix**
  * Handle comments on use strict directives.
  * Fix assignment patterns with a left side pattern.
 * **Polish**
  * Special case `this` when doing expression memoisation.

## 4.7.12

 * **Bug Fix**
  * Deprecate `playground.methodBinding`.

## 4.7.11

 * **Bug Fix**
  * Fix unicode regexes stripping their unicode flag before being passed on two `regexpu`.

## 4.7.10

 * **Internal**
  * Deprecate `playground.methodBinding` and `playground.objectGetterMemoization`.
 * **Bug Fix**
  * Fix `inputSourceMap` option. Thanks [@Rich-Harris](https://github.com/Rich-Harris)!

## 4.7.9

 * **Polish**
  * Allow `inputSourceMap` to be set to `false` to skip the source map inference.
  * Infer computed literal property names.
 * **Bug Fix**
  * Fix nested labeled for-ofs.
  * Fix block scoping `break` colliding with the parent switch case.
 * **Internal**
  * Upgrade `acorn-babel`.

## 4.7.8

 * **Bug Fix**
  * Fix computed classes not properly setting symbols.

## 4.7.7

 * **Bug Fix**
  * Fix `types` API exposure.

## 4.7.6

 * **Bug Fix**
  * Fix non-Identifier/Literal computed class methods.
 * **Polish**
  * Add a fallback if `stack` on an error is unconfigurable.
  * Hoist `esModule` module declarations to the top of the file to handle circular dependencies better.

## 4.7.5

 * **Bug Fix**
  * Don't remap` break`s to call the iterator return.
 * **Polish**
  * Use a different helper for computed classes for much nicer output. Also fixes a bug in symbols being non-enumerable so they wouldn't be set on the class.

## 4.7.4

 * **Bug Fix**
  * Rewrite named function expressions in optional async function transformers.
  * Hoist directives.
  * Remove `Number` from the list of valid `runtime` constructors.
 * **Internal**
  * `spec.typeofSymbol` transformer has been renamed to `es6.symbols`.

## 4.7.2

 * **New Feature**
  * `"both"` option for `sourceMap`.
  * Add output types to external helpers. Thanks [@neVERberleRfellerER](https://github.com/neVERberleRfellerER)!
 * **Bug Fix**
  * Fix node duplication sometimes resulting in a recursion error.
  * Ignore `break`s within cases inside `for...of`.
 * **Polish**
  * Split up variable declarations and export declarations to allow easier transformation.

## 4.7.0

 * **Bug Fix**
  * Add `alternate` to list of `STATEMENT_OR_BLOCK` keys.
  * Add support for module specifiers to `t.isReferenced`.
 * **New Feature**
  * Add `inputSourceMap` option.
 * **Polish**
  * Throw an error on different `babel` and `babel-runtime` versions.
  * Replicate module environment for `babel-node` eval.
  * Clean up classes output.
 * **Spec Compliancy**
  * Make it illegal to use a rest parameter on a setter.

## 4.6.6

 * **Bug Fix**
  * Fix incorrect method call in `utility.deadCodeElimination` transformer.
  * Fix `es6.blockScopingTDZ` transformer duplicating binding nodes.

## 4.6.5

 * **Internal**
  * `useStrict` transformer has been renamed to `strict`.

## 4.6.4

 * **Bug Fix**
  * Fix `ForOfStatement` not proplery inheriting labels.
  * When in closure mode in block scoping transformer, properly check for variable shadowing.
 * **New Feature**
  * New `utility.inlineEnvironmentVariables` and `utility.inlineExpression` transformers.

## 4.6.3

 * **Bug Fix**
  * Fix `arguments` being incorrectly aliased in arrow function rest parameter optimisation.
  * Make deoptimisation trigger safer.
 * **New Feature**
  * Flow types are now retained when blacklisting the `flow` transformer.

## 4.6.1

 * **Bug Fix**
  * Fix generators in template directory being transformed.
  * Fix exposure of `util` for plugins.

## 4.6.0

 * **New Feature**
  * Desugar sticky regexes to a new constructor expression so it can be handled by a polyfill.
 * **Spec Compliancy**
  * `for...of` now outputs in a lengthy `try...catch` this is to ensure spec compliancy in regards to iterator returns and abrupt completions. See [google/traceur-compiler#1773](https://github.com/google/traceur-compiler/issues/1773) and [babel/babel/#838](https://github.com/babel/babel/issues/838) for more information.
 * **Polish**
  * Rest parameters that are only refered to via number properties on member expressions are desugared into a direct `arguments` reference. Thanks [@neVERberleRfellerER](https://github.com/neVERberleRfellerER)!
  * `$ babel` no longer exits on syntax errors.
 * **Internal**
  * Upgrade `browserify`.
  * Upgrade `source-map`.
  * Publicly expose more internals.

## 4.5.5

 * **Polish**
  * Delete old extensions when overriding them in `babel/register`.

## 4.5.3

 * **Bug Fix**
  * Fix whitelisting logic for helper build script.

## 4.5.2

 * **New Feature**
  * `returnUsedHelpers` option and add whitelist to `buildHelpers`.
 * **Bug Fix**
  * Fix function arity on self referencing inferred named functions.
 * **Internal**
  * Bump `acorn-babel`.
  * Start converting source to ES6...

## 4.5.1

**Babel now compiles itself!**

![holy shit](http://gifsec.com/wp-content/uploads/GIF/2014/03/OMG-GIF_2.gif)

## 4.5.0

 * **New Feature**
  * Add `.babelrc` support.
 * **Bug Fix**
  * Move use strict directives to the module formatter bodies.
 * **Internal**
  * Make default `bin/babel` behaviour to ignore non-compilable files and add a `--copy-files` flag to revert to the old behaviour.

## 4.4.6

 * **Bug Fix**
  * Fix extending a class expression with no methods/only constructor. Thanks [@neVERberleRfellerER](https://github.com/neVERberleRfellerER)!
  * Allow `MemberExpression` as a valid `left` of `ForOfStatement`.
 * **Polish**
  * Throw an error when people try and transpile code with the `@jsx React.DOM` pragma as it conflicts with the custom jsx constructo method detection.
  * Crawl all comments for `@jsx` pragma.
 * **Internal**
  * Upgrade `chalk`.
  * Upgrade `core-js`.

## 4.4.5

 * **Internal**
  * Remove function self reference optimisation.

## 4.4.4

 * **Bug Fix**
  * Handle inferred function ids to be reassigned and deopt to a slower but working equivalent.
  * Don't unpack array patterns that have more elements than their right hand array expression.
 * **Polish**
  * Improve syntax highlighting in the code frame. Thanks [@lydell](https://github.com/lydell)!
 * **Internal**
  * Upgrade `acorn-babel`.

## 4.4.3

 * **Bug Fix**
  * Fix `for...of` iterator break returns being duplicated.
  * Only call `return` on the iterator if it exists.
 * **Internal**
  * Rename `selfContained` transformer to `runtime`.

## 4.4.2

 * **New Feature**
  * Add `moduleId` option for specifying a custom module id.

## 4.4.0

 * **New Feature**
  * `/*** @jsx NAMESPACE **/` comments are now honored by the `react` transformer.
  * `getModuleName` option.
  * Infer function expression names. Thanks [@RReverser](https://github.com/RReverser)!
 * **Bug Fix**
  * Add proper control flow for tail recursion optimisation.
 * **Internal**
  * Remove useless `format` options and move the `format.compact` option to `format`.
 * **Polish**
  * Newline handling of the code generator has been heavily improved.
  * Code generator now deopts whitespace if the input size is >100KB.

## 4.3.0

 * **Breaking Change**
  * Remove `commonStandard` module formatter and make it the default behaviour of all the strict module formatters.

## 4.2.1

 * **Polish**
  * Add auxiliary comment to let scoping closure flow control.

## 4.2.0

 * **Polish**
  * Use an assignment instead of a define for `__esModule` in loose mode.
 * **Internal**
  * Add error for `eval();` usage and enable strict mode for parsing.

## 4.1.0

 * **New Feature**
  * Add `BABEL_CACHE_PATH` and `BABEL_DISABLE_CACHE` environment variables.
 * **Internal**
  * Replace many internal util functions with modules. Thanks [@sindresorhus](https://github.com/sindresorhus)!

## 4.0.2

 * **Bug Fix**
  * Fix generators not properly propagating their internal declarations.
 * **Polish**
  * Update setter param length error message.
  * Use ranges on dependencies.

## 4.0.0

 * 6to5 is now known as Babel.
 * Global helpers/runtime has now been given the more descriptive name of "external helpers".
