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

See [CHANGELOG - v4](/.github/CHANGELOG-v4.md), [CHANGELOG - v5](/.github/CHANGELOG-v5.md), and [CHANGELOG - v6](/.github/CHANGELOG-v6.md) for v4.x-v6.x changes.
See [CHANGELOG - 6to5](/.github/CHANGELOG-6to5.md) for the pre-4.0.0 version changelog.
See [Babylon's CHANGELOG](packages/babylon/CHANGELOG.md) for the Babylon pre-7.0.0-beta.29 version changelog.

## v7.0.0-beta.54 (2018-07-16)

> Regarding https://github.com/babel/babel/issues/8184, we aren't using `micromatch` for paths, just basic `*/**` substitution now. For anything more complicated we will recommend using a regex/`.js` config.
> Fixed a bug in the stage presets (https://github.com/babel/babel/issues/8307), so we just removed the requirements for setting options in the meantime for ease of use. We are removing the Stage presets next release. https://github.com/babel/babel/pull/8293

#### :boom: Breaking Change
* `babel-core`, `babel-register`, `babel-traverse`
  * [#8327](https://github.com/babel/babel/pull/8327) Treat string ignore/only/test/include/exclude values as paths with only basic pattern matching. ([@loganfsmyth](https://github.com/loganfsmyth))

#### :bug: Bug Fix
* `babel-core`, `babel-register`, `babel-traverse`
  * [#8327](https://github.com/babel/babel/pull/8327) Treat string ignore/only/test/include/exclude values as paths with only basic pattern matching. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-preset-stage-0`, `babel-preset-stage-1`
  * [#8317](https://github.com/babel/babel/pull/8317) Fix stage-0/1 import of pipeline proposals array. ([@mAAdhaTTah](https://github.com/mAAdhaTTah))
* `babel-helper-module-transforms`, `babel-plugin-transform-modules-commonjs`
  * [#8316](https://github.com/babel/babel/pull/8316) Ensure that the wildcard interop is used with re-export + default.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-core`
  * [#8315](https://github.com/babel/babel/pull/8315) Remove option-filtering options from the final options results.. ([@loganfsmyth](https://github.com/loganfsmyth))

#### :memo: Documentation
* [#8320](https://github.com/babel/babel/pull/8320) Add link to audio version of song. ([@rugk](https://github.com/rugk))

## v7.0.0-beta.53 (2018-07-11)

- Fix for regression with paths on windows due to micromatch upgrade, remove yearly presets (not published)
- (There was an issue with the Stage presets in this release, but it is also deprecated) 

#### :boom: Breaking Change
* `babel-*`
  * [#8274](https://github.com/babel/babel/pull/8274) Remove yearly presets from repo. ([@hzoo](https://github.com/hzoo))

#### :rocket: New Feature
* `babel-generator`, `babel-parser`, `babel-plugin-transform-typescript`, `babel-types`
  * [#7799](https://github.com/babel/babel/pull/7799) TypeScript: Support type arguments on JSX opening and self-closing tags. ([@andy-ms](https://github.com/andy-ms))
* `babel-parser`
  * [#8291](https://github.com/babel/babel/pull/8291) Support pipeline proposal flag in  `@babel/parser`. ([@mAAdhaTTah](https://github.com/mAAdhaTTah))
* `babel-plugin-proposal-object-rest-spread`
  * [#8264](https://github.com/babel/babel/pull/8264) Remove unused bindings when excluding keys with rest in loose mode. ([@Andarist](https://github.com/Andarist))
* `babel-helpers`, `babel-plugin-proposal-object-rest-spread`, `babel-plugin-transform-destructuring`, `babel-preset-env`
  * [#8261](https://github.com/babel/babel/pull/8261) Introduce objectWithoutPropertiesLoose helper. ([@Andarist](https://github.com/Andarist))

#### :bug: Bug Fix
* `babel-core`
  * [#8281](https://github.com/babel/babel/pull/8281) Revert micromatch upgrade (regression) [skip ci]. ([@hzoo](https://github.com/hzoo))
* `babel-types`
  * [#8165](https://github.com/babel/babel/pull/8165) [babel-types] Fix isNodesEquivalent() behavior for TemplateElements. ([@timkendrick](https://github.com/timkendrick))

#### :nail_care: Polish
* `babel-plugin-syntax-pipeline-operator`, `babel-preset-stage-0`, `babel-preset-stage-1`
  * [#8279](https://github.com/babel/babel/pull/8279) Improve error messages around pipeline option. ([@mAAdhaTTah](https://github.com/mAAdhaTTah))

#### :memo: Documentation
* [#8286](https://github.com/babel/babel/pull/8286) Move v4-v6 changelog to another file and all prerelease 7.0 logs [ski…. ([@hzoo](https://github.com/hzoo))

#### :house: Internal
* `babel-preset-env`
  * [#8299](https://github.com/babel/babel/pull/8299) Make env preset build-data scripts reproducible. ([@rtsao](https://github.com/rtsao))
* `babel-plugin-proposal-object-rest-spread`
  * [#8287](https://github.com/babel/babel/pull/8287) Fixed fixture tests after merge. ([@Andarist](https://github.com/Andarist))
* Other
  * [#8187](https://github.com/babel/babel/pull/8187) Invoke Jest main file directly. ([@ishitatsuyuki](https://github.com/ishitatsuyuki))

## v7.0.0-beta.52 (2018-07-06)

Deprecating the yearly/stage presets in v7 (will remove next beta). Ran `npm deprecate` on `@babel/preset-es2015`, `@babel/preset-es2016`, `@babel/preset-es2017`, `@babel/preset-stage-0`, `@babel/preset-stage-1`, `@babel/preset-stage-2`, `@babel/preset-stage-3` only for versions `>v7.0.0-beta.52`. This means this will only break your build if you are using `^` in Babel v7 beta (which we have recommended against each release). (It is unfortunate that the default behavior of npm is to use `^` when using `npm install` though; haven't made an RFC for it yet).

Also various bugfixes, change to force the pipeline plugin to have an option.

The pipeline plugin must be configured with the `minimal` option. This is so people explicitly know the implementation that is being used, and someone will be able to implement and test out the other proposal options. After all, this proposal is in Stage 1 still and the semantics are being figured out: this is a great opportunity to specify via the config what people are using.

```js
{
  "plugins": [["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }]]
}
```

#### :boom: Breaking Change
* `babel-core`
  * [#8198](https://github.com/babel/babel/pull/8198) Prefer explicit object maps, and properly load relative maps.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-decorators`, `babel-plugin-proposal-pipeline-operator`, `babel-plugin-syntax-pipeline-operator`, `babel-preset-stage-0`, `babel-preset-stage-1`
  * [#8196](https://github.com/babel/babel/pull/8196) Require proposal flag for pipeline plugin. ([@mAAdhaTTah](https://github.com/mAAdhaTTah))

#### :bug: Bug Fix
* `babel-types`
  * [#8273](https://github.com/babel/babel/pull/8273) Add visitor key for Flow typeArguments in call expressions. ([@rubennorte](https://github.com/rubennorte))
* `babel-core`
  * [#8198](https://github.com/babel/babel/pull/8198) Prefer explicit object maps, and properly load relative maps.. ([@loganfsmyth](https://github.com/loganfsmyth))
  * [#8197](https://github.com/babel/babel/pull/8197) Allow @foo/babel-plugin as an unexpanded plugin name, and @foo as a shorthand for it.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-plugin-transform-typescript`
  * [#8238](https://github.com/babel/babel/pull/8238) Typescript: Avoid stripping class properties when a decorator is set. ([@pmdartus](https://github.com/pmdartus))

#### :nail_care: Polish
* `babel-cli`, `babel-preset-env`
  * [#8250](https://github.com/babel/babel/pull/8250) remove emojis from cli output. ([@johnbuffington](https://github.com/johnbuffington))

#### :house: Internal
* `babel-core`, `babel-helpers`, `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-react-constant-elements`, `babel-preset-env`
  * [#8267](https://github.com/babel/babel/pull/8267) Optimize async to generator. ([@jridgewell](https://github.com/jridgewell))
* `babel-core`, `babel-parser`
  * [#8259](https://github.com/babel/babel/pull/8259) upgrades eslint v5 (major), babel-eslint, eslint-plugin-flowtype, eslint-plugin-prettier. ([@dnalborczyk](https://github.com/dnalborczyk))
* `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-runtime`
  * [#8265](https://github.com/babel/babel/pull/8265) Rename some test fixtures so they run properly.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-helper-fixtures`, `babel-plugin-proposal-class-properties`, `babel-plugin-transform-classes`
  * [#8208](https://github.com/babel/babel/pull/8208) Ensure that we don't get unexpected output files for tests that throw.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-helper-transform-fixture-test-runner`
  * [#8220](https://github.com/babel/babel/pull/8220) Remove regenerator hacks in checkDuplicatedNodes. ([@Andarist](https://github.com/Andarist))
* Other
  * [#8158](https://github.com/babel/babel/pull/8158) Compile against beta 51. ([@existentialism](https://github.com/existentialism))
* `babel-parser`
  * [#8176](https://github.com/babel/babel/pull/8176) babel/parser: use charCodes throughout for improved sourcecode readability in tokenizer/parser.. ([@GerHobbelt](https://github.com/GerHobbelt))
  * [#8177](https://github.com/babel/babel/pull/8177) babel/parser: remove dead code: constant condition. ([@GerHobbelt](https://github.com/GerHobbelt))

## v7.0.0-beta.51 (2018-06-12)

Fixed a peerDep issue

## v7.0.0-beta.50 (2018-06-12)

Mostly bug fixes and some decorator updates

#### :eyeglasses: Spec Compliancy
* `babel-plugin-proposal-unicode-property-regex`
  * [#8127](https://github.com/babel/babel/pull/8127) Update plugin-proposal-unicode-property-regex for Unicode v11. ([@mathiasbynens](https://github.com/mathiasbynens))
* `babel-parser`
  * [#8125](https://github.com/babel/babel/pull/8125) Update identifier parsing per Unicode v11. ([@mathiasbynens](https://github.com/mathiasbynens))
* `babel-core`, `babel-generator`, `babel-parser`, `babel-plugin-proposal-decorators`, `babel-types`
  * [#8037](https://github.com/babel/babel/pull/8037)  Remove parser support for decorators optional parentheses. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :boom: Breaking Change
* `babel-generator`, `babel-parser`, `babel-plugin-syntax-decorators`
  * [#8113](https://github.com/babel/babel/pull/8113) Change decoratorsBeforeExport default to false. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-core`, `babel-generator`, `babel-parser`, `babel-plugin-proposal-decorators`, `babel-types`
  * [#8037](https://github.com/babel/babel/pull/8037)  Remove parser support for decorators optional parentheses. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-core`, `babel-plugin-syntax-decorators`
  * [#7938](https://github.com/babel/babel/pull/7938) Update syntax-decorators options. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-helper-builder-react-jsx`, `babel-plugin-transform-react-inline-elements`, `babel-plugin-transform-react-jsx`
  * [#8045](https://github.com/babel/babel/pull/8045) Do not quote JSX attribute keys for IdentifierName. ([@arv](https://github.com/arv))

#### :rocket: New Feature
* `babel-generator`
  * [#8143](https://github.com/babel/babel/pull/8143) add jsesc options support. ([@vincentdchan](https://github.com/vincentdchan))
* `babel-preset-env`
  * [#8031](https://github.com/babel/babel/pull/8031) Validate @babel/preset-env options. ([@sun1x](https://github.com/sun1x))
* `babel-core`, `babel-plugin-syntax-decorators`
  * [#7938](https://github.com/babel/babel/pull/7938) Update syntax-decorators options. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-generator`, `babel-plugin-proposal-decorators`
  * [#7948](https://github.com/babel/babel/pull/7948) Add "decoratorsBeforeExport" option to @babel/generator. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-generator`, `babel-parser`, `babel-types`, `babylon`
  * [#7978](https://github.com/babel/babel/pull/7978) Support Flow's proto modifier syntax for declared classes. ([@samwgoldman](https://github.com/samwgoldman))

#### :bug: Bug Fix
* `babel-helper-hoist-variables`, `babel-plugin-transform-modules-systemjs`
  * [#8104](https://github.com/babel/babel/pull/8104) System module format hoisting and export refinements. ([@guybedford](https://github.com/guybedford))
* `babel-plugin-proposal-class-properties`, `babel-traverse`
  * [#8051](https://github.com/babel/babel/pull/8051) Don't split an exported class when renaming an inner binding. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  * [#8122](https://github.com/babel/babel/pull/8122)  isConstantExpression should return true for immuable bindings. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-plugin-transform-typescript`
  * [#7996](https://github.com/babel/babel/pull/7996) Adds JSXFragment to plugin-transform-typescript check for the presence of jsx. ([@malbernaz](https://github.com/malbernaz))
* `babel-plugin-proposal-class-properties`, `babel-plugin-transform-typescript`
  * [#8007](https://github.com/babel/babel/pull/8007) Fix 'Missing class properties transform' error when parsing class properties with Typescript syntax. ([@pterolex](https://github.com/pterolex))
* `babel-parser`
  * [#8030](https://github.com/babel/babel/pull/8030) Allow ts modifier names to be used as function argument names. ([@existentialism](https://github.com/existentialism))
* `babel-preset-env`
  * [#8132](https://github.com/babel/babel/pull/8132) Fix Safari TP and regular versions comparison. ([@yuri-karadzhov](https://github.com/yuri-karadzhov))
  * [#8138](https://github.com/babel/babel/pull/8138) Ensure regex-dot-all runs before unicode-regex in preset-env. ([@existentialism](https://github.com/existentialism))
* `babel-helpers`, `babel-plugin-transform-classes`
  * [#8100](https://github.com/babel/babel/pull/8100) Fix ReferenceError in the wrapNativeSuper helper. ([@chocolateboy](https://github.com/chocolateboy))
* `babel-types`
  * [#8060](https://github.com/babel/babel/pull/8060) make isReferenced() recognise ObjectTypeProperty. ([@peter-leonov](https://github.com/peter-leonov))
* `babel-cli`
  * [#8082](https://github.com/babel/babel/pull/8082) Avoid a race condition in CLI directory creation.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-helper-builder-react-jsx`, `babel-plugin-transform-react-inline-elements`, `babel-plugin-transform-react-jsx`
  * [#8045](https://github.com/babel/babel/pull/8045) Do not quote JSX attribute keys for IdentifierName. ([@arv](https://github.com/arv))

#### :nail_care: Polish
* `babel-plugin-proposal-class-properties`, `babel-plugin-transform-classes`, `babel-plugin-transform-parameters`, `babel-plugin-transform-react-constant-elements`
  * [#8123](https://github.com/babel/babel/pull/8123) [class-properties] Remove unnecessary return and temp variable. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-parser`
  * [#8074](https://github.com/babel/babel/pull/8074) nit: fix folder name. ([@dnalborczyk](https://github.com/dnalborczyk))

#### :memo: Documentation
* `babel-*`
  * [#8108](https://github.com/babel/babel/pull/8108) Refactor move docs. ([@xtuc](https://github.com/xtuc))

#### :house: Internal
* Other
  * [#8142](https://github.com/babel/babel/pull/8142) Don't regenerate babel-types docs in the readme. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  * [#8139](https://github.com/babel/babel/pull/8139) Bump test262-stream and update test262 tests. ([@existentialism](https://github.com/existentialism))
* `babel-generator`, `babel-node`, `babel-standalone`, `babel-template`
  * [#8144](https://github.com/babel/babel/pull/8144) Add Labels to READMEs Generator & Update README's w. Links To Open Issues (for some pkg's). ([@BeniCheni](https://github.com/BeniCheni))
* `babel-node`
  * [#7908](https://github.com/babel/babel/pull/7908) Test on node 10. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.0.0-beta.49 (2018-05-25)

Mostly bugfix release for a regression in decorators, and a quick fix for some new `babel-node` options in the last release that just didn't work right. Also one small addition to the API for official promise-returning versions of our async transform/parsing functions.

#### :rocket: New Feature
* `babel-core`
  * [#8023](https://github.com/babel/babel/pull/8023) Add a promise-returning *Async version of the transform and parse fns. ([@loganfsmyth](https://github.com/loganfsmyth))

#### :bug: Bug Fix
* `babel-node`
  * [#8046](https://github.com/babel/babel/pull/8046) Handle kebab-case args in babel-node.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-plugin-proposal-decorators`
  * [#8047](https://github.com/babel/babel/pull/8047) Transform decorated classes from the export visitor. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-cli`, `babel-core`, `babel-plugin-transform-react-jsx-source`, `babel-preset-env`, `babel-preset-react`
  * [#8044](https://github.com/babel/babel/pull/8044) Expose all filenames as absolute paths, rather than relative.. ([@loganfsmyth](https://github.com/loganfsmyth))

#### :house: Internal
* [#8036](https://github.com/babel/babel/pull/8036) Compile against beta 48. ([@hzoo](https://github.com/hzoo))

## v7.0.0-beta.48 (2018-05-24)

- Renamed `babylon` to `@babel/parser` for clarity (I will still commonly refer to it as babylon though!)
- Add Private Fields implementations (now Stage 3) `class A { #a = 1 }`
- Add small Stage 3 (now Stage 4) Subsume JSON change https://github.com/babel/proposals/issues/43
- Fix IE10 class regression
- Various fixes, many TS fixes

#### :eyeglasses: Spec Compliancy
* `babel-parser`, `babel-plugin-proposal-json-strings`, `babel-plugin-syntax-json-strings`, `babel-preset-stage-3`
  * [#7985](https://github.com/babel/babel/pull/7985) Subsume json. ([@jridgewell](https://github.com/jridgewell))

#### :boom: Breaking Change
* `babel-core`, `babel-helper-fixtures`, `babel-helper-transform-fixture-test-runner`, `babel-plugin-syntax-flow`, `babel-plugin-syntax-jsx`, `babel-plugin-syntax-typescript`, `babel-plugin-transform-typescript`, `babel-preset-react`, `babel-preset-typescript`, `babel-standalone`
  * [#7955](https://github.com/babel/babel/pull/7955) Verify that files are .ts/.tsx before treating as Typescript files.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-cli`, `babel-core`, `babel-plugin-transform-react-jsx-source`, `babel-preset-react`
  * [#7956](https://github.com/babel/babel/pull/7956) Make the filename option, as exposed to the plugins, consistently relative to the working directory. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-traverse`, `babel-types`
  * [#7900](https://github.com/babel/babel/pull/7900) Re-add support for local Flow bindings (TypeAlias, OpaqueTypeAlias and Interface). ([@rubennorte](https://github.com/rubennorte))

#### :rocket: New Feature
* `babel-node`
  * [#8010](https://github.com/babel/babel/pull/8010) Add more of babel-cli's options to babel-node too for consistency.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-cli`, `babel-node`
  * [#5621](https://github.com/babel/babel/pull/5621) Add no-babelrc option in babel-node. ([@xtuc](https://github.com/xtuc))
* `babel-core`, `babel-generator`, `babel-parser`, `babel-types`, `babylon`
  * [#7928](https://github.com/babel/babel/pull/7928) Create InterpreterDirective AST node type and use to replace babel/core File's 'shebang' handling. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-parser`, `babel-plugin-proposal-json-strings`, `babel-plugin-syntax-json-strings`, `babel-preset-stage-3`
  * [#7985](https://github.com/babel/babel/pull/7985) Subsume json. ([@jridgewell](https://github.com/jridgewell))
* `babel-generator`, `babel-plugin-syntax-flow`, `babel-plugin-transform-flow-strip-types`, `babel-types`, `babylon`
  * [#7934](https://github.com/babel/babel/pull/7934) Add support for explicit type arguments in new and call expressions. ([@samwgoldman](https://github.com/samwgoldman))
* `babel-generator`, `babel-types`, `babylon`
  * [#7959](https://github.com/babel/babel/pull/7959) Allow internal slot properties to be optional. ([@samwgoldman](https://github.com/samwgoldman))
  * [#7947](https://github.com/babel/babel/pull/7947) Internal slot properties. ([@samwgoldman](https://github.com/samwgoldman))
* `babylon`
  * [#7869](https://github.com/babel/babel/pull/7869) Add an option to Babylon to have decorators before export. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :bug: Bug Fix
* `babel-parser`
  * [#7994](https://github.com/babel/babel/pull/7994) [Babylon] Take the first set of options for plugins. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  * [#7968](https://github.com/babel/babel/pull/7968) Set exprAllowed to false when parsing TSNonNullExpression. ([@existentialism](https://github.com/existentialism))
* `babel-core`, `babel-helpers`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-decorators`, `babel-plugin-transform-classes`, `babel-plugin-transform-exponentiation-operator`, `babel-plugin-transform-function-name`, `babel-plugin-transform-object-super`, `babel-plugin-transform-parameters`, `babel-plugin-transform-react-jsx`, `babel-plugin-transform-runtime`, `babel-preset-env`
  * [#7969](https://github.com/babel/babel/pull/7969) Fix class inheritance in IE10. ([@jridgewell](https://github.com/jridgewell))
* `babel-types`
  * [#8005](https://github.com/babel/babel/pull/8005) Handle Infinity, -Infinity, NaN, and -0 in t.valueToNode().. ([@loganfsmyth](https://github.com/loganfsmyth))
  * [#7982](https://github.com/babel/babel/pull/7982) Build InterfaceTypeAnnotation generated type code. ([@jridgewell](https://github.com/jridgewell))
* `babel-generator`, `babel-plugin-syntax-bigint`, `babel-types`
  * [#8006](https://github.com/babel/babel/pull/8006) Bigint Support (no transform). ([@hzoo](https://github.com/hzoo))
* `babel-core`, `babel-generator`, `babel-parser`, `babel-types`, `babylon`
  * [#7928](https://github.com/babel/babel/pull/7928) Create InterpreterDirective AST node type and use to replace babel/core File's 'shebang' handling. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-cli`, `babel-core`, `babel-plugin-transform-react-jsx-source`, `babel-preset-react`
  * [#7956](https://github.com/babel/babel/pull/7956) Make the filename option, as exposed to the plugins, consistently relative to the working directory. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-preset-typescript`
  * [#7990](https://github.com/babel/babel/pull/7990) passes the jsxPragma options from preset-typescript to plugin-transform-typescript. ([@malbernaz](https://github.com/malbernaz))
* `babel-types`, `babylon`
  * [#7967](https://github.com/babel/babel/pull/7967) TypeScript: Fix TSInferType .typeParameter type.. ([@benjamn](https://github.com/benjamn))
* `babel-helpers`, `babel-plugin-transform-classes`, `babel-preset-env`
  * [#7533](https://github.com/babel/babel/pull/7533) Fix bugs in the _wrapNativeSuper helper. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-register`
  * [#7930](https://github.com/babel/babel/pull/7930) Ensure that calling register() fully resets the extension state.. ([@loganfsmyth](https://github.com/loganfsmyth))

#### :nail_care: Polish
* `babel-parser`
  * [#7986](https://github.com/babel/babel/pull/7986) Better error message for invalid decorators syntax. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :memo: Documentation
* `babel-preset-env`
  * [#8020](https://github.com/babel/babel/pull/8020) Fix include/exclude syntax in preset-env README. ([@taion](https://github.com/taion))
* `babel-parser`
  * [#8009](https://github.com/babel/babel/pull/8009) update AST spec - interpreter. ([@xtuc](https://github.com/xtuc))

#### :house: Internal
* `babel-parser`
  * [#7999](https://github.com/babel/babel/pull/7999) [babylon] Refactor mixin plugins handling & validation. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  * [#8002](https://github.com/babel/babel/pull/8002) Fix some flow issues in @babel/parser flow plugin. ([@existentialism](https://github.com/existentialism))
* `babel-plugin-proposal-decorators`
  * [#7975](https://github.com/babel/babel/pull/7975) Add "legacy" prefix to legacy decorators tests. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-cli`, `babel-core`
  * [#7929](https://github.com/babel/babel/pull/7929) Refactor babel-cli to use async functions for async handling, and centralize option loading. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-helper-transform-fixture-test-runner`
  * [#7931](https://github.com/babel/babel/pull/7931) Test running bug fixing for Node 10. ([@loganfsmyth](https://github.com/loganfsmyth))

## v7.0.0-beta.47 (2018-05-14)

- Compile Babel itself to target Node 6 syntax given we dropped Node 4 support to run (this is unrelated to the output code)
-  Allow `babelrc` and `babelrcRoots` in config files
- Various bug fixes

#### :boom: Breaking Change
* `babel-generator`, `babel-plugin-syntax-decorators`, `babylon`
  * [#7821](https://github.com/babel/babel/pull/7821) Rename decorators&decorators2 plugins to decorators-legacy&decorators.. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* Other
  * [#7782](https://github.com/babel/babel/pull/7782) Target Node 6 in production. ([@hzoo](https://github.com/hzoo))

#### :rocket: New Feature
* `babel-core`
  * [#7911](https://github.com/babel/babel/pull/7911) Allow 'babelrc' and 'babelrcRoots' in config files (but not .babelrc/extends). ([@loganfsmyth](https://github.com/loganfsmyth))

#### :bug: Bug Fix
* `babel-plugin-transform-typescript`
  * [#7878](https://github.com/babel/babel/pull/7878) Fix handling of different JSX pragmas in Typescript. ([@calebeby](https://github.com/calebeby))
  * [#7833](https://github.com/babel/babel/pull/7833) fix(transform-typescript): do not elide injected imports. ([@jeysal](https://github.com/jeysal))
* `babel-core`
  * [#7911](https://github.com/babel/babel/pull/7911) Allow 'babelrc' and 'babelrcRoots' in config files (but not .babelrc/extends). ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-cli`
  * [#7875](https://github.com/babel/babel/pull/7875) Fix watch bug with output-dir paths.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-preset-env`
  * [#7809](https://github.com/babel/babel/pull/7809) Clean up and add some additional polyfill mappings in preset-env. ([@existentialism](https://github.com/existentialism))
  * [#7884](https://github.com/babel/babel/pull/7884) Fix bug with handling minor versions when parsing compat-data. ([@existentialism](https://github.com/existentialism))
  * [#7810](https://github.com/babel/babel/pull/7810) Improve useBuiltIns: usage mappins in preset-env. ([@existentialism](https://github.com/existentialism))
* `babel-plugin-transform-typescript`, `babylon`
  * [#7888](https://github.com/babel/babel/pull/7888) TypeScript: Allow non-null and type assertions as lvalues. (Closes [#7638](https://github.com/babel/babel/issues/7638)). ([@mmantel](https://github.com/mmantel))
* `babel-preset-stage-3`
  * [#7819](https://github.com/babel/babel/pull/7819) fix(preset-stage-3): pass along loose flag to proposal-object-rest-spread. ([@yyx990803](https://github.com/yyx990803))
* `babel-cli`, `babel-core`, `babel-helper-fixtures`, `babel-helper-transform-fixture-test-runner`
  * [#7761](https://github.com/babel/babel/pull/7761) Reimplement input sourcemap merging using range matching instead of closest-position matching. ([@loganfsmyth](https://github.com/loganfsmyth))

#### :nail_care: Polish
* `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-template-literals`
  * [#7855](https://github.com/babel/babel/pull/7855) Lazy load tagged template literal strings. ([@dczombera](https://github.com/dczombera))
* `babylon`
  * [#7898](https://github.com/babel/babel/pull/7898) Fix a typo in a babylon flow plugin comment. ([@taveras](https://github.com/taveras))
* `babel-plugin-proposal-class-properties`
  * [#7813](https://github.com/babel/babel/pull/7813) Class Props: Don't rename constructor collisions with static props. ([@jridgewell](https://github.com/jridgewell))
* `babel-cli`, `babel-code-frame`, `babel-core`, `babel-helper-member-expression-to-functions`, `babel-helper-module-imports`, `babel-helper-plugin-utils`, `babel-preset-env`, `babel-register`, `babel-template`, `babel-types`, `babylon`
  * [#7777](https://github.com/babel/babel/pull/7777) Use Object Spread Syntax. ([@jridgewell](https://github.com/jridgewell))

#### :memo: Documentation
* `babel-node`
  * [#7897](https://github.com/babel/babel/pull/7897) Fix typo [skip-ci]. ([@rockymeza](https://github.com/rockymeza))
* `babel-plugin-transform-destructuring`, `babel-plugin-transform-exponentiation-operator`, `babel-plugin-transform-property-mutators`, `babel-plugin-transform-proto-to-assign`, `babel-plugin-transform-reserved-words`, `babel-plugin-transform-spread`
  * [#7844](https://github.com/babel/babel/pull/7844) Improve README's for several plugins. [skip ci]. ([@mmantel](https://github.com/mmantel))
* `babel-preset-env`
  * [#7835](https://github.com/babel/babel/pull/7835) Change babel-preset-env docs according Browserslist best practices. ([@ai](https://github.com/ai))
  * [#7807](https://github.com/babel/babel/pull/7807) Update shippedProposals in preset-env docs [skip ci]. ([@existentialism](https://github.com/existentialism))
  * [#7790](https://github.com/babel/babel/pull/7790) update targets [skip ci]. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-transform-instanceof`
  * [#7827](https://github.com/babel/babel/pull/7827) Expand README for plugin-transform-instanceof [skip ci]. ([@mmantel](https://github.com/mmantel))

#### :house: Internal
* Other
  * [#7925](https://github.com/babel/babel/pull/7925) Update test262 and flow tests. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  * [#7916](https://github.com/babel/babel/pull/7916) Use the correct Babylon plugins for Test262 tests. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  * [#7906](https://github.com/babel/babel/pull/7906) Update @babel/plugin-codemod-object-assign-to-object-spread version. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  * [#7851](https://github.com/babel/babel/pull/7851) remove since we have other issue templates [skip ci]. ([@hzoo](https://github.com/hzoo))
  * [#7839](https://github.com/babel/babel/pull/7839) add lock bot for closed issues [skip ci]. ([@hzoo](https://github.com/hzoo))
  * [#7811](https://github.com/babel/babel/pull/7811) Upgrade to gulp@4. ([@existentialism](https://github.com/existentialism))
  * [#7794](https://github.com/babel/babel/pull/7794) add loose to object spread. ([@hzoo](https://github.com/hzoo))
  * [#7792](https://github.com/babel/babel/pull/7792) Fix indent in .travis.yml. ([@shirohana](https://github.com/shirohana))
* `babel-core`, `babylon`
  * [#7904](https://github.com/babel/babel/pull/7904) Fix typescript decorator test. ([@existentialism](https://github.com/existentialism))
* `babel-plugin-transform-classes`
  * [#7893](https://github.com/babel/babel/pull/7893) fix typo in a comment. ([@aaronabramov](https://github.com/aaronabramov))
* `babel-core`, `babel-plugin-proposal-logical-assignment-operators`, `babel-plugin-proposal-nullish-coalescing-operator`, `babel-plugin-syntax-logical-assignment-operators`, `babel-plugin-syntax-nullish-coalescing-operator`
  * [#7825](https://github.com/babel/babel/pull/7825) Unify `main` property in package.json [ci skip]. ([@shirohana](https://github.com/shirohana))
* `babel-core`, `babel-helper-module-imports`, `babel-helper-transform-fixture-test-runner`, `babel-plugin-transform-modules-commonjs`, `babel-preset-es2015`
  * [#7784](https://github.com/babel/babel/pull/7784) Upgrade Babel to self-host with beta.46. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-plugin-proposal-class-properties`
  * [#7814](https://github.com/babel/babel/pull/7814) Don't fold class property calls. ([@jridgewell](https://github.com/jridgewell))

## v7.0.0-beta.46 (2018-04-23)

* Fix regression by landing [#7783](https://github.com/babel/babel/pull/7783)

## v7.0.0-beta.45 (2018-04-23)

- Drop Node 4 Support (ends 4/30).
- Make Stage 2 decorators "default" (implementation is still WIP), and require people use the `decoratorsLegacy` option for easier migration.
- Change `@babel/polyfill` to not throw an error but a warning if it is imported multiple times. Also introduce another entry point without the warning
- Change how Babel handles config files regarding a lot of cases, especially for compiling `node_modules`. Introduce `babel.config.js`
  - If you are using a monorepo an a single `.babelrc`, you will need to change to `babel.config.js` like Babel itself is doing (https://github.com/babel/babel/pull/7784)
- Add ES2018 to `@babel/preset-env`: like object rest/spread, etc.
- Lots of spec and bug fixes! Shoutout to Justin (@jridgewell) and Josh (@CodingItWrong) for all the PR work for private properties!

#### :boom: Breaking Change
* `babel-cli`, `babel-core`, `babel-preset-env`, `babel-register`
  * [#7358](https://github.com/babel/babel/pull/7358) Allow more flexible file-based configuration while preventing .babelrcs from breaking things. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babylon`
  * [#7755](https://github.com/babel/babel/pull/7755) drop support for Node.js v4. ([@boneskull](https://github.com/boneskull))
* `babel-core`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-decorators`, `babel-plugin-syntax-decorators`, `babel-plugin-transform-function-name`, `babel-preset-stage-0`, `babel-preset-stage-1`, `babel-preset-stage-2`
  * [#7734](https://github.com/babel/babel/pull/7734) Decorators legacy option. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :rocket: New Feature
* `babel-polyfill`
  * [#6371](https://github.com/babel/babel/pull/6371) Add noConflict entry mode to @babel/polyfill. ([@evan-scott-zocdoc](https://github.com/evan-scott-zocdoc))
* `babel-cli`, `babel-core`, `babel-preset-env`, `babel-register`
  * [#7358](https://github.com/babel/babel/pull/7358) Allow more flexible file-based configuration while preventing .babelrcs from breaking things. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-generator`, `babel-types`, `babylon`
  * [#7741](https://github.com/babel/babel/pull/7741) Add support for flow implements. ([@existentialism](https://github.com/existentialism))
* `babel-preset-env`
  * [#7658](https://github.com/babel/babel/pull/7658) Add initial support for ES2018 in preset-env. ([@existentialism](https://github.com/existentialism))
* `babel-core`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-decorators`, `babel-plugin-proposal-function-bind`, `babel-plugin-transform-classes`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-flow-strip-types`, `babel-plugin-transform-function-name`, `babel-plugin-transform-jscript`, `babel-plugin-transform-parameters`, `babel-plugin-transform-react-jsx`, `babel-plugin-transform-runtime`, `babel-standalone`
  * [#7411](https://github.com/babel/babel/pull/7411) Add "use strict" directive. ([@MarkusToe](https://github.com/MarkusToe))
* `babel-helper-transform-fixture-test-runner`
  * [#7679](https://github.com/babel/babel/pull/7679) Add option to overwrite failing output fixtures. ([@jridgewell](https://github.com/jridgewell))
* `babel-generator`, `babel-helper-define-map`, `babel-plugin-syntax-class-properties`, `babel-plugin-transform-parameters`, `babel-plugin-transform-react-constant-elements`, `babel-traverse`, `babel-types`
  * [#7666](https://github.com/babel/babel/pull/7666) Private Properties phase 1. ([@jridgewell](https://github.com/jridgewell))

#### :eyeglasses: Spec Compliancy
* `babel-helper-simple-access`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-modules-systemjs`
  * [#7766](https://github.com/babel/babel/pull/7766) Correct update expression Number coercion. ([@jridgewell](https://github.com/jridgewell))
* `babel-core`, `babel-generator`, `babel-plugin-proposal-decorators`, `babel-types`, `babylon`
  * [#7719](https://github.com/babel/babel/pull/7719) Update decorators parsing. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-plugin-transform-classes`
  * [#7732](https://github.com/babel/babel/pull/7732) Fix default class super inheritance. ([@jridgewell](https://github.com/jridgewell))
* `babel-plugin-transform-template-literals`
  * [#7722](https://github.com/babel/babel/pull/7722) Remove tagged template literal global caching. ([@jridgewell](https://github.com/jridgewell))
* `babel-helper-replace-supers`, `babel-plugin-proposal-class-properties`, `babel-plugin-transform-classes`, `babel-plugin-transform-exponentiation-operator`, `babel-plugin-transform-object-super`
  * [#7691](https://github.com/babel/babel/pull/7691) Fix super nested class bugs. ([@jridgewell](https://github.com/jridgewell))
* `babel-helper-replace-supers`, `babel-helpers`, `babel-plugin-proposal-class-properties`, `babel-plugin-transform-classes`, `babel-plugin-transform-exponentiation-operator`, `babel-plugin-transform-object-super`, `babel-preset-env`
  * [#7687](https://github.com/babel/babel/pull/7687) Get set helpers. ([@jridgewell](https://github.com/jridgewell))

#### :bug: Bug Fix
* `babel-helper-simple-access`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-modules-systemjs`
  * [#7766](https://github.com/babel/babel/pull/7766) Correct update expression Number coercion. ([@jridgewell](https://github.com/jridgewell))
* `babel-helper-replace-supers`, `babel-plugin-transform-classes`, `babel-plugin-transform-object-super`
  * [#7774](https://github.com/babel/babel/pull/7774) Update super property get/set/call in loose mode. ([@jridgewell](https://github.com/jridgewell))
* `babel-helper-member-expression-to-functions`, `babel-helper-replace-supers`, `babel-plugin-transform-classes`
  * [#7776](https://github.com/babel/babel/pull/7776) Memoize computed super properties. ([@jridgewell](https://github.com/jridgewell))
* `babel-core`, `babel-helpers`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-decorators`, `babel-plugin-transform-classes`, `babel-plugin-transform-function-name`, `babel-plugin-transform-parameters`, `babel-plugin-transform-react-jsx`, `babel-plugin-transform-runtime`, `babel-preset-env`
  * [#7772](https://github.com/babel/babel/pull/7772) Move subclass inheritance to end. ([@jridgewell](https://github.com/jridgewell))
* `babel-generator`
  * [#7769](https://github.com/babel/babel/pull/7769) [bebal-generator] fix: don't write ': ' token when name is null. ([@Quramy](https://github.com/Quramy))
* `babylon`
  * [#7752](https://github.com/babel/babel/pull/7752) Fix type error. ([@andy-ms](https://github.com/andy-ms))
* `babel-helper-replace-supers`, `babel-plugin-proposal-class-properties`, `babel-plugin-transform-classes`, `babel-plugin-transform-exponentiation-operator`, `babel-plugin-transform-object-super`
  * [#7691](https://github.com/babel/babel/pull/7691) Fix super nested class bugs. ([@jridgewell](https://github.com/jridgewell))
* `babel-types`
  * [#7706](https://github.com/babel/babel/pull/7706) Fix literal type annotation argument number. ([@hendrikniemann](https://github.com/hendrikniemann))
* `babel-helper-function-name`, `babel-plugin-transform-function-name`
  * [#7435](https://github.com/babel/babel/pull/7435) Fix function name computation for literal values. ([@Axnyff](https://github.com/Axnyff))
* `babel-plugin-proposal-class-properties`
  * [#7659](https://github.com/babel/babel/pull/7659) Fix super in class fields.. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-plugin-proposal-optional-chaining`, `babel-types`
  * [#7668](https://github.com/babel/babel/pull/7668) OptionalMemberExpression properties are not referenced. ([@jridgewell](https://github.com/jridgewell))

#### :nail_care: Polish
* `babel-helpers`
  * [#7745](https://github.com/babel/babel/pull/7745) Improve asyncIterator error. ([@jquense](https://github.com/jquense))
* `babel-helper-replace-supers`, `babel-plugin-transform-classes`, `babel-plugin-transform-exponentiation-operator`, `babel-plugin-transform-object-super`, `babel-traverse`
  * [#7737](https://github.com/babel/babel/pull/7737) Classes cleanup. ([@jridgewell](https://github.com/jridgewell))
* `babel-plugin-proposal-class-properties`, `babel-plugin-transform-parameters`
  * [#6656](https://github.com/babel/babel/pull/6656) Optimize class properties output. ([@Andarist](https://github.com/Andarist))
* `babylon`
  * [#7717](https://github.com/babel/babel/pull/7717) Provide better error message for invalid default export declaration. ([@dczombera](https://github.com/dczombera))
* `babel-helper-replace-supers`, `babel-plugin-transform-classes`
  * [#7714](https://github.com/babel/babel/pull/7714) Use new isInStrictMode. ([@jridgewell](https://github.com/jridgewell))
* `babel-plugin-transform-object-super`
  * [#7681](https://github.com/babel/babel/pull/7681) Cleanup object super traversal. ([@jridgewell](https://github.com/jridgewell))

#### :memo: Documentation
* `babel-plugin-proposal-decorators`, `babel-preset-stage-0`, `babel-preset-stage-1`, `babel-preset-stage-2`
  * [#7762](https://github.com/babel/babel/pull/7762) Fix small typo with decorators legacy option [skip ci]. ([@existentialism](https://github.com/existentialism))
* Other
  * [#7713](https://github.com/babel/babel/pull/7713) Add slack links to CONTRIBUTING.md. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  * [#7676](https://github.com/babel/babel/pull/7676) update sponsors, move up [skip ci]. ([@hzoo](https://github.com/hzoo))

#### :house: Internal
* `babel-helper-replace-supers`, `babel-plugin-proposal-class-properties`, `babel-plugin-transform-classes`, `babel-plugin-transform-parameters`
  * [#7750](https://github.com/babel/babel/pull/7750) Move more class state out of replaceSupers. ([@jridgewell](https://github.com/jridgewell))
* `babel-helper-member-expression-to-functions`, `babel-helper-replace-supers`, `babel-plugin-transform-classes`, `babel-plugin-transform-exponentiation-operator`, `babel-plugin-transform-object-super`
  * [#7763](https://github.com/babel/babel/pull/7763) Implement MemberExpressionToFunctions helper. ([@jridgewell](https://github.com/jridgewell))
* `babel-helper-replace-supers`, `babel-plugin-transform-classes`, `babel-plugin-transform-exponentiation-operator`, `babel-plugin-transform-object-super`, `babel-traverse`
  * [#7737](https://github.com/babel/babel/pull/7737) Classes cleanup. ([@jridgewell](https://github.com/jridgewell))
* `babel-helper-transform-fixture-test-runner`
  * [#7729](https://github.com/babel/babel/pull/7729) Drop Chai from packages. ([@jridgewell](https://github.com/jridgewell))
* `babel-helper-transform-fixture-test-runner`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-optional-catch-binding`, `babel-plugin-transform-block-scoping`, `babel-plugin-transform-classes`, `babel-plugin-transform-computed-properties`, `babel-plugin-transform-jscript`, `babel-plugin-transform-object-super`
  * [#7720](https://github.com/babel/babel/pull/7720) Migrate more packages' tests to use jest expect assertions. ([@devenbansod](https://github.com/devenbansod))
* `babel-cli`, `babel-core`, `babel-generator`, `babel-plugin-proposal-decorators`, `babel-plugin-proposal-logical-assignment-operators`, `babel-preset-es2015`
  * [#7549](https://github.com/babel/babel/pull/7549) Migrate `babel-cli` and `babel-generator` tests to use jest-expect. ([@devenbansod](https://github.com/devenbansod))
* `babel-plugin-transform-classes`, `babel-traverse`
  * [#7712](https://github.com/babel/babel/pull/7712) Add Path#isInStrictMode. ([@jridgewell](https://github.com/jridgewell))
* Other
  * [#7708](https://github.com/babel/babel/pull/7708) ESLint: Ignore lerna.json and .git. ([@jridgewell](https://github.com/jridgewell))
  * [#7704](https://github.com/babel/babel/pull/7704) Use yarn provided by circle. ([@existentialism](https://github.com/existentialism))
* `babel-traverse`, `babel-types`
  * [#7685](https://github.com/babel/babel/pull/7685) Make babel-types type checking functions 36% faster. ([@devongovett](https://github.com/devongovett))

## v7.0.0-beta.44 (2018-04-02)

* Publish regression: was compiled against Node 8 instead of Node 4 due to an ENV mixup

## v7.0.0-beta.43 (2018-04-02)

Various fixes, also lazy-load `@babel/core` dependencies (should make config lookup and other API methods fast for other projects to use).

#### :eyeglasses: Spec Compliancy
* `babel-plugin-proposal-logical-assignment-operators`
  * [#7604](https://github.com/babel/babel/pull/7604) Logical Assignment: ensure computed key isn't recomputed. ([@jridgewell](https://github.com/jridgewell))

#### :rocket: New Feature
* `babel-node`
  * [#7471](https://github.com/babel/babel/pull/7471) added support Node's --require and -r flags in babel-node. ([@yakotika](https://github.com/yakotika))
* `babel-generator`, `babylon`
  * [#7383](https://github.com/babel/babel/pull/7383) TypeScript: support mapped type modifiers syntax. ([@andy-ms](https://github.com/andy-ms))
* `babel-template`
  * [#7583](https://github.com/babel/babel/pull/7583) Allow placeholders in JSXElements when parsing templates. ([@Andarist](https://github.com/Andarist))
* `babel-preset-env`
  * [#7242](https://github.com/babel/babel/pull/7242) Add regexp support to include/exclude. ([@aminmarashi](https://github.com/aminmarashi))

#### :bug: Bug Fix
* `babel-types`
  * [#7639](https://github.com/babel/babel/pull/7639) Allow StringLiteral and NumericLiteral as ObjectTypeProperty.key. ([@unconfident](https://github.com/unconfident))
* `babylon`
  * [#7617](https://github.com/babel/babel/pull/7617) Prevent duplicate regex flags. ([@existentialism](https://github.com/existentialism))
* `babel-preset-env`
  * [#7586](https://github.com/babel/babel/pull/7586) Tweak es2015-related plugin order in preset-env. ([@existentialism](https://github.com/existentialism))

#### :nail_care: Polish
* [#7615](https://github.com/babel/babel/pull/7615) clean makefile a bit. ([@xtuc](https://github.com/xtuc))

#### :house: Internal
* `babel-*`
  * [#7579](https://github.com/babel/babel/pull/7579) Migrate a few packages' tests to use Jest Expect (see below). ([@devenbansod](https://github.com/devenbansod))
* `babel-node`, `babel-register`
  * [#7588](https://github.com/babel/babel/pull/7588) Have @babel/core lazy-load all dependencies and make @babel/register not explode because of that. ([@loganfsmyth](https://github.com/loganfsmyth))
* Other
  * [#7609](https://github.com/babel/babel/pull/7609) Update to beta.42. ([@existentialism](https://github.com/existentialism))
  * [#7599](https://github.com/babel/babel/pull/7599) Centralize Babel's own compilation config to make it easier to follow.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-plugin-transform-classes`, `babel-preset-env`
  * [#7605](https://github.com/babel/babel/pull/7605) Disable flow on transformClass, fix preset-env errors. ([@thymikee](https://github.com/thymikee))
* `babel-cli`, `babel-core`, `babel-helpers`, `babel-node`, `babel-plugin-transform-for-of`, `babel-preset-env`, `babylon`
  * [#7602](https://github.com/babel/babel/pull/7602) Remove obsolete max-len eslint rule and reformat some stuff to fit. ([@danez](https://github.com/danez))
* `babel-plugin-transform-classes`
  * [#7444](https://github.com/babel/babel/pull/7444) Refactor inheritance in babel-plugin-transform-classes. ([@thymikee](https://github.com/thymikee))

## v7.0.0-beta.42 (2018-03-15)

#### :boom: Breaking Change
* `babel-helper-module-transforms`, `babel-plugin-transform-classes`, `babel-plugin-transform-modules-commonjs`
  * [#7545](https://github.com/babel/babel/pull/7545) Make `import`s in `.mjs` files use node-like behavior where 'exports' is '.default' only. . ([@loganfsmyth](https://github.com/loganfsmyth))

#### :rocket: New Feature
* `babel-helper-module-transforms`, `babel-plugin-transform-classes`, `babel-plugin-transform-modules-commonjs`
  * [#7545](https://github.com/babel/babel/pull/7545) Make `import`s in `.mjs` files use node-like behavior where 'exports' is '.default' only. . ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-plugin-proposal-object-rest-spread`, `babel-plugin-transform-destructuring`
  * [#7390](https://github.com/babel/babel/pull/7390) Favour extends helper over objectWithoutProperties when whole object …. ([@Andarist](https://github.com/Andarist))

#### :bug: Bug Fix
* `babel-preset-env`
  * [#7562](https://github.com/babel/babel/pull/7562) Use helper-module-import inside preset-env. ([@existentialism](https://github.com/existentialism))
* `babel-core`, `babel-helper-plugin-utils`
  * [#7580](https://github.com/babel/babel/pull/7580) Ensure that the backward-compat logic for plugin-utils copies over the version API properly.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-plugin-proposal-async-generator-functions`
  * [#7575](https://github.com/babel/babel/pull/7575) Fix "Module build failed: Error: Cannot find module '@babel/types'". ([@mgroenhoff](https://github.com/mgroenhoff))
* `babel-helpers`, `babel-plugin-transform-classes`, `babel-preset-env`
  * [#7570](https://github.com/babel/babel/pull/7570) Fix incorrect value of _cache in _wrapNativeSuper. ([@simonkberg](https://github.com/simonkberg))

#### :nail_care: Polish
* `babel-helpers`, `babel-plugin-transform-classes`, `babel-preset-env`
  * [#7188](https://github.com/babel/babel/pull/7188) Wrap wrapNativeSuper helpers in redefining functions for better tree-…. ([@Andarist](https://github.com/Andarist))
* `babel-plugin-proposal-object-rest-spread`, `babel-plugin-transform-destructuring`
  * [#7390](https://github.com/babel/babel/pull/7390) Favour extends helper over objectWithoutProperties when whole object …. ([@Andarist](https://github.com/Andarist))

#### :memo: Documentation
* `babylon`
  * [#7571](https://github.com/babel/babel/pull/7571) Remove outdated spec deviation note. ([@benwiley4000](https://github.com/benwiley4000))

#### :house: Internal
* `babel-generator`, `babel-plugin-transform-typescript`
  * [#7578](https://github.com/babel/babel/pull/7578) Rename actual/expected test files to input/output. ([@CodingItWrong](https://github.com/CodingItWrong))
* Other
  * [#7568](https://github.com/babel/babel/pull/7568) update to beta.41. ([@hzoo](https://github.com/hzoo))

## v7.0.0-beta.41 (2018-03-14)

#### :boom: Breaking Change
* `babel-cli`, `babel-core`, `babel-generator`, `babel-helper-transform-fixture-test-runner`
  * [#7500](https://github.com/babel/babel/pull/7500) Remove the sourceMapTarget option from core and implement it in babel-cli.. ([@loganfsmyth](https://github.com/loganfsmyth))

We'll need to update tooling for this ^. Also published `gulp-babel@8.0.0-beta.2`

* `babel-helpers`, `babel-plugin-transform-modules-commonjs`, `babel-traverse`
  * [#7491](https://github.com/babel/babel/pull/7491) Explicitly throw if the array rest/spread items are not iterable.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babylon`
  * [#7498](https://github.com/babel/babel/pull/7498) Disallow setters to have RestElement. ([@danez](https://github.com/danez))
* `babel-helper-remap-async-to-generator`, `babel-plugin-proposal-async-generator-functions`, `babel-plugin-transform-async-to-generator`, `babel-preset-env`
  * [#7446](https://github.com/babel/babel/pull/7446) Always transform for-await in async functions[rebase of #6953].. ([@Gvozd](https://github.com/Gvozd))
* `babel-core`, `babel-helper-module-imports`, `babel-helper-transform-fixture-test-runner`, `babel-plugin-transform-modules-amd`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-modules-umd`, `babel-preset-env-standalone`, `babel-preset-env`, `babel-standalone`
  * [#7417](https://github.com/babel/babel/pull/7417) Rely entirely on sourceType for module vs script differentiation.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-core`, `babel-helpers`, `babel-plugin-transform-modules-commonjs`
  * [#7436](https://github.com/babel/babel/pull/7436) Default to `ast:false` and do less work when loading core. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-register`
  * [#7416](https://github.com/babel/babel/pull/7416) Replace instead of merging babel-register options, and resolve cwd up front. ([@loganfsmyth](https://github.com/loganfsmyth))

#### :eyeglasses: Spec Compliancy
* `babylon`
  * [#7503](https://github.com/babel/babel/pull/7503) Update test262 test script and a few keyword escape fixes. ([@existentialism](https://github.com/existentialism))
  * [#7498](https://github.com/babel/babel/pull/7498) Disallow setters to have RestElement. ([@danez](https://github.com/danez))
  * [#7392](https://github.com/babel/babel/pull/7392) Spec Violation: Fix var initializer in for-in loop. ([@ksashikumar](https://github.com/ksashikumar))

#### :rocket: New Feature
* `babel-core`
  * [#7472](https://github.com/babel/babel/pull/7472) Expose the partial Babel config for callers to load and mutate.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-*`
  * [#7450](https://github.com/babel/babel/pull/7450) Allow plugins to assert that a specific babel version has loaded the plugin.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-cli`, `babel-preset-env`
  * [#7439](https://github.com/babel/babel/pull/7439) feat(babel-cli): add a brief summary to build output. ([@thymikee](https://github.com/thymikee))
* `babel-generator`, `babel-plugin-transform-typescript`, `babel-types`, `babylon`
  * [#7159](https://github.com/babel/babel/pull/7159) typescript: Support definite assignment assertion. ([@andy-ms](https://github.com/andy-ms))
* `babel-generator`, `babel-types`, `babylon`
  * [#7404](https://github.com/babel/babel/pull/7404) TypeScript: Support conditional types syntax. ([@andy-ms](https://github.com/andy-ms))
* `babel-core`, `babel-plugin-proposal-logical-assignment-operators`, `babel-plugin-syntax-logical-assignment-operators`, `babel-preset-stage-0`, `babylon`
  * [#7385](https://github.com/babel/babel/pull/7385) Proposal: Logical Assignment Operators. ([@jridgewell](https://github.com/jridgewell))

#### :bug: Bug Fix
* `babel-core`
  * [#7561](https://github.com/babel/babel/pull/7561) Fix import of type ConfigItem. ([@danez](https://github.com/danez))
* `babel-preset-env`
  * [#7548](https://github.com/babel/babel/pull/7548) preset-env - add Symbol.asyncIterator to shippedProposals builtIns. ([@yaelhe](https://github.com/yaelhe))
  * [#7421](https://github.com/babel/babel/pull/7421) Add Number.parseFloat/parseInt mappins for preset-env 'usage'. ([@existentialism](https://github.com/existentialism))
  * [#7438](https://github.com/babel/babel/pull/7438) Ensure babel-preset-env targets input object is not mutated. ([@guybedford](https://github.com/guybedford))
  * [#7400](https://github.com/babel/babel/pull/7400) Add missing promise polyfill deps for preset-env's useBuiltIns: usage. ([@existentialism](https://github.com/existentialism))
* `babylon`
  * [#7538](https://github.com/babel/babel/pull/7538) Make 'sourceType:unambiguous' use 'module' when import.meta is used.. ([@loganfsmyth](https://github.com/loganfsmyth))
  * [#7392](https://github.com/babel/babel/pull/7392) Spec Violation: Fix var initializer in for-in loop. ([@ksashikumar](https://github.com/ksashikumar))
  * [#7473](https://github.com/babel/babel/pull/7473) Remove broken check in checkFunctionNameAndParams. ([@ksashikumar](https://github.com/ksashikumar))
* `babel-plugin-transform-destructuring`
  * [#7333](https://github.com/babel/babel/pull/7333) Assign another temp var when parsing assignment patterns in destructuring. ([@existentialism](https://github.com/existentialism))
* `babel-helpers`, `babel-plugin-transform-modules-commonjs`, `babel-traverse`
  * [#7491](https://github.com/babel/babel/pull/7491) Explicitly throw if the array rest/spread items are not iterable.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-node`
  * [#7511](https://github.com/babel/babel/pull/7511) Restore passing SIGINT signals to spawned child processes. ([@existentialism](https://github.com/existentialism))
* `babel-helper-remap-async-to-generator`, `babel-plugin-proposal-async-generator-functions`, `babel-plugin-transform-async-to-generator`, `babel-preset-env`
  * [#7446](https://github.com/babel/babel/pull/7446) Always transform for-await in async functions[rebase of #6953].. ([@Gvozd](https://github.com/Gvozd))
* `babel-cli`
  * [#7461](https://github.com/babel/babel/pull/7461) Require users to pass a filename, or specify --no-babelrc when using CLI with stdin.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-helper-module-transforms`, `babel-plugin-transform-modules-commonjs`
  * [#7418](https://github.com/babel/babel/pull/7418) Avoid re-traversing inserted references to the namespace binding.. ([@loganfsmyth](https://github.com/loganfsmyth))
  * [#7378](https://github.com/babel/babel/pull/7378) Preserve import binding locations during module rewriting. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-plugin-proposal-object-rest-spread`
  * [#7364](https://github.com/babel/babel/pull/7364) Don't extract rest elements from nested expressions. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  * [#7388](https://github.com/babel/babel/pull/7388) Fix over-zealous traversal by object-rest-spread. ([@jamesreggio](https://github.com/jamesreggio))
* `babel-helpers`, `babel-plugin-proposal-object-rest-spread`, `babel-preset-env`
  * [#7034](https://github.com/babel/babel/pull/7034) Fix object spread according to spec. ([@nuragic](https://github.com/nuragic))

#### :nail_care: Polish
* `babel-generator`
  * [#7550](https://github.com/babel/babel/pull/7550) Replace lodash/map with array equivalent. ([@danez](https://github.com/danez))
* `babylon`
  * [#7538](https://github.com/babel/babel/pull/7538) Make 'sourceType:unambiguous' use 'module' when import.meta is used.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-helpers`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-decorators`, `babel-plugin-transform-classes`, `babel-plugin-transform-parameters`
  * [#7493](https://github.com/babel/babel/pull/7493) Reuse the `assertThisInitialized` helper in `possibleConstructorReturn`. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-core`, `babel-plugin-transform-modules-commonjs`, `babylon`
  * [#7490](https://github.com/babel/babel/pull/7490) Give helpful errors if the wrong sourceType is detected. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-core`
  * [#7238](https://github.com/babel/babel/pull/7238) Better error message for invalid plugin/preset. ([@SpainTrain](https://github.com/SpainTrain))
* `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-react-constant-elements`, `babel-plugin-transform-react-jsx`, `babel-traverse`
  * [#7372](https://github.com/babel/babel/pull/7372) Mark hoisted react constant elements as #__PURE__. ([@Andarist](https://github.com/Andarist))
* `babel-helpers`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-template-literals`
  * [#7379](https://github.com/babel/babel/pull/7379) Solves Tagged template literal size optimization. ([@debugpai2](https://github.com/debugpai2))

#### :memo: Documentation
* `README.md`
  * [#7496](https://github.com/babel/babel/pull/7496) Docs: Use namespace packages in all links. ([@danez](https://github.com/danez))
* `babel-plugin-transform-typescript`
  * [#7469](https://github.com/babel/babel/pull/7469) TS transform plugin README updatex2. ([@orta](https://github.com/orta))
  * [#7443](https://github.com/babel/babel/pull/7443) Update README for Babel TypeScript Plugin. ([@orta](https://github.com/orta))
* `babel-generator`
  * [#7380](https://github.com/babel/babel/pull/7380) Link generator readme to Babylon AST spec [skip ci]. ([@modernserf](https://github.com/modernserf))

#### :house: Internal
* Other
  * [#7560](https://github.com/babel/babel/pull/7560) Run node 9 on circleci and remove from travis. ([@danez](https://github.com/danez))
  * [#7556](https://github.com/babel/babel/pull/7556) Re-add TEST_ONLY and use Jest's -t for TEST_GREP.. ([@loganfsmyth](https://github.com/loganfsmyth))
  * [#7530](https://github.com/babel/babel/pull/7530) Run build-no-bundle in the watcher to get the right files.. ([@loganfsmyth](https://github.com/loganfsmyth))
  * [#7510](https://github.com/babel/babel/pull/7510) Use jest workers on travis-ci and circleCI. ([@danez](https://github.com/danez))
  * [#7499](https://github.com/babel/babel/pull/7499) Wmertens add prettier config. ([@danez](https://github.com/danez))
  * [#7191](https://github.com/babel/babel/pull/7191) Add eslint plugin to disallow `t.clone` and `t.cloneDeep`. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  * [#7454](https://github.com/babel/babel/pull/7454) Dependency cleanup. ([@danez](https://github.com/danez))
  * [#7451](https://github.com/babel/babel/pull/7451) Update to circleci v2. ([@danez](https://github.com/danez))
  * [#7453](https://github.com/babel/babel/pull/7453) Install peerDependencies and remove unused async dependency. ([@danez](https://github.com/danez))
* `babel-preset-env`
  * [#7543](https://github.com/babel/babel/pull/7543) update preset-env after build-data. ([@yaelhe](https://github.com/yaelhe))
  * [#7401](https://github.com/babel/babel/pull/7401) Bump compat-table and regen preset-env data. ([@existentialism](https://github.com/existentialism))
* `babel-core`, `babel-helper-transform-fixture-test-runner`
  * [#7513](https://github.com/babel/babel/pull/7513) Migrate babel-core tests to use jest-expect. ([@devenbansod](https://github.com/devenbansod))
* `babel-helper-transform-fixture-test-runner`
  * [#7520](https://github.com/babel/babel/pull/7520) Show a more useful diff when comparing fixture files.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-register`
  * [#7494](https://github.com/babel/babel/pull/7494) Fix reseting modules in jest and config. ([@danez](https://github.com/danez))
  * [#7487](https://github.com/babel/babel/pull/7487) Enable and fix babel-register tests. ([@danez](https://github.com/danez))
* `babel-*`
  * [#7484](https://github.com/babel/babel/pull/7484) Require tests to use input.mjs for modules, and output.js/.mjs based on active transforms. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-code-frame`
  * [#7485](https://github.com/babel/babel/pull/7485) Migrate `babel-code-frame` tests to use `expect`. ([@devenbansod](https://github.com/devenbansod))
* `babel-cli`, `babel-code-frame`, `babel-core`, `babel-helper-transform-fixture-test-runner`, `babel-preset-env-standalone`, `babel-preset-env`, `babel-register`, `babel-standalone`, `babel-traverse`, `babel-types`
  * [#7455](https://github.com/babel/babel/pull/7455) Use jest. ([@danez](https://github.com/danez))
* `babel-types`, `babylon`
  * [#7431](https://github.com/babel/babel/pull/7431) Upgrade flow to 0.66 and fix a few minor errors.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-template`, `babel-types`, `babylon`
  * [#7227](https://github.com/babel/babel/pull/7227) Fix up flow errors. ([@existentialism](https://github.com/existentialism))
* `babel-helper-module-transforms`, `babel-helper-split-export-declaration`, `babel-plugin-proposal-class-properties`, `babel-plugin-transform-classes`, `babel-plugin-transform-function-name`, `babel-traverse`
  * [#7313](https://github.com/babel/babel/pull/7313) Added babel-helper-split-export-declaration. ([@Andarist](https://github.com/Andarist))

## v7.0.0-beta.40 (2018-02-12)

#### :rocket: New Feature
* `babel-preset-env`
  * [#7315](https://github.com/babel/babel/pull/7315) Add core-js as valid polyfill source. ([@danez](https://github.com/danez))
* `babel-highlight`
  *[#7351](https://github.com/babel/babel/pull/7351) Extract `@babel/highlight` package from `@babel/code-frame` ([@suchipi](https://github.com/suchipi))

#### :bug: Bug Fix
* `babel-cli`
  * [#7366](https://github.com/babel/babel/pull/7366) Fix CLI compilation callback calling. ([@VojtechStep](https://github.com/VojtechStep))
* `babel-code-frame`
  * [#7341](https://github.com/babel/babel/pull/7341) Allow falsey, yet valid options for codeFrameColumns(). ([@hulkish](https://github.com/hulkish))
* `babel-generator`, `babel-plugin-proposal-optional-chaining`, `babel-types`, `babylon`
  * [#7288](https://github.com/babel/babel/pull/7288) [BugFix] : OptionalChaining Bug fixes. ([@nveenjain](https://github.com/nveenjain))
* `babel-core`, `babel-template`, `babel-traverse`
  * [#7314](https://github.com/babel/babel/pull/7314) Add location information to parsing errors. ([@kaicataldo](https://github.com/kaicataldo))
* `babel-plugin-proposal-pipeline-operator`
  * [#7319](https://github.com/babel/babel/pull/7319) Do not optimize away async/gen arrow functions. ([@jridgewell](https://github.com/jridgewell))
* `babel-traverse`
  * [#7312](https://github.com/babel/babel/pull/7312) Preserve identifier location information when mapping this and arguments.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babylon`
  * [#7297](https://github.com/babel/babel/pull/7297) [Typescript] - Fix SyntaxError in async arrow functions with rest params. ([@ksashikumar](https://github.com/ksashikumar))

#### :memo: Documentation
* `babel-plugin-proposal-unicode-property-regex`
  * [#7311](https://github.com/babel/babel/pull/7311) Remove outdated sentence from README. ([@mathiasbynens](https://github.com/mathiasbynens))

#### :house: Internal
* `babel-preset-env`
  * [#7344](https://github.com/babel/babel/pull/7344) Fix failing test. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* Other
  * [#7302](https://github.com/babel/babel/pull/7302) Update babel to beta.39. ([@hzoo](https://github.com/hzoo))
* `babylon`
  * [#7240](https://github.com/babel/babel/pull/7240) Compile Babylon with the normal workflow and use "overrides" in our c…. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.0.0-beta.39 (2018-01-30)

#### :eyeglasses: Spec Compliancy
* `babel-plugin-proposal-optional-chaining`
  * [#6345](https://github.com/babel/babel/pull/6345) Remove old optional chain features. ([@jridgewell](https://github.com/jridgewell))

#### :rocket: New Feature
* `babel-polyfill`, `babel-preset-env`, `babel-register`, `babel-runtime`
  * [#6526](https://github.com/babel/babel/pull/6526) Add some es5 features to babel-preset-env. ([@existentialism](https://github.com/existentialism))
* `babel-core`
  * [#7291](https://github.com/babel/babel/pull/7291) babel-core: Add parse method. ([@kaicataldo](https://github.com/kaicataldo))
* `babel-preset-env`, `babel-preset-es2015`
  * [#7283](https://github.com/babel/babel/pull/7283) Support cjs shorthand for modules option in preset-es2015 & preset-env. ([@Andarist](https://github.com/Andarist))
* `babel-register`
  * [#7273](https://github.com/babel/babel/pull/7273) make babel injectable in babel-register. ([@Janpot](https://github.com/Janpot))
* `babel-preset-env`
  * [#7212](https://github.com/babel/babel/pull/7212) Add preset-env target esmodules. ([@kristoferbaxter](https://github.com/kristoferbaxter))
* `babel-generator`, `babylon`
  * [#7239](https://github.com/babel/babel/pull/7239) TypeScript: Support parsing 'unique' type operator. ([@andy-ms](https://github.com/andy-ms))
* `babel-code-frame`
  * [#7243](https://github.com/babel/babel/pull/7243) Add opts.message option to code frames. ([@thejameskyle](https://github.com/thejameskyle))

#### :bug: Bug Fix
* `babel-register`
  * [#7298](https://github.com/babel/babel/pull/7298) Revert "make babel injectable in babel-register". ([@hzoo](https://github.com/hzoo))
* `babel-plugin-proposal-decorators`, `babylon`
  * [#7189](https://github.com/babel/babel/pull/7189) Bug-fix: export default decorated class parsed as class expression. ([@nveenjain](https://github.com/nveenjain))
* `babel-plugin-transform-typescript`
  * [#7160](https://github.com/babel/babel/pull/7160) typescript: Fix enum emit when values are strings. ([@andy-ms](https://github.com/andy-ms))
* `babel-helper-annotate-as-pure`
  * [#7245](https://github.com/babel/babel/pull/7245) Tweak and add tests to babel-helper-annotate-as-pure. ([@existentialism](https://github.com/existentialism))

#### :nail_care: Polish
* `babel-template`
  * [#7255](https://github.com/babel/babel/pull/7255) update substitution placeholder message in babel-template. ([@thescientist13](https://github.com/thescientist13))

#### :memo: Documentation
* `babel-preset-env`
  * [#7271](https://github.com/babel/babel/pull/7271) babel-preset-env: Fixed links in readme and improved "Built-ins" example. ([@apepper](https://github.com/apepper))

#### :house: Internal
* `babel-*`
  * [#7149](https://github.com/babel/babel/pull/7149) Disallow duplicated nodes (only in tests output). ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-helper-transform-fixture-test-runner`
  * [#7149](https://github.com/babel/babel/pull/7149) Disallow duplicated nodes (only in tests output). ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-plugin-check-constants`, `babel-plugin-transform-block-scoping`, `babel-preset-env`, `babel-preset-es2015`, `babel-standalone`
  * [#6987](https://github.com/babel/babel/pull/6987) Remove check-constants plugin. ([@maurobringolf](https://github.com/maurobringolf))
* `babylon`
  * [#7246](https://github.com/babel/babel/pull/7246) Make comment props more consistent. ([@existentialism](https://github.com/existentialism))
* `babel-plugin-transform-eval`, `babel-standalone`
  * [#7262](https://github.com/babel/babel/pull/7262) Removed transform eval plugin. ([@rajzshkr](https://github.com/rajzshkr))
* Other
  * [#7231](https://github.com/babel/babel/pull/7231) Update to beta.38. ([@hzoo](https://github.com/hzoo))

## v7.0.0-beta.38 (2018-01-17)

#### :bug: Bug Fix
* `babylon`
  * [#7225](https://github.com/babel/babel/pull/7225) typescript: Properly set this.state.inType one token before parsing a type. ([@andy-ms](https://github.com/andy-ms))
  * [#7179](https://github.com/babel/babel/pull/7179) Issue #6691 - Fix: unicode characters not allowed in regexes. ([@perinikhil](https://github.com/perinikhil))
  * [#7098](https://github.com/babel/babel/pull/7098) Support 'assert and assign' TypeScript syntax. ([@maaz93](https://github.com/maaz93))
* `babel-traverse`
  * [#7219](https://github.com/babel/babel/pull/7219) Fix dependencies in @babel/traverse. ([@Andarist](https://github.com/Andarist))
* `babel-plugin-transform-async-to-generator`, `babel-traverse`
  * [#7213](https://github.com/babel/babel/pull/7213) Fixed _containerInsertAfter setting path key as stringified index. ([@Andarist](https://github.com/Andarist))
* `babel-code-frame`
  * [#7216](https://github.com/babel/babel/pull/7216) bugfix: set color level when color is forced. ([@Timer](https://github.com/Timer))
* `babel-generator`, `babel-plugin-transform-flow-strip-types`, `babylon`
  * [#7058](https://github.com/babel/babel/pull/7058) Add support for @@iterator. ([@rajzshkr](https://github.com/rajzshkr))
* `babel-plugin-transform-block-scoping`
  * [#6782](https://github.com/babel/babel/pull/6782) Minor improvements to block-scoping/tdz. ([@maurobringolf](https://github.com/maurobringolf))
* `babel-plugin-transform-react-inline-elements`
  * [#7166](https://github.com/babel/babel/pull/7166) Bail out on JSX fragments instead of throwing. ([@mdebbar](https://github.com/mdebbar))
* `babel-helper-builder-react-jsx`, `babel-plugin-transform-react-jsx`
  * [#7173](https://github.com/babel/babel/pull/7173) Preserve namespaced attributes when throwIfNamespace is false. ([@mtpc](https://github.com/mtpc))

#### :nail_care: Polish
* `babel-helpers`, `babel-plugin-transform-react-constant-elements`
  * [#7170](https://github.com/babel/babel/pull/7170) babel-helpers: prevent object shape change in jsx. ([@jorrit](https://github.com/jorrit))
* `babylon`
  * [#7184](https://github.com/babel/babel/pull/7184) Cleaning up some TS parsing tests. ([@maaz93](https://github.com/maaz93))
* `*`
  * [#7181](https://github.com/babel/babel/pull/7181) Rename actual/expected to input/output in fixtures.. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :memo: Documentation
* `babel-helper-plugin-test-runner`
  * [#7185](https://github.com/babel/babel/pull/7185) Doc changes for https://github.com/babel/babel/issues/7063. ([@rajzshkr](https://github.com/rajzshkr))
* `babylon`
  * [#7182](https://github.com/babel/babel/pull/7182) Fix syntax plugins in babylon readme [skip ci]. ([@hzoo](https://github.com/hzoo))

#### :house: Internal
* `babel-types`
  * [#7220](https://github.com/babel/babel/pull/7220) Remove old comment. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  * [#7164](https://github.com/babel/babel/pull/7164) Fixes React isCompatTag validator accepting leading dash character. ([@claudiopro](https://github.com/claudiopro))
* `babel-traverse`
  * [#7218](https://github.com/babel/babel/pull/7218) Added custom NodePath.prototype.toString method as debug utility. ([@Andarist](https://github.com/Andarist))
* `babel-cli`
  * [#6826](https://github.com/babel/babel/pull/6826) Use the async version of transform in babel-cli. ([@aprieels](https://github.com/aprieels))
* `*`
  * [#7187](https://github.com/babel/babel/pull/7187) Remove old expected.{js,json} files. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-preset-env`
  * [#7183](https://github.com/babel/babel/pull/7183) Remove excess check for hidden files.. ([@yavorsky](https://github.com/yavorsky))
* Other
  * [#7180](https://github.com/babel/babel/pull/7180) Regen lib/types. ([@existentialism](https://github.com/existentialism))
  * [#7104](https://github.com/babel/babel/pull/7104) update to v7-beta.37. ([@hzoo](https://github.com/hzoo))
* `babel-generator`
  * [#7174](https://github.com/babel/babel/pull/7174) Remove "quotes" internal flag from babel-generator. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.0.0-beta.37 (2018-01-08)

Fixes + [overrides](https://github.com/babel/babel/pull/7091) config feature

#### :rocket: New Feature
* `babel-core`
  * [#7091](https://github.com/babel/babel/pull/7091) Allow configs to have an 'overrides' array. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babylon`
  * [#7007](https://github.com/babel/babel/pull/7007) Flow comment parsing. ([@rajzshkr](https://github.com/rajzshkr))
* `babel-generator`, `babel-types`
  * [#7107](https://github.com/babel/babel/pull/7107) Add validators for Flow AST node fields. ([@bcherny](https://github.com/bcherny))
* `babel-standalone`
  * [#7119](https://github.com/babel/babel/pull/7119) Add syntax-typescript and transform-typescript to babel-standalone. ([@alangpierce](https://github.com/alangpierce))

#### :bug: Bug Fix
* `babel-core`
  * [#7161](https://github.com/babel/babel/pull/7161) Process .babelignore before .babelrc. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-standalone`
  * [#7094](https://github.com/babel/babel/pull/7094) [@babel/standalone] Remove additional function context. ([@stevefan1999](https://github.com/stevefan1999))
* `babel-generator`
  * [#7155](https://github.com/babel/babel/pull/7155) Preserve jsx comment . ([@rajzshkr](https://github.com/rajzshkr))
  * [#7131](https://github.com/babel/babel/pull/7131) Fix turning division operator into line comment in compact mode. ([@karottenreibe](https://github.com/karottenreibe))
* `babel-plugin-proposal-class-properties`
  * [#7147](https://github.com/babel/babel/pull/7147) Fix computed properties being inserted after the class, thus making t…. ([@Andarist](https://github.com/Andarist))
* `babylon`
  * [#7121](https://github.com/babel/babel/pull/7121) Regex parsing issue fix  after function declaration.. ([@rajzshkr](https://github.com/rajzshkr))
* `babel-plugin-transform-computed-properties`, `babel-traverse`
  * [#7116](https://github.com/babel/babel/pull/7116) Fix a regression introduced in #7040. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-helper-remap-async-to-generator`, `babel-plugin-transform-async-to-generator`
  * [#7043](https://github.com/babel/babel/pull/7043) Avoid adding #__PURE__ annotation to .bind(this)() expressions. ([@Kovensky](https://github.com/Kovensky))

#### :nail_care: Polish
* `babel-plugin-proposal-decorators`
  * [#7124](https://github.com/babel/babel/pull/7124) [decorators] Only transform declarations to expressions when needed. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babylon`
  * [#7152](https://github.com/babel/babel/pull/7152) Suggest JSX fragment syntax in adjacent tag error. ([@sophiebits](https://github.com/sophiebits))

#### :memo: Documentation
* Other
  * [#7141](https://github.com/babel/babel/pull/7141) Update license year. ([@danielbayerlein](https://github.com/danielbayerlein))
* `babel-register`
  * [#7140](https://github.com/babel/babel/pull/7140) Update README.md. ([@eladchen](https://github.com/eladchen))

#### :house: Internal
* `babylon`
  * [#7144](https://github.com/babel/babel/pull/7144) Remove redundant property declarations. ([@andy-ms](https://github.com/andy-ms))
* `babel-preset-env`
  * [#7130](https://github.com/babel/babel/pull/7130) Remove hasBeenLogged flag from preset-env. ([@h1b9b](https://github.com/h1b9b))
* `babel-generator`, `babel-plugin-proposal-class-properties`, `babel-plugin-transform-flow-strip-types`, `babel-plugin-transform-react-jsx`, `babel-plugin-transform-template-literals`, `babel-plugin-transform-typescript`, `babel-preset-env`, `babel-preset-flow`
  * [#7120](https://github.com/babel/babel/pull/7120) Regenerate fixtures. ([@Kovensky](https://github.com/Kovensky))

## v7.0.0-beta.36 (2017-12-25)

- First release to allow support for `class A extends Array`
- Add `babel-plugin-transform-dotall-regex`
- Add `lazy` option to `modules-commonjs`
- Various fixes + decorator regression fix

#### :rocket: New Feature
* `babel-helpers`, `babel-plugin-transform-classes`, `babel-preset-es2015`
  * [#7020](https://github.com/babel/babel/pull/7020) Add support for extending builtins. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-preset-env`, `babel-standalone`
  * [#7065](https://github.com/babel/babel/pull/7065) Add dot-all regex support to preset-env and standalone. ([@existentialism](https://github.com/existentialism))
* `babel-plugin-transform-dotall-regex`
  * [#7059](https://github.com/babel/babel/pull/7059) Import babel-plugin-transform-dotall-regex. ([@mathiasbynens](https://github.com/mathiasbynens))
* `babel-helper-module-transforms`, `babel-plugin-transform-modules-commonjs`
  * [#6952](https://github.com/babel/babel/pull/6952) Add a 'lazy' options to modules-commonjs. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-plugin-syntax-import-meta`, `babel-preset-stage-3`, `babel-standalone`
  * [#7008](https://github.com/babel/babel/pull/7008) expose import.meta syntax parser option as plugin. ([@dnalborczyk](https://github.com/dnalborczyk))

#### :bug: Bug Fix
* `babel-generator`
  * [#7095](https://github.com/babel/babel/pull/7095) Fix generation flow unnamed computed property. ([@TrySound](https://github.com/TrySound))
* `babel-generator`, `babel-plugin-transform-typescript`, `babylon`
  * [#7075](https://github.com/babel/babel/pull/7075) Support parsing `export default abstract class {}`. ([@andy-ms](https://github.com/andy-ms))
* `babel-generator`, `babel-plugin-transform-flow-strip-types`, `babylon`
  * [#7061](https://github.com/babel/babel/pull/7061) Treat import type * as a parser error. ([@existentialism](https://github.com/existentialism))
* `babel-types`
  * [#6960](https://github.com/babel/babel/pull/6960) babel-types lists JSXIdentifier as an Expression. ([@tolmasky](https://github.com/tolmasky))
* `babel-plugin-proposal-decorators`
  * [#7032](https://github.com/babel/babel/pull/7032) [decorators] Don't transform every AssignmentExpression. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :nail_care: Polish
* `babel-plugin-transform-typescript`
  * [#7079](https://github.com/babel/babel/pull/7079) Better error messages when Babel fails to parse import = and export =…. ([@gs-akhan](https://github.com/gs-akhan))
* `babel-core`
  * [#6961](https://github.com/babel/babel/pull/6961) Handling babylon parsing errors in a better way. ([@maaz93](https://github.com/maaz93))

#### :memo: Documentation
* `babel-plugin-proposal-unicode-property-regex`
  * [#7064](https://github.com/babel/babel/pull/7064) Fix installation instructions. ([@mathiasbynens](https://github.com/mathiasbynens))

#### :house: Internal
* `babel-preset-env`
  * [#6576](https://github.com/babel/babel/pull/6576) Remove extraneous console output when running preset-env tests. ([@xjlim](https://github.com/xjlim))
  * [#7084](https://github.com/babel/babel/pull/7084) [preset-env] Move all defaults to the separate module. ([@yavorsky](https://github.com/yavorsky))
* `babel-core`
  * [#7090](https://github.com/babel/babel/pull/7090) Refactor config processing more. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-helper-wrap-function`, `babel-plugin-proposal-class-properties`, `babel-plugin-transform-typescript`, `babel-traverse`
  * [#7040](https://github.com/babel/babel/pull/7040) Make .insert{Before,After} work by default when the parent is an eport declaration. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-plugin-transform-block-scoping`
  * [#7028](https://github.com/babel/babel/pull/7028) Fix O(n^2) getLetReferences – 40% faster on large flat files. ([@sophiebits](https://github.com/sophiebits))

## v7.0.0-beta.35 (2017-12-14)

Various bug fixes, first version of Babel to use the MIT version of `regenerator`

#### :eyeglasses: Spec Compliancy
* `babylon`
  * [#6986](https://github.com/babel/babel/pull/6986) Fix destructuring assignment spec violation. ([@ksashikumar](https://github.com/ksashikumar))
* `babel-helper-replace-supers`, `babel-helpers`, `babel-plugin-proposal-class-properties`, `babel-plugin-transform-classes`, `babel-plugin-transform-parameters`
  * [#6467](https://github.com/babel/babel/pull/6467) `this` before `super()` is a runtime error, not a static one.. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :rocket: New Feature
* `babel-generator`, `babylon`
  * [#7005](https://github.com/babel/babel/pull/7005) Add method property to ObjectTypeProperty. ([@existentialism](https://github.com/existentialism))
* Other
  * [#6994](https://github.com/babel/babel/pull/6994) Add Babel's song: Hallelujah (thanks to Angus). ([@hzoo](https://github.com/hzoo))
* `babylon`
  * [#6958](https://github.com/babel/babel/pull/6958) Update babylon to use unicode 10. ([@danez](https://github.com/danez))

#### :bug: Bug Fix
* `babel-core`, `babel-helper-remap-async-to-generator`, `babel-helper-wrap-function`, `babel-plugin-proposal-async-generator-functions`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-function-sent`, `babel-plugin-transform-async-to-generator`, `babel-preset-env`
  * [#6984](https://github.com/babel/babel/pull/6984) Wrap FunctionDeclarations with FunctionDeclarations, instead of using _blockHoist.. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-types`
  * [#6939](https://github.com/babel/babel/pull/6939) Fix type definitions to fully support Typescript. ([@dpoindexter](https://github.com/dpoindexter))
* `babel-helper-remap-async-to-generator`, `babel-plugin-transform-async-to-generator`
  * [#6999](https://github.com/babel/babel/pull/6999) Async to generator fixes. ([@Kovensky](https://github.com/Kovensky))
* `babel-generator`
  * [#6998](https://github.com/babel/babel/pull/6998) Fix code generation for async generator methods. ([@Kovensky](https://github.com/Kovensky))
* `babylon`
  * [#6986](https://github.com/babel/babel/pull/6986) Fix destructuring assignment spec violation. ([@ksashikumar](https://github.com/ksashikumar))
  * [#6969](https://github.com/babel/babel/pull/6969) For babylon typescript parser, fix false positive for `!` after a line break. ([@andy-ms](https://github.com/andy-ms))
* `babel-helper-replace-supers`, `babel-helpers`, `babel-plugin-proposal-class-properties`, `babel-plugin-transform-classes`, `babel-plugin-transform-parameters`
  * [#6467](https://github.com/babel/babel/pull/6467) `this` before `super()` is a runtime error, not a static one.. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :nail_care: Polish
* `babel-helpers`, `babel-plugin-proposal-decorators`
  * [#7017](https://github.com/babel/babel/pull/7017) Fixes 6965. ([@perinikhil](https://github.com/perinikhil))
* `babel-types`
  * [#7001](https://github.com/babel/babel/pull/7001) Improve error message in types assert. ([@existentialism](https://github.com/existentialism))
* `babylon`
  * [#6962](https://github.com/babel/babel/pull/6962) Better error message for `import.meta` and `import()` without plugin. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :house: Internal
* `babel-core`, `babel-helper-fixtures`, `babel-plugin-transform-modules-amd`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-modules-umd`, `babel-preset-env`, `babel-template`, `babel-traverse`, `babel-types`, `babylon`
  * [#6991](https://github.com/babel/babel/pull/6991) Bump prettier. ([@existentialism](https://github.com/existentialism))
* `babel-plugin-transform-regenerator`, `babel-polyfill`, `babel-runtime`
  * [#6992](https://github.com/babel/babel/pull/6992) Update to the latest version of regenerator that uses the MIT license. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-transform-react-jsx-self`, `babel-plugin-transform-react-jsx-source`, `babel-plugin-transform-react-jsx`, `babel-traverse`, `babel-types`
  * [#6967](https://github.com/babel/babel/pull/6967) Generate better builder names for JSX* and TS*. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babylon`
  * [#6982](https://github.com/babel/babel/pull/6982) publish babylon as next tag since it's not a scoped module yet [ski…. ([@hzoo](https://github.com/hzoo))

## v7.0.0-beta.34 (2017-12-02)

#### Regression Fix
* `babel-preset-stage-1`, `babel-preset-stage-2`
  * [#6949](https://github.com/babel/babel/pull/6949) Fix stage refs to exportNamespaceFrom and exportDefaultFrom. ([@existentialism](https://github.com/existentialism))

#### :eyeglasses: Spec Compliancy
* `babel-preset-stage-0`, `babel-preset-stage-1`
  * [#6943](https://github.com/babel/babel/pull/6943) Moving Do expression to stage 1. ([@rajzshkr](https://github.com/rajzshkr))

#### :house: Internal
* `babylon`
  * [#6957](https://github.com/babel/babel/pull/6957) Update flow to 0.59 and fix some flow issues. ([@danez](https://github.com/danez))
* Other
  * [#6948](https://github.com/babel/babel/pull/6948) update to beta.33. ([@hzoo](https://github.com/hzoo))
* `babel-types`
  * [#6741](https://github.com/babel/babel/pull/6741) Refactor @babel/types to be 100% ES-module. ([@danez](https://github.com/danez))

## v7.0.0-beta.33 (2017-12-01)

#### :eyeglasses: Spec Compliancy
* `babel-generator`, `babel-plugin-proposal-export-default-from`, `babel-plugin-proposal-export-default`, `babel-plugin-proposal-export-namespace-from`, `babel-plugin-proposal-export-namespace`, `babel-plugin-syntax-export-default-from`, `babel-plugin-syntax-export-extensions`, `babel-plugin-syntax-export-namespace-from`, `babel-standalone`, `babylon`
  * [#6920](https://github.com/babel/babel/pull/6920) Split exportExtensions into exportDefault and exportNamespace plugins…. ([@existentialism](https://github.com/existentialism))
* `babylon`
  * [#6725](https://github.com/babel/babel/pull/6725) Fix some reserved type handling and declare class with multiple extends. ([@existentialism](https://github.com/existentialism))

#### :boom: Breaking Change
* `babel-core`
  * [#6905](https://github.com/babel/babel/pull/6905) Merge all config & programmatic plugins/preset rather than duplicating. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babylon`
  * [#6836](https://github.com/babel/babel/pull/6836) removing expression field from ArrowFunctionExpression. ([@mmckeaveney](https://github.com/mmckeaveney))
* `babel-traverse`
  * [#6881](https://github.com/babel/babel/pull/6881) Remove double exports of NodePath, Scope and Hub in traverse. ([@danez](https://github.com/danez))
* Other
  * [#6831](https://github.com/babel/babel/pull/6831) [preset-env] Exclude transform-typeof-symbol with `loose` option.. ([@yavorsky](https://github.com/yavorsky))

#### :rocket: New Feature
* `babel-plugin-transform-for-of`
  * [#6914](https://github.com/babel/babel/pull/6914) Porting babel-plugin-transform-for-of-as-array into transform-for-of as option. ([@rajzshkr](https://github.com/rajzshkr))
* `babel-core`
  * [#6905](https://github.com/babel/babel/pull/6905) Merge all config & programmatic plugins/preset rather than duplicating. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-core`, `babel-preset-es2015`
  * [#6904](https://github.com/babel/babel/pull/6904) Add a 'cwd' option, and misc refactoring and tweaks before simple config merging. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-cli`, `babel-core`
  * [#6834](https://github.com/babel/babel/pull/6834) Expose `envName` as a top-level Babel option to avoid using environmental variables. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-helper-module-imports`
  * [#6744](https://github.com/babel/babel/pull/6744) Allowed hintedNames for namespaced imports, changed some other defaul…. ([@Andarist](https://github.com/Andarist))
* Other
  * [#6791](https://github.com/babel/babel/pull/6791) Add safari technology preview for babel-preset-env.. ([@yavorsky](https://github.com/yavorsky))
  * [#6438](https://github.com/babel/babel/pull/6438) Move babel-preset-env-standalone to the monorepo.. ([@yavorsky](https://github.com/yavorsky))
* `babel-core`, `babel-helper-remap-async-to-generator`, `babel-plugin-proposal-async-generator-functions`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-function-sent`, `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-parameters`
  * [#6803](https://github.com/babel/babel/pull/6803) Add /*#__PURE__*/ annotatiotion for babel-plugin-async-to-generator. ([@satya164](https://github.com/satya164))

#### :bug: Bug Fix
* `babel-helpers`, `babel-plugin-transform-modules-commonjs`
  * [#6850](https://github.com/babel/babel/pull/6850)  Copy getters and setters correctly in interopWildcard. ([@danez](https://github.com/danez))
* `babel-helper-module-transforms`, `babel-plugin-transform-modules-amd`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-modules-umd`
  * [#6863](https://github.com/babel/babel/pull/6863) Fix `export from` assignment order for loose mode.. ([@yavorsky](https://github.com/yavorsky))
* `babel-generator`
  * [#6922](https://github.com/babel/babel/pull/6922) UpdateExpressions as callees must be parenthesized. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  * [#6897](https://github.com/babel/babel/pull/6897) Add handling parens for extends clause in generator. ([@existentialism](https://github.com/existentialism))
* `babel-plugin-transform-regenerator`
  * [#6917](https://github.com/babel/babel/pull/6917) update regenerator (removed explicit babel-types dep). ([@hzoo](https://github.com/hzoo))
* `babel-traverse`
  * [#6882](https://github.com/babel/babel/pull/6882) Fix setting deopt properly after evaluating multiple expressions. ([@existentialism](https://github.com/existentialism))
* `babylon`
  * [#6877](https://github.com/babel/babel/pull/6877) Allow yielding an arrow function withour parens around the param. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  * [#6802](https://github.com/babel/babel/pull/6802) Parse async arrows with flow type parameters. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-types`
  * [#6852](https://github.com/babel/babel/pull/6852) Fix validation of WithStatement and enable flow in definitions. ([@danez](https://github.com/danez))
* `babel-core`
  * [#6842](https://github.com/babel/babel/pull/6842) Add missing generator argument and remove nonexistent one.. ([@loganfsmyth](https://github.com/loganfsmyth))
* Other
  * [#6663](https://github.com/babel/babel/pull/6663) Maintain plugin order with items in the `include` option. ([@existentialism](https://github.com/existentialism))
  * [#6662](https://github.com/babel/babel/pull/6662) Fix bug in preset-env usage plugin with destructure in for-of. ([@existentialism](https://github.com/existentialism))
* `babel-plugin-transform-block-scoping`
  * [#6814](https://github.com/babel/babel/pull/6814) Fix shadow variables reassignment for block scoping in loops.. ([@yavorsky](https://github.com/yavorsky))

#### :nail_care: Polish
* `babylon`
  * [#6836](https://github.com/babel/babel/pull/6836) removing expression field from ArrowFunctionExpression. ([@mmckeaveney](https://github.com/mmckeaveney))
  * [#6727](https://github.com/babel/babel/pull/6727) [Babylon] Use char codes contants. ([@xtuc](https://github.com/xtuc))
  * [#6754](https://github.com/babel/babel/pull/6754) Better error message for super when not using an object method. ([@rajzshkr](https://github.com/rajzshkr))
* `babel-helper-module-imports`
  * [#6744](https://github.com/babel/babel/pull/6744) Allowed hintedNames for namespaced imports, changed some other defaul…. ([@Andarist](https://github.com/Andarist))
* `babel-cli`, `babel-core`, `babylon`
  * [#6875](https://github.com/babel/babel/pull/6875) Fix "Better error messaging for unexpected tokens #6715". ([@gmmorris](https://github.com/gmmorris))
* `babel-helpers`, `babel-plugin-check-constants`
  * [#6862](https://github.com/babel/babel/pull/6862) Define readOnlyError helper and use in check-constants plugin. ([@maurobringolf](https://github.com/maurobringolf))
* `babel-types`
  * [#6853](https://github.com/babel/babel/pull/6853) Make SpreadProperty and RestProperty a deprecatedAlias. ([@danez](https://github.com/danez))
* `babel-plugin-transform-arrow-functions`, `babel-plugin-transform-parameters`
  * [#6792](https://github.com/babel/babel/pull/6792) Do not access out of bounds arguments. ([@apapirovski](https://github.com/apapirovski))
* `babel-core`, `babel-traverse`
  * [#6818](https://github.com/babel/babel/pull/6818) Add some nice warnings if plugins happen to return promises instead of sync values.. ([@loganfsmyth](https://github.com/loganfsmyth))

#### :memo: Documentation
* `babel-plugin-transform-for-of`, `babylon`
  * [#6942](https://github.com/babel/babel/pull/6942) add readme entry for for-of assumeArray, use it. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-proposal-class-properties`
  * [#6941](https://github.com/babel/babel/pull/6941) [plugin-proposal-class-properties] Fix small loose docs typo. ([@sdgluck](https://github.com/sdgluck))
* `babel-register`
  * [#6899](https://github.com/babel/babel/pull/6899) Fixed ignore in readme for babel-register. ([@MarkShulhin](https://github.com/MarkShulhin))
* Other
  * [#6868](https://github.com/babel/babel/pull/6868) [skip ci] Update CONTRIBUTING.md. ([@yeefom](https://github.com/yeefom))
  * [#6756](https://github.com/babel/babel/pull/6756) Documentation PR: description about building and testing babylon in CONTRIBUTING.md. ([@vincentdchan](https://github.com/vincentdchan))
  * [#6843](https://github.com/babel/babel/pull/6843) README: Use HTTPS and relative links when possible. ([@mc10](https://github.com/mc10))
  * [#6825](https://github.com/babel/babel/pull/6825) docs: [skip-ci] Remove @babel scope from babel-preset-env include/exc…. ([@marcioj](https://github.com/marcioj))
* `babel-*`
  * [#6820](https://github.com/babel/babel/pull/6820) Replaced legacy babel-* & shorthand package name usage with @babel/* in README.md's. ([@hulkish](https://github.com/hulkish))
* `babel-cli`
  * [#6829](https://github.com/babel/babel/pull/6829) @babel/cli: removed babel-node mention in README.md [skip ci]. ([@viatsko](https://github.com/viatsko))

#### :house: Internal
* `babel-core`
  * [#6909](https://github.com/babel/babel/pull/6909) Rewrite config chain tests to use public loadOptions API.. ([@loganfsmyth](https://github.com/loganfsmyth))
* Other
  * [#6866](https://github.com/babel/babel/pull/6866) Add `.github` and `.idea` to `.npmignore`. ([@aaharu](https://github.com/aaharu))
  * [#6844](https://github.com/babel/babel/pull/6844) Add "make watch-babylon" [skip ci]. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  * [#6819](https://github.com/babel/babel/pull/6819) use pr instead of tag for changelog/prs [skip ci]. ([@hzoo](https://github.com/hzoo))
  * [#6804](https://github.com/babel/babel/pull/6804) Update to v7-beta.31. ([@hzoo](https://github.com/hzoo))
* `babylon`
  * [#6727](https://github.com/babel/babel/pull/6727) [Babylon] Use char codes contants. ([@xtuc](https://github.com/xtuc))

## v7.0.0-beta.32 (2017-11-12)

> Regression with loose modules + export https://github.com/babel/babel/issues/6805

#### :boom: Breaking Change
* `babel-traverse`
  * [#6528](https://github.com/babel/babel/pull/6528) Remove support for flow bindings (remove deprecation). ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :rocket: New Feature
* `babel-core`, `babylon`
  * [#6789](https://github.com/babel/babel/pull/6789) Allow sourceType:unambiguous as a way to tell Babylon to guess the type.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-core`, `babel-plugin-transform-modules-umd`, `babel-plugin-transform-react-display-name`, `babel-plugin-transform-react-jsx-source`
  * [#6777](https://github.com/babel/babel/pull/6777) Add an official 'state.filename' and be more explicit about option passing.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-helper-module-transforms`, `babel-plugin-transform-modules-amd`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-modules-umd`
  * [#6742](https://github.com/babel/babel/pull/6742) Add additional support for loose mode in helper-module-transforms. ([@existentialism](https://github.com/existentialism))

#### :bug: Bug Fix
* `babel-helper-function-name`, `babel-plugin-transform-arrow-functions`, `babel-plugin-transform-function-name`, `babel-traverse`
  * [#6760](https://github.com/babel/babel/pull/6760) Fix transform-arrow-functions in { spec: true } shadowing. ([@Kovensky](https://github.com/Kovensky))

#### :nail_care: Polish
* `babel-register`
  * [#6651](https://github.com/babel/babel/pull/6651) Lazy-install sourceMapSupport. ([@aminmarashi](https://github.com/aminmarashi))
* `babel-plugin-transform-destructuring`, `babel-plugin-transform-spread`
  * [#6763](https://github.com/babel/babel/pull/6763) No unneeded empty arrays in transform spread. ([@apapirovski](https://github.com/apapirovski))
* `babylon`
  * [#6748](https://github.com/babel/babel/pull/6748) Avoid copying properties from the prototype chain.. ([@bmeurer](https://github.com/bmeurer))

#### :memo: Documentation
* `babel-plugin-proposal-unicode-property-regex`
  * [#6796](https://github.com/babel/babel/pull/6796) Link to README on GitHub rather than the npm copy. ([@mathiasbynens](https://github.com/mathiasbynens))
* `babel-core`
  * [#6794](https://github.com/babel/babel/pull/6794) Update README with new Sync-suffix functions.. ([@loganfsmyth](https://github.com/loganfsmyth))

#### :house: Internal
* `babel-generator`
  * [#6801](https://github.com/babel/babel/pull/6801) Prefix XJS test directories with JSX instead. ([@clemmy](https://github.com/clemmy))
  * [#6749](https://github.com/babel/babel/pull/6749) Move typscript test copy script to scripts folder and run once. ([@danez](https://github.com/danez))
* `babel-core`, `babel-register`
  * [#6783](https://github.com/babel/babel/pull/6783) Apply option defaults when transforming, not up front.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-plugin-proposal-object-rest-spread`, `babel-plugin-proposal-unicode-property-regex`, `babel-plugin-transform-block-scoping`, `babel-plugin-transform-destructuring`
  * [#6776](https://github.com/babel/babel/pull/6776) Hoist more plugin options and default useUnicodeFlag to 'true'.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-plugin-*`
  * [#6778](https://github.com/babel/babel/pull/6778) Use the peerDep to load types/template/traverse in plugins. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-polyfill`
  * [#6755](https://github.com/babel/babel/pull/6755) Remove core-js/regenerator-runtime stubs. ([@existentialism](https://github.com/existentialism))
* `.eslintrc`, `babel-helper-transform-fixture-test-runner`, `babylon`
  * [#6747](https://github.com/babel/babel/pull/6747) Unify eslint/prettier config. ([@danez](https://github.com/danez))
* Other
  * [#6738](https://github.com/babel/babel/pull/6738) Publish to the latest dist tag [skip ci]. ([@hzoo](https://github.com/hzoo))

## v7.0.0-beta.31 (2017-11-03)

> Yes, this was a jump from v7.0.0-beta.5 to v7.0.0-beta.31
> We moved babylon into the main repo, and it was already at beta.30.

#### :rocket: New Feature
* `babel-preset-react`, `babel-preset-stage-0`, `babel-preset-stage-1`, `babel-preset-stage-2`, `babel-preset-stage-3`, `babylon`
  * [#6733](https://github.com/babel/babel/pull/6733) add loose/useBuiltIns option to stage presets, use it. ([@hzoo](https://github.com/hzoo))
* `babel-generator`, `babel-helper-builder-react-jsx`, `babel-plugin-transform-react-jsx-compat`, `babel-plugin-transform-react-jsx`, `babel-types`
  * [#6552](https://github.com/babel/babel/pull/6552) Add JSX Fragment syntax support. ([@clemmy](https://github.com/clemmy))

#### :bug: Bug Fix
* `babel-preset-env`
  * [#6478](https://github.com/babel/babel/pull/6478) Fix global reference for use-built-ins plugin. ([@yavorsky](https://github.com/yavorsky))
* `babel-plugin-transform-spread`
  * [#6657](https://github.com/babel/babel/pull/6657) Avoid node duplication to fix spread bug with import.. ([@loganfsmyth](https://github.com/loganfsmyth))

#### :house: Internal
* `babel-cli`, `babel-core`, `babel-helper-transform-fixture-test-runner`
  * [#6556](https://github.com/babel/babel/pull/6556) Strictly validate Babel's options to centralize Flow refinement of datatype. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-*`
  * [#6655](https://github.com/babel/babel/pull/6655) Use peerDeps in register and babel-node, add missing peerDependencies, and declare devDependencies. ([@loganfsmyth](https://github.com/loganfsmyth))
* Other
  * [#6654](https://github.com/babel/babel/pull/6654) Update to beta.5 with scoped packages 👻. ([@hzoo](https://github.com/hzoo))
  * [#6736](https://github.com/babel/babel/pull/6736) Run with loose, exclude typeof in standalone. ([@hzoo](https://github.com/hzoo))

## v7.0.0-beta.5 (2017-10-30)

> Note: don't use ^ in your dependencies when using a beta. It can still break between (we should try not to do it but it can), so pin all the packages like `"@babel/cli" : "7.0.0-beta.4"`

#### :eyeglasses: Spec Compliancy
* `babel-plugin-transform-optional-chaining`
  * [#6525](https://github.com/babel/babel/pull/6525) Optional Chaining: Account for document.all. ([@azz](https://github.com/azz))
* `babel-preset-env`, `babel-helper-remap-async-to-generator`, `babel-helpers`, `babel-plugin-transform-async-generator-functions`, `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-function-sent`
  * [#6452](https://github.com/babel/babel/pull/6452) Adhering to async generator yield behavior change. ([@Andarist](https://github.com/Andarist))

#### :boom: Breaking Change
* `babel-*`
  * [#6575](https://github.com/babel/babel/pull/6575) remove es20xx prefixes from plugins and rename folders. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-async-to-module-method`, `babel-standalone`
  * [#6573](https://github.com/babel/babel/pull/6573) Merge transform-async-to-module-method into transform-async-to-generator. ([@hzoo](https://github.com/hzoo))
* `babel-*`
  * [#6570](https://github.com/babel/babel/pull/6570) Rename Proposal Plugins. ([@hzoo](https://github.com/hzoo))
* `babel-preset-env`, `babel-helper-remap-async-to-generator`, `babel-helpers`, `babel-plugin-transform-async-generator-functions`, `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-function-sent`
  * [#6452](https://github.com/babel/babel/pull/6452) Adhering to async generator yield behavior change. ([@Andarist](https://github.com/Andarist))
* `babel-helper-module-transforms`, `babel-helper-remap-async-to-generator`, `babel-helpers`, `babel-plugin-transform-class-properties`, `babel-plugin-transform-es2015-classes`, `babel-plugin-transform-es2015-for-of`, `babel-plugin-transform-es2015-modules-amd`, `babel-plugin-transform-es2015-modules-commonjs`, `babel-plugin-transform-es2015-modules-systemjs`, `babel-plugin-transform-es2015-parameters`, `babel-template`, `babel-types`
  * [#6492](https://github.com/babel/babel/pull/6492) Make babel-template nicer in a bunch of ways. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-core`
  * [#6436](https://github.com/babel/babel/pull/6436) Simplify dirname option in plugins/presets?. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-*`
  * [#6495](https://github.com/babel/babel/pull/6495) Rename everything: use scoped packages. ([@hzoo](https://github.com/hzoo))

#### :rocket: New Feature
* `babel-helper-builder-react-jsx`, `babel-plugin-transform-react-jsx`, `babel-types`
  * [#6563](https://github.com/babel/babel/pull/6563) Add a 'throwIfNamespace' option for JSX transform. ([@jukben](https://github.com/jukben))
* `babel-*`
  * [#6549](https://github.com/babel/babel/pull/6549) Add peerDep on specific babel-core version in transform plugins, pres…. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-transform-es3-member-expression-literals`, `babel-plugin-transform-es3-property-literals`, `babel-plugin-transform-es3-reserved-words`, `babel-types`
  * [#6479](https://github.com/babel/babel/pull/6479) Rename variables es3 reserved words. ([@maurobringolf](https://github.com/maurobringolf))
* `babel-preset-env`, `babel-plugin-transform-unicode-property-regex`, `babel-preset-stage-3`, `babel-standalone`
  * [#6499](https://github.com/babel/babel/pull/6499) Import babel-plugin-transform-unicode-property-regex. ([@mathiasbynens](https://github.com/mathiasbynens))
* `babel-plugin-syntax-nullish-coalescing-operator`, `babel-plugin-transform-nullish-coalescing-operator`, `babel-preset-stage-1`, `babel-types`
  * [#6483](https://github.com/babel/babel/pull/6483) Implement transform for nullish-coalescing operator. ([@azz](https://github.com/azz))

#### :bug: Bug Fix
* `babel-plugin-proposal-unicode-property-regex`, `babel-template`
  * [#6646](https://github.com/babel/babel/pull/6646) fixup places that aren not scoped [skip ci]. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-proposal-class-properties`, `babel-traverse`
  * [#6530](https://github.com/babel/babel/pull/6530) Fixed incorrect static class field initialization order. ([@Andarist](https://github.com/Andarist))
* `babel-*`
  * [#6644](https://github.com/babel/babel/pull/6644) Fix peerDep to ^ for now. ([@hzoo](https://github.com/hzoo))
* `babel-core`
  * [#6524](https://github.com/babel/babel/pull/6524) fix(babel-core): add missing extension to package.json dependency. ([@alexjoverm](https://github.com/alexjoverm))
  * [#6503](https://github.com/babel/babel/pull/6503) babel-core: Pass the right err to callback in transformFile(). ([@robertrossmann](https://github.com/robertrossmann))
* `babel-plugin-transform-react-jsx`
  * [#6519](https://github.com/babel/babel/pull/6519) Fix regression that leaks JSX pragma config between files.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-plugin-transform-class-properties`
  * [#6517](https://github.com/babel/babel/pull/6517) Cloning reused node in class properties transform. ([@Andarist](https://github.com/Andarist))
* `babel-plugin-transform-pipeline-operator`
  * [#6515](https://github.com/babel/babel/pull/6515) Fix destructuring in pipeline operator. ([@jridgewell](https://github.com/jridgewell))

#### :nail_care: Polish
* `babel-plugin-transform-es2015-parameters`
  * [#6581](https://github.com/babel/babel/pull/6581) Fix hasRest to not try to load "-1" from params array.. ([@bmeurer](https://github.com/bmeurer))
* `babel-code-frame`
  * [#6550](https://github.com/babel/babel/pull/6550) Make syntax highlighting for `@` and `#` nicer. ([@lydell](https://github.com/lydell))

#### :memo: Documentation
* Other
  * [#6579](https://github.com/babel/babel/pull/6579) remove warning (still applies but don't need it there) [skip ci]. ([@hzoo](https://github.com/hzoo))
* `babel-*`
  * [#6569](https://github.com/babel/babel/pull/6569) Fix readmes to use @babel/ [skip ci]. ([@hzoo](https://github.com/hzoo))
* `babel-preset-env`
  * [#6527](https://github.com/babel/babel/pull/6527) Update README: `useBuiltins: true` is changed to "entry". ([@exarus](https://github.com/exarus))
  * [#6508](https://github.com/babel/babel/pull/6508) Update reference from babel- to @babel/ in README.md. ([@knittingcodemonkey](https://github.com/knittingcodemonkey))
* `babel-helper-get-function-arity`
  * [#6532](https://github.com/babel/babel/pull/6532) docs - Add helper-get-function-arity readme  [skip ci]. ([@athomann](https://github.com/athomann))
* `babel-helper-bindify-decorators`
  * [#6533](https://github.com/babel/babel/pull/6533) Add API to helper-bindify-decorators README [skip ci]. ([@athomann](https://github.com/athomann))
* `babel-helper-hoist-variables`
  * [#6534](https://github.com/babel/babel/pull/6534) Add API to babel-helper-hoist-vars README [skip ci]. ([@athomann](https://github.com/athomann))

#### :house: Internal
* `babel-core`, `babel-generator`, `babel-template`, `babel-traverse`, `babel-types`
  * [#6587](https://github.com/babel/babel/pull/6587) Update to babylon v7 beta.30. ([@hzoo](https://github.com/hzoo))
* `babel-preset-env`
  * [#6551](https://github.com/babel/babel/pull/6551) Re-add electron-to-chromium as preset-env devdep. ([@existentialism](https://github.com/existentialism))
* Other
  * [#6557](https://github.com/babel/babel/pull/6557) Lerna: Add publishConfig access public [skip ci]. ([@hzoo](https://github.com/hzoo))
  * [#6488](https://github.com/babel/babel/pull/6488) update to beta.3. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-transform-unicode-property-regex`
  * [#6548](https://github.com/babel/babel/pull/6548) Remove stale emoji tests in plugin-transform-unicode-property-regex. ([@syldlb](https://github.com/syldlb))
* `babel-preset-env`, `babel-preset-es2017`
  * [#6513](https://github.com/babel/babel/pull/6513) Remove syntax-trailing-function-commas from Babel presets. ([@existentialism](https://github.com/existentialism))
* `babel-runtime`
  * [#6509](https://github.com/babel/babel/pull/6509) Updating references to @babel/ and adding dependencies to package.json. ([@knittingcodemonkey](https://github.com/knittingcodemonkey))
* `babel-core`, `babel-helpers`, `babel-plugin-transform-es2015-block-scoping`, `babel-runtime`
  * [#6379](https://github.com/babel/babel/pull/6379) Fix helper dependencies in babel runtime. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-core`
  * [#6474](https://github.com/babel/babel/pull/6474) Removed index.js stub from packages/babel-core. ([@zacharysang](https://github.com/zacharysang))
* `babel-register`
  * [#6391](https://github.com/babel/babel/pull/6391) simplify register test. ([@hzoo](https://github.com/hzoo))

## v7.0.0-beta.4 (2017-10-30)

> Had a bug with peerDeps, moving changelog to beta.5

## v7.0.0-beta.3 (2017-10-15)

> Update from beta.2 -> beta.3 looks like this: https://github.com/babel/babel/pull/6488

---

> Wanted to get this release out first, but next release we should make necessary breaking changes for later: using peerDeps on babel-core so that people don't install incompatible versions of plugins/babel itself and get weird errors reported, using scoped npm packages like `@babel/core` due to issues with npm squatting, knowing what is an official package or not, etc, and renaming proposal plugins to `babel-plugin-proposal-x` instead of `babel-plugin-transform-x`

> Note: don't use `^` in your dependencies when using a beta. It can still break between (we should try not to do it but it can), so pin all the packages

- Pipeline Operator: (a |> b), also in the Stage 1 Preset
- Throw Expressions: (() => throw 'hi'), also in Stage 2
- Preset/Plugin options are available top level rather than previously only in the visitor state
- Many fixes

#### :boom: Breaking Change
* `babel-helper-remap-async-to-generator`
  * [#6451](https://github.com/babel/babel/pull/6451) Drop old compatibility if statement targeting babel@6.15 and earlier. ([@Andarist](https://github.com/Andarist))
* `babel-core`
  * [#6350](https://github.com/babel/babel/pull/6350) Cache plugins and presets based on their identity. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-core`, `babel-helper-module-imports`, `babel-traverse`
  * [#6343](https://github.com/babel/babel/pull/6343) Remove core .metadata properties and resolveModuleSource. ([@loganfsmyth](https://github.com/loganfsmyth))

#### :rocket: New Feature
* `babel-template`
  * [#5001](https://github.com/babel/babel/pull/5001) Extend babel-template to work as a template tag. ([@Kovensky](https://github.com/Kovensky))
* `babel-core`, `babel-generator`, `babel-plugin-syntax-pipeline-operator`, `babel-plugin-transform-pipeline-operator`, `babel-preset-stage-1`, `babel-template`, `babel-traverse`, `babel-types`
  * [#6335](https://github.com/babel/babel/pull/6335) Pipeline operator. ([@jridgewell](https://github.com/jridgewell))
* `babel-cli`
  * [#6232](https://github.com/babel/babel/pull/6232) Add --include-dotfiles option to babel-cli. ([@existentialism](https://github.com/existentialism))
* `babel-plugin-transform-es2015-modules-commonjs`, `babel-plugin-transform-es2015-template-literals`
  * [#6327](https://github.com/babel/babel/pull/6327) Annotating taggedTemplateLiteral calls as #\_\_PURE\_\_. ([@Andarist](https://github.com/Andarist))
* `babel-standalone`
  * [#6322](https://github.com/babel/babel/pull/6322) Add transform-new-target and missed stage-3 plugins to babel-standalone.. ([@yavorsky](https://github.com/yavorsky))
* `babel-core`, `babel-generator`, `babel-plugin-syntax-throw-expressions`, `babel-plugin-transform-throw-expressions`, `babel-preset-stage-2`, `babel-template`, `babel-traverse`, `babel-types`
  * [#6325](https://github.com/babel/babel/pull/6325) Add throw expressions. ([@jridgewell](https://github.com/jridgewell))

#### :bug: Bug Fix
* `babel-plugin-transform-function-bind`
  * [#6481](https://github.com/babel/babel/pull/6481) Don't insert duplicated nodes when transforming function bind. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-plugin-transform-class-properties`
  * [#6466](https://github.com/babel/babel/pull/6466) Evaluate computed class props only once. ([@Qantas94Heavy](https://github.com/Qantas94Heavy))
* `babel-plugin-transform-do-expressions`, `babel-traverse`
  * [#6372](https://github.com/babel/babel/pull/6372) Fix the issue #6331. ([@wcastand](https://github.com/wcastand))
* `babel-core`
  * [#6377](https://github.com/babel/babel/pull/6377) Fix "module" external helpers output. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-plugin-transform-es2015-destructuring`
  * [#6374](https://github.com/babel/babel/pull/6374) Fixed reusing node in destructuring plugin, which caused caching issu…. ([@Andarist](https://github.com/Andarist))
* `babel-plugin-transform-es2015-parameters`, `babel-traverse`
  * [#6351](https://github.com/babel/babel/pull/6351) Requeueing sometimes has wrong scope. ([@jridgewell](https://github.com/jridgewell))
* `babel-traverse`
  * [#6354](https://github.com/babel/babel/pull/6354) unshiftContainer seems to incorrectly handle function params #6150. ([@daft300punk](https://github.com/daft300punk))
* `babel-plugin-check-es2015-constants`, `babel-plugin-transform-class-properties`, `babel-plugin-transform-es2015-block-scoping`, `babel-plugin-transform-es2015-parameters`, `babel-traverse`
  * [#6337](https://github.com/babel/babel/pull/6337) Path#ensureBlock keeps path context. ([@jridgewell](https://github.com/jridgewell))
* `babel-generator`
  * [#6334](https://github.com/babel/babel/pull/6334) Fix generator missing parens on Flow union types. ([@existentialism](https://github.com/existentialism))

#### :nail_care: Polish
* `babel-traverse`
  * [#6349](https://github.com/babel/babel/pull/6349) Remove debug closures. ([@jridgewell](https://github.com/jridgewell))

#### :memo: Documentation
* Other
  * [#6439](https://github.com/babel/babel/pull/6439) [skip ci] fix typo in README.md. ([@gberaudo](https://github.com/gberaudo))
* `babel-preset-typescript`
  * [#6365](https://github.com/babel/babel/pull/6365) note about .ts extension in the preset [skip ci]. ([@hzoo](https://github.com/hzoo))
* `babel-helper-module-imports`
  * [#6323](https://github.com/babel/babel/pull/6323) add docs for other import syntax [skip ci]. ([@hzoo](https://github.com/hzoo))

#### :house: Internal
* `.eslintrc`
  * [#6457](https://github.com/babel/babel/pull/6457) Use no-undefined-identifier eslint rule in packages. ([@existentialism](https://github.com/existentialism))
* `babel-plugin-transform-async-to-module-method`, `babel-plugin-transform-class-properties`, `babel-plugin-transform-es2015-arrow-functions`, `babel-plugin-transform-es2015-classes`, `babel-plugin-transform-es2015-computed-properties`, `babel-plugin-transform-es2015-for-of`, `babel-plugin-transform-es2015-modules-amd`, `babel-plugin-transform-es2015-modules-commonjs`, `babel-plugin-transform-es2015-modules-systemjs`, `babel-plugin-transform-es2015-modules-umd`, `babel-plugin-transform-es2015-parameters`, `babel-plugin-transform-es2015-spread`, `babel-plugin-transform-es2015-template-literals`, `babel-plugin-transform-optional-chaining`, `babel-plugin-transform-react-constant-elements`, `babel-plugin-transform-react-jsx`, `babel-plugin-transform-runtime`
  * [#6381](https://github.com/babel/babel/pull/6381) centralize plugin options. ([@RusinovAnton](https://github.com/RusinovAnton))
* `babel-cli`
  * [#6440](https://github.com/babel/babel/pull/6440) Misc. ([@hzoo](https://github.com/hzoo))
* `babel-core`
  * [#6435](https://github.com/babel/babel/pull/6435) Always pass an options object to presets and plugins.. ([@loganfsmyth](https://github.com/loganfsmyth))
  * [#6326](https://github.com/babel/babel/pull/6326) Preserve object identity when loading config, for improved future caching.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-helpers`, `babel-runtime`
  * [#6366](https://github.com/babel/babel/pull/6366) Fix runtime helpers generator. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-cli`, `babel-core`, `babel-helper-transform-fixture-test-runner`, `babel-template`, `babel-traverse`
  * [#6359](https://github.com/babel/babel/pull/6359) Split up babel-core's File class and add Flowtype annotations. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-core`, `babel-helpers`, `babel-runtime`
  * [#6254](https://github.com/babel/babel/pull/6254) Add support for helper dependencies. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-core`, `babel-generator`, `babel-helper-replace-supers`, `babel-messages`, `babel-plugin-check-es2015-constants`, `babel-plugin-transform-es2015-classes`, `babel-plugin-transform-es2015-for-of`, `babel-traverse`
  * [#6356](https://github.com/babel/babel/pull/6356) Remove babel-messages and inline the usages. ([@JeromeFitz](https://github.com/JeromeFitz))
* `babel-helper-module-imports`, `babel-plugin-transform-decorators`, `babel-plugin-transform-typescript`
  * [#6355](https://github.com/babel/babel/pull/6355) Bump prettier. ([@existentialism](https://github.com/existentialism))
* Other
  * [#6348](https://github.com/babel/babel/pull/6348) remove inline plugin from Babel's .babelrc. ([@xjlim](https://github.com/xjlim))
* `babel-traverse`
  * [#6349](https://github.com/babel/babel/pull/6349) Remove debug closures. ([@jridgewell](https://github.com/jridgewell))
* `babel-standalone`
  * [#6338](https://github.com/babel/babel/pull/6338) transform-es2015-template-literals doesn't have spec mode anymore, ch…. ([@Andarist](https://github.com/Andarist))

## v7.0.0-beta.2 (2017-09-26)

#### :boom: Breaking Change
* `babel-core`, `babel-plugin-transform-es2015-template-literals`
  * [#6307](https://github.com/babel/babel/pull/6307) Move template object creation from core into the template transform.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-core`, `babel-generator`, `babel-plugin-transform-class-properties`, `babel-template`, `babel-traverse`, `babel-types`
  * [#6306](https://github.com/babel/babel/pull/6306) update generator printing, babylon [skip ci]. ([@hzoo](https://github.com/hzoo))

#### :rocket: New Feature
* `babel-helper-annotate-as-pure`, `babel-plugin-transform-es2015-classes`, `babel-traverse`, `babel-types`
  * [#6267](https://github.com/babel/babel/pull/6267) Extracted babel-helper-annotate-as-pure. ([@Andarist](https://github.com/Andarist))

#### :bug: Bug Fix
* `babel-core`
  * [#6310](https://github.com/babel/babel/pull/6310) addMapping method call missing name parameter. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-helper-builder-react-jsx`, `babel-plugin-transform-react-inline-elements`
  * [#6294](https://github.com/babel/babel/pull/6294) Use helper-builder-react-jsx inside plugin-transform-react-inline-elements. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-plugin-transform-es2015-parameters`
  * [#6274](https://github.com/babel/babel/pull/6274) Fixed loose option of transform-es2015-parameters handling only Assig…. ([@Andarist](https://github.com/Andarist))
* `babel-core`, `babel-helpers`, `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-react-constant-elements`
  * [#6289](https://github.com/babel/babel/pull/6289) Fixed asyncToGenerator helper using arrow function. ([@Andarist](https://github.com/Andarist))

#### :memo: Documentation
* [#6305](https://github.com/babel/babel/pull/6305) update readme [skip ci]. ([@hzoo](https://github.com/hzoo))

#### :house: Internal
* [#6279](https://github.com/babel/babel/pull/6279) Updates for handling codemods folder. ([@existentialism](https://github.com/existentialism))

## v7.0.0-beta.1 (2017-09-19)

Mostly bug fixes

#### :boom: Breaking Change
* `babel-helper-modules`, `babel-plugin-transform-es2015-modules-commonjs`, `babel-plugin-transform-strict-mode`
  * [#6244](https://github.com/babel/babel/pull/6244) Remove strict toggling wildcard interop. ([@loganfsmyth](https://github.com/loganfsmyth))

#### :rocket: New Feature
* `babel-plugin-codemod-optional-catch-binding`
  * [#6048](https://github.com/babel/babel/pull/6048) Remove unused catch binding. ([@MarckK](https://github.com/MarckK))

#### :bug: Bug Fix
* `babel-core`, `babel-helpers`
  * [#6260](https://github.com/babel/babel/pull/6260) Fixed buildExternalHelpers tool for var and module output types. ([@Andarist](https://github.com/Andarist))
* `babel-register`
  * [#6268](https://github.com/babel/babel/pull/6268) Make babel-register 7.x backward-compatible with 6.x.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-plugin-transform-es2015-unicode-regex`
  * [#6263](https://github.com/babel/babel/pull/6263) Update regexpu-core to v4.1.3. ([@mathiasbynens](https://github.com/mathiasbynens))
* `babel-generator`
  * [#6259](https://github.com/babel/babel/pull/6259) Fix newlines before the update suffix operator in babel-generator. ([@zestime](https://github.com/zestime))
  * [#5651](https://github.com/babel/babel/pull/5651) Make terminator paren comment check more strict. ([@existentialism](https://github.com/existentialism))
* `babel-plugin-transform-react-jsx-source`
  * [#6239](https://github.com/babel/babel/pull/6239) Fix jsx-source to not fail without filename. ([@danez](https://github.com/danez))

#### :nail_care: Polish
* `babel-helpers`, `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-class-properties`, `babel-plugin-transform-es2015-parameters`, `babel-plugin-transform-es2015-spread`, `babel-plugin-transform-react-constant-elements`, `babel-runtime`
  * [#6250](https://github.com/babel/babel/pull/6250) Use new Array instead of Array for V8 optimization. ([@pranavpr](https://github.com/pranavpr))

#### :house: Internal
* `babel-core`, `babel-plugin-syntax-async-functions`, `babel-plugin-syntax-exponentiation-operator`, `babel-plugin-syntax-trailing-function-commas`, `babel-plugin-transform-es2015-classes`, `babel-plugin-transform-es2015-parameters`, `babel-plugin-transform-flow-strip-types`, `babel-preset-es2015`
  * [#6229](https://github.com/babel/babel/pull/6229) move out syntax plugins to babel/babel-archive, they don't need to be…. ([@hzoo](https://github.com/hzoo))
* `babel-polyfill`
  * [#6256](https://github.com/babel/babel/pull/6256) Add core-js stubs for parseFloat and parseInt to babel-polyfill. ([@existentialism](https://github.com/existentialism))
  * [#6255](https://github.com/babel/babel/pull/6255) Bump regenerator-runtime version in babel-polyfill. ([@existentialism](https://github.com/existentialism))

## v7.0.0-alpha.20 (2017-08-30)

- Handle `Symbol` in `transform-es2015-computed-properties`
- Disallow `...[` & `...{` inside object destructuring

> http://tc39.github.io/tc39-notes/2017-05_may-23.html#16ih-why-allow-bindingpattern-for-bindingrestparameter-for-object-rest-maybe-we-should-just-allow-identifiers

```js
// Invalid
( {...{}} = {} ); ( {...[]} = {} );
let {...{}} = {}; let {...[]} = {};
```
- Split `transform-export-extensions` into `transform-export-namespace` and `transform-export-default` plugins
- Move `transform-numeric-separator` to Stage 2
- Move `transform-class-properties` to Stage 3
  - Change the default transform to use `Object.defineProperty` and `loose` option to use assignment (`this.a = 1`)
  - Use `configurable: true`
- Change `es2015-template-literals` to use `.concat` by default and concatenation in `loose` mode.
- Remove deprecated jsx pragma check in `transform-react-jsx`
- Remove `preset-flow` from the `preset-react` (there was confusion on why type syntax was allowed, and it also made it incompatible with `preset-typescript`
- Add `--config-file` CLI flag to explicitly pass a config location
- Move `babel-standalone` into the repo (another form of this used to be `babel-browser`)

#### :eyeglasses: Spec Compliancy
* `babel-plugin-transform-async-to-generator`, `babel-*`
  * [#6094](https://github.com/babel/babel/pull/6094) Spec compatibility for iteratorClose condition.. ([@yavorsky](https://github.com/yavorsky))
* `babel-helpers`, `babel-plugin-transform-es2015-computed-properties`
  * [#6159](https://github.com/babel/babel/pull/6159) Allow native Symbols as computed property names. ([@jridgewell](https://github.com/jridgewell))
* `babel-plugin-check-es2015-constants`, `babel-traverse`, `babel-types`
  * [#6100](https://github.com/babel/babel/pull/6100) Consistent const violations. ([@maurobringolf](https://github.com/maurobringolf))
* `babel-generator`, `babel-plugin-transform-es2015-destructuring`, `babel-plugin-transform-object-rest-spread`
  * [#6102](https://github.com/babel/babel/pull/6102) Adjusted Object Rest/Spread tests to use only allowed syntax from the…. ([@Andarist](https://github.com/Andarist))
* `babel-plugin-transform-export-default`, `babel-plugin-transform-export-extensions`, `babel-plugin-transform-export-namespace`, `babel-preset-stage-1`, `babel-preset-stage-2`
  * [#6080](https://github.com/babel/babel/pull/6080) Split export extensions into 2. ([@echo304](https://github.com/echo304))
* `babel-plugin-transform-class-properties`
  * [#6123](https://github.com/babel/babel/pull/6123) Add 'configurable' property to class fields. ([@reznord](https://github.com/reznord))
* `babel-plugin-transform-class-properties`, `babel-plugin-transform-decorators`, `babel-plugin-transform-es2015-parameters`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-new-target`, `babel-plugin-transform-react-constant-elements`, `babel-preset-stage-2`, `babel-preset-stage-3`
  * [#6076](https://github.com/babel/babel/pull/6076) Update Class Fields to Stage 3 and change default behavior. ([@kedromelon](https://github.com/kedromelon))
* `babel-preset-stage-1`, `babel-preset-stage-2`
  * [#6071](https://github.com/babel/babel/pull/6071) Add numeric separator to stage 2 preset. ([@rwaldron](https://github.com/rwaldron))

#### :boom: Breaking Change
* `babel-plugin-transform-es2015-template-literals`
  * [#6098](https://github.com/babel/babel/pull/6098) default to spec mode for template literal transform. ([@kedromelon](https://github.com/kedromelon))
* `babel-generator`, `babel-plugin-transform-es2015-destructuring`, `babel-plugin-transform-object-rest-spread`
  * [#6145](https://github.com/babel/babel/pull/6145) Removed the deprecated jsx pragma detection code. ([@asthas](https://github.com/asthas))
* `babel-plugin-transform-flow-strip-types`, `babel-preset-flow`, `babel-preset-react`
  * [#6118](https://github.com/babel/babel/pull/6118) Remove Flow support in React preset. ([@ramasilveyra](https://github.com/ramasilveyra))
* `babel-helper-fixtures`, `babel-*`
  * [#6157](https://github.com/babel/babel/pull/6157) Don't merge test options.. ([@jridgewell](https://github.com/jridgewell))

#### :rocket: New Feature
* `babel-cli`
  * [#6133](https://github.com/babel/babel/pull/6133) add --config-file option to CLI to pass in .babelrc location. ([@bdwain](https://github.com/bdwain))

#### :bug: Bug Fix
* `babel-core`
  * [#5586](https://github.com/babel/babel/pull/5586) Handle cycles of plugins compiling themselves and .babelrc.js files loading themselves. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-plugin-transform-es2015-destructuring`, `babel-traverse`
  * [#5743](https://github.com/babel/babel/pull/5743) Fix issue replacement nodes not requeued for transforming after destructuring. ([@buunguyen](https://github.com/buunguyen))
* `babel-plugin-check-es2015-constants`, `babel-plugin-transform-es2015-block-scoping`, `babel-traverse`
  * [#6156](https://github.com/babel/babel/pull/6156) Fix overshadowing local binding. ([@jridgewell](https://github.com/jridgewell))
* `babel-helper-replace-supers`, `babel-plugin-transform-class-properties`, `babel-traverse`
  * [#6158](https://github.com/babel/babel/pull/6158) Class instance properties define their own context. ([@jridgewell](https://github.com/jridgewell))
* `babel-plugin-transform-export-default`, `babel-plugin-transform-export-namespace`, `babel-types`
  * [#6139](https://github.com/babel/babel/pull/6139) Complete export transform split. ([@jridgewell](https://github.com/jridgewell))
* `babel-plugin-transform-es2015-parameters`, `babel-traverse`
  * [#5741](https://github.com/babel/babel/pull/5741) Fix relative execution location introspection. ([@jridgewell](https://github.com/jridgewell))
* `babel-helper-replace-supers`, `babel-plugin-transform-es2015-classes`
  * [#6103](https://github.com/babel/babel/pull/6103) Don't use _possibleConstructorReturn inside arrow functions. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-plugin-transform-class-properties`
  * [#6082](https://github.com/babel/babel/pull/6082) babel-plugin-transform-class-properties: Ignore type annotations when looking for name collisions. ([@andy-ms](https://github.com/andy-ms))
* `babel-preset-stage-2`
  * [#6088](https://github.com/babel/babel/pull/6088) remove left transform-class-properties from stage. ([@echo304](https://github.com/echo304))
* `babel-plugin-transform-es2015-block-scoping`, `babel-types`
  * [#5980](https://github.com/babel/babel/pull/5980) Fix scope of catch block. ([@boopathi](https://github.com/boopathi))

#### :nail_care: Polish
* `babel-plugin-transform-es2015-classes`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-flow-strip-types`
  * [#5560](https://github.com/babel/babel/pull/5560) Closes [#4840](https://github.com/babel/babel/issues/4840): Alias class prototype for methods in loose mode. ([@oliverdon](https://github.com/oliverdon))

#### :memo: Documentation
* `babel-plugin-transform-class-properties`
  * [#6124](https://github.com/babel/babel/pull/6124) Update README.md. ([@uxter](https://github.com/uxter))
* Other
  * [#6121](https://github.com/babel/babel/pull/6121) Update babel/website link. ([@maurobringolf](https://github.com/maurobringolf))
* `babel-plugin-transform-react-inline-elements`
  * [#6078](https://github.com/babel/babel/pull/6078) [docs] Added clarification note about transform-react-inline-elements usage …. ([@Andarist](https://github.com/Andarist))

#### :house: Internal
* `babel-standalone`
  * [#6168](https://github.com/babel/babel/pull/6168) Refactor es2015-loose and es2015-no-commonjs presets to use preset op…. ([@bmax](https://github.com/bmax))
  * [#6137](https://github.com/babel/babel/pull/6137) Fix babel-standalone for realz. ([@Daniel15](https://github.com/Daniel15))
  * [#6029](https://github.com/babel/babel/pull/6029) Move babel-standalone into main Babel repo. ([@Daniel15](https://github.com/Daniel15))
* `babel-plugin-transform-es2015-template-literals`
  * [#6169](https://github.com/babel/babel/pull/6169) re-add template literals tests, add ones that were missing. ([@kedromelon](https://github.com/kedromelon))
* `babel-core`, `babel-generator`, `babel-template`, `babel-traverse`, `babel-types`
  * [#6167](https://github.com/babel/babel/pull/6167) update babylon beta.22. ([@hzoo](https://github.com/hzoo))
* `babel-*`
  * [#6096](https://github.com/babel/babel/pull/6096) linting: disallow t.identifier("undefined") in plugins. ([@kedromelon](https://github.com/kedromelon))
* Other
  * [#6138](https://github.com/babel/babel/pull/6138) Allow nightly Yarn builds to be used. ([@Daniel15](https://github.com/Daniel15))
  * [#6079](https://github.com/babel/babel/pull/6079) Allow substrings for TEST_ONLY in make. ([@Qantas94Heavy](https://github.com/Qantas94Heavy))
  * [#6064](https://github.com/babel/babel/pull/6064) Yarn engines. ([@hzoo](https://github.com/hzoo))
* `babel-core`, `babel-plugin-transform-es2015-classes`, `babel-plugin-transform-regenerator`, `babel-plugin-transform-runtime`, `babel-runtime`
  * [#6113](https://github.com/babel/babel/pull/6113) Fix/regenerator fixtures. ([@Andarist](https://github.com/Andarist))
* `babel-plugin-transform-es2015-parameters`
  * [#6116](https://github.com/babel/babel/pull/6116) Fix rest-member-expression-optimisation fixture. ([@existentialism](https://github.com/existentialism))
* `babel-plugin-transform-class-properties`
  * [#6090](https://github.com/babel/babel/pull/6090) Fix class prop test fixture. ([@existentialism](https://github.com/existentialism))
* `babel-register`
  * [#6085](https://github.com/babel/babel/pull/6085) Replace decache with direct removal in babel-register tests. ([@existentialism](https://github.com/existentialism))
* `babel-generator`
  * [#6074](https://github.com/babel/babel/pull/6074) Add "classProperties" plugin to babel-generator typescript tests. ([@andy-ms](https://github.com/andy-ms))
* `babel-plugin-syntax-typescript`, `babel-preset-typescript`
  * [#6070](https://github.com/babel/babel/pull/6070) Move parser plugin from babel-preset-typescript to babel-plugin-syntax-typescript. ([@andy-ms](https://github.com/andy-ms))

## v7.0.0-alpha.19 (2017-08-07)

> Can help us documented any undocumented changes or issues at https://github.com/babel/notes/issues/30 or make an issue

#### :boom: Breaking Change
* `babel-plugin-transform-flow-strip-types`, `babel-preset-react`
  * [#5468](https://github.com/babel/babel/pull/5468) Add requireDirective to strip-flow-types for use in React preset. ([@existentialism](https://github.com/existentialism))

`babel-preset-react` now will only handle flow if the file has a `// @flow`

#### :rocket: New Feature
* `babel-plugin-syntax-typescript`, `babel-plugin-transform-typescript`, `babel-preset-typescript`
  * [#5899](https://github.com/babel/babel/pull/5899) Add babel-plugin-syntax-typescript, babel-plugin-transform-typescript, and babel-preset-typescript. ([@andy-ms](https://github.com/andy-ms))

Initial release of typescript equivalent of how Babel handles flow with a new `babel-preset-typescript`

```json
{
  "presets": ["typescript"]
}
```

#### :bug: Bug Fix
* `babel-plugin-transform-es2015-modules-commonjs`
  * [#6054](https://github.com/babel/babel/pull/6054) Don't insert the same node into the AST multiple times (fixes babel/babili#556). ([@not-an-aardvark](https://github.com/not-an-aardvark))
* `babel-plugin-transform-es2015-modules-commonjs`, `babel-plugin-transform-es2015-spread`
  * [#6052](https://github.com/babel/babel/pull/6052) Array destructuring hole. ([@hzoo](https://github.com/hzoo))

#### :house: Internal
* `babel-plugin-syntax-typescript`, `babel-plugin-transform-typescript`, `babel-preset-typescript`
  * [#6061](https://github.com/babel/babel/pull/6061) Update gulp. ([@hzoo](https://github.com/hzoo))
* `babel-core`, `babel-helper-wrap-function`, `babel-plugin-transform-es2015-arrow-functions`
  * [#6056](https://github.com/babel/babel/pull/6056) Use Yarn Workspaces. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-transform-es2015-destructuring`, `babel-plugin-transform-es2015-parameters`, `babel-plugin-transform-object-rest-spread`, `babel-plugin-transform-react-constant-elements`, `babel-traverse`
  * [#6051](https://github.com/babel/babel/pull/6051) Rewrite parameter transform and drop _blockHoist reliance. ([@existentialism](https://github.com/existentialism))
* `babel-core`, `babel-generator`, `babel-traverse`, `babel-types`
  * [#6053](https://github.com/babel/babel/pull/6053) babylon beta.19. ([@hzoo](https://github.com/hzoo))
* Other
  * [#6050](https://github.com/babel/babel/pull/6050) update to alpha.18. ([@hzoo](https://github.com/hzoo))

## v7.0.0-alpha.18 (2017-08-03)

#### :eyeglasses: Spec Compliancy
* `babel-generator`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-flow-strip-types`, `babel-types`
  * [#5990](https://github.com/babel/babel/pull/5990) Flow opaque type aliases. ([@jbrown215](https://github.com/jbrown215))
* `babel-preset-stage-3`
  * [#6032](https://github.com/babel/babel/pull/6032) Add optional catch binding to stage 3 preset. ([@existentialism](https://github.com/existentialism))

#### :boom: Breaking Change
* `babel-plugin-transform-es2015-block-scoping`, `babel-traverse`, `babel-types`
  * [#5923](https://github.com/babel/babel/pull/5923) Prevent getFunctionParent from returning Program. ([@sarupbanskota](https://github.com/sarupbanskota))

#### :rocket: New Feature
* `babel-node`
  * [#6023](https://github.com/babel/babel/pull/6023) Make babel-node a standalone package. ([@existentialism](https://github.com/existentialism))
* `babel-generator`
  * [#5896](https://github.com/babel/babel/pull/5896) babel-generator: Add TypeScript support. ([@andy-ms](https://github.com/andy-ms))

#### :bug: Bug Fix
* `babel-plugin-transform-es2015-block-scoping`, `babel-preset-es2015`
  * [#6046](https://github.com/babel/babel/pull/6046) Fix invalid block-scoped loop. ([@jridgewell](https://github.com/jridgewell))
* `babel-types`
  * [#6031](https://github.com/babel/babel/pull/6031) Fix generate interfaces script. ([@existentialism](https://github.com/existentialism))
* `babel-core`
  * [#6022](https://github.com/babel/babel/pull/6022) allow PluginPass.file.addImport to create empty import statements. ([@chocolateboy](https://github.com/chocolateboy))

#### :memo: Documentation
* `babel-plugin-transform-optional-chaining`
  * [#6035](https://github.com/babel/babel/pull/6035) Fix refs in transform-optional-chaining docs [skip ci]. ([@existentialism](https://github.com/existentialism))
* Other
  * [#6024](https://github.com/babel/babel/pull/6024) add proposals repo [skip ci]. ([@hzoo](https://github.com/hzoo))
  * [#6013](https://github.com/babel/babel/pull/6013) add TEST_GREP example clarification. ([@kedromelon](https://github.com/kedromelon))

#### :house: Internal
* `babel-*`
  * [#6044](https://github.com/babel/babel/pull/6044) Newlines in fixtures. ([@hzoo](https://github.com/hzoo))
* `babel-generator`
  * [#6026](https://github.com/babel/babel/pull/6026) babel-generator: Comment TypeScript-specific code. ([@andy-ms](https://github.com/andy-ms))
  * [#6018](https://github.com/babel/babel/pull/6018) babel-generator: Make plugins list explicit for test cases. ([@andy-ms](https://github.com/andy-ms))
* `babel-plugin-transform-function-sent`, `babel-preset-stage-2`
  * [#6020](https://github.com/babel/babel/pull/6020) Function sent. ([@hzoo](https://github.com/hzoo))
* `babel-types`
  * [#6019](https://github.com/babel/babel/pull/6019) babel-types: Have NewExpression inherit from CallExpression. ([@andy-ms](https://github.com/andy-ms))

## v7.0.0-alpha.17 (2017-07-26)

- Lots of bug fixes
- `function.sent` (temporary at `babel-plugin-transform-function-sent2` until we get access to the npm package) EDIT: republished `babel-plugin-transform-function-sent`
- Optional catch binding `try {} catch {}`: `babel-plugin-transform-optional-catch-binding`
- es2015-parameters `loose` mode that doesn't use `arguments`

#### :eyeglasses: Spec Compliancy
* `babel-plugin-check-es2015-constants`
  * [#5930](https://github.com/babel/babel/pull/5930) Spec compliancy of check-es2015-constants plugin. ([@maurobringolf](https://github.com/maurobringolf))

> Instead of throwing a compile time error when const is violated, Babel should insert a throw statement before the violation. 

#### :boom: Breaking Change
* `babel-plugin-transform-flow-comments`
  * [#5970](https://github.com/babel/babel/pull/5970) Remove noop. ([@jridgewell](https://github.com/jridgewell))

> Removes the "Noop" AST node, which was only used in the flow-comments plugin and probably unlikely in the ecosystem.

#### :rocket: New Feature
* `babel-plugin-transform-react-constant-elements`
  * [#5307](https://github.com/babel/babel/pull/5307) feature: Support whitelisting mutable props for react-constant-elements. ([@STRML](https://github.com/STRML))

> If you know a certain property will be ok to hoist

```js
{
  "plugins": [
    ["transform-react-constant-elements", {"allowMutablePropsOnTags": ["FormattedMessage"]}],
  ]
}
```

* `babel-generator`, `babel-types`
  * [#5856](https://github.com/babel/babel/pull/5856) babel-types: Add TypeScript definitions. ([@andy-ms](https://github.com/andy-ms))
* `babel-generator`, `babel-plugin-transform-flow-strip-types`, `babel-types`
  * [#5984](https://github.com/babel/babel/pull/5984) Add support for flow predicates in babel-generator. ([@existentialism](https://github.com/existentialism))

```js
declare function foo(x: mixed): boolean %checks(x !== null);
```

* `babel-generator`, `babel-plugin-transform-flow-strip-types`
  * [#5985](https://github.com/babel/babel/pull/5985) Add support for export type star in babel-generator. ([@existentialism](https://github.com/existentialism))

```js
declare module "foo" { declare export type * from "bar"; }
```

* `babel-helper-remap-async-to-generator`, `babel-helper-wrap-function`, `babel-helpers`, `babel-plugin-transform-function-sent`, `babel-preset-stage-2`
  * [#5920](https://github.com/babel/babel/pull/5920) Function sent. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

```js
function* gen() {
  let a = function.sent;
}
```

```js
let gen = _skipFirstGeneratorNext(function* gen() {
  const _functionSent = yield;
  let a = _functionSentt;
})
```

* `babel-core`, `babel-generator`, `babel-plugin-syntax-optional-catch-binding`, `babel-plugin-transform-optional-catch-binding`, `babel-template`, `babel-traverse`, `babel-types`
  * [#5956](https://github.com/babel/babel/pull/5956) Add optionality to catch bindings. ([@MarckK](https://github.com/MarckK))

```js
try {} catch {}
```

* `babel-plugin-transform-es2015-parameters`
  * [#5943](https://github.com/babel/babel/pull/5943) 2nd try: Add loose option for es2015-parameters transformation. ([@maurobringolf](https://github.com/maurobringolf))

> Non-spec compliant transform (disregards arity) but doesn't use `arguments`

```js
var t = function (f = "foo") {
  return f + " bar";
};
```

```js
var t = function (f) {
  if (f === void 0) {
    f = "foo";
  }

  return f + " bar";
};
```

#### :bug: Bug Fix
* `babel-core`, `babel-helpers`, `babel-plugin-transform-object-rest-spread`, `babel-plugin-transform-react-constant-elements`
  * [#5757](https://github.com/babel/babel/pull/5757) Non string computed keys in object-rest-spread. ([@peey](https://github.com/peey))
* `babel-traverse`
  * [#5745](https://github.com/babel/babel/pull/5745) Use first binding for multiple var declarations. ([@peey](https://github.com/peey))
* `babel-helper-builder-binary-assignment-operator-visitor`, `babel-helper-explode-assignable-expression`, `babel-plugin-transform-exponentiation-operator`
  * [#5969](https://github.com/babel/babel/pull/5969) Fixup builder-binary-assignment-operator-visitor. ([@jridgewell](https://github.com/jridgewell))
* `babel-plugin-transform-es2015-for-of`, `babel-traverse`
  * [#5835](https://github.com/babel/babel/pull/5835) Fix a few type inferences. ([@jridgewell](https://github.com/jridgewell))
* `babel-plugin-transform-numeric-separator`, `babel-types`
  * [#5968](https://github.com/babel/babel/pull/5968) Fix numeric-separator transform. ([@jridgewell](https://github.com/jridgewell))
* `babel-plugin-transform-es2015-modules-amd`, `babel-plugin-transform-es2015-modules-commonjs`, `babel-plugin-transform-es2015-modules-umd`
  * [#5953](https://github.com/babel/babel/pull/5953) Support exporting deep destructuring. ([@jridgewell](https://github.com/jridgewell))
* `babel-plugin-transform-es2015-for-of`
  * [#5964](https://github.com/babel/babel/pull/5964) Fix for-of loose optimization. ([@jridgewell](https://github.com/jridgewell))
* `babel-core`, `babel-plugin-transform-object-rest-spread`, `babel-traverse`
  * [#5945](https://github.com/babel/babel/pull/5945) Remove maybePopFromStatements. ([@jridgewell](https://github.com/jridgewell))
* `babel-generator`
  * [#5950](https://github.com/babel/babel/pull/5950) [generator] remove parens from break & continue. ([@sarupbanskota](https://github.com/sarupbanskota))
* `babel-helpers`, `babel-plugin-transform-es2015-classes`, `babel-plugin-transform-es2015-typeof-symbol`
  * [#5955](https://github.com/babel/babel/pull/5955) Optimize and remove state from typeof-symbol transform. ([@jridgewell](https://github.com/jridgewell))
* `babel-plugin-transform-react-inline-elements`
  * [#5958](https://github.com/babel/babel/pull/5958) Fix react-inline-elements bug. ([@jridgewell](https://github.com/jridgewell))

#### :house: Internal
* `babel-helper-transform-fixture-test-runner`
  * [#6002](https://github.com/babel/babel/pull/6002) Update chai to 4.x. ([@danez](https://github.com/danez))
* `babel-code-frame`
  * [#6003](https://github.com/babel/babel/pull/6003) Update chalk to 2.x. ([@danez](https://github.com/danez))
* `babel-register`
  * [#5999](https://github.com/babel/babel/pull/5999) Update find-cache-dir to 1.0. ([@danez](https://github.com/danez))
  * [#6000](https://github.com/babel/babel/pull/6000) Update default-require-extensions to 2.0. ([@danez](https://github.com/danez))
* `babel-types`
  * [#5997](https://github.com/babel/babel/pull/5997) Update to-fast-properties to 2.0. ([@danez](https://github.com/danez))
* `babel-cli`
  * [#5996](https://github.com/babel/babel/pull/5996) Update output-file-sync to 2.0. ([@danez](https://github.com/danez))
  * [#5975](https://github.com/babel/babel/pull/5975) Update v8flags to version 3.0.0. ([@Siilwyn](https://github.com/Siilwyn))
* `babel-generator`
  * [#5995](https://github.com/babel/babel/pull/5995) Update jsesc to the latest version. ([@danez](https://github.com/danez))
* `babel-traverse`
  * [#5993](https://github.com/babel/babel/pull/5993) Update globals to v10. ([@danez](https://github.com/danez))
* Other
  * [#5991](https://github.com/babel/babel/pull/5991) Fix clean to remove package-lock files. ([@danez](https://github.com/danez))
  * [#5959](https://github.com/babel/babel/pull/5959) Bump istanbul and nyc. ([@existentialism](https://github.com/existentialism))
* `babel-core`, `babel-generator`, `babel-helper-builder-react-jsx`, `babel-helper-function-name`, `babel-helper-replace-supers`, `babel-plugin-transform-es2015-block-scoping`, `babel-plugin-transform-es2015-classes`, `babel-plugin-transform-jscript`, `babel-plugin-transform-react-constant-elements`, `babel-plugin-transform-react-jsx`, `babel-template`, `babel-traverse`, `babel-types`
  * [#5963](https://github.com/babel/babel/pull/5963) Stop mutating nodes. ([@jridgewell](https://github.com/jridgewell))
* `babel-plugin-transform-es2015-modules-systemjs`
  * [#5954](https://github.com/babel/babel/pull/5954) Add several test cases for systemjs exports. ([@jridgewell](https://github.com/jridgewell))

## v7.0.0-alpha.16 (2017-07-25)

> Publish issue

## v7.0.0-alpha.15 (2017-07-11)

- [babel-plugin-transform-optional-chaining](https://github.com/babel/babel/tree/7.0/packages/babel-plugin-transform-optional-chaining)

> This is a Stage 0 TC39 Proposal (subject to change/removal and your feedback!)

```js
const obj = {
  foo: {
    bar: {
      baz: 42,
    },
  },
};

const baz = obj?.foo?.bar?.baz; // 42

const safe = obj?.qux?.baz; // undefined

// Optional chaining and normal chaining can be intermixed
obj?.foo.bar?.baz; // Only access `foo` if `obj` exists, and `baz` if
                   // `bar` exists
```

- [babel-plugin-transform-new-target](https://github.com/babel/babel/blob/7.0/packages/babel-plugin-transform-new-target/README.md)

```
function Foo() {
  console.log(new.target);
}

Foo(); // => undefined
new Foo(); // => Foo
```

- better `for of` optimization (if inferred array)

```js
// these kinds of scenarios will compile to a regular for loop
const x = [];
for (const y of x) {}
const arr = Object.entries(x);
for (const y of arr) {}
```
- loose mode for classes is a lot looser

Input

```js
class A {}
```

Output (loose)

```js
let A = function A() {}; // loose
```

Output (normal)

```js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var A = function A() {
  _classCallCheck(this, A);
};
```

#### :boom: Breaking Change
* `babel-*`
  * [#5824](https://github.com/babel/babel/pull/5824) Hardcode to double quotes, indent to 2 spaces. ([@hzoo](https://github.com/hzoo))

> This is just the babel-generator output, not a big deal.

#### :rocket: New Feature
* `babel-traverse`
  * [#5914](https://github.com/babel/babel/pull/5914) babel-traverse: Mark appropriate template literals as pure. ([@ashsearle](https://github.com/ashsearle))
  * [#5681](https://github.com/babel/babel/pull/5681) Add support for evaluating `String.raw` expressions. ([@josephfrazier](https://github.com/josephfrazier))
* `babel-plugin-transform-new-target`
  * [#5906](https://github.com/babel/babel/pull/5906) Add new.target transform. ([@jridgewell](https://github.com/jridgewell))
* `babel-core`, `babel-generator`, `babel-plugin-syntax-optional-chaining`, `babel-plugin-transform-optional-chaining`, `babel-preset-stage-1`, `babel-template`, `babel-traverse`, `babel-types`
  * [#5813](https://github.com/babel/babel/pull/5813) Optional Chaining Operator (Stage 1). ([@jridgewell](https://github.com/jridgewell))
* `babel-core`, `babel-plugin-transform-es2015-for-of`
  * [#4747](https://github.com/babel/babel/pull/4747) test for for-of optimization on arrays and add it for array type anno…. ([@hzoo](https://github.com/hzoo))
* `babel-helpers`, `babel-plugin-transform-es2015-classes`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-flow-strip-types`
  * [#4850](https://github.com/babel/babel/pull/4850) Remove ClassCallCheck, possibleConstructorReturn in loose mode. ([@hzoo](https://github.com/hzoo))
* `babel-generator`, `babel-plugin-transform-flow-strip-types`, `babel-types`
  * [#5589](https://github.com/babel/babel/pull/5589) Support declare export statements. ([@danez](https://github.com/danez))

#### :bug: Bug Fix
* `babel-helpers`, `babel-plugin-transform-class-properties`, `babel-plugin-transform-es2015-classes`
  * [#5885](https://github.com/babel/babel/pull/5885) Fix returning an object in a derived class constructor without super. ([@jridgewell](https://github.com/jridgewell))
* `babel-helper-remap-async-to-generator`, `babel-plugin-transform-async-to-generator`
  * [#5932](https://github.com/babel/babel/pull/5932) Fix async-to-generator ForAwait transform. ([@jridgewell](https://github.com/jridgewell))
* `babel-plugin-transform-es2015-modules-commonjs`
  * [#5891](https://github.com/babel/babel/pull/5891) Fix 5768 (to 7.0 branch). ([@joshwnj](https://github.com/joshwnj))
  * [#5886](https://github.com/babel/babel/pull/5886) 7.0 port: Fix commonjs exports with destructuring.. ([@yavorsky](https://github.com/yavorsky))
* `babel-plugin-transform-es2015-classes`
  * [#5801](https://github.com/babel/babel/pull/5801) Fix bug `super` ref check doesn’t honor spec evaluation order. ([@buunguyen](https://github.com/buunguyen))
  * [#5802](https://github.com/babel/babel/pull/5802) Remove check for super calls in arrow function. ([@existentialism](https://github.com/existentialism))
* `babel-cli`
  * [#5861](https://github.com/babel/babel/pull/5861) Pass SIGINT signals to the spawned child process. ([@bill-improbableio](https://github.com/bill-improbableio))
  * [#5867](https://github.com/babel/babel/pull/5867) fix issue as a result of refactor. ([@hzoo](https://github.com/hzoo))
* `babel-types`
  * [#5865](https://github.com/babel/babel/pull/5865) Fix type errors for destructuring assignments(#4227). ([@MarckK](https://github.com/MarckK))
* `babel-generator`
  * [#5830](https://github.com/babel/babel/pull/5830) Fix parens issues with exponentiation in generator. ([@existentialism](https://github.com/existentialism))
  * [#5820](https://github.com/babel/babel/pull/5820) Wrap an arrow function in parentheses if it the test of a conditional expression. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-plugin-transform-numeric-separator`
  * [#5825](https://github.com/babel/babel/pull/5825) Fix numeric separator Number transform. ([@jridgewell](https://github.com/jridgewell))
* `babel-plugin-transform-es2015-template-literals`, `babel-preset-es2015`
  * [#5791](https://github.com/babel/babel/pull/5791) Spec compatibility for template literals.. ([@yavorsky](https://github.com/yavorsky))
* `babel-plugin-transform-es2015-parameters`
  * [#5810](https://github.com/babel/babel/pull/5810) Fix bug incorrect dereferencing rest argument. ([@buunguyen](https://github.com/buunguyen))
* `babel-plugin-syntax-optional-chaining`
  * [#5942](https://github.com/babel/babel/pull/5942) move to src. ([@hzoo](https://github.com/hzoo))

#### :nail_care: Polish
* `babel-plugin-transform-es2015-parameters`
  * [#5721](https://github.com/babel/babel/pull/5721) Fix optimisation of shadowed rest parameters. ([@Qantas94Heavy](https://github.com/Qantas94Heavy))
* `babel-helper-builder-react-jsx`, `babel-plugin-transform-es2015-spread`, `babel-traverse`
  * [#5837](https://github.com/babel/babel/pull/5837) Hoist several closures. ([@jridgewell](https://github.com/jridgewell))
* `babel-traverse`, `babel-types`
  * [#5826](https://github.com/babel/babel/pull/5826) Matches pattern cleanup. ([@jridgewell](https://github.com/jridgewell))
* `babel-types`
  * [#5821](https://github.com/babel/babel/pull/5821) babel-types: avoid recreating validator closures. ([@jridgewell](https://github.com/jridgewell))

#### :memo: Documentation
* `babel-types`
  * [#5941](https://github.com/babel/babel/pull/5941) Update babel-types docs [skip ci]. ([@existentialism](https://github.com/existentialism))
  * [#5940](https://github.com/babel/babel/pull/5940) Removed update operators from number unary operators. ([@maurobringolf](https://github.com/maurobringolf))
  * [#5855](https://github.com/babel/babel/pull/5855) Minor enhancements around spacing. ([@sarupbanskota](https://github.com/sarupbanskota))

#### :house: Internal
* `babel-polyfill`
  * [#5939](https://github.com/babel/babel/pull/5939) Change trailing comma option for polyfill scripts. ([@existentialism](https://github.com/existentialism))
* Other
  * [#5937](https://github.com/babel/babel/pull/5937) Remove codecov node package and use bash uploader. ([@danez](https://github.com/danez))
  * [#5918](https://github.com/babel/babel/pull/5918) Gitignore package-lock. ([@sarupbanskota](https://github.com/sarupbanskota))
* `babel-core`, `babel-generator`
  * [#5892](https://github.com/babel/babel/pull/5892) Fix some unneeded semis in test fixtures. ([@existentialism](https://github.com/existentialism))
* `babel-*`
  * [#5833](https://github.com/babel/babel/pull/5833) Remove whitespace generation. ([@danez](https://github.com/danez))
* `babel-core`, `babel-generator`, `babel-traverse`, `babel-types`
  * [#5889](https://github.com/babel/babel/pull/5889) Update babylon. ([@hzoo](https://github.com/hzoo))
* `babel-*`
  * [#5412](https://github.com/babel/babel/pull/5412) Use prettier. ([@existentialism](https://github.com/existentialism))
* `babel-generator`, `babel-traverse`
  * [#5866](https://github.com/babel/babel/pull/5866) update babel-eslint, try out numeric separators. ([@hzoo](https://github.com/hzoo))
* `babel-generator`
  * [#5845](https://github.com/babel/babel/pull/5845) Add tests for babel-generator. ([@1egoman](https://github.com/1egoman))
* `babel-cli`
  * [#5807](https://github.com/babel/babel/pull/5807) Include node 8.0 to travis config & update tests. ([@sarupbanskota](https://github.com/sarupbanskota))
* `babel-core`, `babel-helper-transform-fixture-test-runner`, `babel-traverse`
  * [#5815](https://github.com/babel/babel/pull/5815) Don't call deprecated code frame export. ([@SimenB](https://github.com/SimenB))
* `babel-core`, `babel-traverse`
  * [#5808](https://github.com/babel/babel/pull/5808) ⬆️ Alpha 12. ([@hzoo](https://github.com/hzoo))

## v7.0.0-alpha.14

* Skipped

## v7.0.0-alpha.13

* Skipped

## v7.0.0-alpha.12 (2017-05-31)

#### :eyeglasses: Spec Compliancy
* `babel-core`, `babel-generator`, `babel-plugin-syntax-numeric-separator`, `babel-plugin-transform-numeric-separator`, `babel-preset-stage-1`, `babel-template`, `babel-traverse`, `babel-types`
  * [#5793](https://github.com/babel/babel/pull/5793) Support for NumericLiteralSeparator, Stage 1 feature. ([@rwaldron](https://github.com/rwaldron))

#### :rocket: New Feature
* `babel-code-frame`
  * [#5646](https://github.com/babel/babel/pull/5646) Add column range to babel-code-frame. ([@SimenB](https://github.com/SimenB))
* `babel-core`, `babel-generator`, `babel-plugin-syntax-numeric-separator`, `babel-plugin-transform-numeric-separator`, `babel-preset-stage-1`, `babel-template`, `babel-traverse`, `babel-types`
  * [#5793](https://github.com/babel/babel/pull/5793) Support for NumericLiteralSeparator, Stage 1 feature. ([@rwaldron](https://github.com/rwaldron))
* `babel-cli`
  * [#5785](https://github.com/babel/babel/pull/5785) Allow --inspect-brk option to be used with babel-node. ([@noinkling](https://github.com/noinkling))

#### :bug: Bug Fix
* `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-es2015-destructuring`, `babel-plugin-transform-es2015-modules-commonjs`, `babel-plugin-transform-react-constant-elements`
  * [#5763](https://github.com/babel/babel/pull/5763) Fix incorrect destructuring in for loop `let` initialization. ([@buunguyen](https://github.com/buunguyen))
* `babel-core`, `babel-plugin-transform-es2015-block-scoping`
  * [#5775](https://github.com/babel/babel/pull/5775) Switch continue. ([@peey](https://github.com/peey))
* `babel-plugin-transform-flow-strip-types`
  * [#5782](https://github.com/babel/babel/pull/5782) Remove import declaration when stripping flowtypes if flow specifiers. ([@existentialism](https://github.com/existentialism))

#### :memo: Documentation
* `babel-plugin-check-es2015-constants`, `babel-plugin-syntax-async-functions`, `babel-plugin-syntax-async-generators`, `babel-plugin-syntax-class-properties`, `babel-plugin-syntax-decorators`, `babel-plugin-syntax-do-expressions`, `babel-plugin-syntax-dynamic-import`, `babel-plugin-syntax-exponentiation-operator`, `babel-plugin-syntax-export-extensions`, `babel-plugin-syntax-function-bind`, `babel-plugin-syntax-function-sent`, `babel-plugin-syntax-jsx`, `babel-plugin-syntax-object-rest-spread`, `babel-plugin-syntax-trailing-function-commas`, `babel-plugin-transform-async-functions`
  * [#5798](https://github.com/babel/babel/pull/5798) Make all packages/*/README.md descriptions consistent.. ([@rwaldron](https://github.com/rwaldron))
* Other
  * [#5790](https://github.com/babel/babel/pull/5790) Contributing troubleshooting. ([@peey](https://github.com/peey))

#### :house: Internal
* `babel-traverse`
  * [#5746](https://github.com/babel/babel/pull/5746) Remove duplicated getStatementParent and refactor requires to imports in tests. ([@maurobringolf](https://github.com/maurobringolf))
  * [#5779](https://github.com/babel/babel/pull/5779) Added individual test cases for possible errors with path.replaceWith. ([@maurobringolf](https://github.com/maurobringolf))

## v7.0.0-alpha.11 (2017-05-31)

* Publish issues

## v7.0.0-alpha.10 (2017-05-25)

* Publish issues, use alpha.12

Update Babylon: https://github.com/babel/babylon/releases/tag/v7.0.0-beta.9, https://github.com/babel/babylon/releases/tag/v7.0.0-beta.10

#### :eyeglasses: Spec Compliancy
* `babel-generator`, `babel-plugin-transform-flow-strip-types`, `babel-types`
  * [#5525](https://github.com/babel/babel/pull/5525) Add support for object type spread. ([@conartist6](https://github.com/conartist6))

#### :boom: Breaking Change
* `babel-*`
  * [#5677](https://github.com/babel/babel/pull/5677) Kill the "shadow-functions.js" internal plugin in favor of an explicit helper. ([@loganfsmyth](https://github.com/loganfsmyth))

#### :rocket: New Feature
* `babel-*`
  * [#5761](https://github.com/babel/babel/pull/5761) Babylon 7 alpha.10. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-transform-es2015-arrow-functions`, `babel-plugin-transform-es2015-function-name`
  * [#5620](https://github.com/babel/babel/pull/5620) Add function name to spec-transformed arrow functions. ([@Kovensky](https://github.com/Kovensky))
* `babel-plugin-transform-react-display-name`
  * [#5554](https://github.com/babel/babel/pull/5554) Updated transform-react-display-name for createReactClass addon. ([@bvaughn](https://github.com/bvaughn))
* `babel-register`
  * [#5669](https://github.com/babel/babel/pull/5669) Find cache dir. ([@pwmckenna](https://github.com/pwmckenna))

#### :bug: Bug Fix
* `babel-types`
  * [#5762](https://github.com/babel/babel/pull/5762) Fix ObjectProperty patterns. ([@citycide](https://github.com/citycide))
  * [#5753](https://github.com/babel/babel/pull/5753) Hoist toSequenceExpression's convert helper (#5693). ([@jridgewell](https://github.com/jridgewell))
  * [#5693](https://github.com/babel/babel/pull/5693) Hoist toSequenceExpression's convert helper. ([@jridgewell](https://github.com/jridgewell))
  * [#5722](https://github.com/babel/babel/pull/5722) Correct the validator for ArrayPattern. ([@Kovensky](https://github.com/Kovensky))
* `babel-plugin-transform-flow-comments`
  * [#5675](https://github.com/babel/babel/pull/5675) Flow comments import export. ([@lightsofapollo](https://github.com/lightsofapollo))
* `babel-plugin-transform-do-expressions`
  * [#5694](https://github.com/babel/babel/pull/5694) Transform do-expressions on exit. ([@jridgewell](https://github.com/jridgewell))
* `babel-plugin-transform-es2015-classes`, `babel-plugin-transform-es2015-destructuring`, `babel-traverse`
  * [#5749](https://github.com/babel/babel/pull/5749) Fix issue semi-colon gets inserted unnecessarily. ([@buunguyen](https://github.com/buunguyen))
* `babel-core`, `babel-helpers`, `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-react-constant-elements`
  * [#5688](https://github.com/babel/babel/pull/5688) Fix for #4943 "Calling an async function with default parameter as function for arguments checking handled synchonous". ([@hulkish](https://github.com/hulkish))
* `babel-plugin-transform-object-rest-spread`
  * [#5685](https://github.com/babel/babel/pull/5685) Fix incorrect property ordering with obj rest spread on nested. ([@existentialism](https://github.com/existentialism))
  * [#5650](https://github.com/babel/babel/pull/5650) Fix object destructuring in param arrays. ([@CKarper](https://github.com/CKarper))

#### :nail_care: Polish
* `babel-plugin-transform-es2015-template-literals`
  * [#5748](https://github.com/babel/babel/pull/5748) Cleanup template-literals transform. ([@jridgewell](https://github.com/jridgewell))

#### :memo: Documentation
* `babel-plugin-transform-runtime`
  * [#5767](https://github.com/babel/babel/pull/5767) [Documentation change] regeneratorRuntime -> _regenerator2.default. ([@adityavohra7](https://github.com/adityavohra7))
* `babel-plugin-transform-es2015-arrow-functions`
  * [#5698](https://github.com/babel/babel/pull/5698) Add spec option example for transform-es2015-arrow-functions [skip ci]. ([@existentialism](https://github.com/existentialism))
* Other
  * [#5729](https://github.com/babel/babel/pull/5729) Lowercase "business model" in badge. ([@Daniel15](https://github.com/Daniel15))
* `babel-core`
  * [#5659](https://github.com/babel/babel/pull/5659) [Doc PR] naming fix in example. ([@aretecode](https://github.com/aretecode))

#### :house: Internal
* `babel-helper-fixtures`
  * [#5765](https://github.com/babel/babel/pull/5765) Support specifying minimum Node version a test requires. ([@buunguyen](https://github.com/buunguyen))
* `babel-helper-transform-fixture-test-runner`
  * [#5410](https://github.com/babel/babel/pull/5410) Add process to test sandbox. ([@existentialism](https://github.com/existentialism))
* `babel-preset-es2015`
  * [#5720](https://github.com/babel/babel/pull/5720) Add test cases for bad options in babel-preset-es2015. ([@maurobringolf](https://github.com/maurobringolf))
* `babel-register`
  * [#3670](https://github.com/babel/babel/pull/3670) Switch to pirates for babel-register.. ([@danez](https://github.com/danez))
* `babel-core`
  * [#5649](https://github.com/babel/babel/pull/5649) Remove merge helper and add more type declarations.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-core`, `babel-plugin-transform-react-jsx`
  * [#5642](https://github.com/babel/babel/pull/5642) Typecheck much more of the config loading process. ([@loganfsmyth](https://github.com/loganfsmyth))
* Other
  * [#5639](https://github.com/babel/babel/pull/5639) update to alpha.9. ([@hzoo](https://github.com/hzoo))

## v7.0.0-alpha.9 (2017-04-18)

#### :bug: Bug Fix
* `babel-core`
  * [#5641](https://github.com/babel/babel/pull/5641) Fix a regression from adding negation support in #5625.. ([@loganfsmyth](https://github.com/loganfsmyth))

## v7.0.0-alpha.8 (2017-04-17)

#### :eyeglasses: Spec Compliancy
* `babel-preset-stage-2`, `babel-preset-stage-3`
  * [#5610](https://github.com/babel/babel/pull/5610) Move syntax-dynamic-import to stage-3. ([@dkaoster](https://github.com/dkaoster))

#### :boom: Breaking Change
* `babel-core`
  * [#5547](https://github.com/babel/babel/pull/5547) [7.0] Require babel-(preset|plugin) or module: on plugins/presets. ([@loganfsmyth](https://github.com/loganfsmyth))

#### :rocket: New Feature
* `babel-core`
  * [#5608](https://github.com/babel/babel/pull/5608) Cache configs based on mtime and allow .babelrc.js functions. ([@loganfsmyth](https://github.com/loganfsmyth))
  * [#5625](https://github.com/babel/babel/pull/5625) Allow negation of ignore and only patterns.. ([@loganfsmyth](https://github.com/loganfsmyth))

#### :bug: Bug Fix
* `babel-plugin-transform-class-properties`, `babel-plugin-transform-es2015-classes`, `babel-plugin-transform-es2015-function-name`
  * [#5488](https://github.com/babel/babel/pull/5488) Ensure default exported classes keep entry in export table. ([@existentialism](https://github.com/existentialism))
* `babel-generator`
  * [#5562](https://github.com/babel/babel/pull/5562) Avoid creating a new line comment when a block comment is preceded by a forward slash. ([@tgecho](https://github.com/tgecho))
* `babel-plugin-transform-async-to-generator`
  * [#5536](https://github.com/babel/babel/pull/5536) Always use the native (or polyfilled) Promise in transform-async-to-generator. ([@Kovensky](https://github.com/Kovensky))

#### :nail_care: Polish
* `babel-core`, `babel-helpers`
  * [#5548](https://github.com/babel/babel/pull/5548) Remove unnecessary returns in asyncToGenerator helper. ([@zertosh](https://github.com/zertosh))

#### :memo: Documentation
* `babel-plugin-transform-es2015-arrow-functions`
  * [#5573](https://github.com/babel/babel/pull/5573) Improve example of babel-plugin-transform-es2015-arrow-functions. ([@exacs](https://github.com/exacs))

#### :house: Internal
* `babel-core`, `babel-messages`
  * [#5602](https://github.com/babel/babel/pull/5602) Refactor OptionManager to be a short class with a bunch of pure helper functions.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-plugin-transform-regenerator`
  * [#5605](https://github.com/babel/babel/pull/5605) Test arrow function inside generator.. ([@yavorsky](https://github.com/yavorsky))
* Other
  * [#5619](https://github.com/babel/babel/pull/5619) Set an 80% coverage goal instead of 'auto'?. ([@loganfsmyth](https://github.com/loganfsmyth))

# v7.0.0-alpha.7 (2017-04-05)

- Updated babylon, fixed babel-register issue, and make babel-polyfill publish the core-js polyfills individually for babel-preset-env

#### :rocket: New Feature
* `babel-polyfill`
  * [#5584](https://github.com/babel/babel/pull/5584) add individual polyfill files. ([@hzoo](https://github.com/hzoo))

#### :bug: Bug Fix
* `babel-register`
  * [#5583](https://github.com/babel/babel/pull/5583) Change babel-register default ignore to cwd content. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-generator`, `babel-helper-builder-react-jsx`, `babel-plugin-transform-react-jsx`
  * [#5256](https://github.com/babel/babel/pull/5256) Use raw value of JSXText and JSXAttribute. ([@rattrayalex](https://github.com/rattrayalex))
* `babel-core`, `babel-generator`, `babel-template`, `babel-traverse`, `babel-types`
  * [#5585](https://github.com/babel/babel/pull/5585) Update babylon to latest beta. ([@danez](https://github.com/danez))

#### :memo: Documentation
* `babel-plugin-transform-es2015-modules-commonjs`
  * [#5588](https://github.com/babel/babel/pull/5588) Update transform-es2015-modules-commonjs doc. ([@xtuc](https://github.com/xtuc))
* `babel-plugin-transform-es2015-spread`
  * [#5580](https://github.com/babel/babel/pull/5580) Remove incorrect docs.. ([@loganfsmyth](https://github.com/loganfsmyth))

#### :house: Internal
* `babel-core`
  * [#5563](https://github.com/babel/babel/pull/5563) Separate config-file/plugin loading from config processing.. ([@loganfsmyth](https://github.com/loganfsmyth))
  * [#5571](https://github.com/babel/babel/pull/5571) Add tests to test the plugin/preset ordering.. ([@loganfsmyth](https://github.com/loganfsmyth))
* Other
  * [#5561](https://github.com/babel/babel/pull/5561) Ensure that incremental builds work with 'gulp build'.. ([@loganfsmyth](https://github.com/loganfsmyth))
  * [#5555](https://github.com/babel/babel/pull/5555) Use a standard .babelignore and babel-register in tests.. ([@loganfsmyth](https://github.com/loganfsmyth))
  * [#5551](https://github.com/babel/babel/pull/5551) use latest babel-core. ([@hzoo](https://github.com/hzoo))

## v7.0.0-alpha.6 (2017-03-27)

Fix issue with `babel-core` not picking up the .babelrc correctly

Also started Babel to compile itself with Babel 7! (We'll be working on making it compile the last good version from master soon so we don't need to wait until after publishing to find a regression)

#### :bug: Bug Fix
* `babel-core`
  * [#5550](https://github.com/babel/babel/pull/5550) Fix: config lookup logic in babel-core. ([@kaicataldo](https://github.com/kaicataldo))

#### :house: Internal
* Other
  * [#5543](https://github.com/babel/babel/pull/5543) 🐶 🍲. ([@hzoo](https://github.com/hzoo))
* `babel-*`
  * [#5545](https://github.com/babel/babel/pull/5545) Misc. ([@hzoo](https://github.com/hzoo))

## v7.0.0-alpha.5 (2017-03-24)

`babel-runtime` helpers weren't built correctly, and I found extra dep on `babel-runtime` in 2 packages.

> At the point of this publish, all other packages are at `v7.0.0-alpha.3`
> `babel-register` is at `v7.0.0-alpha.4`

#### :bug: Bug Fix
* `babel-runtime`
  * [#5539](https://github.com/babel/babel/pull/5539) Fix babel-runtime helpers gererator. ([@azrael25](https://github.com/azrael25))

#### :house: Internal
* `babel-plugin-transform-decorators`, `babel-plugin-transform-react-inline-elements`, `babel-runtime`
  * [#5540](https://github.com/babel/babel/pull/5540) keep one core-js helper file in git, remove babel-runtime from deps. ([@hzoo](https://github.com/hzoo))

## v7.0.0-alpha.4 (2017-03-23)

> At the point of this publish, all other packages are at `v7.0.0-alpha.3`

#### :bug: Bug Fix
* `babel-register`
  * [#5534](https://github.com/babel/babel/pull/5534) Ensure the ignore regex is consistent and initialized fully.. ([@loganfsmyth](https://github.com/loganfsmyth))

## v7.0.0-alpha.3 (2017-03-23)

#### :boom: Breaking Change
* `babel-traverse`
  * [#5494](https://github.com/babel/babel/pull/5494) Cleanup traverse cache APIs. ([@boopathi](https://github.com/boopathi))
* `babel-runtime`
  * [#5516](https://github.com/babel/babel/pull/5516) removed unused alias in babel-runtime. ([@JulianJason](https://github.com/JulianJason))
* `babel-core`, `babel-generator`, `babel-plugin-transform-es2015-template-literals`, `babel-template`, `babel-traverse`, `babel-types`
  * [#5523](https://github.com/babel/babel/pull/5523) Account for template literals revision. ([@hzoo](https://github.com/hzoo))
* `babel-core`, `babel-preset-react`, `babel-runtime`
  * [#5489](https://github.com/babel/babel/pull/5489) Misc fixes + Move babel-core config processing from transformation/file/options into top-level folder. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-cli`, `babel-core`, `babel-register`, `babel-types`
  * [#5487](https://github.com/babel/babel/pull/5487) Make only/ignore relative to cwd/config file and move only/ignore checking all to core.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-core`, `babel-plugin-transform-es2015-modules-umd`, `babel-plugin-transform-react-display-name`, `babel-plugin-transform-react-jsx-source`
  * [#5467](https://github.com/babel/babel/pull/5467) Misc reorganizing and prep for ignore/only refactoring. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-core`
  * [#5466](https://github.com/babel/babel/pull/5466) Resolve programmatic/CLI arguments from cwd, not file being compiled.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-cli`, `babel-core`
  * [#5463](https://github.com/babel/babel/pull/5463) More strictly parse configs and explicitly handle arguments in babel-cli. ([@loganfsmyth](https://github.com/loganfsmyth))

#### :rocket: New Feature
* `babel-plugin-transform-runtime`, `babel-runtime`
  * [#5442](https://github.com/babel/babel/pull/5442) Add useBuiltIns and useESModules options to transform-runtime. ([@Kovensky](https://github.com/Kovensky))
* `babel-core`, `babel-register`
  * [#5448](https://github.com/babel/babel/pull/5448) Export Babel's environment. ([@xtuc](https://github.com/xtuc))

#### :bug: Bug Fix
* `babel-plugin-transform-react-inline-elements`, `babel-traverse`
  * [#5504](https://github.com/babel/babel/pull/5504) Fix path.remove() leading & trailing comments sharing. ([@dmail](https://github.com/dmail))
* `babel-core`, `babel-runtime`
  * [#5528](https://github.com/babel/babel/pull/5528) Fix babel runtime helpers. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-transform-react-constant-elements`, `babel-traverse`
  * [#5415](https://github.com/babel/babel/pull/5415) Fix PathHoister attaching to default parameters.. ([@STRML](https://github.com/STRML))
* `babel-plugin-transform-es2015-modules-amd`, `babel-plugin-transform-es2015-modules-commonjs`
  * [#5474](https://github.com/babel/babel/pull/5474) Properly preserve import ordering with AMD format.. ([@rwjblue](https://github.com/rwjblue))
* `babel-plugin-transform-do-expressions`, `babel-types`
  * [#5499](https://github.com/babel/babel/pull/5499) Fix throw error in do-expression. ([@xtuc](https://github.com/xtuc))
* `babel-plugin-transform-es2015-function-name`, `babel-types`
  * [#4954](https://github.com/babel/babel/pull/4954) Treat "await" as an invalid identifier. ([@Kovensky](https://github.com/Kovensky))

#### :nail_care: Polish
* `babel-register`
  * [#5411](https://github.com/babel/babel/pull/5411) Seperate version env cache files. ([@pwmckenna](https://github.com/pwmckenna))

#### :memo: Documentation
* `babel-plugin-transform-runtime`
  * [#5481](https://github.com/babel/babel/pull/5481) Add useBuiltins and useESModules options to transform-runtime README. ([@existentialism](https://github.com/existentialism))
  * [#5401](https://github.com/babel/babel/pull/5401) Improve options documentation for `babel-plugin-transform-runtime`. ([@aaronang](https://github.com/aaronang))
* `babel-register`
  * [#5475](https://github.com/babel/babel/pull/5475) Update coffescript/register reference link address. ([@sergeybekrin](https://github.com/sergeybekrin))
* `babel-generator`
  * [#5477](https://github.com/babel/babel/pull/5477) Update babel-generator documentation. ([@xtuc](https://github.com/xtuc))
* `babel-plugin-transform-es2015-*`
  * [#5393](https://github.com/babel/babel/pull/5393) added examples for transforms. [skip ci]. ([@nitin42](https://github.com/nitin42))

#### :house: Internal
* `babel-cli`
  * [#5205](https://github.com/babel/babel/pull/5205) Ensure babel-cli tests compare generated output with out-files. ([@existentialism](https://github.com/existentialism))
* Other
  * [#5530](https://github.com/babel/babel/pull/5530) devEngines: Bump node to 4.x.. ([@yavorsky](https://github.com/yavorsky))
* `babel-plugin-transform-regenerator`
  * [#5341](https://github.com/babel/babel/pull/5341) Bump regenerator-transform version to 0.9.11.. ([@yavorsky](https://github.com/yavorsky))
* `babel-core`, `babel-plugin-transform-es2015-classes`, `babel-template`, `babel-traverse`
  * [#5522](https://github.com/babel/babel/pull/5522) Update babylon. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-transform-es2015-classes`
  * [#5450](https://github.com/babel/babel/pull/5450) Changes the throw error for test in super-illegal-non-constructor-call. ([@arshabh](https://github.com/arshabh))
* `babel-helper-builder-react-jsx`
  * [#5484](https://github.com/babel/babel/pull/5484) Removes unused lodash dep from babel-helper-builder-react-jsx. ([@segphault](https://github.com/segphault))

## babel@7.0.0-alpha.2 (2017-03-08)

#### :rocket: New Feature
* `babel-core`, `babel-generator`, `babel-plugin-transform-object-rest-spread`
  * [#4892](https://github.com/babel/babel/pull/4892) Add support for .babelrc.js files. ([@kaicataldo](https://github.com/kaicataldo))
* `babel-plugin-transform-es2015-modules-amd`, `babel-plugin-transform-es2015-modules-commonjs`
  * [#5427](https://github.com/babel/babel/pull/5427) Backport `noInterop` flag for modules to 6.x.. ([@rwjblue](https://github.com/rwjblue))

#### :memo: Documentation
* `babel-plugin-transform-object-rest-spread`
  * [#5409](https://github.com/babel/babel/pull/5409) Fix transform-object-rest-spread README. ([@existentialism](https://github.com/existentialism))
  * [#5409](https://github.com/babel/babel/pull/5409) Fix transform-object-rest-spread README. ([@existentialism](https://github.com/existentialism))

#### :house: Internal
* `babel-core`, `babel-helper-transform-fixture-test-runner`
  * [#5416](https://github.com/babel/babel/pull/5416) Use 'resolve' from npm instead of private 'module' methods.. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-*`
  * [#5413](https://github.com/babel/babel/pull/5413) Run new lint rules. ([@existentialism](https://github.com/existentialism))

## v7.0.0-alpha.1 (2017-03-02)

#### :boom: Breaking Change
* `babel-core`, `babel-generator`, `babel-helper-remap-async-to-generator`, `babel-plugin-transform-async-to-generator`, `babel-template`, `babel-traverse`, `babel-types`
  * [#5399](https://github.com/babel/babel/pull/5399) Update babylon beta 4. ([@hzoo](https://github.com/hzoo))
* `babel-core`, `babel-generator`, `babel-plugin-transform-es2015-destructuring`, `babel-plugin-transform-es2015-duplicate-keys`, `babel-plugin-transform-object-rest-spread`, `babel-template`, `babel-traverse`, `babel-types`
  * [#5394](https://github.com/babel/babel/pull/5394) Update babylon beta 3. ([@hzoo](https://github.com/hzoo))
* `babel-core`
  * [#5376](https://github.com/babel/babel/pull/5376) [7.0] Remove the unneeded Pipeline class.. ([@loganfsmyth](https://github.com/loganfsmyth))
  * [#5132](https://github.com/babel/babel/pull/5132) [7.0] Deprecate babel-core/register.js. ([@chicoxyzzy](https://github.com/chicoxyzzy))
* `babel-core`, `babel-preset-es2015`, `babel-preset-es2016`, `babel-preset-es2017`, `babel-preset-flow`, `babel-preset-latest`, `babel-preset-react`, `babel-preset-stage-0`, `babel-preset-stage-1`, `babel-preset-stage-2`, `babel-preset-stage-3`
  * [#5128](https://github.com/babel/babel/pull/5128) [7.0] Remove bc code from preset handling and preset-es2015. ([@danez](https://github.com/danez))
* `babel-core`, `babel-generator`, `babel-helper-remap-async-to-generator`, `babel-plugin-transform-object-rest-spread`, `babel-template`, `babel-traverse`, `babel-types`
  * [#5317](https://github.com/babel/babel/pull/5317) Update to babylon@7.0.0-beta.0. ([@hzoo](https://github.com/hzoo))
* `babel-generator`, `babel-helper-remap-async-to-generator`, `babel-plugin-transform-object-rest-spread`, `babel-types`
  * [#5321](https://github.com/babel/babel/pull/5321) Change for-await to use new AST. ([@danez](https://github.com/danez))
* `babel-generator`
  * [#5320](https://github.com/babel/babel/pull/5320) Fix variance. ([@danez](https://github.com/danez))
  * [#5154](https://github.com/babel/babel/pull/5154) [7.0] Remove quotes option. ([@4rlekin](https://github.com/4rlekin))
  * [#5226](https://github.com/babel/babel/pull/5226) Bump `detect-indent` for `babel-generator`.. ([@wtgtybhertgeghgtwtg](https://github.com/wtgtybhertgeghgtwtg))
* `babel-plugin-transform-decorators`
  * [#5290](https://github.com/babel/babel/pull/5290) [7.0] Replacing current decorators. ([@alxpy](https://github.com/alxpy))
* `babel-generator`, `babel-types`
  * [#5199](https://github.com/babel/babel/pull/5199) Rename flow AST Type ExistentialTypeParam to ExistsTypeAnnotation. ([@koba04](https://github.com/koba04))
  * [#5229](https://github.com/babel/babel/pull/5229) Rename NumericLiteralTypeAnnotation to NumberLiteralTypeAnnotation. ([@phpnode](https://github.com/phpnode))
* `babel-*`
  * [#5218](https://github.com/babel/babel/pull/5218) Remove babel-runtime from packages' dependencies. ([@kaicataldo](https://github.com/kaicataldo))
* `babel-preset-stage-1`, `babel-preset-stage-2`
  * [#5225](https://github.com/babel/babel/pull/5225) [7.0] Add legacy-decorators to stage1. Closes [#5220](https://github.com/babel/babel/issues/5220). ([@yavorsky](https://github.com/yavorsky))
* `babel-register`
  * [#5189](https://github.com/babel/babel/pull/5189) Bump `home-or-tmp` for `babel-register`.. ([@wtgtybhertgeghgtwtg](https://github.com/wtgtybhertgeghgtwtg))
* `babel-runtime`
  * [#5187](https://github.com/babel/babel/pull/5187) [7.0] Remove old babel-runtime code. ([@vkbansal](https://github.com/vkbansal))
* `babel-generator`, `babel-plugin-syntax-class-constructor-call`, `babel-plugin-transform-class-constructor-call`, `babel-preset-stage-1`
  * [#5119](https://github.com/babel/babel/pull/5119) Remove "class-constructor-call" syntax and transform plugins. ([@ColinRTaylor](https://github.com/ColinRTaylor))
* `babel-preset-stage-3`
  * [#5126](https://github.com/babel/babel/pull/5126) [7.0] Remove stage 4 plugins from stage 3 preset. ([@varemenos](https://github.com/varemenos))
* Other
  * [#5131](https://github.com/babel/babel/pull/5131) [7.0] Remove add module exports internally. ([@chicoxyzzy](https://github.com/chicoxyzzy))
  * [#5025](https://github.com/babel/babel/pull/5025) Drop support for Node 0.12 :skull:. ([@siddharthkp](https://github.com/siddharthkp))
  * [#5041](https://github.com/babel/babel/pull/5041) Remove node 0.10 support (CI). ([@xtuc](https://github.com/xtuc))
* `babel-cli`, `babel-core`, `babel-plugin-transform-react-constant-elements`, `babel-traverse`
  * [#5124](https://github.com/babel/babel/pull/5124) Closes [#5108](https://github.com/babel/babel/issues/5108), browser.js and browser.js test removed. ([@Pr0x1m4](https://github.com/Pr0x1m4))
* `babel-plugin-transform-es2015-unicode-regex`
  * [#5028](https://github.com/babel/babel/pull/5028) Dependencies: Upgrade regexpu-core to ^4.0.2. ([@ysangkok](https://github.com/ysangkok))
* `babel-polyfill`
  * [#5122](https://github.com/babel/babel/pull/5122) Remove old code used for backwards compatibility. ([@Anderson-Vasques](https://github.com/Anderson-Vasques))
* `babel-generator`, `babel-plugin-transform-flow-comments`
  * [#5123](https://github.com/babel/babel/pull/5123) [7.0] Drop flowUsesCommas option from babel-generator. ([@ChauTNguyen](https://github.com/ChauTNguyen))
* `babel-plugin-transform-runtime`
  * [#5142](https://github.com/babel/babel/pull/5142) removed old cold from transform-runtime. ([@shubheksha](https://github.com/shubheksha))

#### :rocket: New Feature
* `babel-core`
  * [#5385](https://github.com/babel/babel/pull/5385) [7.0] Allow presets to be objects. ([@danez](https://github.com/danez))
  * [#4834](https://github.com/babel/babel/pull/4834) Pass `dirname` as extra metadata to preset constructor.. ([@izaakschroeder](https://github.com/izaakschroeder))
* `babel-preset-stage-2`
  * [#3683](https://github.com/babel/babel/pull/3683) babel-preset-stage-2: Add transform-unicode-property-regex. ([@mathiasbynens](https://github.com/mathiasbynens))

#### :bug: Bug Fix
* `babel-generator`
  * [#5339](https://github.com/babel/babel/pull/5339) Wrap some generated do expressions in parens. ([@zjmiller](https://github.com/zjmiller))
* `babel-generator`, `babel-plugin-transform-object-rest-spread`
  * [#5322](https://github.com/babel/babel/pull/5322) Fix for-await printing. ([@danez](https://github.com/danez))
* `babel-core`
  * [#5164](https://github.com/babel/babel/pull/5164) [7.0] Update babel-core browserify fixture. ([@chicoxyzzy](https://github.com/chicoxyzzy))

#### :memo: Documentation
* `babel-plugin-transform-runtime`
  * [#5400](https://github.com/babel/babel/pull/5400) [doc] Fix: comments in usage w/ options. ([@JPeer264](https://github.com/JPeer264))
* `babel-plugin-transform-async-to-module-method`, `babel-plugin-transform-es2015-computed-properties`, `babel-plugin-transform-es2015-for-of`, `babel-plugin-transform-es2015-modules-systemjs`, `babel-plugin-transform-es2015-spread`, `babel-plugin-transform-es2015-template-literals`, `babel-plugin-transform-object-rest-spread`, `babel-plugin-transform-react-jsx`, `babel-plugin-transform-runtime`, `babel-plugin-transform-strict-mode`, `babel-preset-latest`, `babel-register`, `babel-template`
  * [#5379](https://github.com/babel/babel/pull/5379) Lint code snippets in READMEs. ([@xtuc](https://github.com/xtuc))
* `babel-plugin-transform-es2015-shorthand-properties`
  * [#5334](https://github.com/babel/babel/pull/5334) Shorthand properties examples. ([@bhoule](https://github.com/bhoule))
* Other
  * [#5329](https://github.com/babel/babel/pull/5329) Update CONTRIBUTING.md with respect to coverage check [skip ci]. ([@zjmiller](https://github.com/zjmiller))

#### :house: Internal
* `babel-plugin-undeclared-variables-check`
  * [#5407](https://github.com/babel/babel/pull/5407) remove undeclared plugin [skip ci]. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-transform-class-constructor-call`
  * [#5406](https://github.com/babel/babel/pull/5406) cleanup + update to lerna 38. ([@hzoo](https://github.com/hzoo))
* `babel-generator`
  * [#5338](https://github.com/babel/babel/pull/5338) Improve babel-generator's code coverage. ([@alxpy](https://github.com/alxpy))
  * [#5231](https://github.com/babel/babel/pull/5231) [7.0] List babylon plugins instead of * in babel-generator tests. ([@existentialism](https://github.com/existentialism))
* Other
  * [#5336](https://github.com/babel/babel/pull/5336) Enable codecov partial coverage. ([@danez](https://github.com/danez))
  * [#5350](https://github.com/babel/babel/pull/5350) Remove redundant NODE_ENV=test in Makefile. ([@aaronang](https://github.com/aaronang))
  * [#5312](https://github.com/babel/babel/pull/5312) [skip ci] Add devEngines to package.json. ([@yavorsky](https://github.com/yavorsky))
  * [#5165](https://github.com/babel/babel/pull/5165) Add Node 7 to CI. ([@chicoxyzzy](https://github.com/chicoxyzzy))
  * [#5254](https://github.com/babel/babel/pull/5254) test lerna@2-beta.37. ([@hzoo](https://github.com/hzoo))
  * [#5175](https://github.com/babel/babel/pull/5175) Added yarn.lock. ([@ChauTNguyen](https://github.com/ChauTNguyen))
* `babel-cli`
  * [#5342](https://github.com/babel/babel/pull/5342) Add test for passing arguments to babel-node (#5163). ([@outsideris](https://github.com/outsideris))
* `babel-core`, `babel-template`, `babel-traverse`
  * [#5356](https://github.com/babel/babel/pull/5356) Replace lodash/assign with Object.assign. ([@mdapper](https://github.com/mdapper))
* `babel-cli`, `babel-core`, `babel-generator`, `babel-plugin-transform-async-functions`, `babel-plugin-transform-async-generator-functions`, `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-async-to-module-method`, `babel-plugin-transform-class-properties`, `babel-plugin-transform-decorators`, `babel-plugin-transform-do-expressions`, `babel-plugin-transform-es2015-modules-amd`, `babel-plugin-transform-es2015-modules-commonjs`, `babel-plugin-transform-es2015-modules-umd`, `babel-plugin-transform-exponentiation-operator`, `babel-plugin-transform-export-extensions`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-flow-strip-types`, `babel-plugin-transform-function-bind`, `babel-plugin-transform-object-rest-spread`, `babel-plugin-transform-regenerator`, `babel-plugin-transform-runtime`, `babel-traverse`
  * [#5351](https://github.com/babel/babel/pull/5351) Avoid usage of exports/module.exports/require().. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-preset-stage-1`
  * [#5319](https://github.com/babel/babel/pull/5319) Switch decorators-legacy to decorators in the Stage 1 Preset (#5318). ([@sashashakun](https://github.com/sashashakun))
* `babel-traverse`
  * [#5296](https://github.com/babel/babel/pull/5296) Add test for reference paths. ([@jasonLaster](https://github.com/jasonLaster))
* `babel`
  * [#5293](https://github.com/babel/babel/pull/5293) [7.0] remove standalone babel package. ([@hzoo](https://github.com/hzoo))
* `babel-helper-transform-fixture-test-runner`
  * [#5263](https://github.com/babel/babel/pull/5263) [7.0] Run Babel's unittests in a custom sandbox (take 2).. ([@loganfsmyth](https://github.com/loganfsmyth))
* `babel-register`
  * [#5189](https://github.com/babel/babel/pull/5189) Bump `home-or-tmp` for `babel-register`.. ([@wtgtybhertgeghgtwtg](https://github.com/wtgtybhertgeghgtwtg))
* `babel-cli`, `babel-core`
  * [#5179](https://github.com/babel/babel/pull/5179) [7.0] No path is absolute. ([@zertosh](https://github.com/zertosh))
* `babel-polyfill`
  * [#5122](https://github.com/babel/babel/pull/5122) Remove old code used for backwards compatibility. ([@Anderson-Vasques](https://github.com/Anderson-Vasques))
