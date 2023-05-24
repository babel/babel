# Changelog

> **Tags:**
>
> - :boom: [Breaking Change]
> - :eyeglasses: [Spec Compliance]
> - :rocket: [New Feature]
> - :bug: [Bug Fix]
> - :memo: [Documentation]
> - :house: [Internal]
> - :nail_care: [Polish]

_Note: Gaps between patch versions are faulty, broken or test releases._

This file contains the changelog of versions between v7.0.0 and v7.14.9 (inclusive).

## v7.14.9 (2021-08-01)

#### :bug: Bug Fix

- `babel-traverse`
  - [#13596](https://github.com/babel/babel/pull/13596) Fix completion record for variable declarations ([@addaleax](https://github.com/addaleax))
- `babel-plugin-proposal-class-properties`, `babel-plugin-transform-classes`
  - [#13600](https://github.com/babel/babel/pull/13600) Extract computed keys from the class closure ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-transform-react-jsx-development`, `babel-plugin-transform-react-jsx-self`, `babel-plugin-transform-react-jsx`
  - [#13552](https://github.com/babel/babel/pull/13552) Don't insert `__self: this` within constructors of derived classes (#13550) ([@SCLeoX](https://github.com/SCLeoX))
- `babel-parser`
  - [#13581](https://github.com/babel/babel/pull/13581) [ts] Check if param is assignable when parsing arrow return type ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-generator`, `babel-traverse`, `babel-types`
  - [#13577](https://github.com/babel/babel/pull/13577) add 12 missing NODE_FIELDS ([@jedwards1211](https://github.com/jedwards1211))
- `babel-plugin-proposal-async-generator-functions`
  - [#13491](https://github.com/babel/babel/pull/13491) Fix `_step.value` access in `for await` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :house: Internal

- Other
  - [#13614](https://github.com/babel/babel/pull/13614) Update Rollup to `~2.54.0` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-generator`, `babel-helper-validator-identifier`, `babel-parser`
  - [#13606](https://github.com/babel/babel/pull/13606) chore: reorganize benchmarks ([@JLHwung](https://github.com/JLHwung))

#### :running_woman: Performance

- `babel-parser`, `babel-traverse`
  - [#13611](https://github.com/babel/babel/pull/13611) Replace generic \_\_clone call by specific methods ([@JLHwung](https://github.com/JLHwung))
- `babel-generator`
  - [#13593](https://github.com/babel/babel/pull/13593) Generator performance ([@JLHwung](https://github.com/JLHwung))

## v7.14.8 (2021-07-20)

#### :eyeglasses: Spec Compliance

- `babel-helper-create-class-features-plugin`, `babel-plugin-proposal-class-static-block`, `babel-plugin-transform-new-target`
  - [#13560](https://github.com/babel/babel/pull/13560) fix(class-properties): replace `new.target` in static properties with `undefined` ([@colinaaa](https://github.com/colinaaa))
- `babel-parser`
  - [#13088](https://github.com/babel/babel/pull/13088) Fix await binding error within static block ([@JLHwung](https://github.com/JLHwung))
  - [#13531](https://github.com/babel/babel/pull/13531) fix: disallow computed `async`/`get`/`set` keyword ([@JLHwung](https://github.com/JLHwung))
- `babel-helper-module-transforms`, `babel-helper-simple-access`, `babel-plugin-transform-modules-commonjs`
  - [#13258](https://github.com/babel/babel/pull/13258) Fix const violations in ESM imports when transformed to CJS ([@overlookmotel](https://github.com/overlookmotel))

#### :bug: Bug Fix

- `babel-parser`
  - [#13575](https://github.com/babel/babel/pull/13575) Update babel-parser.d.ts ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#13548](https://github.com/babel/babel/pull/13548) Fix parser `strictMode` option ([@overlookmotel](https://github.com/overlookmotel))
  - [#13573](https://github.com/babel/babel/pull/13573) Fix issue to allow module block in member expression ([@nme077](https://github.com/nme077))
  - [#13521](https://github.com/babel/babel/pull/13521) Overhaul comment attachment ([@JLHwung](https://github.com/JLHwung))
  - [#13534](https://github.com/babel/babel/pull/13534) Async do expression should start at async ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-transform-arrow-functions`, `babel-traverse`
  - [#12344](https://github.com/babel/babel/pull/12344) Fix arrow transformation when `arguments` is defined as variable ([@snitin315](https://github.com/snitin315))
- `babel-traverse`
  - [#13527](https://github.com/babel/babel/pull/13527) fix: accept duplicated import/variable in different module ([@colinaaa](https://github.com/colinaaa))
- `babel-types`
  - [#13525](https://github.com/babel/babel/pull/13525) fix(babel-types): accept `UnaryExpression` in `TSLiteralType` ([@colinaaa](https://github.com/colinaaa))
  - [#13500](https://github.com/babel/babel/pull/13500) Add typeParameters to tagged template visitor keys ([@JLHwung](https://github.com/JLHwung))

#### :nail_care: Polish

- `babel-core`
  - [#13515](https://github.com/babel/babel/pull/13515) Fix config validation message typo ([@jaeseokk](https://github.com/jaeseokk))
- `babel-cli`
  - [#13508](https://github.com/babel/babel/pull/13508) fix: sync default_extensions to babel-cli usage ([@JLHwung](https://github.com/JLHwung))

#### :memo: Documentation

- [#13562](https://github.com/babel/babel/pull/13562) Fix `make generate-standalone` -> `make build-standalone` ([@sosukesuzuki](https://github.com/sosukesuzuki))

#### :house: Internal

- `babel-helpers`
  - [#13522](https://github.com/babel/babel/pull/13522) minor improvement to gulp generate-runtime-helpers error message ([@lightmare](https://github.com/lightmare))

#### :running_woman: Performance

- `babel-parser`
  - [#13521](https://github.com/babel/babel/pull/13521) Overhaul comment attachment ([@JLHwung](https://github.com/JLHwung))

## v7.14.7 (2021-06-21)

#### :bug: Bug Fix

- `babel-plugin-proposal-object-rest-spread`
  - [#13483](https://github.com/babel/babel/pull/13483) Don't hoist template literal keys in `object-rest-spread` ([@lala7573](https://github.com/lala7573))
- `babel-plugin-transform-destructuring`
  - [#13482](https://github.com/babel/babel/pull/13482) Don't hoist template strings from destructuring keys ([@lala7573](https://github.com/lala7573))
- `babel-traverse`
  - [#13475](https://github.com/babel/babel/pull/13475) fix: remove traverse trap on `NODE_ENV == "test"` ([@JLHwung](https://github.com/JLHwung))
- Other
  - [#13477](https://github.com/babel/babel/pull/13477) Add record and tuple tokens to eslint parser ([@plourenco](https://github.com/plourenco))
- `babel-helper-member-expression-to-functions`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-private-methods`
  - [#13395](https://github.com/babel/babel/pull/13395) fix: tagged template incorrect receiver ([@sag1v](https://github.com/sag1v))

#### :house: Internal

- `babel-parser`
  - [#13450](https://github.com/babel/babel/pull/13450) Simplify token context ([@JLHwung](https://github.com/JLHwung))
  - [#13419](https://github.com/babel/babel/pull/13419) refactor(parser): remove refNeedsArrowPos ([@tony-go](https://github.com/tony-go))
- Other
  - [#13485](https://github.com/babel/babel/pull/13485) chore: fix comment typo ([@hyaocuk](https://github.com/hyaocuk))

## v7.14.6 (2021-06-14)

#### :bug: Bug Fix

- `babel-plugin-transform-spread`
  - [#13459](https://github.com/babel/babel/pull/13459) babel-plugin-transform-spread add missing argument in build calls ([@zxbodya](https://github.com/zxbodya))
  - [#13439](https://github.com/babel/babel/pull/13439) Correctly transform spreads of arrays with holes ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helpers`, `babel-plugin-transform-destructuring`, `babel-plugin-transform-modules-commonjs`
  - [#13444](https://github.com/babel/babel/pull/13444) fix destructuring of empty string ([@lala7573](https://github.com/lala7573))
- `babel-helper-create-class-features-plugin`, `babel-plugin-proposal-class-properties`
  - [#13429](https://github.com/babel/babel/pull/13429) fix: reference to class expression in private method ([@lala7573](https://github.com/lala7573))
- `babel-parser`
  - [#13428](https://github.com/babel/babel/pull/13428) [ts] Support override modifiers for parameter properties ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#13449](https://github.com/babel/babel/pull/13449) Disallow JSX tag forming after TS non-null assertion ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal

- [#13423](https://github.com/babel/babel/pull/13423) Faster babel build ([@JLHwung](https://github.com/JLHwung))

#### :running_woman: Performance

- `babel-parser`
  - [#13453](https://github.com/babel/babel/pull/13453) Faster readRegexp ([@JLHwung](https://github.com/JLHwung))

## v7.14.5 (2021-06-09)

#### :eyeglasses: Spec Compliance

- `babel-plugin-proposal-do-expressions`, `babel-traverse`
  - [#13122](https://github.com/babel/babel/pull/13122) fix: hoist variable declaration within do block ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#13409](https://github.com/babel/babel/pull/13409) Relax import assertion key-is-type constraint ([@JLHwung](https://github.com/JLHwung))

#### :bug: Bug Fix

- `babel-parser`
  - [#13418](https://github.com/babel/babel/pull/13418) fix(parser): correctly parse record and tuple tokens ([@fedeci](https://github.com/fedeci))
  - [#13410](https://github.com/babel/babel/pull/13410) fix: throw when `async()` call param is object with assignement ([@tony-go](https://github.com/tony-go))
  - [#13396](https://github.com/babel/babel/pull/13396) Add support for d flag of regex literals in parser ([@ota-meshi](https://github.com/ota-meshi))
- `babel-helpers`
  - [#13404](https://github.com/babel/babel/pull/13404) fix generate-helpers failing in URL-encoded path ([@lightmare](https://github.com/lightmare))

#### :house: Internal

- `babel-helper-hoist-variables`
  - [#13442](https://github.com/babel/babel/pull/13442) Disallow dependency cycles ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`
  - [#13440](https://github.com/babel/babel/pull/13440) update test fixtures ([@JLHwung](https://github.com/JLHwung))
  - [#13431](https://github.com/babel/babel/pull/13431) Reduce `exprAllowed` usage ([@JLHwung](https://github.com/JLHwung))
  - [#13422](https://github.com/babel/babel/pull/13422) fix(`@babel/parser`): fix tokenizer context update code ([@Eyoatam](https://github.com/Eyoatam))
- Other
  - [#13420](https://github.com/babel/babel/pull/13420) chore: specify @babel/eslint-parser deps ([@JLHwung](https://github.com/JLHwung))
- `babel-cli`, `babel-code-frame`, `babel-compat-data`, `babel-core`, `babel-generator`, `babel-helper-annotate-as-pure`, `babel-helper-builder-binary-assignment-operator-visitor`, `babel-helper-builder-react-jsx`, `babel-helper-compilation-targets`, `babel-helper-create-class-features-plugin`, `babel-helper-create-regexp-features-plugin`, `babel-helper-define-map`, `babel-helper-explode-assignable-expression`, `babel-helper-fixtures`, `babel-helper-function-name`, `babel-helper-get-function-arity`, `babel-helper-hoist-variables`, `babel-helper-member-expression-to-functions`, `babel-helper-module-imports`, `babel-helper-module-transforms`, `babel-helper-optimise-call-expression`, `babel-helper-plugin-test-runner`, `babel-helper-plugin-utils`, `babel-helper-remap-async-to-generator`, `babel-helper-replace-supers`, `babel-helper-simple-access`, `babel-helper-skip-transparent-expression-wrappers`, `babel-helper-split-export-declaration`, `babel-helper-transform-fixture-test-runner`, `babel-helper-validator-identifier`, `babel-helper-validator-option`, `babel-helper-wrap-function`, `babel-helpers`, `babel-highlight`, `babel-node`, `babel-parser`, `babel-plugin-bugfix-v8-spread-parameters-in-optional-chaining`, `babel-plugin-external-helpers`, `babel-plugin-proposal-async-do-expressions`, `babel-plugin-proposal-async-generator-functions`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-class-static-block`, `babel-plugin-proposal-decorators`, `babel-plugin-proposal-do-expressions`, `babel-plugin-proposal-dynamic-import`, `babel-plugin-proposal-export-default-from`, `babel-plugin-proposal-export-namespace-from`, `babel-plugin-proposal-function-bind`, `babel-plugin-proposal-function-sent`, `babel-plugin-proposal-json-strings`, `babel-plugin-proposal-logical-assignment-operators`, `babel-plugin-proposal-nullish-coalescing-operator`, `babel-plugin-proposal-numeric-separator`, `babel-plugin-proposal-object-rest-spread`, `babel-plugin-proposal-optional-catch-binding`, `babel-plugin-proposal-optional-chaining`, `babel-plugin-proposal-partial-application`, `babel-plugin-proposal-pipeline-operator`, `babel-plugin-proposal-private-methods`, `babel-plugin-proposal-private-property-in-object`, `babel-plugin-proposal-record-and-tuple`, `babel-plugin-proposal-throw-expressions`, `babel-plugin-proposal-unicode-property-regex`, `babel-plugin-syntax-async-do-expressions`, `babel-plugin-syntax-class-static-block`, `babel-plugin-syntax-decimal`, `babel-plugin-syntax-decorators`, `babel-plugin-syntax-do-expressions`, `babel-plugin-syntax-export-default-from`, `babel-plugin-syntax-flow`, `babel-plugin-syntax-function-bind`, `babel-plugin-syntax-function-sent`, `babel-plugin-syntax-import-assertions`, `babel-plugin-syntax-jsx`, `babel-plugin-syntax-module-blocks`, `babel-plugin-syntax-partial-application`, `babel-plugin-syntax-pipeline-operator`, `babel-plugin-syntax-private-property-in-object`, `babel-plugin-syntax-record-and-tuple`, `babel-plugin-syntax-throw-expressions`, `babel-plugin-syntax-top-level-await`, `babel-plugin-syntax-typescript`, `babel-plugin-transform-arrow-functions`, `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-block-scoped-functions`, `babel-plugin-transform-block-scoping`, `babel-plugin-transform-classes`, `babel-plugin-transform-computed-properties`, `babel-plugin-transform-destructuring`, `babel-plugin-transform-dotall-regex`, `babel-plugin-transform-duplicate-keys`, `babel-plugin-transform-exponentiation-operator`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-flow-strip-types`, `babel-plugin-transform-for-of`, `babel-plugin-transform-function-name`, `babel-plugin-transform-instanceof`, `babel-plugin-transform-jscript`, `babel-plugin-transform-literals`, `babel-plugin-transform-member-expression-literals`, `babel-plugin-transform-modules-amd`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-modules-systemjs`, `babel-plugin-transform-modules-umd`, `babel-plugin-transform-named-capturing-groups-regex`, `babel-plugin-transform-new-target`, `babel-plugin-transform-object-assign`, `babel-plugin-transform-object-set-prototype-of-to-assign`, `babel-plugin-transform-object-super`, `babel-plugin-transform-parameters`, `babel-plugin-transform-property-literals`, `babel-plugin-transform-property-mutators`, `babel-plugin-transform-proto-to-assign`, `babel-plugin-transform-react-constant-elements`, `babel-plugin-transform-react-display-name`, `babel-plugin-transform-react-inline-elements`, `babel-plugin-transform-react-jsx-compat`, `babel-plugin-transform-react-jsx-development`, `babel-plugin-transform-react-jsx-self`, `babel-plugin-transform-react-jsx-source`, `babel-plugin-transform-react-jsx`, `babel-plugin-transform-react-pure-annotations`, `babel-plugin-transform-regenerator`, `babel-plugin-transform-reserved-words`, `babel-plugin-transform-runtime`, `babel-plugin-transform-shorthand-properties`, `babel-plugin-transform-spread`, `babel-plugin-transform-sticky-regex`, `babel-plugin-transform-strict-mode`, `babel-plugin-transform-template-literals`, `babel-plugin-transform-typeof-symbol`, `babel-plugin-transform-typescript`, `babel-plugin-transform-unicode-escapes`, `babel-plugin-transform-unicode-regex`, `babel-preset-env`, `babel-preset-flow`, `babel-preset-react`, `babel-preset-typescript`, `babel-register`, `babel-runtime-corejs2`, `babel-runtime-corejs3`, `babel-runtime`, `babel-standalone`, `babel-template`, `babel-traverse`, `babel-types`
  - [#13363](https://github.com/babel/babel/pull/13363) chore: setup Yarn constraints ([@merceyz](https://github.com/merceyz))

#### :running_woman: Performance

- `babel-parser`
  - [#13408](https://github.com/babel/babel/pull/13408) Use set in parser scope ([@JLHwung](https://github.com/JLHwung))
  - [#13386](https://github.com/babel/babel/pull/13386) Faster checkReservedWord ([@JLHwung](https://github.com/JLHwung))
  - [#13406](https://github.com/babel/babel/pull/13406) Back parser state `exportedIdentifiers` by set ([@JLHwung](https://github.com/JLHwung))

## v7.14.4 (2021-05-28)

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#13377](https://github.com/babel/babel/pull/13377) disallow surrogate in the end of contextual name ([@JLHwung](https://github.com/JLHwung))
  - [#13328](https://github.com/babel/babel/pull/13328) perf: minimize identifier lookahead when parsing let ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-transform-typescript`
  - [#13314](https://github.com/babel/babel/pull/13314) [ts] Insert `export {}` when necessary to imply ESM ([@wbinnssmith](https://github.com/wbinnssmith))

#### :bug: Bug Fix

- `babel-plugin-transform-typescript`
  - [#13381](https://github.com/babel/babel/pull/13381) [ts] Remove override modifier ([@sosukesuzuki](https://github.com/sosukesuzuki))
- Other
  - [#13338](https://github.com/babel/babel/pull/13338) Fix error when parsing ignored files with `@babel/eslint-parser` ([@devfservant](https://github.com/devfservant))
- `babel-parser`
  - [#13333](https://github.com/babel/babel/pull/13333) refactor: add parse\*Literal parser routines ([@JLHwung](https://github.com/JLHwung))

#### :running_woman: Performance

- `babel-plugin-transform-block-scoping`
  - [#13376](https://github.com/babel/babel/pull/13376) Improve performance ([@sokra](https://github.com/sokra))
- `babel-parser`
  - [#13341](https://github.com/babel/babel/pull/13341) Faster tokenizer lookahead ([@JLHwung](https://github.com/JLHwung))
  - [#13328](https://github.com/babel/babel/pull/13328) perf: minimize identifier lookahead when parsing let ([@JLHwung](https://github.com/JLHwung))

#### :microscope: Output optimization

- `babel-plugin-proposal-object-rest-spread`, `babel-plugin-transform-block-scoping`, `babel-plugin-transform-destructuring`, `babel-plugin-transform-react-constant-elements`, `babel-preset-env`
  - [#13384](https://github.com/babel/babel/pull/13384) Hoist omitted keys from object spread operator ([@alanorozco](https://github.com/alanorozco))

## v7.14.3 (2021-05-17)

#### :bug: Bug Fix

- `babel-core`
  - [#13321](https://github.com/babel/babel/pull/13321) Pass assumptions set in presets to plugins ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`
  - [#13326](https://github.com/babel/babel/pull/13326) fix: preserve tokensLength in tryParse ([@JLHwung](https://github.com/JLHwung))
  - [#13325](https://github.com/babel/babel/pull/13325) Parse `let` declarations whose id starts with `\` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-create-class-features-plugin`, `babel-helper-replace-supers`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-class-static-block`
  - [#13303](https://github.com/babel/babel/pull/13303) Don't duplicate the base class when using `constantSuper` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :house: Internal

- Other
  - [#13313](https://github.com/babel/babel/pull/13313) chore: add class-static-block test262 mapping ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-transform-block-scoping`
  - [#13304](https://github.com/babel/babel/pull/13304) Add test for fixed block scoping issue ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :microscope: Output optimization

- `babel-helper-create-class-features-plugin`, `babel-helper-replace-supers`, `babel-plugin-proposal-class-static-block`, `babel-preset-env`
  - [#13297](https://github.com/babel/babel/pull/13297) Compile static blocks without the intermediate priv field step ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.14.2 (2021-05-12)

#### :bug: Bug Fix

- `babel-node`
  - [#13295](https://github.com/babel/babel/pull/13295) Fix: Only create `@babel/node` IPC channel when needed ([@quickgiant](https://github.com/quickgiant))
- `babel-parser`
  - [#13284](https://github.com/babel/babel/pull/13284) Parse attributes of import expression with estree plugin ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#13261](https://github.com/babel/babel/pull/13261) Fix invalid identifier name on unfinished escape ([@JLHwung](https://github.com/JLHwung))
- `babel-types`
  - [#13275](https://github.com/babel/babel/pull/13275) Support objects from other contexts in `t.valueToNode` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- Other
  - [#13274](https://github.com/babel/babel/pull/13274) [eslint] Don't crash on multiple `@babel/parser` copies ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-generator`
  - [#13269](https://github.com/babel/babel/pull/13269) Print parentheses around identifier `let` where necessary ([@Zalathar](https://github.com/Zalathar))

#### :nail_care: Polish

- `babel-helper-module-transforms`, `babel-plugin-transform-modules-commonjs`
  - [#13296](https://github.com/babel/babel/pull/13296) Better error for `export * as ns` without the correct plugin ([@JLHwung](https://github.com/JLHwung))

#### :memo: Documentation

- [#13253](https://github.com/babel/babel/pull/13253) [DOC] Add missing Monorepo configuration ([@serut](https://github.com/serut))

#### :house: Internal

- Other
  - [#13289](https://github.com/babel/babel/pull/13289) Update lodash version for fixing security vulnerability ([@trinangkur](https://github.com/trinangkur))
- `babel-types`
  - [#13264](https://github.com/babel/babel/pull/13264) [babel-types] Update `matchesPattern` to account for `this` ([@liuyenwei](https://github.com/liuyenwei))

#### :running_woman: Performance

- `babel-parser`
  - [#13262](https://github.com/babel/babel/pull/13262) Faster identifier tokenizing ([@JLHwung](https://github.com/JLHwung))
  - [#13256](https://github.com/babel/babel/pull/13256) Refactor private name tokenizing ([@JLHwung](https://github.com/JLHwung))

## v7.14.1 (2021-05-04)

#### :bug: Bug Fix

- `babel-parser`
  - [#13243](https://github.com/babel/babel/pull/13243) Parse static blocks with typescript plugin ([@sosukesuzuki](https://github.com/sosukesuzuki))
- `babel-plugin-transform-block-scoping`
  - [#13248](https://github.com/babel/babel/pull/13248) Fix plugin-transform-block-scoping const violations ([@overlookmotel](https://github.com/overlookmotel))
- `babel-generator`, `babel-parser`
  - [#13244](https://github.com/babel/babel/pull/13244) Parse `for await (async of ...)` ([@Zalathar](https://github.com/Zalathar))
- `babel-helper-create-class-features-plugin`
  - [#13237](https://github.com/babel/babel/pull/13237) fix: Typo in `@babel/helper-create-class-features-plugin` ([@aancer-rca](https://github.com/aancer-rca))

#### :memo: Documentation

- `babel-types`
  - [#13151](https://github.com/babel/babel/pull/13151) Add alias docs for @babel/types ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal

- `babel-parser`
  - [#13242](https://github.com/babel/babel/pull/13242) Don't use `"composite": true` in tsc (until it supports cycles) ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#13241](https://github.com/babel/babel/pull/13241) chore: remove duplicated test262 parser tests ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-proposal-export-namespace-from`, `babel-plugin-syntax-module-string-names`, `babel-plugin-transform-modules-amd`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-modules-systemjs`, `babel-plugin-transform-modules-umd`
  - [#13246](https://github.com/babel/babel/pull/13246) Archive `@babel/plugin-syntax-module-string-names` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-class-static-block`, `babel-plugin-proposal-private-methods`, `babel-plugin-proposal-private-property-in-object`, `babel-plugin-syntax-class-properties`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-flow-strip-types`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-typescript`, `babel-plugin-transform-unicode-escapes`, `babel-preset-env`, `babel-standalone`
  - [#13232](https://github.com/babel/babel/pull/13232) Archive `@babel/plugin-syntax-class-properties` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.14.0 (2021-04-29)

#### :eyeglasses: Spec Compliance

- `babel-generator`, `babel-parser`
  - [#13209](https://github.com/babel/babel/pull/13209) [ts] Enforce order for the `override` modifier ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :rocket: New Feature

- `babel-plugin-proposal-async-do-expressions`
  - [#13117](https://github.com/babel/babel/pull/13117) Implement async-do-expressions transform ([@JLHwung](https://github.com/JLHwung))
- `babel-core`, `babel-generator`, `babel-parser`, `babel-plugin-proposal-do-expressions`, `babel-plugin-syntax-async-do-expressions`, `babel-types`
  - [#13043](https://github.com/babel/babel/pull/13043) Parse async do expressions ([@JLHwung](https://github.com/JLHwung))
- `babel-preset-env`
  - [#13091](https://github.com/babel/babel/pull/13091) Enable class fields & private methods by default ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-compat-data`, `babel-preset-env`
  - [#13176](https://github.com/babel/babel/pull/13176) Add private brand checks to `shippedProposals` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#13114](https://github.com/babel/babel/pull/13114) Add class static blocks to `preset-env`'s `shippedProposals` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-create-class-features-plugin`, `babel-plugin-proposal-private-property-in-object`, `babel-plugin-syntax-private-property-in-object`
  - [#13172](https://github.com/babel/babel/pull/13172) Allow compiling `#foo in obj` without compiling private fields ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`
  - [#13113](https://github.com/babel/babel/pull/13113) babel-parser(ts): Add new plugin option `dts: boolean` ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#13175](https://github.com/babel/babel/pull/13175) Materialize the class features in `@babel/parser`. ([@JLHwung](https://github.com/JLHwung))
  - [#13033](https://github.com/babel/babel/pull/13033) Introduce parser error codes ([@sosukesuzuki](https://github.com/sosukesuzuki))
- `babel-helper-module-transforms`, `babel-helpers`, `babel-plugin-transform-modules-amd`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-modules-umd`
  - [#12838](https://github.com/babel/babel/pull/12838) Implement `importInterop: "node"` option for module transforms ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-generator`, `babel-parser`, `babel-traverse`, `babel-types`
  - [#13224](https://github.com/babel/babel/pull/13224) Support parsing Flow's Optional Indexed Access Types ([@gkz](https://github.com/gkz))
  - [#13053](https://github.com/babel/babel/pull/13053) Support parsing Flow's Indexed Access Types ([@sosukesuzuki](https://github.com/sosukesuzuki))
- `babel-parser`, `babel-traverse`
  - [#13195](https://github.com/babel/babel/pull/13195) Parse string export names by default (`moduleStringNames`) ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-generator`, `babel-parser`, `babel-types`
  - [#13089](https://github.com/babel/babel/pull/13089) Support TypeScript 4.3 get/set type members ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#13097](https://github.com/babel/babel/pull/13097) support TS 4.3 `override` syntax in class ([@g-plane](https://github.com/g-plane))
  - [#13096](https://github.com/babel/babel/pull/13096) support TS 4.3 static index signature in class ([@g-plane](https://github.com/g-plane))

#### :bug: Bug Fix

- `babel-generator`
  - [#13208](https://github.com/babel/babel/pull/13208) Prevent ForOfStatement from printing the forbidden sequence "for ( async of" ([@Zalathar](https://github.com/Zalathar))
  - [#13169](https://github.com/babel/babel/pull/13169) fix: don't deduplicate comments with same start index ([@gzzhanghao](https://github.com/gzzhanghao))
- `babel-generator`, `babel-plugin-proposal-object-rest-spread`, `babel-preset-env`
  - [#13204](https://github.com/babel/babel/pull/13204) Simplify the special-case printing of single-param arrow functions ([@Zalathar](https://github.com/Zalathar))
- `babel-core`
  - [#13182](https://github.com/babel/babel/pull/13182) fix: Don't load browserslist in block-hoist-plugin ([@MichaReiser](https://github.com/MichaReiser))

#### :nail_care: Polish

- `babel-cli`, `babel-core`, `babel-parser`, `babel-plugin-transform-classes`, `babel-preset-env`, `babel-preset-typescript`
  - [#13130](https://github.com/babel/babel/pull/13130) babel-parser: Add new internal ESLint rule to consistent error messages ([@sosukesuzuki](https://github.com/sosukesuzuki))

#### :house: Internal

- `babel-parser`
  - [#13227](https://github.com/babel/babel/pull/13227) Add `runFixtureTestsWithoutExactASTMatch` in parser test runner ([@JLHwung](https://github.com/JLHwung))
  - [#13163](https://github.com/babel/babel/pull/13163) babel-parser: Use `this.isThisParam` ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#13200](https://github.com/babel/babel/pull/13200) refactor: avoid parsing logic on locations ([@JLHwung](https://github.com/JLHwung))
- `babel-helpers`, `babel-preset-env`, `babel-runtime-corejs2`, `babel-runtime-corejs3`, `babel-runtime`
  - [#13190](https://github.com/babel/babel/pull/13190) Allow putting helpers in individual files ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- Other
  - [#13183](https://github.com/babel/babel/pull/13183) chore: run coverage-test against node 16 ([@JLHwung](https://github.com/JLHwung))

#### :running_woman: Performance

- `babel-core`
  - [#13090](https://github.com/babel/babel/pull/13090) perf(core): check files before interacting with them ([@FauxFaux](https://github.com/FauxFaux))
  - [#13223](https://github.com/babel/babel/pull/13223) perf: avoid loadFullConfig when creating block hoist plugin ([@JLHwung](https://github.com/JLHwung))
- `babel-helper-validator-identifier`
  - [#13211](https://github.com/babel/babel/pull/13211) Improve `isIdentifierName` performance ([@JLHwung](https://github.com/JLHwung))

#### :microscope: Output optimization

- `babel-helper-create-class-features-plugin`, `babel-plugin-bugfix-v8-spread-parameters-in-optional-chaining`, `babel-plugin-proposal-async-generator-functions`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-class-static-block`, `babel-plugin-proposal-private-methods`, `babel-plugin-proposal-private-property-in-object`, `babel-preset-env`
  - [#13194](https://github.com/babel/babel/pull/13194) Mark `WeakMap`s of private fields as pure ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helpers`, `babel-runtime-corejs2`, `babel-runtime-corejs3`, `babel-runtime`
  - [#13201](https://github.com/babel/babel/pull/13201) Simplify the `wrapRegExp` helper for named groups ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.13.17 (2021-04-20)

#### :bug: Bug Fix

- `babel-helpers`, `babel-plugin-transform-modules-commonjs`
  - [#13185](https://github.com/babel/babel/pull/13185) Fix undeclared variable in `iterableToArrayLimit` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-proposal-do-expressions`, `babel-traverse`
  - [#13084](https://github.com/babel/babel/pull/13084) Fix completion record for labeled statement ([@addaleax](https://github.com/addaleax))
- `babel-plugin-transform-destructuring`
  - [#13173](https://github.com/babel/babel/pull/13173) fix(destructuring): preserve loc of original declaration in output ([@motiz88](https://github.com/motiz88))
- `babel-types`
  - [#13178](https://github.com/babel/babel/pull/13178) fix: clone comments in cloneNode ([@gzzhanghao](https://github.com/gzzhanghao))

## v7.13.16 (2021-04-20)

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#13143](https://github.com/babel/babel/pull/13143) fix: raise `SyntaxError` for `declare` before getter/setter ([@fedeci](https://github.com/fedeci))

#### :bug: Bug Fix

- `babel-helpers`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-regenerator`, `babel-plugin-transform-spread`, `babel-preset-env`, `babel-runtime-corejs2`, `babel-runtime`
  - [#13129](https://github.com/babel/babel/pull/13129) Support iterating generators in browsers without `Symbol` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-compilation-targets`
  - [#13159](https://github.com/babel/babel/pull/13159) fix: add default value for browserslist config path ([@JLHwung](https://github.com/JLHwung))
- `babel-generator`
  - [#13136](https://github.com/babel/babel/pull/13136) Fix printing of single-param async arrow function with comments ([@nwalters512](https://github.com/nwalters512))

#### :memo: Documentation

- Other
  - [#13155](https://github.com/babel/babel/pull/13155) Update links in eslint-parser README ([@codyatwork](https://github.com/codyatwork))
- `babel-types`
  - [#13148](https://github.com/babel/babel/pull/13148) docs: refine babel-types docs generator ([@JLHwung](https://github.com/JLHwung))
- `babel-helper-compilation-targets`
  - [#13131](https://github.com/babel/babel/pull/13131) docs: add README to helper-compilation-targets ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal

- `babel-helper-bindify-decorators`, `babel-helper-explode-class`
  - [#13160](https://github.com/babel/babel/pull/13160) Archive helper-explode-class and helper-bindify-decorators ([@JLHwung](https://github.com/JLHwung))
- Other
  - [#13158](https://github.com/babel/babel/pull/13158) codecov: token not required ([@hzoo](https://github.com/hzoo))
- `babel-helper-call-delegate`
  - [#13153](https://github.com/babel/babel/pull/13153) Archive `@babel/helper-call-delegate` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-hoist-variables`, `babel-plugin-transform-block-scoping`
  - [#13152](https://github.com/babel/babel/pull/13152) refactor: use FunctionParent on visiting var scope ([@JLHwung](https://github.com/JLHwung))
- `babel-cli`, `babel-core`, `babel-generator`, `babel-plugin-transform-function-name`, `babel-register`, `babel-types`
  - [#13139](https://github.com/babel/babel/pull/13139) Remove remaining `lodash` dependencies ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.13.15 (2021-04-08)

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#13099](https://github.com/babel/babel/pull/13099) fix: raise `SyntaxError` for unparenthesized assert and assign ([@fedeci](https://github.com/fedeci))
  - [#13049](https://github.com/babel/babel/pull/13049) fix: the LHS in for-of loop should not start with let ([@JLHwung](https://github.com/JLHwung))

#### :bug: Bug Fix

- `babel-parser`
  - [#13101](https://github.com/babel/babel/pull/13101) fix(ts): allow trailing comma after rest parameter in `TSDeclareFunction` ([@fedeci](https://github.com/fedeci))
- `babel-plugin-proposal-do-expressions`, `babel-traverse`
  - [#10101](https://github.com/babel/babel/pull/10101) yield for do expression ([@tanhauhau](https://github.com/tanhauhau))
  - [#13030](https://github.com/babel/babel/pull/13030) Refactor switch support in `NodePath#getCompletionRecords` ([@JLHwung](https://github.com/JLHwung))
- Other
  - [#13106](https://github.com/babel/babel/pull/13106) fix: do not filter report from functions within class elements ([@JLHwung](https://github.com/JLHwung))
- `babel-compat-data`, `babel-preset-env`
  - [#13075](https://github.com/babel/babel/pull/13075) Compile classes when spread is unsupported ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :nail_care: Polish

- `babel-preset-env`
  - [#13115](https://github.com/babel/babel/pull/13115) [preset-env - debug] Print targets that need each plugin ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :memo: Documentation

- [#13081](https://github.com/babel/babel/pull/13081) Update CoC contacts ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :house: Internal

- `babel-plugin-transform-regenerator`, `babel-standalone`
  - [#13086](https://github.com/babel/babel/pull/13086) Align `regenerator-transform` import with native ESM ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-transform-fixture-test-runner`
  - [#13087](https://github.com/babel/babel/pull/13087) Do not load root `babel.config.js` in tests ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :running_woman: Performance

- `babel-preset-env`
  - [#13076](https://github.com/babel/babel/pull/13076) perf: lazy load preset-env plugins ([@JLHwung](https://github.com/JLHwung))

## v7.13.14 (2021-03-29)

#### :bug: Bug Fix

- `babel-core`
  - [#13068](https://github.com/babel/babel/pull/13068) fix(core): make sure "clone-deep-browser" code path is used on browsers ([@charlessuh](https://github.com/charlessuh))

#### :house: Internal

- Other
  - [#13066](https://github.com/babel/babel/pull/13066) add SHOW_CONFIG_FOR to template ([@hzoo](https://github.com/hzoo))
- `babel-cli`, `babel-core`, `babel-helper-transform-fixture-test-runner`, `babel-register`, `babel-types`
  - [#13057](https://github.com/babel/babel/pull/13057) Remove lodash deps ([@hzoo](https://github.com/hzoo))

#### :running_woman: Performance

- `babel-core`
  - [#13063](https://github.com/babel/babel/pull/13063) Only resolve `package.json` when relative configs are enabled ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.13.13 (2021-03-26)

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#12441](https://github.com/babel/babel/pull/12441) Disallow await before exponential ([@JLHwung](https://github.com/JLHwung))

#### :bug: Bug Fix

- `babel-core`
  - [#13031](https://github.com/babel/babel/pull/13031) Correctly handle relative `browserslistConfigFile` paths ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`, `babel-preset-env`
  - [#13028](https://github.com/babel/babel/pull/13028) Resolve `.browserslistrc` as a project-wide file ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-transform-react-constant-elements`
  - [#13054](https://github.com/babel/babel/pull/13054) fix: constant variables only enable constant react elements ([@cgood92](https://github.com/cgood92))
- `babel-types`
  - [#13046](https://github.com/babel/babel/pull/13046) fix(types): add missing range for BaseNode ([@JounQin](https://github.com/JounQin))
- `babel-node`
  - [#13037](https://github.com/babel/babel/pull/13037) fix: make babel-node spawned process bubble msg ([@lambertkevin](https://github.com/lambertkevin))
  - [#13037](https://github.com/babel/babel/pull/13037) fix: make babel-node spawned process bubble msg ([@lambertkevin](https://github.com/lambertkevin))
- `babel-parser`
  - [#12933](https://github.com/babel/babel/pull/12933) fix(ts): parenthesized assert and assign ([@fedeci](https://github.com/fedeci))

#### :nail_care: Polish

- `babel-cli`, `babel-core`
  - [#12954](https://github.com/babel/babel/pull/12954) Do not bail on SHOW_CONFIG_FOR matches ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal

- `babel-core`
  - [#13021](https://github.com/babel/babel/pull/13021) Remove lodash sortBy use ([@jridgewell](https://github.com/jridgewell))
- Other
  - [#13055](https://github.com/babel/babel/pull/13055) Replace CircleCI badge by GitHub CI ([@JLHwung](https://github.com/JLHwung))
- `babel-traverse`
  - [#13044](https://github.com/babel/babel/pull/13044) Expand type definitions for path.{get,set}Data to cover symbols ([@addaleax](https://github.com/addaleax))

#### :running_woman: Performance

- `babel-core`
  - [#13040](https://github.com/babel/babel/pull/13040) Set `rootMode: "root"` in `loadPartialConfig` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.13.12 (2021-03-22)

#### :bug: Bug Fix

- `babel-standalone`
  - [#13017](https://github.com/babel/babel/pull/13017) Fix importing polyfill plugins in the Rollup bundle ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-bugfix-v8-spread-parameters-in-optional-chaining`, `babel-plugin-proposal-optional-chaining`, `babel-preset-env`
  - [#13009](https://github.com/babel/babel/pull/13009) Implement @babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining ([@JLHwung](https://github.com/JLHwung))
- `babel-types`
  - [#12971](https://github.com/babel/babel/pull/12971) fix: do not throw when creating type annotation based on bigint ([@JLHwung](https://github.com/JLHwung))
- `babel-compat-data`, `babel-preset-env`
  - [#13008](https://github.com/babel/babel/pull/13008) Update compat data ([@JLHwung](https://github.com/JLHwung))

#### :nail_care: Polish

- `babel-plugin-transform-react-jsx`
  - [#12983](https://github.com/babel/babel/pull/12983) Improve error message when not providing a value for JSX key ([@hajnalbendeguz](https://github.com/hajnalbendeguz))

#### :house: Internal

- `babel-compat-data`
  - [#13024](https://github.com/babel/babel/pull/13024) Remove lodash from babel-compat-data ([@jridgewell](https://github.com/jridgewell))
- `babel-node`
  - [#13025](https://github.com/babel/babel/pull/13025) Remove `lodash` from `@babel/node` tests ([@jridgewell](https://github.com/jridgewell))
- `babel-helper-module-transforms`
  - [#13022](https://github.com/babel/babel/pull/13022) Remove `lodash/chunk` ([@jridgewell](https://github.com/jridgewell))
- `babel-plugin-transform-proto-to-assign`
  - [#13026](https://github.com/babel/babel/pull/13026) Remove lodash/pull ([@jridgewell](https://github.com/jridgewell))
- `babel-helper-define-map`
  - [#13023](https://github.com/babel/babel/pull/13023) Remove lodash/has ([@jridgewell](https://github.com/jridgewell))

## v7.13.11 (2021-03-15)

#### :eyeglasses: Spec Compliance

- `babel-parser`, `babel-plugin-proposal-class-static-block`
  - [#12738](https://github.com/babel/babel/pull/12738) Support multiple static blocks ([@JLHwung](https://github.com/JLHwung))

#### :bug: Bug Fix

- `babel-compat-data`
  - [#13000](https://github.com/babel/babel/pull/13000) Point to CJS files in `@babel/compat-data`'s `exports` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`
  - [#12962](https://github.com/babel/babel/pull/12962) Parse type imports in TSImportEqualsDeclaration ([@JLHwung](https://github.com/JLHwung))
- `babel-compat-data`, `babel-helper-compilation-targets`
  - [#12996](https://github.com/babel/babel/pull/12996) Fix `esmodule: "intersect"` on iOS versions ([@JLHwung](https://github.com/JLHwung))

#### :microscope: Output optimization

- `babel-helper-create-class-features-plugin`, `babel-plugin-proposal-async-generator-functions`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-private-methods`, `babel-plugin-proposal-private-property-in-object`, `babel-plugin-transform-typescript`, `babel-preset-env`
  - [#12990](https://github.com/babel/babel/pull/12990) Use `function` rather than `var` to compile private methods ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.13.10 (2021-03-08)

#### :bug: Bug Fix

- `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-react-constant-elements`, `babel-plugin-transform-react-jsx`
  - [#12967](https://github.com/babel/babel/pull/12967) Lazily initialize and cache constant JSX elements ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-create-class-features-plugin`, `babel-plugin-proposal-private-methods`
  - [#12918](https://github.com/babel/babel/pull/12918) Ensure static private method init run before static property ([@JLHwung](https://github.com/JLHwung))
  - [#12707](https://github.com/babel/babel/pull/12707) Evaluate object and initializer when setting a private method ([@JLHwung](https://github.com/JLHwung))
- `babel-helper-create-class-features-plugin`, `babel-helpers`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-private-methods`
  - [#12917](https://github.com/babel/babel/pull/12917) Class static private field destructure set ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#12687](https://github.com/babel/babel/pull/12687) (ts) Raise syntax error for an abstract method that has body ([@sosukesuzuki](https://github.com/sosukesuzuki))
- `babel-helper-compilation-targets`, `babel-preset-env`
  - [#12908](https://github.com/babel/babel/pull/12908) Fix `esmodules: true` without specified browsers ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :nail_care: Polish

- Other
  - [#12956](https://github.com/babel/babel/pull/12956) Suggest using `babel.config.json` when linting dependencies ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helpers`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-private-methods`
  - [#12910](https://github.com/babel/babel/pull/12910) check descriptor before private field access ([@JLHwung](https://github.com/JLHwung))

#### :memo: Documentation

- [#12974](https://github.com/babel/babel/pull/12974) Capitalize design docs headings ([@MrBrain295](https://github.com/MrBrain295))

#### :house: Internal

- `babel-helper-fixtures`
  - [#12982](https://github.com/babel/babel/pull/12982) Optionally enable external-helpers in tests ([@jridgewell](https://github.com/jridgewell))
- `babel-cli`, `babel-core`, `babel-generator`, `babel-helper-compilation-targets`, `babel-helper-create-class-features-plugin`, `babel-helper-create-regexp-features-plugin`, `babel-helper-fixtures`, `babel-helper-module-imports`, `babel-helper-plugin-test-runner`, `babel-helper-transform-fixture-test-runner`, `babel-helpers`, `babel-node`, `babel-parser`, `babel-plugin-external-helpers`, `babel-plugin-proposal-async-generator-functions`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-class-static-block`, `babel-plugin-proposal-decorators`, `babel-plugin-proposal-do-expressions`, `babel-plugin-proposal-dynamic-import`, `babel-plugin-proposal-export-default-from`, `babel-plugin-proposal-export-namespace-from`, `babel-plugin-proposal-function-bind`, `babel-plugin-proposal-function-sent`, `babel-plugin-proposal-json-strings`, `babel-plugin-proposal-logical-assignment-operators`, `babel-plugin-proposal-nullish-coalescing-operator`, `babel-plugin-proposal-numeric-separator`, `babel-plugin-proposal-object-rest-spread`, `babel-plugin-proposal-optional-catch-binding`, `babel-plugin-proposal-optional-chaining`, `babel-plugin-proposal-partial-application`, `babel-plugin-proposal-pipeline-operator`, `babel-plugin-proposal-private-methods`, `babel-plugin-proposal-private-property-in-object`, `babel-plugin-proposal-record-and-tuple`, `babel-plugin-proposal-throw-expressions`, `babel-plugin-proposal-unicode-property-regex`, `babel-plugin-transform-arrow-functions`, `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-block-scoped-functions`, `babel-plugin-transform-block-scoping`, `babel-plugin-transform-classes`, `babel-plugin-transform-computed-properties`, `babel-plugin-transform-destructuring`, `babel-plugin-transform-dotall-regex`, `babel-plugin-transform-duplicate-keys`, `babel-plugin-transform-exponentiation-operator`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-flow-strip-types`, `babel-plugin-transform-for-of`, `babel-plugin-transform-function-name`, `babel-plugin-transform-instanceof`, `babel-plugin-transform-jscript`, `babel-plugin-transform-member-expression-literals`, `babel-plugin-transform-modules-amd`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-modules-systemjs`, `babel-plugin-transform-modules-umd`, `babel-plugin-transform-named-capturing-groups-regex`, `babel-plugin-transform-new-target`, `babel-plugin-transform-object-super`, `babel-plugin-transform-parameters`, `babel-plugin-transform-property-literals`, `babel-plugin-transform-property-mutators`, `babel-plugin-transform-proto-to-assign`, `babel-plugin-transform-react-constant-elements`, `babel-plugin-transform-react-display-name`, `babel-plugin-transform-react-inline-elements`, `babel-plugin-transform-react-jsx-compat`, `babel-plugin-transform-react-jsx-development`, `babel-plugin-transform-react-jsx-self`, `babel-plugin-transform-react-jsx-source`, `babel-plugin-transform-react-jsx`, `babel-plugin-transform-react-pure-annotations`, `babel-plugin-transform-regenerator`, `babel-plugin-transform-reserved-words`, `babel-plugin-transform-runtime`, `babel-plugin-transform-shorthand-properties`, `babel-plugin-transform-spread`, `babel-plugin-transform-sticky-regex`, `babel-plugin-transform-strict-mode`, `babel-plugin-transform-template-literals`, `babel-plugin-transform-typeof-symbol`, `babel-plugin-transform-typescript`, `babel-plugin-transform-unicode-escapes`, `babel-plugin-transform-unicode-regex`, `babel-preset-env`, `babel-preset-flow`, `babel-preset-react`, `babel-preset-typescript`, `babel-register`, `babel-standalone`, `babel-traverse`
  - [#12963](https://github.com/babel/babel/pull/12963) Avoid using CJS globals in internal source files ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-transform-fixture-test-runner`, `babel-highlight`, `babel-plugin-transform-runtime`, `babel-preset-env`
  - [#12795](https://github.com/babel/babel/pull/12795) [internal] Use the Node.js behavior for default imports ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.13.9 (2021-03-01)

#### :bug: Bug Fix

- `babel-preset-env`
  - [#12934](https://github.com/babel/babel/pull/12934) Load `.browserslistrc` when using old `@babel/core` versions ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`
  - [#12939](https://github.com/babel/babel/pull/12939) fix: add tokens when tokens: true is passed to parseExpression ([@JLHwung](https://github.com/JLHwung))
  - [#12930](https://github.com/babel/babel/pull/12930) babel-parser(flow): Add null property to FunctionTypeAnnotation without parens ([@sosukesuzuki](https://github.com/sosukesuzuki))
- `babel-generator`
  - [#12921](https://github.com/babel/babel/pull/12921) Fix a bug with invalid print output when empty array is passed to t.tsInterfaceDeclaration ([@saitonakamura](https://github.com/saitonakamura))
  - [#12920](https://github.com/babel/babel/pull/12920) Allow nullish extends in interfaceish ([@saitonakamura](https://github.com/saitonakamura))

#### :house: Internal

- `babel-plugin-transform-runtime`, `babel-runtime-corejs2`, `babel-runtime-corejs3`, `babel-runtime`
  - [#12919](https://github.com/babel/babel/pull/12919) Put back ESM helpers in a folder where we can use `.js` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.13.8 (2021-02-26)

#### :bug: Bug Fix

- Other
  - [#12909](https://github.com/babel/babel/pull/12909) chore: do not provide polyfills on bundling @babel/standalone ([@JLHwung](https://github.com/JLHwung))
  - [#12891](https://github.com/babel/babel/pull/12891) fix(eslint-parser): merge input `estree` options ([@JLHwung](https://github.com/JLHwung))
- `babel-compat-data`, `babel-preset-env`
  - [#12901](https://github.com/babel/babel/pull/12901) Fix Module not found: Error: Can't resolve 'core-js/modules/es6.array.concat.js' with compat-data@7.13.x ([@luxp](https://github.com/luxp))
- `babel-plugin-transform-runtime`, `babel-runtime-corejs2`, `babel-runtime-corejs3`, `babel-runtime`
  - [#12893](https://github.com/babel/babel/pull/12893) Allow `require()` of runtime helpers in Node.js 13.2-13.6 ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :nail_care: Polish

- `babel-helper-create-class-features-plugin`
  - [#12898](https://github.com/babel/babel/pull/12898) Do not warn for `loose` of class features in `preset-env` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :house: Internal

- `babel-core`, `babel-helper-transform-fixture-test-runner`, `babel-register`
  - [#12820](https://github.com/babel/babel/pull/12820) [internal] Keep the `.cjs` extension when compiling source files ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-transform-runtime`, `babel-runtime-corejs2`, `babel-runtime`
  - [#12883](https://github.com/babel/babel/pull/12883) Improve `@babel/runtime` esm stability ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :microscope: Output optimization

- `babel-plugin-proposal-object-rest-spread`
  - [#12899](https://github.com/babel/babel/pull/12899) Skip `_extends` helper for `{…x}` with modern targets ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.13.6 (2021-02-23)

#### :bug: Bug Fix

- `babel-plugin-transform-runtime`, `babel-runtime-corejs2`, `babel-runtime-corejs3`, `babel-runtime`
  - [#12877](https://github.com/babel/babel/pull/12877) Define fallback `exports` for `@babel/runtime` on old Node ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :house: Internal

- `babel-compat-data`, `babel-preset-env`
  - [#12850](https://github.com/babel/babel/pull/12850) Update compat table ([@JLHwung](https://github.com/JLHwung))

## v7.13.5 (2021-02-23)

#### :bug: Bug Fix

- `babel-compat-data`, `babel-plugin-transform-runtime`, `babel-preset-env`
  - [#12870](https://github.com/babel/babel/pull/12870) Add `es6.array.slice` in corejs2 builtins ([@eligao](https://github.com/eligao))
- `babel-plugin-proposal-async-generator-functions`, `babel-plugin-proposal-decorators`, `babel-plugin-transform-runtime`, `babel-preset-env`
  - [#12869](https://github.com/babel/babel/pull/12869) Ensure that `@babel/runtime-corejs3` imports are injected ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.13.4 (2021-02-23)

#### :bug: Bug Fix

- `babel-parser`
  - [#12867](https://github.com/babel/babel/pull/12867) Don't enable class features by default in `estree` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-transform-runtime`, `babel-runtime-corejs2`, `babel-runtime-corejs3`, `babel-runtime`
  - [#12865](https://github.com/babel/babel/pull/12865) Always load the CJS helpers when using `require` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.13.2 (2021-02-23)

#### :bug: Bug Fix

- `babel-plugin-transform-runtime`, `babel-runtime-corejs2`, `babel-runtime`
  - [#12858](https://github.com/babel/babel/pull/12858) Correctly update `module.exports.default` of `typeof` helper ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.13.1 (2021-02-23)

#### :bug: Bug Fix

- `babel-plugin-transform-runtime`, `babel-runtime-corejs2`, `babel-runtime-corejs3`, `babel-runtime`
  - [#12855](https://github.com/babel/babel/pull/12855) Rename `index.mjs` to `_index.mjs` in `@babel/runtime` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`
  - [#12852](https://github.com/babel/babel/pull/12852) Export function versions of `createConfigItem` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.13.0 (2021-02-22)

#### :rocket: New Feature

- `babel-parser`
  - [#12370](https://github.com/babel/babel/pull/12370) Implement class features in estree ([@JLHwung](https://github.com/JLHwung))
- `babel-generator`, `babel-parser`, `babel-plugin-syntax-module-blocks`, `babel-standalone`, `babel-traverse`, `babel-types`
  - [#12469](https://github.com/babel/babel/pull/12469) Parse JS Module Blocks proposal ([@sosukesuzuki](https://github.com/sosukesuzuki))
- `babel-generator`, `babel-parser`, `babel-types`
  - [#12628](https://github.com/babel/babel/pull/12628) Support TypeScript 4.2 abstract constructor signatures ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#12193](https://github.com/babel/babel/pull/12193) Flow Enums with unknown members support ([@gkz](https://github.com/gkz))
- `babel-core`, `babel-register`
  - [#11498](https://github.com/babel/babel/pull/11498) Add cjs as a default extension ([@perrin4869](https://github.com/perrin4869))
- `babel-traverse`
  - [#12603](https://github.com/babel/babel/pull/12603) feat(referencesImport): support named exports accessed via namespace imports ([@jeysal](https://github.com/jeysal))
- `babel-plugin-transform-typescript`, `babel-preset-typescript`
  - [#12765](https://github.com/babel/babel/pull/12765) Enable allowNamespaces in `transform-typescript` by default ([@JLHwung](https://github.com/JLHwung))
- `babel-generator`, `babel-parser`, `babel-plugin-transform-flow-strip-types`, `babel-plugin-transform-parameters`, `babel-types`
  - [#12234](https://github.com/babel/babel/pull/12234) Support Flow `this` parameter annotations ([@dsainati1](https://github.com/dsainati1))
- `babel-plugin-proposal-record-and-tuple`
  - [#12145](https://github.com/babel/babel/pull/12145) Implement "Records and Tuples" transform ([@rickbutton](https://github.com/rickbutton))
- `babel-plugin-transform-runtime`, `babel-plugin-transform-typeof-symbol`, `babel-runtime-corejs2`, `babel-runtime-corejs3`, `babel-runtime`
  - [#12632](https://github.com/babel/babel/pull/12632) Use conditional exports in `@babel/runtime` for CJS/ESM ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`, `babel-helper-plugin-utils`, `babel-preset-env`
  - [#12219](https://github.com/babel/babel/pull/12219) Add `@babel/core` support for the new `assumptions` option ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`, `babel-helper-compilation-targets`, `babel-helper-plugin-utils`, `babel-preset-env`
  - [#12189](https://github.com/babel/babel/pull/12189) Add `targets` and `browserslist*` options to `@babel/core` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`
  - [#12266](https://github.com/babel/babel/pull/12266) Support `.mjs` plugins/presets and async factories ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :bug: Bug Fix

- `babel-helpers`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-decorators`, `babel-plugin-transform-classes`, `babel-plugin-transform-function-name`, `babel-plugin-transform-parameters`, `babel-plugin-transform-react-jsx`, `babel-plugin-transform-runtime`, `babel-plugin-transform-typescript`, `babel-preset-env`
  - [#8461](https://github.com/babel/babel/pull/8461) Fix \_isNativeReflectConstruct helper ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-cli`
  - [#12846](https://github.com/babel/babel/pull/12846) [babel-cli] Don't fail when `chmod` throws an error ([@immitsu](https://github.com/immitsu))
- `babel-node`
  - [#12836](https://github.com/babel/babel/pull/12836) fix: create IPC channel for spawned babel-node process ([@JLHwung](https://github.com/JLHwung))
- `babel-standalone`
  - [#12819](https://github.com/babel/babel/pull/12819) fix: add regenerate-unicode-properties to dynamicRequireTargets ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-proposal-optional-chaining`, `babel-traverse`
  - [#12812](https://github.com/babel/babel/pull/12812) Fix scope of computed method keys ([@overlookmotel](https://github.com/overlookmotel))

#### :house: Internal

- `babel-plugin-proposal-async-generator-functions`, `babel-plugin-proposal-decorators`, `babel-plugin-transform-runtime`, `babel-preset-env`, `babel-runtime-corejs2`
  - [#12845](https://github.com/babel/babel/pull/12845) Use the `babel-plugin-polyfill-*` packages in `transform-runtime` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-transform-runtime`
  - [#12842](https://github.com/babel/babel/pull/12842) Don't use `useESModules` in `@babel/runtime` build script ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-standalone`
  - [#12839](https://github.com/babel/babel/pull/12839) Make sure that Rollup's `dynamicRequireTargets` are included ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-transform-fixture-test-runner`, `babel-plugin-proposal-async-generator-functions`, `babel-plugin-proposal-decorators`, `babel-preset-env`
  - [#12583](https://github.com/babel/babel/pull/12583) Use the `babel-plugin-polyfill-*` packages in `preset-env` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :running_woman: Performance

- `babel-register`
  - [#12813](https://github.com/babel/babel/pull/12813) babel-register: Don’t rewrite the cache if it’s not dirty ([@andersk](https://github.com/andersk))

#### :microscope: Output optimization

- `babel-helper-create-class-features-plugin`, `babel-helper-member-expression-to-functions`, `babel-plugin-proposal-class-properties`
  - [#12762](https://github.com/babel/babel/pull/12762) Support `noDocumentAll` for `obj?.#p` ([@JLHwung](https://github.com/JLHwung))

## v7.12.18 (2021-02-18)

#### :bug: Bug Fix

- [#12817](https://github.com/babel/babel/pull/12817) Make sure to publish all the necessary files ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.12.17 (2021-02-18)

#### :bug: Bug Fix

- `babel-core`
  - [#12211](https://github.com/babel/babel/pull/12211) Do not cache non-existent JS config files forever ([@devongovett](https://github.com/devongovett))
- `babel-helper-module-transforms`, `babel-plugin-transform-typescript`
  - [#12796](https://github.com/babel/babel/pull/12796) Register binding when transforming TSParameterProperty ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#12776](https://github.com/babel/babel/pull/12776) fix(ts): parse multiline declarations correctly ([@fedeci](https://github.com/fedeci))
  - [#12785](https://github.com/babel/babel/pull/12785) Raise recoverable error for type members with invalid modifiers ([@sosukesuzuki](https://github.com/sosukesuzuki))
- `babel-traverse`
  - [#12797](https://github.com/babel/babel/pull/12797) clean up traverse scope ([@JLHwung](https://github.com/JLHwung))
- `babel-types`
  - [#12794](https://github.com/babel/babel/pull/12794) Fix import assertions type definitions ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :nail_care: Polish

- `babel-helper-create-class-features-plugin`, `babel-helpers`, `babel-plugin-proposal-private-methods`
  - [#12792](https://github.com/babel/babel/pull/12792) Reuse the `readOnlyError` helper for private methods ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :house: Internal

- Other
  - [#12810](https://github.com/babel/babel/pull/12810) Store LICENSE files when publishing from GH actions ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-transform-fixture-test-runner`
  - [#12811](https://github.com/babel/babel/pull/12811) test: avoid deprecated jest.addMatchers ([@jeysal](https://github.com/jeysal))
- `babel-parser`
  - [#12808](https://github.com/babel/babel/pull/12808) refactor: fix typo in error.js ([@eltociear](https://github.com/eltociear))

## v7.12.16 (2021-02-11)

#### :bug: Bug Fix

- `babel-core`
  - [#12783](https://github.com/babel/babel/pull/12783) fix: use semver gte comparison on polyfill version tester ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#12735](https://github.com/babel/babel/pull/12735) [parser] Fix scope handling of Flow declared functions ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#12775](https://github.com/babel/babel/pull/12775) babel-parser(ts): Throw recoverable for duplicates access modifier ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#12771](https://github.com/babel/babel/pull/12771) babel-parser(ts): Raise recoverable error for abstract interface ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#12763](https://github.com/babel/babel/pull/12763) fix(ts): include `asserts` in `TSTypePredicate` location ([@fedeci](https://github.com/fedeci))
  - [#12758](https://github.com/babel/babel/pull/12758) [TS] Create `TSUnionType` or `TSIntersectionType` when typealias has a leading operator ([@fedeci](https://github.com/fedeci))
- `babel-plugin-transform-typescript`
  - [#12760](https://github.com/babel/babel/pull/12760) Support destructuring variable declarator within TS namespace ([@JLHwung](https://github.com/JLHwung))

#### :nail_care: Polish

- `babel-node`
  - [#12786](https://github.com/babel/babel/pull/12786) Polish `@babel/node` REPL ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal

- Other
  - [#12781](https://github.com/babel/babel/pull/12781) pnp does not work with ESM dev scripts ([@JLHwung](https://github.com/JLHwung))
  - [#12766](https://github.com/babel/babel/pull/12766) docs: Update build requirements in CONTRIBUTING.md ([@sosukesuzuki](https://github.com/sosukesuzuki))
- `babel-cli`, `babel-core`, `babel-helper-compilation-targets`, `babel-helper-create-class-features-plugin`, `babel-helper-create-regexp-features-plugin`, `babel-helper-member-expression-to-functions`, `babel-helper-validator-option`, `babel-node`, `babel-parser`, `babel-plugin-proposal-class-static-block`, `babel-plugin-proposal-dynamic-import`, `babel-plugin-proposal-optional-chaining`, `babel-plugin-transform-react-jsx-development`, `babel-plugin-transform-react-jsx`, `babel-preset-env`, `babel-preset-typescript`
  - [#12759](https://github.com/babel/babel/pull/12759) Avoid importing `.json` files ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.12.15 (2021-02-04)

#### :bug: Bug Fix

- `babel-parser`
  - [#12757](https://github.com/babel/babel/pull/12757) fix(ts): include leading operator in `TSUnionType` and `TSIntersectionType` locations ([@fedeci](https://github.com/fedeci))
- `babel-generator`
  - [#12755](https://github.com/babel/babel/pull/12755) Respect the `jsescOption.minimal` generator option ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :house: Internal

- [#12752](https://github.com/babel/babel/pull/12752) Allow publishing patch versions from the GH UI ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.12.14 (2021-02-03)

#### :bug: Bug Fix

- `babel-parser`
  - [#12748](https://github.com/babel/babel/pull/12748) fix(ts): allow abstract methods with `export default abstract class` ([@fedeci](https://github.com/fedeci))

#### :house: Internal

- `babel-core`
  - [#12740](https://github.com/babel/babel/pull/12740) test: add tests on {parser,generator}Override ([@JLHwung](https://github.com/JLHwung))

## v7.12.13 (2021-02-03)

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#12661](https://github.com/babel/babel/pull/12661) spec: disable await binding identifier within static block ([@JLHwung](https://github.com/JLHwung))
- `babel-helper-create-class-features-plugin`, `babel-helpers`, `babel-plugin-proposal-private-methods`, `babel-runtime-corejs2`, `babel-runtime-corejs3`, `babel-runtime`
  - [#12689](https://github.com/babel/babel/pull/12689) fix: throw error when accessing private method without a getter ([@fedeci](https://github.com/fedeci))
- `babel-plugin-transform-computed-properties`, `babel-plugin-transform-shorthand-properties`
  - [#12664](https://github.com/babel/babel/pull/12664) fix: correctly transform `__proto__` properties ([@ExE-Boss](https://github.com/ExE-Boss))

#### :bug: Bug Fix

- `babel-plugin-proposal-class-properties`, `babel-traverse`
  - [#12729](https://github.com/babel/babel/pull/12729) Fix class fields when `super()` is in a default param ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-proposal-class-properties`, `babel-plugin-transform-classes`
  - [#12723](https://github.com/babel/babel/pull/12723) Define class elements in the correct order ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`, `babel-template`
  - [#12725](https://github.com/babel/babel/pull/12725) Permit %%placeholder%% in left-hand-side of a let declaration ([@Zalathar](https://github.com/Zalathar))
- `babel-core`, `babel-helper-transform-fixture-test-runner`, `babel-register`
  - [#12728](https://github.com/babel/babel/pull/12728) Don't use `require()` in ESM files ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`
  - [#12686](https://github.com/babel/babel/pull/12686) (ts) Raise syntax error for an abstract method in non-abstract class ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#12684](https://github.com/babel/babel/pull/12684) fix(parser): throw error with wrong typescript 'export declare' ([@fedeci](https://github.com/fedeci))
  - [#12520](https://github.com/babel/babel/pull/12520) Raise recoverable error for await expressions in sync functions ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#12678](https://github.com/babel/babel/pull/12678) fix: start TypePredicate node after returnToken ([@JLHwung](https://github.com/JLHwung))
  - [#12599](https://github.com/babel/babel/pull/12599) @babel/preset-typescript: fix tsx assigment issue ([@Zzzen](https://github.com/Zzzen))
  - [#12562](https://github.com/babel/babel/pull/12562) [ts]Add optional property to OptionalCallExpression node that has type arguments ([@sosukesuzuki](https://github.com/sosukesuzuki))
- `babel-helpers`, `babel-plugin-transform-classes`
  - [#12693](https://github.com/babel/babel/pull/12693) Avoid hitting **proto** in \_inheritsLoose ([@ChALkeR](https://github.com/ChALkeR))
- `babel-generator`
  - [#12653](https://github.com/babel/babel/pull/12653) fix: avoid line breaks between class members head and key ([@JLHwung](https://github.com/JLHwung))
- `babel-register`
  - [#12665](https://github.com/babel/babel/pull/12665) fix: babel-register transform internal dependencies ([@overlookmotel](https://github.com/overlookmotel))
- `babel-node`
  - [#12638](https://github.com/babel/babel/pull/12638) fix: place \_babel-node after process.execArgv ([@JLHwung](https://github.com/JLHwung))
- `babel-types`
  - [#12602](https://github.com/babel/babel/pull/12602) fix: cloneNode(deep, withoutLoc) handles absent comments ([@FauxFaux](https://github.com/FauxFaux))
  - [#12575](https://github.com/babel/babel/pull/12575) Use isIdentifierChar instead of regex for toIdentifier ([@mischnic](https://github.com/mischnic))
- `babel-plugin-transform-modules-systemjs`
  - [#12612](https://github.com/babel/babel/pull/12612) [systemjs] Fix: export star alongside with named export ([@shrinktofit](https://github.com/shrinktofit))
- `babel-plugin-transform-for-of`
  - [#12611](https://github.com/babel/babel/pull/12611) Transform labeled `for-of` inside braceless `if` statement ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-create-class-features-plugin`, `babel-helper-replace-supers`, `babel-plugin-transform-classes`
  - [#12544](https://github.com/babel/babel/pull/12544) Correctly access shadowed class binding in `super.*` ([@Zzzen](https://github.com/Zzzen))
- `babel-helper-module-imports`, `babel-plugin-transform-react-jsx-development`, `babel-plugin-transform-react-jsx`
  - [#12546](https://github.com/babel/babel/pull/12546) Load `jsx-runtime` after existing imports ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :nail_care: Polish

- `babel-helper-transform-fixture-test-runner`, `babel-parser`, `babel-preset-env`
  - [#12716](https://github.com/babel/babel/pull/12716) refactor: raise AwaitNotInAsyncContext when an AwaitExpression will be parsed ([@JLHwung](https://github.com/JLHwung))
- `babel-cli`, `babel-core`, `babel-parser`
  - [#12437](https://github.com/babel/babel/pull/12437) Recover from "missing semicolon" errors ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-create-class-features-plugin`, `babel-plugin-proposal-private-methods`
  - [#12713](https://github.com/babel/babel/pull/12713) Add `#` to the private name in "write-only" errors ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-compilation-targets`, `babel-preset-env`
  - [#12626](https://github.com/babel/babel/pull/12626) fix: print warning messages to stderr ([@JLHwung](https://github.com/JLHwung))
- `babel-code-frame`
  - [#12567](https://github.com/babel/babel/pull/12567) fix(code-frame): do not pad gutter of empty lines ([@SimenB](https://github.com/SimenB))

#### :memo: Documentation

- Other
  - [#12698](https://github.com/babel/babel/pull/12698) Add " 📢 Deprecation" to the changelog labels ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-cli`, `babel-code-frame`, `babel-compat-data`, `babel-core`, `babel-generator`, `babel-helper-annotate-as-pure`, `babel-helper-bindify-decorators`, `babel-helper-builder-binary-assignment-operator-visitor`, `babel-helper-builder-react-jsx`, `babel-helper-call-delegate`, `babel-helper-compilation-targets`, `babel-helper-create-class-features-plugin`, `babel-helper-create-regexp-features-plugin`, `babel-helper-define-map`, `babel-helper-explode-assignable-expression`, `babel-helper-explode-class`, `babel-helper-fixtures`, `babel-helper-function-name`, `babel-helper-get-function-arity`, `babel-helper-hoist-variables`, `babel-helper-member-expression-to-functions`, `babel-helper-module-imports`, `babel-helper-module-transforms`, `babel-helper-optimise-call-expression`, `babel-helper-plugin-test-runner`, `babel-helper-plugin-utils`, `babel-helper-remap-async-to-generator`, `babel-helper-replace-supers`, `babel-helper-simple-access`, `babel-helper-split-export-declaration`, `babel-helper-transform-fixture-test-runner`, `babel-helper-wrap-function`, `babel-helpers`, `babel-highlight`, `babel-node`, `babel-parser`, `babel-plugin-external-helpers`, `babel-plugin-proposal-async-generator-functions`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-class-static-block`, `babel-plugin-proposal-decorators`, `babel-plugin-proposal-do-expressions`, `babel-plugin-proposal-export-default-from`, `babel-plugin-proposal-export-namespace-from`, `babel-plugin-proposal-function-bind`, `babel-plugin-proposal-function-sent`, `babel-plugin-proposal-json-strings`, `babel-plugin-proposal-logical-assignment-operators`, `babel-plugin-proposal-nullish-coalescing-operator`, `babel-plugin-proposal-numeric-separator`, `babel-plugin-proposal-object-rest-spread`, `babel-plugin-proposal-optional-catch-binding`, `babel-plugin-proposal-optional-chaining`, `babel-plugin-proposal-partial-application`, `babel-plugin-proposal-pipeline-operator`, `babel-plugin-proposal-private-methods`, `babel-plugin-proposal-private-property-in-object`, `babel-plugin-proposal-throw-expressions`, `babel-plugin-proposal-unicode-property-regex`, `babel-plugin-syntax-class-properties`, `babel-plugin-syntax-class-static-block`, `babel-plugin-syntax-decorators`, `babel-plugin-syntax-do-expressions`, `babel-plugin-syntax-export-default-from`, `babel-plugin-syntax-flow`, `babel-plugin-syntax-function-bind`, `babel-plugin-syntax-function-sent`, `babel-plugin-syntax-jsx`, `babel-plugin-syntax-module-string-names`, `babel-plugin-syntax-partial-application`, `babel-plugin-syntax-pipeline-operator`, `babel-plugin-syntax-throw-expressions`, `babel-plugin-syntax-top-level-await`, `babel-plugin-syntax-typescript`, `babel-plugin-transform-arrow-functions`, `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-block-scoped-functions`, `babel-plugin-transform-block-scoping`, `babel-plugin-transform-classes`, `babel-plugin-transform-computed-properties`, `babel-plugin-transform-destructuring`, `babel-plugin-transform-dotall-regex`, `babel-plugin-transform-duplicate-keys`, `babel-plugin-transform-exponentiation-operator`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-flow-strip-types`, `babel-plugin-transform-for-of`, `babel-plugin-transform-function-name`, `babel-plugin-transform-instanceof`, `babel-plugin-transform-jscript`, `babel-plugin-transform-literals`, `babel-plugin-transform-member-expression-literals`, `babel-plugin-transform-modules-amd`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-modules-systemjs`, `babel-plugin-transform-modules-umd`, `babel-plugin-transform-named-capturing-groups-regex`, `babel-plugin-transform-new-target`, `babel-plugin-transform-object-assign`, `babel-plugin-transform-object-set-prototype-of-to-assign`, `babel-plugin-transform-object-super`, `babel-plugin-transform-parameters`, `babel-plugin-transform-property-literals`, `babel-plugin-transform-property-mutators`, `babel-plugin-transform-proto-to-assign`, `babel-plugin-transform-react-constant-elements`, `babel-plugin-transform-react-display-name`, `babel-plugin-transform-react-inline-elements`, `babel-plugin-transform-react-jsx-compat`, `babel-plugin-transform-react-jsx-self`, `babel-plugin-transform-react-jsx-source`, `babel-plugin-transform-react-jsx`, `babel-plugin-transform-regenerator`, `babel-plugin-transform-reserved-words`, `babel-plugin-transform-runtime`, `babel-plugin-transform-shorthand-properties`, `babel-plugin-transform-spread`, `babel-plugin-transform-sticky-regex`, `babel-plugin-transform-strict-mode`, `babel-plugin-transform-template-literals`, `babel-plugin-transform-typeof-symbol`, `babel-plugin-transform-typescript`, `babel-plugin-transform-unicode-escapes`, `babel-plugin-transform-unicode-regex`, `babel-preset-env`, `babel-preset-flow`, `babel-preset-react`, `babel-preset-typescript`, `babel-register`, `babel-runtime-corejs2`, `babel-runtime`, `babel-standalone`, `babel-template`, `babel-traverse`, `babel-types`
  - [#12531](https://github.com/babel/babel/pull/12531) docs: add package-specific documentation links ([@DanArthurGallagher](https://github.com/DanArthurGallagher))

#### :house: Internal

- `babel-traverse`, `babel-types`
  - [#12296](https://github.com/babel/babel/pull/12296) Use native ESM for dev scripts ([@karansapolia](https://github.com/karansapolia))
- `babel-register`
  - [#12674](https://github.com/babel/babel/pull/12674) babel-register run default register with global module cache ([@overlookmotel](https://github.com/overlookmotel))
- Other
  - [#12659](https://github.com/babel/babel/pull/12659) Add `yarn-plugin-conditions` to update Babel 8 dependencies ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#12640](https://github.com/babel/babel/pull/12640) test: reuse lodash library within eslint tests ([@armano2](https://github.com/armano2))
  - [#12592](https://github.com/babel/babel/pull/12592) Remove remaining references to lerna ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-generator`, `babel-preset-env`
  - [#12670](https://github.com/babel/babel/pull/12670) fix: allow to execute util scripts ([@armano2](https://github.com/armano2))
- `babel-core`, `babel-helper-compilation-targets`, `babel-plugin-transform-classes`, `babel-plugin-transform-function-name`, `babel-plugin-transform-parameters`, `babel-plugin-transform-regenerator`, `babel-preset-env`
  - [#12615](https://github.com/babel/babel/pull/12615) Tweak helper compilation targets ([@JLHwung](https://github.com/JLHwung))

#### :microscope: Output optimization

- `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-template-literals`, `babel-plugin-transform-unicode-escapes`, `babel-preset-env`
  - [#12588](https://github.com/babel/babel/pull/12588) Declare template objects inline ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-transform-react-jsx`
  - [#12557](https://github.com/babel/babel/pull/12557) Optimize jsx spreads of object expressions ([@bz2](https://github.com/bz2))

## v7.12.12 (2020-12-23)

#### :bug: Bug Fix

- `babel-plugin-transform-block-scoping`, `babel-traverse`
  - [#12530](https://github.com/babel/babel/pull/12530) skip discriminant when renamer starts from SwitchStatement. Closes [#12148](https://github.com/babel/babel/issues/12148) ([@Zzzen](https://github.com/Zzzen))
- `babel-types`
  - [#12521](https://github.com/babel/babel/pull/12521) Restore `@babel/types` support for old TS versions ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-transform-block-scoping`
  - [#12512](https://github.com/babel/babel/pull/12512) Fix annex B block function hoisting semantics ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :house: Internal

- `babel-polyfill`
  - [#12541](https://github.com/babel/babel/pull/12541) Archive `@babel/polyfill` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-builder-react-jsx-experimental`, `babel-plugin-transform-react-jsx-development`, `babel-plugin-transform-react-jsx`
  - [#12524](https://github.com/babel/babel/pull/12524) refactor: Move `react-jsx-development` implementation into `react-jsx` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-fixtures`, `babel-helper-transform-fixture-test-runner`, `babel-plugin-proposal-async-generator-functions`, `babel-plugin-proposal-decorators`
  - [#12130](https://github.com/babel/babel/pull/12130) Remove babel polyfill from fixture test runner ([@JLHwung](https://github.com/JLHwung))
- Other
  - [#12527](https://github.com/babel/babel/pull/12527) Update `release-tool` and define implicit deps for `@babel/runtime` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#12011](https://github.com/babel/babel/pull/12011) Enable PnP linker on CI build job ([@JLHwung](https://github.com/JLHwung))

## v7.12.11 (2020-12-16)

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#12366](https://github.com/babel/babel/pull/12366) Disallow non octal decimal escape before use strict ([@JLHwung](https://github.com/JLHwung))

#### :bug: Bug Fix

- `babel-plugin-transform-block-scoping`
  - [#11801](https://github.com/babel/babel/pull/11801) fix: handle block-level function declaration (#10046) ([@vitorveiga](https://github.com/vitorveiga))
- `babel-helper-builder-react-jsx-experimental`, `babel-plugin-transform-react-jsx-development`, `babel-plugin-transform-react-jsx`
  - [#12493](https://github.com/babel/babel/pull/12493) Lazily inject imports to the JSX runtime ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-builder-react-jsx-experimental`, `babel-preset-react`
  - [#12495](https://github.com/babel/babel/pull/12495) Fixed issue with skipping over self & source generated by another instance ([@Andarist](https://github.com/Andarist))
- `babel-preset-env`
  - [#10862](https://github.com/babel/babel/pull/10862) Add js extension to preset-env generated polyfill imports ([@JLHwung](https://github.com/JLHwung))
- `babel-helper-builder-react-jsx-experimental`, `babel-plugin-transform-react-jsx`
  - [#12479](https://github.com/babel/babel/pull/12479) Setup JSX runtime even if the file doesn't contain JSX ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-builder-react-jsx-experimental`, `babel-plugin-transform-react-jsx-development`, `babel-preset-react`
  - [#12475](https://github.com/babel/babel/pull/12475) Fixed a regression for multiple **self & **source props with classic runtime ([@Andarist](https://github.com/Andarist))

#### :house: Internal

- `babel-types`
  - [#12510](https://github.com/babel/babel/pull/12510) Improve AST node definitions in @babel/types ([@zxbodya](https://github.com/zxbodya))
- Other
  - [#12508](https://github.com/babel/babel/pull/12508) chore: always check yarn lock and dedupe during update ([@JLHwung](https://github.com/JLHwung))
  - [#12480](https://github.com/babel/babel/pull/12480) Avoid force trailing comma on test files ([@JLHwung](https://github.com/JLHwung))
  - [#12462](https://github.com/babel/babel/pull/12462) Run e2e tests also with BABEL_8_BREAKING ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-transform-react-display-name`, `babel-plugin-transform-react-jsx`
  - [#12502](https://github.com/babel/babel/pull/12502) Reorganize some JSX-related tests ([@Andarist](https://github.com/Andarist))
- `babel-standalone`, `babel-types`
  - [#12127](https://github.com/babel/babel/pull/12127) Move some build steps to gulp ([@JLHwung](https://github.com/JLHwung))

## v7.12.10 (2020-12-09)

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#12443](https://github.com/babel/babel/pull/12443) Make sure estree test should not throw if babel parser does not throw ([@JLHwung](https://github.com/JLHwung))
  - [#12375](https://github.com/babel/babel/pull/12375) Make sure babel parser throws exactly same recoverable errors when estree plugin is enabled ([@JLHwung](https://github.com/JLHwung))

#### :bug: Bug Fix

- `babel-generator`
  - [#12424](https://github.com/babel/babel/pull/12424) Fix printing BigIntLiterals/DecimalLiterals with compact option ([@existentialism](https://github.com/existentialism))
- `babel-types`
  - [#12418](https://github.com/babel/babel/pull/12418) babel-types update OptionalCallExpression to support ArgumentPlaceholder ([@zxbodya](https://github.com/zxbodya))
  - [#12395](https://github.com/babel/babel/pull/12395) Fix `t.isReferenced()` for named re-exports ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-traverse`
  - [#12394](https://github.com/babel/babel/pull/12394) Set correct `path.context` un `push/unshiftContainer` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :nail_care: Polish

- `babel-preset-env`
  - [#12402](https://github.com/babel/babel/pull/12402) Clarify warning source about underspecified corejs option in preset-env. ([@AndrewSouthpaw](https://github.com/AndrewSouthpaw))

#### :memo: Documentation

- `babel-parser`
  - [#12449](https://github.com/babel/babel/pull/12449) Add StaticBlock to Table of Contents in AST spec ([@sosukesuzuki](https://github.com/sosukesuzuki))

#### :house: Internal

- Other
  - [#12450](https://github.com/babel/babel/pull/12450) Use new CircleCI images ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#12453](https://github.com/babel/babel/pull/12453) Use Yarn 2.4.0 ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#12430](https://github.com/babel/babel/pull/12430) chore: remove travis-ci badge ([@JLHwung](https://github.com/JLHwung))
  - [#12397](https://github.com/babel/babel/pull/12397) chore: bump chokidar in glob-watcher to ^3.4.0 ([@JLHwung](https://github.com/JLHwung))
- `babel-cli`, `babel-node`, `babel-plugin-transform-runtime`, `babel-register`
  - [#12458](https://github.com/babel/babel/pull/12458) Use native Node.js functions when available ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-builder-react-jsx-experimental`, `babel-plugin-transform-react-jsx-development`, `babel-plugin-transform-react-jsx`, `babel-preset-react`
  - [#12253](https://github.com/babel/babel/pull/12253) Stop using old JSX transform ([@Andarist](https://github.com/Andarist))
- `babel-helper-fixtures`, `babel-types`
  - [#12440](https://github.com/babel/babel/pull/12440) Prepare codebase for inline Babel 8 breaking changes ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`, `babel-helper-transform-fixture-test-runner`, `babel-node`, `babel-plugin-transform-block-scoping`, `babel-plugin-transform-runtime`, `babel-plugin-transform-typeof-symbol`
  - [#12439](https://github.com/babel/babel/pull/12439) Use `require.resolve` instead of the `resolve` package ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`
  - [#12398](https://github.com/babel/babel/pull/12398) refactor: simplify isAwaitAllowed ([@JLHwung](https://github.com/JLHwung))

## v7.12.9 (2020-11-24)

#### :bug: Bug Fix

- `babel-plugin-transform-typescript`, `babel-traverse`
  - [#12391](https://github.com/babel/babel/pull/12391) Update pathCache in `NodePath#_replaceWith` ([@JLHwung](https://github.com/JLHwung))

## v7.12.8 (2020-11-23)

#### :bug: Bug Fix

- `babel-traverse`
  - [#12390](https://github.com/babel/babel/pull/12390) Avoid infinite loops in type inference logic ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#12387](https://github.com/babel/babel/pull/12387) Initialize NodePath context when using `getSibling` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-cli`
  - [#12382](https://github.com/babel/babel/pull/12382) Fix Node version check ([@Hypnosphi](https://github.com/Hypnosphi))

#### :house: Internal

- [#12372](https://github.com/babel/babel/pull/12372) chore: fix watch config ([@JLHwung](https://github.com/JLHwung))

## v7.12.7 (2020-11-20)

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#12346](https://github.com/babel/babel/pull/12346) refactor: reorder checkLVal parameters ([@JLHwung](https://github.com/JLHwung))
  - [#12327](https://github.com/babel/babel/pull/12327) fix: disallow all parenthesized pattern except parsing LHS ([@JLHwung](https://github.com/JLHwung))

#### :bug: Bug Fix

- `babel-parser`
  - [#12356](https://github.com/babel/babel/pull/12356) [ts]Fix syntax error for modifier name class methods with type parameters ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#12352](https://github.com/babel/babel/pull/12352) [ts]Set `false` to default value of TsTypePredicate.asserts ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#12333](https://github.com/babel/babel/pull/12333) Fix syntax error for getter and setter with typescript and estree plugin ([@sosukesuzuki](https://github.com/sosukesuzuki))
- `babel-helper-optimise-call-expression`, `babel-plugin-proposal-class-properties`
  - [#12350](https://github.com/babel/babel/pull/12350) Fix: correctly transform `this.#m?.(...arguments)` ([@JLHwung](https://github.com/JLHwung))
- `babel-compat-data`, `babel-preset-env`
  - [#12340](https://github.com/babel/babel/pull/12340) Fix support for polyfilling Array.prototype.values in core-js@2 ([@existentialism](https://github.com/existentialism))
- `babel-plugin-transform-modules-systemjs`, `babel-plugin-transform-parameters`, `babel-preset-env`, `babel-traverse`
  - [#12331](https://github.com/babel/babel/pull/12331) Use the correct `context` when re-using a cached `NodePath` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-proposal-numeric-separator`
  - [#12311](https://github.com/babel/babel/pull/12311) Adding includes fix for plugin-proposal-numeric-separator ([@fraywing](https://github.com/fraywing))

#### :nail_care: Polish

- `babel-preset-react`, `babel-preset-typescript`
  - [#12347](https://github.com/babel/babel/pull/12347) refactor: use option-validator in preset-typescript ([@JLHwung](https://github.com/JLHwung))
- `babel-types`
  - [#12341](https://github.com/babel/babel/pull/12341) improve asserts in generated typescript definitions ([@zxbodya](https://github.com/zxbodya))

#### :house: Internal

- `babel-helper-regex`
  - [#12377](https://github.com/babel/babel/pull/12377) Archive `@babel/helper-regex` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-create-regexp-features-plugin`, `babel-plugin-transform-sticky-regex`
  - [#12349](https://github.com/babel/babel/pull/12349) refactor: inline `@babel/helper-regex` usage ([@JLHwung](https://github.com/JLHwung))
- `babel-core`
  - [#12288](https://github.com/babel/babel/pull/12288) Don't compile `import()` in development ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#11734](https://github.com/babel/babel/pull/11734) Account for ConfigItem being generated by another copy of Babel ([@developit](https://github.com/developit))
- `babel-preset-env`
  - [#12368](https://github.com/babel/babel/pull/12368) Bump caniuse-lite resolutions ([@JLHwung](https://github.com/JLHwung))
- Other
  - [#12362](https://github.com/babel/babel/pull/12362) chore: fix grammar in bug template ([@snitin315](https://github.com/snitin315))
  - [#12357](https://github.com/babel/babel/pull/12357) chore: prompt maintainer to quit make watch before publish ([@JLHwung](https://github.com/JLHwung))
  - [#12328](https://github.com/babel/babel/pull/12328) chore: remove Node.js 13 from CI ([@JLHwung](https://github.com/JLHwung))
- `babel-types`
  - [#11883](https://github.com/babel/babel/pull/11883) feat(babel‑types): Add type definitions for Node assertion methods ([@ExE-Boss](https://github.com/ExE-Boss))
- `babel-cli`
  - [#12322](https://github.com/babel/babel/pull/12322) Use `chokidar@2` without `fsevents@1` in `@babel/cli` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`
  - [#12326](https://github.com/babel/babel/pull/12326) Add typings for `recordAndTuple` parser plugin ([@JLHwung](https://github.com/JLHwung))
- `babel-traverse`
  - [#12309](https://github.com/babel/babel/pull/12309) test: add tests about behaviour of replaceWithMultiple ([@JLHwung](https://github.com/JLHwung))

#### :running_woman: Performance

- `babel-traverse`
  - [#12302](https://github.com/babel/babel/pull/12302) Reduce linear search on list traversing ([@JLHwung](https://github.com/JLHwung))

#### :microscope: Output optimization

- `babel-helper-member-expression-to-functions`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-optional-chaining`
  - [#12291](https://github.com/babel/babel/pull/12291) optimize optional chain when expression will be cast to boolean ([@JLHwung](https://github.com/JLHwung))

## v7.12.6 (2020-11-04)

#### :bug: Bug Fix

- `babel-node`
  - [#12297](https://github.com/babel/babel/pull/12297) babel-node: support require flag in repl mode ([@markshlick](https://github.com/markshlick))

#### :house: Internal

- [#12304](https://github.com/babel/babel/pull/12304) Create a new "PR: Output optimization🔬" label ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :leftwards_arrow_with_hook: Revert

- `babel-traverse`, `babel-types`
  - [#12307](https://github.com/babel/babel/pull/12307) Revert "Mark `ThisExpression` and `Super` as `Purish`" ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.12.5 (2020-11-03)

#### :eyeglasses: Spec Compliance

- `babel-helpers`, `babel-plugin-transform-block-scoping`
  - [#12252](https://github.com/babel/babel/pull/12252) Throw a `TypeError` when reassigning a `const` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :bug: Bug Fix

- `babel-parser`
  - [#12281](https://github.com/babel/babel/pull/12281) fix: support string assertion key in assert entries ([@JLHwung](https://github.com/JLHwung))
  - [#12264](https://github.com/babel/babel/pull/12264) fix: disallow import assertions in export without from ([@JLHwung](https://github.com/JLHwung))
  - [#12267](https://github.com/babel/babel/pull/12267) Handle exprAllowed before ObjectLike is parsed ([@JLHwung](https://github.com/JLHwung))
  - [#12230](https://github.com/babel/babel/pull/12230) Refactor yield await classification ([@JLHwung](https://github.com/JLHwung))
  - [#12254](https://github.com/babel/babel/pull/12254) Allows the interface to be used as an Identifier for flow plugin ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#12221](https://github.com/babel/babel/pull/12221) [ts] Error on invalid type casts in JSX ([@existentialism](https://github.com/existentialism))
  - [#12227](https://github.com/babel/babel/pull/12227) [ts] Allow optional binding pattern parameters within types/interfaces ([@existentialism](https://github.com/existentialism))
  - [#12224](https://github.com/babel/babel/pull/12224) Fix parsing of imports with module string name in flow plugin ([@sosukesuzuki](https://github.com/sosukesuzuki))
- `babel-parser`, `babel-types`
  - [#12280](https://github.com/babel/babel/pull/12280) Make assertions optional and update AST spec ([@sosukesuzuki](https://github.com/sosukesuzuki))
- `babel-template`, `babel-types`
  - [#12263](https://github.com/babel/babel/pull/12263) fix: babel-types: ImportDeclaration: add assertions ([@coderaiser](https://github.com/coderaiser))
- `babel-generator`
  - [#12260](https://github.com/babel/babel/pull/12260) Do not use currentColumn to indent comments when retainLines=true ([@ian-craig](https://github.com/ian-craig))
- `babel-generator`, `babel-parser`
  - [#12249](https://github.com/babel/babel/pull/12249) Support Import Assertions for re-export statement ([@sosukesuzuki](https://github.com/sosukesuzuki))
- `babel-plugin-proposal-numeric-separator`
  - [#12240](https://github.com/babel/babel/pull/12240) fix: support bigInt in numeric-separator transform ([@JLHwung](https://github.com/JLHwung))
- `babel-helper-replace-supers`, `babel-plugin-transform-classes`
  - [#12238](https://github.com/babel/babel/pull/12238) fix: support optionalCall in replace super handler ([@JLHwung](https://github.com/JLHwung))
- `babel-standalone`
  - [#12226](https://github.com/babel/babel/pull/12226) packages/babel-standalone: make data-type="module" option avilable without data-presets option ([@hirochachacha](https://github.com/hirochachacha))

#### :nail_care: Polish

- `babel-compat-data`
  - [#12244](https://github.com/babel/babel/pull/12244) chore: bump compat-table and electron-to-chromium ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`, `babel-preset-env`
  - [#12258](https://github.com/babel/babel/pull/12258) Polish parser errors ([@JLHwung](https://github.com/JLHwung))

#### :memo: Documentation

- [#12222](https://github.com/babel/babel/pull/12222) docs: add note about TypeScript in ESLint packages ([@kaicataldo](https://github.com/kaicataldo))

#### :house: Internal

- Other
  - [#12187](https://github.com/babel/babel/pull/12187) chore: avoid duplicate coverage data upload ([@JLHwung](https://github.com/JLHwung))
  - [#12190](https://github.com/babel/babel/pull/12190) chore: bump Jest to v26 ([@JLHwung](https://github.com/JLHwung))
  - [#12265](https://github.com/babel/babel/pull/12265) chore: test on node 15 ([@JLHwung](https://github.com/JLHwung))
- `babel-generator`, `babel-helper-module-imports`, `babel-helper-replace-supers`, `babel-parser`, `babel-traverse`
  - [#12257](https://github.com/babel/babel/pull/12257) add declare to class properties type annotations ([@JLHwung](https://github.com/JLHwung))
- `babel-traverse`, `babel-types`
  - [#12251](https://github.com/babel/babel/pull/12251) Mark `ThisExpression` and `Super` as `Purish` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-compilation-targets`, `babel-preset-env`
  - [#12241](https://github.com/babel/babel/pull/12241) Update to Browserslist 4.14.5 ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.12.4 (2020-10-19)

#### :bug: Bug Fix

- `babel-helper-builder-react-jsx-experimental`, `babel-plugin-transform-react-jsx-development`, `babel-plugin-transform-react-jsx`, `babel-preset-react`
  - [#12213](https://github.com/babel/babel/pull/12213) Revert "add `.js` extension to react runtime for JSX transform" ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :house: Internal

- Other
  - [#12202](https://github.com/babel/babel/pull/12202) Run jest's tests in the e2e tests ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.12.3 (2020-10-16)

#### :bug: Bug Fix

- `babel-helper-wrap-function`, `babel-plugin-proposal-async-generator-functions`
  - [#12192](https://github.com/babel/babel/pull/12192) fix: properly wrap private class methods ([@JLHwung](https://github.com/JLHwung))
- `babel-core`
  - [#12200](https://github.com/babel/babel/pull/12200) Make `loadPartialConfig`'s options optional ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`
  - [#12185](https://github.com/babel/babel/pull/12185) [ts] Disallow invalid type annotations in ExpressionStatements ([@existentialism](https://github.com/existentialism))

#### :house: Internal

- Other
  - [#12204](https://github.com/babel/babel/pull/12204) chore: update test262 tests ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#12203](https://github.com/babel/babel/pull/12203) test: add test case for babel-parser: fixtures/typescript/arrow-function/destructuring-with-annotation-newline ([@Mongkii](https://github.com/Mongkii))

## v7.12.2 (2020-10-16)

#### :leftwards_arrow_with_hook: Revert

- `babel-parser`
  - [#12198](https://github.com/babel/babel/pull/12198) Revert "Reland "Fix: check if param is assignable when parsing arrow return type annotation"" ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.12.1 (2020-10-16)

#### :bug: Bug Fix

- `babel-cli`
  - [#12182](https://github.com/babel/babel/pull/12182) Don't force chokidar@2 to be downloaded from registry.npmjs.org ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-transform-runtime`, `babel-runtime-corejs2`, `babel-runtime-corejs3`, `babel-runtime`
  - [#12184](https://github.com/babel/babel/pull/12184) Allow importing `@babel/runtime/package` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`
  - [#12183](https://github.com/babel/babel/pull/12183) Reland "Fix: check if param is assignable when parsing arrow return type annotation" ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :house: Internal

- Other
  - [#12188](https://github.com/babel/babel/pull/12188) Guard against yarn-issue-1882 ([@JLHwung](https://github.com/JLHwung))
- `babel-cli`, `babel-core`, `babel-generator`, `babel-helper-bindify-decorators`, `babel-helper-call-delegate`, `babel-helper-compilation-targets`, `babel-helper-create-class-features-plugin`, `babel-helper-create-regexp-features-plugin`, `babel-helper-explode-assignable-expression`, `babel-helper-explode-class`, `babel-helper-module-imports`, `babel-helper-remap-async-to-generator`, `babel-helper-skip-transparent-expression-wrappers`, `babel-helpers`, `babel-node`, `babel-parser`, `babel-plugin-external-helpers`, `babel-plugin-proposal-async-generator-functions`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-class-static-block`, `babel-plugin-proposal-decorators`, `babel-plugin-proposal-do-expressions`, `babel-plugin-proposal-dynamic-import`, `babel-plugin-proposal-export-default-from`, `babel-plugin-proposal-export-namespace-from`, `babel-plugin-proposal-function-bind`, `babel-plugin-proposal-function-sent`, `babel-plugin-proposal-json-strings`, `babel-plugin-proposal-logical-assignment-operators`, `babel-plugin-proposal-nullish-coalescing-operator`, `babel-plugin-proposal-numeric-separator`, `babel-plugin-proposal-object-rest-spread`, `babel-plugin-proposal-optional-catch-binding`, `babel-plugin-proposal-optional-chaining`, `babel-plugin-proposal-partial-application`, `babel-plugin-proposal-pipeline-operator`, `babel-plugin-proposal-private-methods`, `babel-plugin-proposal-private-property-in-object`, `babel-plugin-proposal-throw-expressions`, `babel-plugin-proposal-unicode-property-regex`, `babel-plugin-syntax-class-properties`, `babel-plugin-syntax-decorators`, `babel-plugin-syntax-do-expressions`, `babel-plugin-syntax-export-default-from`, `babel-plugin-syntax-flow`, `babel-plugin-syntax-function-bind`, `babel-plugin-syntax-function-sent`, `babel-plugin-syntax-import-assertions`, `babel-plugin-syntax-jsx`, `babel-plugin-syntax-module-string-names`, `babel-plugin-syntax-partial-application`, `babel-plugin-syntax-pipeline-operator`, `babel-plugin-syntax-record-and-tuple`, `babel-plugin-syntax-throw-expressions`, `babel-plugin-syntax-top-level-await`, `babel-plugin-syntax-typescript`, `babel-plugin-transform-arrow-functions`, `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-block-scoped-functions`, `babel-plugin-transform-block-scoping`, `babel-plugin-transform-classes`, `babel-plugin-transform-computed-properties`, `babel-plugin-transform-destructuring`, `babel-plugin-transform-dotall-regex`, `babel-plugin-transform-duplicate-keys`, `babel-plugin-transform-exponentiation-operator`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-flow-strip-types`, `babel-plugin-transform-for-of`, `babel-plugin-transform-function-name`, `babel-plugin-transform-instanceof`, `babel-plugin-transform-jscript`, `babel-plugin-transform-literals`, `babel-plugin-transform-member-expression-literals`, `babel-plugin-transform-modules-amd`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-modules-systemjs`, `babel-plugin-transform-modules-umd`, `babel-plugin-transform-named-capturing-groups-regex`, `babel-plugin-transform-new-target`, `babel-plugin-transform-object-assign`, `babel-plugin-transform-object-set-prototype-of-to-assign`, `babel-plugin-transform-object-super`, `babel-plugin-transform-parameters`, `babel-plugin-transform-property-literals`, `babel-plugin-transform-property-mutators`, `babel-plugin-transform-proto-to-assign`, `babel-plugin-transform-react-constant-elements`, `babel-plugin-transform-react-display-name`, `babel-plugin-transform-react-inline-elements`, `babel-plugin-transform-react-jsx-compat`, `babel-plugin-transform-react-jsx-development`, `babel-plugin-transform-react-jsx-self`, `babel-plugin-transform-react-jsx-source`, `babel-plugin-transform-react-jsx`, `babel-plugin-transform-react-pure-annotations`, `babel-plugin-transform-regenerator`, `babel-plugin-transform-reserved-words`, `babel-plugin-transform-runtime`, `babel-plugin-transform-shorthand-properties`, `babel-plugin-transform-spread`, `babel-plugin-transform-sticky-regex`, `babel-plugin-transform-strict-mode`, `babel-plugin-transform-template-literals`, `babel-plugin-transform-typeof-symbol`, `babel-plugin-transform-typescript`, `babel-plugin-transform-unicode-escapes`, `babel-plugin-transform-unicode-regex`, `babel-preset-env`, `babel-preset-flow`, `babel-preset-react`, `babel-preset-typescript`, `babel-register`, `babel-standalone`, `babel-traverse`, `babel-types`
  - [#12186](https://github.com/babel/babel/pull/12186) chore: use workspace:\* for dev deps ([@JLHwung](https://github.com/JLHwung))
- `babel-compat-data`, `babel-helper-compilation-targets`, `babel-helper-create-class-features-plugin`, `babel-helper-remap-async-to-generator`, `babel-helper-simple-access`, `babel-helper-transform-fixture-test-runner`, `babel-plugin-transform-named-capturing-groups-regex`, `babel-plugin-transform-object-assign`, `babel-plugin-transform-parameters`, `babel-plugin-transform-react-jsx-self`, `babel-plugin-transform-react-jsx-source`, `babel-plugin-transform-template-literals`, `babel-preset-env`, `babel-preset-react`, `babel-runtime-corejs2`, `babel-runtime`, `babel-standalone`
  - [#12175](https://github.com/babel/babel/pull/12175) Remove unused `dependencies` and `devDependencies` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.12.0 (2020-10-14)

#### :eyeglasses: Spec Compliance

- `babel-core`, `babel-helper-module-transforms`, `babel-parser`, `babel-plugin-proposal-export-namespace-from`, `babel-plugin-syntax-module-string-names`, `babel-plugin-transform-modules-amd`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-modules-systemjs`, `babel-plugin-transform-modules-umd`, `babel-types`
  - [#12091](https://github.com/babel/babel/pull/12091) String import/export specifier ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#12111](https://github.com/babel/babel/pull/12111) [ts] Throw a syntax error for index signature with `declare` ([@sosukesuzuki](https://github.com/sosukesuzuki))

#### :rocket: New Feature

- `babel-core`, `babel-generator`, `babel-parser`, `babel-plugin-syntax-import-assertions`, `babel-plugin-syntax-module-attributes`, `babel-standalone`, `babel-types`
  - [#12139](https://github.com/babel/babel/pull/12139) Parse import-assertions ([@xtuc](https://github.com/xtuc))
- `babel-core`, `babel-helper-create-class-features-plugin`, `babel-helper-module-transforms`, `babel-helper-replace-supers`, `babel-plugin-proposal-class-static-block`, `babel-plugin-transform-modules-commonjs`, `babel-standalone`, `babel-traverse`, `babel-types`
  - [#12143](https://github.com/babel/babel/pull/12143) Transform class static block ([@JLHwung](https://github.com/JLHwung))
- `babel-generator`, `babel-parser`, `babel-plugin-syntax-class-static-block`, `babel-types`
  - [#12079](https://github.com/babel/babel/pull/12079) Parse class static block ([@JLHwung](https://github.com/JLHwung))
- `babel-generator`, `babel-parser`, `babel-types`
  - [#12129](https://github.com/babel/babel/pull/12129) Support TypeScript mapped type 'as' clauses ([@existentialism](https://github.com/existentialism))
  - [#12147](https://github.com/babel/babel/pull/12147) [ts] Add support for the "intrinsic" keyword ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`, `babel-types`
  - [#12131](https://github.com/babel/babel/pull/12131) [ts] Add support for template interpolations in types ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-transform-modules-systemjs`
  - [#12163](https://github.com/babel/babel/pull/12163) SystemJS top-level await support ([@guybedford](https://github.com/guybedford))
- `babel-plugin-transform-typescript`, `babel-preset-typescript`
  - [#11950](https://github.com/babel/babel/pull/11950) Add `jsxPragmaFrag` support to typescript transform ([@JLHwung](https://github.com/JLHwung))
- `babel-core`, `babel-helper-module-transforms`, `babel-parser`, `babel-plugin-proposal-export-namespace-from`, `babel-plugin-syntax-module-string-names`, `babel-plugin-transform-modules-amd`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-modules-systemjs`, `babel-plugin-transform-modules-umd`, `babel-types`
  - [#12091](https://github.com/babel/babel/pull/12091) String import/export specifier ([@JLHwung](https://github.com/JLHwung))
- `babel-core`
  - [#11907](https://github.com/babel/babel/pull/11907) Return a list of files that were read from loadPartialConfig ([@devongovett](https://github.com/devongovett))

#### :bug: Bug Fix

- `babel-parser`
  - [#12167](https://github.com/babel/babel/pull/12167) [ts] Add `asserts: false` to `TSTypePredicate` node ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#12161](https://github.com/babel/babel/pull/12161) Move check for TSTypeCastExpression to catch another case ([@existentialism](https://github.com/existentialism))
  - [#12120](https://github.com/babel/babel/pull/12120) Throw a recoverable error for missing initializer in const declaration ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#12108](https://github.com/babel/babel/pull/12108) Improve syntax error for class fields in ambient context ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#12088](https://github.com/babel/babel/pull/12088) Throw a syntax error for empty type parameter/argument ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#12093](https://github.com/babel/babel/pull/12093) Throw an error for a declare class field that have an initializer ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#12085](https://github.com/babel/babel/pull/12085) Do not throw an error for optional binding pattern params in function declaration ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#12076](https://github.com/babel/babel/pull/12076) Fix invalid `setter` parse ([@fisker](https://github.com/fisker))
  - [#12054](https://github.com/babel/babel/pull/12054) Throw a syntax error for a declare function with a body ([@sosukesuzuki](https://github.com/sosukesuzuki))
  - [#12065](https://github.com/babel/babel/pull/12065) Throw a syntax error for a constructor with type parameters ([@sosukesuzuki](https://github.com/sosukesuzuki))
- `babel-plugin-transform-typescript`
  - [#12149](https://github.com/babel/babel/pull/12149) fix transform-typescript logic to remove definite fields ([@akphi](https://github.com/akphi))
  - [#12122](https://github.com/babel/babel/pull/12122) [transform-typescript] Fix import elision for type exports ([@Amareis](https://github.com/Amareis))
- `babel-helper-member-expression-to-functions`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-nullish-coalescing-operator`, `babel-plugin-proposal-optional-chaining`
  - [#12032](https://github.com/babel/babel/pull/12032) Handle cases when `??` and `?.` is in binding initializers ([@JLHwung](https://github.com/JLHwung))
- `babel-helper-builder-react-jsx-experimental`, `babel-plugin-transform-react-jsx-development`, `babel-plugin-transform-react-jsx`, `babel-preset-react`
  - [#12116](https://github.com/babel/babel/pull/12116) add `.js` extension to react runtime for JSX transform ([@lunaruan](https://github.com/lunaruan))
- `babel-traverse`, `babel-types`
  - [#12119](https://github.com/babel/babel/pull/12119) fix: mark Pattern in CatchClause as scope ([@JLHwung](https://github.com/JLHwung))
- `babel-generator`
  - [#12114](https://github.com/babel/babel/pull/12114) Fix printing TSTypeOperator ([@existentialism](https://github.com/existentialism))
  - [#12082](https://github.com/babel/babel/pull/12082) Ensure expressions wrapped in parens ([@overlookmotel](https://github.com/overlookmotel))
  - [#12081](https://github.com/babel/babel/pull/12081) Fix `@babel/generator` does not print decorators of private properties ([@zweimach](https://github.com/zweimach))
  - [#12086](https://github.com/babel/babel/pull/12086) Add sourcemap markings for each line of a string ([@jridgewell](https://github.com/jridgewell))
- `babel-plugin-transform-modules-systemjs`
  - [#12110](https://github.com/babel/babel/pull/12110) Fix reexporting init-less variable in systemjs ([@JLHwung](https://github.com/JLHwung))
- `babel-helper-module-transforms`, `babel-plugin-transform-modules-amd`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-modules-umd`, `babel-plugin-transform-runtime`
  - [#11739](https://github.com/babel/babel/pull/11739) [cjs] Skip duplicate reexported bindings in namespace reexports ([@mischnic](https://github.com/mischnic))
- `babel-helper-create-regexp-features-plugin`, `babel-plugin-transform-unicode-regex`
  - [#12077](https://github.com/babel/babel/pull/12077) Bump regexpu-core ([@existentialism](https://github.com/existentialism))
- `babel-plugin-proposal-do-expressions`, `babel-traverse`
  - [#11728](https://github.com/babel/babel/pull/11728) fix(do-expr): SwitchStatement with IfStatement cases ([@barronwei](https://github.com/barronwei))

#### :nail_care: Polish

- `babel-parser`
  - [#12072](https://github.com/babel/babel/pull/12072) [parser] Better error message for missing number exponent ([@iamfotx](https://github.com/iamfotx))
  - [#12061](https://github.com/babel/babel/pull/12061) Throw a syntax error for a parameter properties in not constructor ([@sosukesuzuki](https://github.com/sosukesuzuki))
- `babel-helper-compilation-targets`, `babel-helper-validator-option`, `babel-preset-env`
  - [#12006](https://github.com/babel/babel/pull/12006) refactor: add @babel/helper-validator-option ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal

- `babel-cli`, `babel-helper-transform-fixture-test-runner`, `babel-traverse`
  - [#11797](https://github.com/babel/babel/pull/11797) Replace lodash 'defaults' usage with ES6 Spread initializer ([@jayaddison](https://github.com/jayaddison))
- `babel-plugin-transform-runtime`, `babel-runtime-corejs2`, `babel-runtime-corejs3`, `babel-runtime`
  - [#10853](https://github.com/babel/babel/pull/10853) Specify runtime exports ([@JLHwung](https://github.com/JLHwung))
- `babel-core`
  - [#11689](https://github.com/babel/babel/pull/11689) Instantiate presets before plugins ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-proposal-logical-assignment-operators`, `babel-plugin-proposal-numeric-separator`, `babel-plugin-syntax-import-meta`, `babel-plugin-syntax-logical-assignment-operators`, `babel-plugin-syntax-numeric-separator`, `babel-plugin-transform-modules-systemjs`, `babel-preset-env`, `babel-standalone`
  - [#12117](https://github.com/babel/babel/pull/12117) Archive plugins ([@JLHwung](https://github.com/JLHwung))
- Other
  - [#12154](https://github.com/babel/babel/pull/12154) chore: bump gulp-cli to 2.3.0 ([@JLHwung](https://github.com/JLHwung))
  - [#12134](https://github.com/babel/babel/pull/12134) Yarn 2.3 ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#12099](https://github.com/babel/babel/pull/12099) fix: apply terser plugin only on \*.min.js ([@JLHwung](https://github.com/JLHwung))
  - [#12098](https://github.com/babel/babel/pull/12098) docs: update build required node version ([@JLHwung](https://github.com/JLHwung))
  - [#12078](https://github.com/babel/babel/pull/12078) Bump Babel deps ([@existentialism](https://github.com/existentialism))
  - [#12070](https://github.com/babel/babel/pull/12070) chore: pin browserslist version to 4.12.0 ([@JLHwung](https://github.com/JLHwung))
  - [#12063](https://github.com/babel/babel/pull/12063) chore: add git-blame-ignore-revs ([@JLHwung](https://github.com/JLHwung))
  - [#12049](https://github.com/babel/babel/pull/12049) chore: use latest node on ci workflow when possible ([@JLHwung](https://github.com/JLHwung))
- `babel-compat-data`, `babel-preset-env`
  - [#12118](https://github.com/babel/babel/pull/12118) chore: bump electron-to-chromium ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#12103](https://github.com/babel/babel/pull/12103) Add missing tests for TypeScript syntax errors ([@sosukesuzuki](https://github.com/sosukesuzuki))
- `babel-core`, `babel-plugin-transform-runtime`
  - [#12102](https://github.com/babel/babel/pull/12102) docs: Fix simple typo, preprelease -> pre-release ([@timgates42](https://github.com/timgates42))
- `babel-compat-data`
  - [#12044](https://github.com/babel/babel/pull/12044) chore: remove unused dependencies ([@JLHwung](https://github.com/JLHwung))

## v7.11.6 (2020-09-03)

#### :house: Internal

- [#12028](https://github.com/babel/babel/pull/12028) Run prepublish build after versioning ([@JLHwung](https://github.com/JLHwung))

#### :leftwards_arrow_with_hook: Revert

- `babel-cli`, `babel-core`, `babel-generator`, `babel-helper-transform-fixture-test-runner`
  - [#12027](https://github.com/babel/babel/pull/12027) Revert #12014 ([@JLHwung](https://github.com/JLHwung))

## v7.11.5 (2020-08-31)

#### :bug: Bug Fix

- `babel-helper-builder-react-jsx-experimental`, `babel-plugin-transform-react-jsx-development`
  - [#12017](https://github.com/babel/babel/pull/12017) Fix `jsxDEV` for generated elements ([@Timer](https://github.com/Timer))
- `babel-parser`
  - [#11931](https://github.com/babel/babel/pull/11931) fix: ExpressionBody should respect [In] parameter ([@JLHwung](https://github.com/JLHwung))
  - [#11987](https://github.com/babel/babel/pull/11987) Set generator to true during error recovery of accessor ([@existentialism](https://github.com/existentialism))
- Other
  - [#11993](https://github.com/babel/babel/pull/11993) Added linting support for private class methods ([@giovannicalo](https://github.com/giovannicalo))
- `babel-plugin-proposal-function-bind`
  - [#12000](https://github.com/babel/babel/pull/12000) fix(plugin-proposal-function-bind): fix invalid code emitted for `::super.foo` ([@uhyo](https://github.com/uhyo))

#### :nail_care: Polish

- `babel-traverse`
  - [#11832](https://github.com/babel/babel/pull/11832) Forward deopt node path ([@johanholmerin](https://github.com/johanholmerin))

#### :house: Internal

- Other
  - [#12013](https://github.com/babel/babel/pull/12013) Remove unused enhanced-resolve and normalize lock resolutions ([@JLHwung](https://github.com/JLHwung))
  - [#12010](https://github.com/babel/babel/pull/12010) chore: use Rollup 2 ([@JLHwung](https://github.com/JLHwung))
  - [#12002](https://github.com/babel/babel/pull/12002) Restructure CI workflow ([@JLHwung](https://github.com/JLHwung))
  - [#11781](https://github.com/babel/babel/pull/11781) chore: improve Yarn 2 cache on CI ([@JLHwung](https://github.com/JLHwung))
- _Every package_
  - [#11962](https://github.com/babel/babel/pull/11962) Use Yarn 2 ([@JLHwung](https://github.com/JLHwung))

## v7.11.4 (2020-08-20)

#### :bug: Bug Fix

- `babel-helper-replace-supers`
  - [#11985](https://github.com/babel/babel/pull/11985) fix: declare @babel/traverse as a dependency ([@JLHwung](https://github.com/JLHwung))
- `babel-core`
  - [#11974](https://github.com/babel/babel/pull/11974) Ensure `import()` is not transpiled in `babel-core` published source ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#11979](https://github.com/babel/babel/pull/11979) Throw error on invalid flow async generic arrow syntax ([@existentialism](https://github.com/existentialism))
  - [#11955](https://github.com/babel/babel/pull/11955) Fix parsing type casted generic flow arrow exprs ([@existentialism](https://github.com/existentialism))
  - [#11973](https://github.com/babel/babel/pull/11973) fix: do not transform ClassPrivateMethods in estree ([@JLHwung](https://github.com/JLHwung))
  - [#11941](https://github.com/babel/babel/pull/11941) fix: push new token context when braceHashL is seen ([@JLHwung](https://github.com/JLHwung))
  - [#11943](https://github.com/babel/babel/pull/11943) fix: reset EndLocation for catch param ([@JLHwung](https://github.com/JLHwung))
- Other
  - [#11978](https://github.com/babel/babel/pull/11978) fix: do not mutate newTypes ([@JLHwung](https://github.com/JLHwung))
  - [#11970](https://github.com/babel/babel/pull/11970) fix: ensure defaults are set in @babel/eslint-parser ([@kaicataldo](https://github.com/kaicataldo))
- `babel-generator`
  - [#11947](https://github.com/babel/babel/pull/11947) fix: disallow line break between async and property ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal

- Other
  - [#11952](https://github.com/babel/babel/pull/11952) Move legacy node version tests to GitHub actions ([@JLHwung](https://github.com/JLHwung))
  - [#11936](https://github.com/babel/babel/pull/11936) chore: do not push version commit on lerna version ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#11923](https://github.com/babel/babel/pull/11923) Add more parser test cases ([@JLHwung](https://github.com/JLHwung))
  - [#11944](https://github.com/babel/babel/pull/11944) Simplify tokenizer update context ([@JLHwung](https://github.com/JLHwung))
  - [#11945](https://github.com/babel/babel/pull/11945) chore: enable flowcheck on CI ([@JLHwung](https://github.com/JLHwung))
  - [#11930](https://github.com/babel/babel/pull/11930) Refactor [In] production parameter tracking ([@JLHwung](https://github.com/JLHwung))
- `babel-helpers`
  - [#11953](https://github.com/babel/babel/pull/11953) chore: remove obsolete comment ([@jamescdavis](https://github.com/jamescdavis))
- `babel-helper-transform-fixture-test-runner`
  - [#11951](https://github.com/babel/babel/pull/11951) chore: build babel-polyfill-dist on make watch ([@JLHwung](https://github.com/JLHwung))
- `babel-core`, `babel-helper-transform-fixture-test-runner`, `babel-plugin-proposal-object-rest-spread`, `babel-plugin-transform-block-scoping`, `babel-plugin-transform-classes`, `babel-plugin-transform-destructuring`, `babel-plugin-transform-react-jsx-source`, `babel-plugin-transform-spread`
  - [#11531](https://github.com/babel/babel/pull/11531) Isolated exec tests ([@jridgewell](https://github.com/jridgewell))
- `babel-helper-bindify-decorators`, `babel-helper-call-delegate`, `babel-helper-explode-assignable-expression`, `babel-helper-explode-class`, `babel-helper-remap-async-to-generator`, `babel-helper-replace-supers`
  - [#11937](https://github.com/babel/babel/pull/11937) Move some @babel/traverse from deps to devDeps ([@Monchi](https://github.com/Monchi))

## v7.11.3 (2020-08-08)

#### :bug: Bug Fix

- [#11932](https://github.com/babel/babel/pull/11932) fix: add ImportExpression visitorKeys ([@JLHwung](https://github.com/JLHwung))

#### :nail_care: Polish

- `babel-parser`
  - [#11921](https://github.com/babel/babel/pull/11921) refactor: add recoverable error on accessorIsGenerator ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal

- `babel-parser`
  - [#11919](https://github.com/babel/babel/pull/11919) refactor: simplify smart pipeline parsing ([@JLHwung](https://github.com/JLHwung))
  - [#11922](https://github.com/babel/babel/pull/11922) simplify isLookaheadRelational method ([@JLHwung](https://github.com/JLHwung))
  - [#11917](https://github.com/babel/babel/pull/11917) Support ConditionalExpressions in dry-error-messages rule ([@existentialism](https://github.com/existentialism))
  - [#11918](https://github.com/babel/babel/pull/11918) refactor: avoid unnecessary property access ([@JLHwung](https://github.com/JLHwung))

## v7.11.2 (2020-08-05)

#### :bug: Bug Fix

- `babel-parser`
  - [#11916](https://github.com/babel/babel/pull/11916) fix: do not eat get/set after async is parsed ([@JLHwung](https://github.com/JLHwung))

## v7.11.1 (2020-08-04)

#### :bug: Bug Fix

- `babel-parser`
  - [#11912](https://github.com/babel/babel/pull/11912) rescan gt/lt token after TsAsExpression is parsed ([@JLHwung](https://github.com/JLHwung))
- `babel-core`
  - [#11906](https://github.com/babel/babel/pull/11906) Do not cache non-existent config files forever ([@devongovett](https://github.com/devongovett))
- `babel-plugin-transform-block-scoping`, `babel-standalone`
  - [#11901](https://github.com/babel/babel/pull/11901) fix: ensure `[…map.keys]` can be correctly transformed in loose mode ([@JLHwung](https://github.com/JLHwung))

#### :memo: Documentation

- [#11900](https://github.com/babel/babel/pull/11900) docs: remove experimental warning on README ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal

- `babel-parser`
  - [#11871](https://github.com/babel/babel/pull/11871) Parser refactoring ([@JLHwung](https://github.com/JLHwung))
- Other
  - [#11899](https://github.com/babel/babel/pull/11899) Update `@babel/*` deps ([@JLHwung](https://github.com/JLHwung))

## v7.11.0 (2020-07-30)

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#11852](https://github.com/babel/babel/pull/11852) fix: disallow \8, \9 in strict mode string ([@JLHwung](https://github.com/JLHwung))
  - [#11854](https://github.com/babel/babel/pull/11854) fix: allow 09.1_1 and 09e1_1 in sloppy mode ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-proposal-optional-chaining`
  - [#11850](https://github.com/babel/babel/pull/11850) fix: eval?.() is indirect ([@JLHwung](https://github.com/JLHwung))

#### :rocket: New Feature

- `babel-cli`, `babel-core`
  - [#11588](https://github.com/babel/babel/pull/11588) add showConfig support ([@JLHwung](https://github.com/JLHwung))
- `babel-compat-data`, `babel-preset-env`
  - [#11876](https://github.com/babel/babel/pull/11876) enable logical assignment in babel preset env ([@morrme](https://github.com/morrme))
  - [#11865](https://github.com/babel/babel/pull/11865) Add `numeric-separator` to `preset-env` ([@JLHwung](https://github.com/JLHwung))
  - [#11849](https://github.com/babel/babel/pull/11849) Add `export-namespace-from` to `preset-env` ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#11863](https://github.com/babel/babel/pull/11863) feat: enable numericSeparator parsing support ([@JLHwung](https://github.com/JLHwung))
  - [#11755](https://github.com/babel/babel/pull/11755) Allow unknown/any in TS catch clause param ([@existentialism](https://github.com/existentialism))
  - [#11753](https://github.com/babel/babel/pull/11753) TypeScript 4.0: Allow spread in the middle of tuples ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#11815](https://github.com/babel/babel/pull/11815) eslint-parser: ES2020 features ([@JLHwung](https://github.com/JLHwung))
- `babel-generator`, `babel-parser`, `babel-types`
  - [#11754](https://github.com/babel/babel/pull/11754) TypeScript 4.0: Support labeled tuple elements ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`, `babel-generator`, `babel-parser`, `babel-plugin-syntax-decimal`, `babel-standalone`, `babel-types`
  - [#11640](https://github.com/babel/babel/pull/11640) Add decimal parsing support ([@JLHwung](https://github.com/JLHwung))
- `babel-core`
  - [#10241](https://github.com/babel/babel/pull/10241) Add `cloneInputAst` option to `babel.transformFromAst` ([@coderaiser](https://github.com/coderaiser))

#### :bug: Bug Fix

- Other
  - [#11896](https://github.com/babel/babel/pull/11896) update: hardcode @babel/eslint-parser min supported version check ([@kaicataldo](https://github.com/kaicataldo))
- `babel-helper-skip-transparent-expression-wrappers`, `babel-plugin-proposal-optional-chaining`, `babel-plugin-transform-spread`
  - [#11404](https://github.com/babel/babel/pull/11404) Skip TSAsExpression when transforming spread in CallExpression ([@oliverdunk](https://github.com/oliverdunk))
- `babel-helper-member-expression-to-functions`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-logical-assignment-operators`
  - [#11702](https://github.com/babel/babel/pull/11702) add support for logical assignments with private properties ([@ryzokuken](https://github.com/ryzokuken))
- `babel-plugin-transform-typescript`
  - [#11747](https://github.com/babel/babel/pull/11747) Typescript: always strip declare from class fields ([@jamescdavis](https://github.com/jamescdavis))
- `babel-plugin-transform-runtime`
  - [#11893](https://github.com/babel/babel/pull/11893) Fix incorrect module path when absoluteRuntime is specified ([@sz-coder](https://github.com/sz-coder))
- `babel-parser`
  - [#11862](https://github.com/babel/babel/pull/11862) Correctly check reserved word for PropertyDefinition: IdentifierReference ([@JLHwung](https://github.com/JLHwung))
  - [#11847](https://github.com/babel/babel/pull/11847) fix: correctly set innerEndPos in CoverParenthesizedExpressionAndArrowParameterList ([@JLHwung](https://github.com/JLHwung))
- `babel-generator`, `babel-parser`, `babel-plugin-transform-typescript`
  - [#11767](https://github.com/babel/babel/pull/11767) Follow-up on initial TS4 catch param support ([@JLHwung](https://github.com/JLHwung))
- `babel-generator`
  - [#11836](https://github.com/babel/babel/pull/11836) Always retain lines for async arrow ([@cwohlman](https://github.com/cwohlman))

#### :nail_care: Polish

- `babel-traverse`
  - [#11791](https://github.com/babel/babel/pull/11791) babel-traverse: prefer clearer, reduced-bias option naming ([@jayaddison](https://github.com/jayaddison))

#### :house: Internal

- Other
  - [#11688](https://github.com/babel/babel/pull/11688) fix build config to work the same when running on windows ([@zxbodya](https://github.com/zxbodya))
  - [#11894](https://github.com/babel/babel/pull/11894) Prepare to publish `@babel/eslint-*` packages ([@JLHwung](https://github.com/JLHwung))
  - [#11879](https://github.com/babel/babel/pull/11879) chore: use modules: "auto" ([@JLHwung](https://github.com/JLHwung))
  - [#11875](https://github.com/babel/babel/pull/11875) chore(github): fix issue template typo ([@SirWindfield](https://github.com/SirWindfield))
  - [#11706](https://github.com/babel/babel/pull/11706) chore: update `spec-new` in CONTRIBUTING.md [skip ci] ([@JLHwung](https://github.com/JLHwung))
- `babel-standalone`
  - [#11777](https://github.com/babel/babel/pull/11777) chore: build standalone once in prepublish step ([@JLHwung](https://github.com/JLHwung))
- `babel-compat-data`, `babel-helper-compilation-targets`, `babel-preset-env`
  - [#11838](https://github.com/babel/babel/pull/11838) refactor: replace caniuse-db by mdn-browser-compat-data ([@JLHwung](https://github.com/JLHwung))
- `babel-compat-data`, `babel-core`, `babel-helper-module-transforms`, `babel-helper-split-export-declaration`, `babel-parser`, `babel-plugin-proposal-object-rest-spread`, `babel-plugin-transform-classes`, `babel-preset-env`, `babel-traverse`, `babel-types`
  - [#11846](https://github.com/babel/babel/pull/11846) chore: fix typo in codebase ([@JLHwung](https://github.com/JLHwung))
- `babel-types`
  - [#11843](https://github.com/babel/babel/pull/11843) refactor: reorganize babel types definitions structure ([@JLHwung](https://github.com/JLHwung))
- `babel-compat-data`
  - [#11837](https://github.com/babel/babel/pull/11837) chore: use repository HEAD when pulling third party repos ([@JLHwung](https://github.com/JLHwung))

## v7.10.5 (2020-07-14)

#### :bug: Bug Fix

- `babel-helper-builder-react-jsx-experimental`, `babel-helper-create-class-features-plugin`, `babel-helper-member-expression-to-functions`, `babel-helper-module-transforms`, `babel-helper-transform-fixture-test-runner`, `babel-plugin-proposal-async-generator-functions`, `babel-plugin-proposal-decorators`, `babel-plugin-proposal-function-bind`, `babel-plugin-proposal-partial-application`, `babel-plugin-proposal-pipeline-operator`, `babel-plugin-transform-block-scoping`, `babel-plugin-transform-modules-amd`, `babel-plugin-transform-modules-systemjs`, `babel-plugin-transform-parameters`, `babel-plugin-transform-react-jsx-source`, `babel-plugin-transform-runtime`, `babel-plugin-transform-template-literals`, `babel-plugin-transform-typescript`
  - [#11807](https://github.com/babel/babel/pull/11807) Disallow duplicated AST nodes ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#11814](https://github.com/babel/babel/pull/11814) fix: add optional: false to chained optional call expression ([@JLHwung](https://github.com/JLHwung))
  - [#11774](https://github.com/babel/babel/pull/11774) fix: throw expect jsx plugin error when an idStart or > is seen ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-transform-typescript`
  - [#11816](https://github.com/babel/babel/pull/11816) Typescript transform now removes generic arguments from optional calls (Closes [#11813](https://github.com/babel/babel/issues/11813)) ([@RafaelSalguero](https://github.com/RafaelSalguero))
- `babel-plugin-transform-block-scoping`
  - [#11802](https://github.com/babel/babel/pull/11802) Fix break/continue when switch is nested inside loop ([@existentialism](https://github.com/existentialism))
- `babel-generator`, `babel-plugin-transform-typescript`, `babel-types`
  - [#11582](https://github.com/babel/babel/pull/11582) Refactor generated builder names in @babel/types ([@zxbodya](https://github.com/zxbodya))
- `babel-compat-data`
  - [#11783](https://github.com/babel/babel/pull/11783) fix: update class properties support matrix ([@JLHwung](https://github.com/JLHwung))

#### :memo: Documentation

- Other
  - [#11799](https://github.com/babel/babel/pull/11799) docs: update README example and REPL link ([@JLHwung](https://github.com/JLHwung))
  - [#11761](https://github.com/babel/babel/pull/11761) Add note about running Make targets in Windows 10 ([@kaicataldo](https://github.com/kaicataldo))
- `babel-parser`
  - [#11729](https://github.com/babel/babel/pull/11729) docs: add AST spec on optional chain [skip ci] ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal

- `babel-cli`, `babel-compat-data`, `babel-core`, `babel-helper-define-map`, `babel-helper-fixtures`, `babel-helper-module-transforms`, `babel-helper-regex`, `babel-helper-transform-fixture-test-runner`, `babel-node`, `babel-plugin-transform-proto-to-assign`, `babel-register`, `babel-traverse`, `babel-types`
  - [#11818](https://github.com/babel/babel/pull/11818) Bump some deps for audit ([@existentialism](https://github.com/existentialism))
- `babel-helper-fixtures`, `babel-traverse`
  - [#11811](https://github.com/babel/babel/pull/11811) Replace lodash 'clone' usage with ES6 Spread initializer ([@jayaddison](https://github.com/jayaddison))
- `babel-helper-fixtures`, `babel-helper-transform-fixture-test-runner`
  - [#11812](https://github.com/babel/babel/pull/11812) Replace lodash 'extend' usage with Object.assign ([@jayaddison](https://github.com/jayaddison))
- `babel-plugin-transform-block-scoping`
  - [#11798](https://github.com/babel/babel/pull/11798) Reduce dependency on lodash functions: values, extends ([@jayaddison](https://github.com/jayaddison))
- `babel-generator`, `babel-plugin-transform-typescript`, `babel-types`
  - [#11582](https://github.com/babel/babel/pull/11582) Refactor generated builder names in @babel/types ([@zxbodya](https://github.com/zxbodya))
- `babel-cli`, `babel-generator`, `babel-helper-transform-fixture-test-runner`, `babel-traverse`, `babel-types`
  - [#11790](https://github.com/babel/babel/pull/11790) Reduce dependency on lodash functions: includes, uniq, repeat, isinteger ([@jayaddison](https://github.com/jayaddison))
- Other
  - [#11782](https://github.com/babel/babel/pull/11782) chore: refine yarn cache config ([@JLHwung](https://github.com/JLHwung))
- `babel-register`
  - [#11780](https://github.com/babel/babel/pull/11780) test: add console warn spy on babel-register tests ([@JLHwung](https://github.com/JLHwung))
  - [#11776](https://github.com/babel/babel/pull/11776) chore: remove babel-register generated test artifacts ([@JLHwung](https://github.com/JLHwung))

## v7.10.4 (2020-06-30)

#### :eyeglasses: Spec Compliance

- `babel-helper-member-expression-to-functions`, `babel-plugin-proposal-class-properties`
  - [#11669](https://github.com/babel/babel/pull/11669) Add `delete obj?.#x.a` support ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`, `babel-types`
  - [#11652](https://github.com/babel/babel/pull/11652) fix: implement early errors for record and tuple ([@JLHwung](https://github.com/JLHwung))

#### :bug: Bug Fix

- `babel-types`
  - [#11752](https://github.com/babel/babel/pull/11752) [regression] Don't validate file.comments in `@babel/types` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-proposal-do-expressions`, `babel-types`
  - [#11724](https://github.com/babel/babel/pull/11724) fix: do-statementlist behavior ([@wlawt](https://github.com/wlawt))

#### :nail_care: Polish

- `babel-parser`
  - [#11722](https://github.com/babel/babel/pull/11722) Add better parser error when using jsx ([@penguingovernor](https://github.com/penguingovernor))
- `babel-core`
  - [#11544](https://github.com/babel/babel/pull/11544) Refine babel core types ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal

- `babel-core`, `babel-helper-fixtures`, `babel-standalone`, `babel-traverse`
  - [#11758](https://github.com/babel/babel/pull/11758) Replace non-inclusive "whitelist" and "blacklist" terms with "allowlist" etc. ([@wojtekmaj](https://github.com/wojtekmaj))
- `babel-parser`
  - [#11376](https://github.com/babel/babel/pull/11376) Add @babel/eslint-plugin-development-internal ([@kaicataldo](https://github.com/kaicataldo))
- `babel-core`
  - [#11544](https://github.com/babel/babel/pull/11544) Refine babel core types ([@JLHwung](https://github.com/JLHwung))

## v7.10.3 (2020-06-19)

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#11676](https://github.com/babel/babel/pull/11676) Properly parse `export default from` when `exportDefaultFrom` is not enabled ([@JLHwung](https://github.com/JLHwung))
- `babel-helper-member-expression-to-functions`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-optional-chaining`
  - [#11662](https://github.com/babel/babel/pull/11662) refactor: do not rely on AST extra properties in plugins ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-proposal-logical-assignment-operators`
  - [#11658](https://github.com/babel/babel/pull/11658) Perform NamedEvaluation of Anonymous Functions in Logical Assignment ([@jridgewell](https://github.com/jridgewell))
- `babel-helper-create-class-features-plugin`, `babel-helper-member-expression-to-functions`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-optional-chaining`
  - [#11623](https://github.com/babel/babel/pull/11623) fix: ensure (a?.b)() has proper this ([@JLHwung](https://github.com/JLHwung))

#### :bug: Bug Fix

- `babel-parser`, `babel-plugin-transform-flow-comments`
  - [#11697](https://github.com/babel/babel/pull/11697) Fix innercomments ([@shaodahong](https://github.com/shaodahong))
- `babel-helper-member-expression-to-functions`, `babel-plugin-proposal-class-properties`
  - [#11703](https://github.com/babel/babel/pull/11703) fix:added check for forXstatement pattern ([@wlawt](https://github.com/wlawt))
- `babel-template`
  - [#11695](https://github.com/babel/babel/pull/11695) Allow templates to parse v8intrinsics ([@jridgewell](https://github.com/jridgewell))
- `babel-types`
  - [#11687](https://github.com/babel/babel/pull/11687) improve node type definitions to avoid any's in generated types ([@zxbodya](https://github.com/zxbodya))
- `babel-plugin-transform-react-pure-annotations`
  - [#11685](https://github.com/babel/babel/pull/11685) Add React.createContext to @babel/plugin-transform-react-pure-annotat… ([@jessethomson](https://github.com/jessethomson))
- `babel-parser`
  - [#11676](https://github.com/babel/babel/pull/11676) Properly parse `export default from` when `exportDefaultFrom` is not enabled ([@JLHwung](https://github.com/JLHwung))
- `babel-helper-create-class-features-plugin`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-private-methods`
  - [#11571](https://github.com/babel/babel/pull/11571) Add a check for privateMap's existence ([@AjayPoshak](https://github.com/AjayPoshak))

#### :nail_care: Polish

- `babel-plugin-transform-typescript`
  - [#11682](https://github.com/babel/babel/pull/11682) Fix small typo ([@sajadtorkamani](https://github.com/sajadtorkamani))

#### :house: Internal

- Other
  - [#11730](https://github.com/babel/babel/pull/11730) Revert "chore: pin windows node.js version (#11522)" ([@JLHwung](https://github.com/JLHwung))
  - [#11727](https://github.com/babel/babel/pull/11727) replace whitelist by allowlist in parser-tests ([@JLHwung](https://github.com/JLHwung))
  - [#11677](https://github.com/babel/babel/pull/11677) Bump @babel/\* deps ([@existentialism](https://github.com/existentialism))
  - [#11672](https://github.com/babel/babel/pull/11672) chore: output ascii only standalone minified bundle ([@JLHwung](https://github.com/JLHwung))
  - [#11647](https://github.com/babel/babel/pull/11647) chore: check version lazily in babel-eslint-parser ([@kaicataldo](https://github.com/kaicataldo))
- `babel-helper-plugin-utils`
  - [#11674](https://github.com/babel/babel/pull/11674) chore: add npmignore to babel-helper-plugin-utils ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-private-property-in-object`, `babel-preset-env`
  - [#11655](https://github.com/babel/babel/pull/11655) Fix some test fixtures ([@existentialism](https://github.com/existentialism))

## v7.10.2 (2020-05-30)

#### :rocket: New Feature

- [#11639](https://github.com/babel/babel/pull/11639) feature: babel-eslint-parser passes through config options ([@kaicataldo](https://github.com/kaicataldo))

#### :bug: Bug Fix

- `babel-helper-compilation-targets`
  - [#11648](https://github.com/babel/babel/pull/11648) fix: don't mutate InputTarget's passed to @babel/helper-compilation-targets ([@fivetanley](https://github.com/fivetanley))
- `babel-helper-create-class-features-plugin`, `babel-preset-env`
  - [#11634](https://github.com/babel/babel/pull/11634) Class features loose should have precedence over preset-env ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-generator`
  - [#11645](https://github.com/babel/babel/pull/11645) fix: add bigIntSuffix to minified output ([@JLHwung](https://github.com/JLHwung))
- `babel-generator`, `babel-types`
  - [#11641](https://github.com/babel/babel/pull/11641) Add support for printing ImportAttribute ([@existentialism](https://github.com/existentialism))
- `babel-plugin-syntax-module-attributes`, `babel-standalone`
  - [#11631](https://github.com/babel/babel/pull/11631) Fix moduleAttributesVersion errors with stage-0 preset in babel standalone ([@hamlim](https://github.com/hamlim))

#### :nail_care: Polish

- `babel-core`
  - [#11643](https://github.com/babel/babel/pull/11643) fix: add new plugin names to missing plugin helpers ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal

- `babel-parser`
  - [#11653](https://github.com/babel/babel/pull/11653) refactor: split locationParser into ParserErrors and error message ([@JLHwung](https://github.com/JLHwung))

## v7.10.1 (2020-05-27)

#### :bug: Bug Fix

- `babel-preset-env`
  - [#11633](https://github.com/babel/babel/pull/11633) [hotfix] Use same targets for fields as for private methods ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-standalone`
  - [#11624](https://github.com/babel/babel/pull/11624) Fix standalone tag when data-type is not set. ([@dfabulich](https://github.com/dfabulich))

#### :house: Internal

- _Every package_
  - [#11625](https://github.com/babel/babel/pull/11625) Use `repository.directory` field in `package.json` files ([@saulosantiago](https://github.com/saulosantiago))

## v7.10.0 (2020-05-26)

#### :eyeglasses: Spec Compliance

- `babel-plugin-proposal-logical-assignment-operators`
  - [#11370](https://github.com/babel/babel/pull/11370) logical-assignment: Do not assign names to anonymous functions ([@arku](https://github.com/arku))

#### :rocket: New Feature

- `babel-helper-create-class-features-plugin`, `babel-helper-member-expression-to-functions`, `babel-helper-optimise-call-expression`, `babel-helper-replace-supers`, `babel-parser`, `babel-plugin-proposal-class-properties`
  - [#11248](https://github.com/babel/babel/pull/11248) Handle private access chained on an optional chain ([@jridgewell](https://github.com/jridgewell))
- `babel-standalone`
  - [#11593](https://github.com/babel/babel/pull/11593) feat: add privatePropertyInObject to babel-standalone ([@JLHwung](https://github.com/JLHwung))
  - [#11466](https://github.com/babel/babel/pull/11466) Support data-type="module" to generate native <script type="module"> ([@dfabulich](https://github.com/dfabulich))
- `babel-cli`, `babel-helper-create-class-features-plugin`, `babel-parser`, `babel-plugin-proposal-private-property-in-object`, `babel-types`
  - [#11372](https://github.com/babel/babel/pull/11372) Add private-property-in-object support ([@jridgewell](https://github.com/jridgewell))
- `babel-compat-data`, `babel-plugin-transform-template-literals`, `babel-plugin-transform-unicode-escapes`, `babel-preset-env`, `babel-standalone`
  - [#11377](https://github.com/babel/babel/pull/11377) Transform ES2015 Unicode Escapes to ES5 ([@jridgewell](https://github.com/jridgewell))
- `babel-parser`, `babel-plugin-syntax-module-attributes`, `babel-standalone`
  - [#10962](https://github.com/babel/babel/pull/10962) added basic support for module attributes and tests updated ([@vivek12345](https://github.com/vivek12345))
- `babel-helper-compilation-targets`, `babel-preset-env`
  - [#11434](https://github.com/babel/babel/pull/11434) [`preset-env`] Add `browserslistEnv` option ([@AndrewLeedham](https://github.com/AndrewLeedham))
- `babel-cli`
  - [#11220](https://github.com/babel/babel/pull/11220) Log after subsequent compilations in --watch mode ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helpers`, `babel-plugin-transform-destructuring`, `babel-plugin-transform-spread`, `babel-traverse`
  - [#11265](https://github.com/babel/babel/pull/11265) Add "allowArrayLike" option to the destructuring and spread transforms ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helpers`, `babel-plugin-transform-for-of`, `babel-preset-env`
  - [#11266](https://github.com/babel/babel/pull/11266) Add "allowArrayLike" support to the for-of transform ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`
  - [#11406](https://github.com/babel/babel/pull/11406) Enable import.meta by default in @babel/parser (#11364) ([@kik-o](https://github.com/kik-o))
- `babel-plugin-transform-react-pure-annotations`, `babel-preset-react`
  - [#11428](https://github.com/babel/babel/pull/11428) Implement `plugin-transform-react-pure-annotations `and add to `preset-react` ([@devongovett](https://github.com/devongovett))
- `babel-compat-data`, `babel-preset-env`
  - [#11451](https://github.com/babel/babel/pull/11451) Add class proposals to shipped proposals ([@JLHwung](https://github.com/JLHwung))

#### :bug: Bug Fix

- `babel-traverse`
  - [#11595](https://github.com/babel/babel/pull/11595) scope.rename() missing identifier in VariableDeclarator ([@yulanggong](https://github.com/yulanggong))
- `babel-plugin-proposal-optional-chaining`
  - [#10961](https://github.com/babel/babel/pull/10961) fix: optional-chaining should work correctly with ts non-null operator ([@macabeus](https://github.com/macabeus))
- `babel-parser`, `babel-types`
  - [#11547](https://github.com/babel/babel/pull/11547) refactor: add isLiteralPropertyName to parser utils ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-transform-typescript`
  - [#11523](https://github.com/babel/babel/pull/11523) fix: don't elide jsx pragma import namespaces ([@jquense](https://github.com/jquense))
- `babel-plugin-proposal-object-rest-spread`
  - [#11550](https://github.com/babel/babel/pull/11550) fix(plugin-proposal-object-rest-spread): use computed memberExpression for literal keys ([@kitos](https://github.com/kitos))
- `babel-plugin-transform-runtime`
  - [#11530](https://github.com/babel/babel/pull/11530) fix: skip transforming `delete something.includes` ([@JLHwung](https://github.com/JLHwung))
- `babel-generator`
  - [#11502](https://github.com/babel/babel/pull/11502) getters and setters support in generator for declare class statement ([@zxbodya](https://github.com/zxbodya))

#### :nail_care: Polish

- `babel-helpers`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-decorators`, `babel-plugin-transform-classes`, `babel-plugin-transform-function-name`, `babel-plugin-transform-parameters`, `babel-plugin-transform-react-jsx`, `babel-plugin-transform-runtime`, `babel-plugin-transform-typescript`, `babel-preset-env`
  - [#11514](https://github.com/babel/babel/pull/11514) [helpers] Add a private function name within `createSuper` ([@cpojer](https://github.com/cpojer))

#### :house: Internal

- Other
  - [#11603](https://github.com/babel/babel/pull/11603) Fix typo ([@fisker](https://github.com/fisker))
  - [#11598](https://github.com/babel/babel/pull/11598) chore: use latest node in GitHub actions ([@JLHwung](https://github.com/JLHwung))
  - [#11590](https://github.com/babel/babel/pull/11590) chore: update test262 ([@JLHwung](https://github.com/JLHwung))
  - [#11522](https://github.com/babel/babel/pull/11522) chore: pin windows node.js version ([@JLHwung](https://github.com/JLHwung))
  - [#11504](https://github.com/babel/babel/pull/11504) chore: update babel deps ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#11597](https://github.com/babel/babel/pull/11597) Fix comments for smartPipeline topic-forbidding contexts ([@lazytype](https://github.com/lazytype))
- `babel-core`, `babel-generator`, `babel-helper-compilation-targets`, `babel-helpers`, `babel-parser`, `babel-plugin-proposal-decorators`, `babel-plugin-proposal-json-strings`, `babel-plugin-transform-block-scoping`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-modules-systemjs`, `babel-plugin-transform-react-jsx-source`, `babel-plugin-transform-runtime`, `babel-preset-env`, `babel-standalone`, `babel-template`, `babel-traverse`, `babel-types`
  - [#11512](https://github.com/babel/babel/pull/11512) Use ?. where it represents the intended semantics ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :running_woman: Performance

- `babel-plugin-proposal-object-rest-spread`
  - [#11520](https://github.com/babel/babel/pull/11520) Use single object spread call in loose mode ([@jridgewell](https://github.com/jridgewell))

#### :leftwards_arrow_with_hook: Revert

- `babel-standalone`
  - [#11538](https://github.com/babel/babel/pull/11538) Downgrade rollup to 1.27.9 ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.9.6 (2020-04-29)

#### :eyeglasses: Spec Compliance

- `babel-plugin-proposal-object-rest-spread`
  - [#11471](https://github.com/babel/babel/pull/11471) Fix evaluation order with object spread, 2 ([@jridgewell](https://github.com/jridgewell))
  - [#11412](https://github.com/babel/babel/pull/11412) Fix evaluation order with object spread ([@Zzzen](https://github.com/Zzzen))
- `babel-helper-replace-supers`, `babel-plugin-proposal-class-properties`, `babel-plugin-transform-classes`
  - [#11480](https://github.com/babel/babel/pull/11480) Super property eval order ([@jridgewell](https://github.com/jridgewell))

#### :rocket: New Feature

- `babel-traverse`, `babel-types`
  - [#11448](https://github.com/babel/babel/pull/11448) Adding createFlowUnionType in place of createUnionTypeAnnotation without breaking change ([@Beraliv](https://github.com/Beraliv))

#### :bug: Bug Fix

- `babel-helper-create-class-features-plugin`, `babel-helpers`, `babel-plugin-transform-modules-commonjs`, `babel-preset-env`
  - [#11495](https://github.com/babel/babel/pull/11495) Fix helpers.unsupportedIterableToArray for Map and Set ([@ChintanAcharya](https://github.com/ChintanAcharya))
- `babel-traverse`
  - [#11482](https://github.com/babel/babel/pull/11482) handle objectMethod in scope.isPure ([@Zzzen](https://github.com/Zzzen))
- `babel-plugin-transform-typescript`
  - [#11410](https://github.com/babel/babel/pull/11410) Throw error for TypeScript `declare const enum` ([@dosentmatter](https://github.com/dosentmatter))
- `babel-compat-data`
  - [#11462](https://github.com/babel/babel/pull/11462) chore: add node.js 14 support data ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#11449](https://github.com/babel/babel/pull/11449) Set exprAllowed to false for star token ([@existentialism](https://github.com/existentialism))
  - [#11355](https://github.com/babel/babel/pull/11355) fix: disallow expression after binding identifier `of` ([@JLHwung](https://github.com/JLHwung))
  - [#11417](https://github.com/babel/babel/pull/11417) fix: report missing plugins on type exports ([@JLHwung](https://github.com/JLHwung))
  - [#11388](https://github.com/babel/babel/pull/11388) fix: do not push new token context when function is following dot/questionDot ([@JLHwung](https://github.com/JLHwung))
- `babel-helper-create-class-features-plugin`, `babel-plugin-proposal-class-properties`
  - [#11424](https://github.com/babel/babel/pull/11424) Fix redeclaring private in nested class's superClass ([@jridgewell](https://github.com/jridgewell))
  - [#11405](https://github.com/babel/babel/pull/11405) Fix nested classes reference private fields ([@jridgewell](https://github.com/jridgewell))
- `babel-traverse`, `babel-types`
  - [#11378](https://github.com/babel/babel/pull/11378) transform-spread: create TS types (not Flow) when using TS ([@Beraliv](https://github.com/Beraliv))
- `babel-standalone`
  - [#11395](https://github.com/babel/babel/pull/11395) chore: update stage preset in babel-standalone ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-transform-runtime`
  - [#11366](https://github.com/babel/babel/pull/11366) fix: replace backslashes with forward slashes from resolved path for … ([@johannes-z](https://github.com/johannes-z))
- `babel-generator`, `babel-plugin-proposal-decorators`, `babel-plugin-proposal-pipeline-operator`, `babel-plugin-proposal-throw-expressions`, `babel-plugin-transform-async-to-generator`
  - [#11382](https://github.com/babel/babel/pull/11382) Unify parens printing for postfix-like expressions ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :nail_care: Polish

- `babel-parser`
  - [#11478](https://github.com/babel/babel/pull/11478) Add some parser missing plugins errors ([@JLHwung](https://github.com/JLHwung))
  - [#11417](https://github.com/babel/babel/pull/11417) fix: report missing plugins on type exports ([@JLHwung](https://github.com/JLHwung))
- `babel-core`
  - [#11421](https://github.com/babel/babel/pull/11421) polish: recommend preset for js extensions ([@JLHwung](https://github.com/JLHwung))
  - [#11397](https://github.com/babel/babel/pull/11397) fix: add classPrivateProperties and classPrivateMethods to missing plugin helper ([@JLHwung](https://github.com/JLHwung))

#### :memo: Documentation

- `babel-parser`
  - [#11492](https://github.com/babel/babel/pull/11492) docs: update AST spec ([@JLHwung](https://github.com/JLHwung))
- Other
  - [#11493](https://github.com/babel/babel/pull/11493) Add note about experimental nature of @babel/eslint-\* packages ([@kaicataldo](https://github.com/kaicataldo))
  - [#11403](https://github.com/babel/babel/pull/11403) contributing.md updates [skip ci] ([@hzoo](https://github.com/hzoo))

#### :house: Internal

- `babel-compat-data`, `babel-preset-env`
  - [#11496](https://github.com/babel/babel/pull/11496) Update compat table script ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#11450](https://github.com/babel/babel/pull/11450) Update compat data ([@JLHwung](https://github.com/JLHwung))
- Other
  - [#11479](https://github.com/babel/babel/pull/11479) Canary build of packages using CodeSandbox CI + mini repl ([@hzoo](https://github.com/hzoo))
  - [#11467](https://github.com/babel/babel/pull/11467) chore: test against node.js 14 ([@JLHwung](https://github.com/JLHwung))
  - [#11456](https://github.com/babel/babel/pull/11456) remove `< x.y.z` engines specification ([@JLHwung](https://github.com/JLHwung))
  - [#11433](https://github.com/babel/babel/pull/11433) chore: remove included proposal plugins ([@JLHwung](https://github.com/JLHwung))
  - [#11422](https://github.com/babel/babel/pull/11422) chore: upgrade @babel/\* deps ([@JLHwung](https://github.com/JLHwung))
- `babel-node`
  - [#11440](https://github.com/babel/babel/pull/11440) refactor(babel-node): Refactor babel-node tests configuration ([@arku](https://github.com/arku))

#### :running_woman: Performance

- `babel-helpers`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-decorators`, `babel-plugin-transform-classes`, `babel-plugin-transform-function-name`, `babel-plugin-transform-parameters`, `babel-plugin-transform-react-jsx`, `babel-plugin-transform-runtime`, `babel-plugin-transform-typescript`, `babel-preset-env`
  - [#11401](https://github.com/babel/babel/pull/11401) Speed up the createSuper helper ([@jridgewell](https://github.com/jridgewell))

## v7.9.5 (2020-04-07)

#### :bug: Bug Fix

- `babel-plugin-proposal-object-rest-spread`, `babel-plugin-transform-parameters`
  - [#11326](https://github.com/babel/babel/pull/11326) Correctly transpile when default parameter initializer references binding in rest pattern ([@vedantroy](https://github.com/vedantroy))
- `babel-traverse`
  - [#11375](https://github.com/babel/babel/pull/11375) Fixed generateUid creating clashing ids after scope re-crawling ([@Andarist](https://github.com/Andarist))
  - [#11323](https://github.com/babel/babel/pull/11323) Fixed issue with programPath.scope.references not being registered back correctly after scope re-crawling ([@Andarist](https://github.com/Andarist))
- `babel-plugin-transform-destructuring`
  - [#11360](https://github.com/babel/babel/pull/11360) fix Incorrect destructuring compilation of `for (let [[x] = [1]] = []… ([@Zzzen](https://github.com/Zzzen))
- `babel-preset-env`
  - [#11373](https://github.com/babel/babel/pull/11373) Fixed useBuiltIns and modules validation when using 'false' as option ([@JMarkoski](https://github.com/JMarkoski))
- `babel-plugin-transform-classes`
  - [#11341](https://github.com/babel/babel/pull/11341) Fix createSuper in Babel <7.5.5 ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-function-name`, `babel-plugin-transform-function-name`
  - [#11361](https://github.com/babel/babel/pull/11361) fix: do not add function name when parent's operator is not `=` ([@JLHwung](https://github.com/JLHwung))
- `babel-helper-builder-react-jsx-experimental`, `babel-plugin-transform-react-jsx`
  - [#11354](https://github.com/babel/babel/pull/11354) fix auto import error with whitespace JSXText ([@lunaruan](https://github.com/lunaruan))
- `babel-types`
  - [#11359](https://github.com/babel/babel/pull/11359) fix: allow logical assignment operators in AssignmentExpression ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-transform-parameters`
  - [#11346](https://github.com/babel/babel/pull/11346) Set correct async/generator in IIFE for params ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-create-class-features-plugin`
  - [#11345](https://github.com/babel/babel/pull/11345) Ignore abstract methods when decorating class ([@oliverdunk](https://github.com/oliverdunk))

#### :nail_care: Polish

- `babel-plugin-transform-parameters`
  - [#11349](https://github.com/babel/babel/pull/11349) Don't check type annotations when deciding params scope ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-traverse`
  - [#11368](https://github.com/babel/babel/pull/11368) Simplify scope.hasReferences implementation ([@Andarist](https://github.com/Andarist))
- `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-decorators`, `babel-plugin-transform-classes`, `babel-plugin-transform-parameters`, `babel-plugin-transform-runtime`, `babel-plugin-transform-typescript`, `babel-preset-env`
  - [#11358](https://github.com/babel/babel/pull/11358) Don't call `createSuper` in loose mode (it was unused) ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-generator`
  - [#11328](https://github.com/babel/babel/pull/11328) polish: align optional chain whitespace behavior to their sibiling ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal

- [#11374](https://github.com/babel/babel/pull/11374) Bump handlebars dep ([@existentialism](https://github.com/existentialism))
- [#11347](https://github.com/babel/babel/pull/11347) Fix e2e publish test when branching from an older version ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- [#11329](https://github.com/babel/babel/pull/11329) chore: remove unused graceful-fs ([@JLHwung](https://github.com/JLHwung))

## v7.9.4 (2020-03-24)

#### :bug: Bug Fix

- `babel-parser`
  - [#11186](https://github.com/babel/babel/pull/11186) fix: token after strict mode block is evaluated in strict mode ([@kaicataldo](https://github.com/kaicataldo))
- `babel-generator`
  - [#11325](https://github.com/babel/babel/pull/11325) fix: check parentheses between optional chain and other types ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-transform-react-jsx`, `babel-preset-react`
  - [#11324](https://github.com/babel/babel/pull/11324) Restore default pragmas in preset-react for classic runtime ([@existentialism](https://github.com/existentialism))
- `babel-plugin-transform-typescript`
  - [#11315](https://github.com/babel/babel/pull/11315) [preset-typescript] Fix private members type annotations ([@Lodin](https://github.com/Lodin))

#### :house: Internal

- `babel-parser`
  - [#11322](https://github.com/babel/babel/pull/11322) Compact parser fixture loc info ([@JLHwung](https://github.com/JLHwung))

## v7.9.3 (2020-03-22)

#### :bug: Bug Fix

- `babel-plugin-transform-parameters`
  - [#11307](https://github.com/babel/babel/pull/11307) Define default value for vars shadowing params ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-generator`
  - [#11306](https://github.com/babel/babel/pull/11306) Fix logic to insert parens in return statements with comments ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`
  - [#11284](https://github.com/babel/babel/pull/11284) fix: async arrow functions should not be allowed after binary operator. ([@vedantroy](https://github.com/vedantroy))

#### :house: Internal

- [#11293](https://github.com/babel/babel/pull/11293) chore: fix build-babel exclude in gulpfile ([@JLHwung](https://github.com/JLHwung))

## v7.9.2 (2020-03-21)

#### :bug: Bug Fix

- `babel-helpers`, `babel-plugin-transform-classes`
  - [#11298](https://github.com/babel/babel/pull/11298) Manually inline the createSuper helper on older Babel versions ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helpers`
  - [#11302](https://github.com/babel/babel/pull/11302) Don't use ES6 in the for-of helper ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`, `babel-plugin-transform-typescript`
  - [#11296](https://github.com/babel/babel/pull/11296) fix: parse value imports named type as values ([@kaicataldo](https://github.com/kaicataldo))

#### :house: Internal

- `babel-helper-transform-fixture-test-runner`, `babel-plugin-transform-react-jsx-development`, `babel-preset-react`
  - [#11297](https://github.com/babel/babel/pull/11297) Transform cwd in string literal on win32 ([@JLHwung](https://github.com/JLHwung))

## v7.9.1 (2020-03-20)

#### :bug: Bug Fix

- `babel-plugin-transform-react-jsx`, `babel-preset-react`
  - [#11295](https://github.com/babel/babel/pull/11295) Consider jsxFrag as set when it's set to the default value ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.9.0 (2020-03-20)

#### :rocket: New Feature

- `babel-generator`, `babel-helper-builder-react-jsx-experimental`, `babel-helper-builder-react-jsx`, `babel-plugin-transform-block-scoping`, `babel-plugin-transform-classes`, `babel-plugin-transform-function-name`, `babel-plugin-transform-react-constant-elements`, `babel-plugin-transform-react-inline-elements`, `babel-plugin-transform-react-jsx-development`, `babel-plugin-transform-react-jsx`, `babel-plugin-transform-regenerator`, `babel-preset-react`, `babel-preset-typescript`, `babel-standalone`
  - [#11126](https://github.com/babel/babel/pull/11126) Mark transpiled JSX elements as pure ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-builder-react-jsx-experimental`, `babel-helper-builder-react-jsx`, `babel-plugin-transform-react-jsx-development`, `babel-plugin-transform-react-jsx-self`, `babel-plugin-transform-react-jsx`, `babel-preset-react`, `babel-standalone`
  - [#11154](https://github.com/babel/babel/pull/11154) Add experimental version of the `babel-plugin-transform-react-jsx` transform ([@lunaruan](https://github.com/lunaruan))
- `babel-compat-data`, `babel-preset-env`
  - [#11083](https://github.com/babel/babel/pull/11083) Include preset modules ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#10971](https://github.com/babel/babel/pull/10971) Add numeric separator to `shippedProposals` ([@Wetinee](https://github.com/Wetinee))
- `babel-core`, `babel-helpers`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-decorators`, `babel-plugin-transform-classes`, `babel-plugin-transform-function-name`, `babel-plugin-transform-parameters`, `babel-plugin-transform-react-jsx`, `babel-plugin-transform-runtime`, `babel-plugin-transform-typescript`, `babel-preset-env`
  - [#8656](https://github.com/babel/babel/pull/8656) Allow extending untranspiled classes ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`, `babel-helper-module-transforms`, `babel-plugin-transform-modules-amd`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-modules-systemjs`, `babel-plugin-transform-modules-umd`
  - [#11194](https://github.com/babel/babel/pull/11194) Allow defining the moduleIds-related option in the transform plugins ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`, `babel-generator`, `babel-parser`, `babel-plugin-syntax-record-and-tuple`, `babel-types`
  - [#10865](https://github.com/babel/babel/pull/10865) Added support for record and tuple syntax. ([@rickbutton](https://github.com/rickbutton))
- `babel-generator`, `babel-parser`, `babel-plugin-transform-flow-strip-types`, `babel-preset-flow`
  - [#11178](https://github.com/babel/babel/pull/11178) Implement support for `declare` on class fields with Flow ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-types`
  - [#10680](https://github.com/babel/babel/pull/10680) Add cloneDeepWithoutLoc ([@Taym95](https://github.com/Taym95))
- `babel-generator`
  - [#11028](https://github.com/babel/babel/pull/11028) Added jsescOptions to Numeric Literals ([@sidntrivedi012](https://github.com/sidntrivedi012))
- `babel-generator`, `babel-parser`, `babel-types`
  - [#11077](https://github.com/babel/babel/pull/11077) Add support for flow's SymbolTypeAnnotation ([@existentialism](https://github.com/existentialism))
- `babel-parser`
  - [#11117](https://github.com/babel/babel/pull/11117) Parse BigInts by default ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#11254](https://github.com/babel/babel/pull/11254) Add estree parsing support for `export * as A` ([@existentialism](https://github.com/existentialism))
  - [#11246](https://github.com/babel/babel/pull/11246) feat: align ID_Start/ID_Continue regex to Unicode 13.0.0 ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-transform-react-jsx-source`, `babel-preset-react`
  - [#11139](https://github.com/babel/babel/pull/11139) feat(react-jsx-source): add columnNumber property ([@motiz88](https://github.com/motiz88))
- `babel-generator`, `babel-parser`, `babel-plugin-transform-typescript`, `babel-preset-typescript`, `babel-types`
  - [#11171](https://github.com/babel/babel/pull/11171) Add `import type` and `export type` support to TypeScript ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :bug: Bug Fix

- `babel-helper-builder-react-jsx-experimental`, `babel-helper-builder-react-jsx`, `babel-helper-validator-identifier`, `babel-highlight`, `babel-parser`, `babel-types`
  - [#11289](https://github.com/babel/babel/pull/11289) Add @babel/helper-validator-identifier ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-proposal-optional-chaining`
  - [#11261](https://github.com/babel/babel/pull/11261) Memoize call expressions in optional chains in loose mode ([@oliverdunk](https://github.com/oliverdunk))
- `babel-plugin-transform-react-jsx-self`, `babel-preset-react`
  - [#11290](https://github.com/babel/babel/pull/11290) Pass the correct `this` to JSX's `__self` with the old plugin ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-builder-react-jsx-experimental`, `babel-plugin-transform-react-jsx-development`, `babel-plugin-transform-react-jsx`
  - [#11288](https://github.com/babel/babel/pull/11288) Use the correct `this` in `__self` for JSX elements in arrows ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-compat-data`, `babel-preset-env`
  - [#11280](https://github.com/babel/babel/pull/11280) Move `object-rest-spread` after `transform-parameters` ([@JLHwung](https://github.com/JLHwung))
- `babel-helpers`, `babel-plugin-transform-for-of`, `babel-preset-env`
  - [#11285](https://github.com/babel/babel/pull/11285) Allow for-of on polyfilled or builtin iterables without `Symbol` support ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#11263](https://github.com/babel/babel/pull/11263) Add for-of fallback for arrays in browsers without symbol support ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-proposal-object-rest-spread`
  - [#11282](https://github.com/babel/babel/pull/11282) fix: object-rest-spread should not transform export array rest ([@JLHwung](https://github.com/JLHwung))
- `babel-register`
  - [#11249](https://github.com/babel/babel/pull/11249) Add path separator to `@babel/register` sourceRoot ([@andrewdotn](https://github.com/andrewdotn))
- `babel-core`, `babel-helpers`, `babel-plugin-transform-runtime`
  - [#10575](https://github.com/babel/babel/pull/10575) Create File class for babel helpers ([@JLHwung](https://github.com/JLHwung))
- `babel-helpers`, `babel-plugin-transform-modules-commonjs`, `babel-preset-env`, `babel-runtime-corejs2`, `babel-runtime`
  - [#11268](https://github.com/babel/babel/pull/11268) Allow rest/spread on polyfilled or builtin iterables without `Symbol` support ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`
  - [#11148](https://github.com/babel/babel/pull/11148) Allow await when it is not in AsyncArrowHead ([@arku](https://github.com/arku))
- `babel-helpers`, `babel-plugin-proposal-object-rest-spread`, `babel-runtime-corejs2`, `babel-runtime`
  - [#9794](https://github.com/babel/babel/pull/9794) fix(rest-spread): Do not require `Symbol.iterator` for strings ([@clshortfuse](https://github.com/clshortfuse))
- `babel-generator`
  - [#11255](https://github.com/babel/babel/pull/11255) Fix printing edge cases in Nullish Coalescing and Optional Chaining ([@jridgewell](https://github.com/jridgewell))

#### :nail_care: Polish

- `babel-parser`
  - [#11208](https://github.com/babel/babel/pull/11208) Rephrase parser error message ([@JLHwung](https://github.com/JLHwung))
- `babel-helpers`, `babel-plugin-transform-destructuring`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-spread`, `babel-preset-env`, `babel-runtime-corejs2`, `babel-runtime`
  - [#11264](https://github.com/babel/babel/pull/11264) Throw better errors for non-iterables when Symbol doesn't exist. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :house: Internal

- `babel-helper-builder-react-jsx-experimental`, `babel-helper-builder-react-jsx`, `babel-helper-validator-identifier`, `babel-highlight`, `babel-parser`, `babel-types`
  - [#11289](https://github.com/babel/babel/pull/11289) Add @babel/helper-validator-identifier ([@JLHwung](https://github.com/JLHwung))
- `babel-compat-data`, `babel-preset-env`
  - [#11277](https://github.com/babel/babel/pull/11277) Update compat-data ([@existentialism](https://github.com/existentialism))
- `babel-core`
  - [#11276](https://github.com/babel/babel/pull/11276) chore: bump json5 and minimist ([@JLHwung](https://github.com/JLHwung))
- `babel-types`
  - [#11250](https://github.com/babel/babel/pull/11250) Add stricter Optional Chain node validation ([@jridgewell](https://github.com/jridgewell))
  - [#11267](https://github.com/babel/babel/pull/11267) Update Purish aliases ([@jridgewell](https://github.com/jridgewell))
- `babel-helpers`, `babel-plugin-transform-block-scoping`, `babel-plugin-transform-for-of`, `babel-plugin-transform-parameters`, `babel-plugin-transform-runtime`, `babel-preset-env`
  - [#11262](https://github.com/babel/babel/pull/11262) Extract for-of iterator handling to a helper ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`, `babel-plugin-proposal-decorators`, `babel-plugin-proposal-logical-assignment-operators`, `babel-plugin-proposal-object-rest-spread`, `babel-plugin-proposal-partial-application`, `babel-plugin-proposal-pipeline-operator`, `babel-plugin-transform-parameters`, `babel-traverse`
  - [#11260](https://github.com/babel/babel/pull/11260) Support more node types in generateUidBasedOnNode ([@jridgewell](https://github.com/jridgewell))
- Other
  - [#11259](https://github.com/babel/babel/pull/11259) Remove unused `gulp-rename` ([@existentialism](https://github.com/existentialism))

## v7.8.8 (2020-03-12)

#### :rocket: New Feature

- `babel-helper-create-regexp-features-plugin`, `babel-plugin-proposal-unicode-property-regex`, `babel-plugin-transform-dotall-regex`
  - [#11244](https://github.com/babel/babel/pull/11244) Add support for Unicode 13 in regexps (update `regexpu-core`) ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :bug: Bug Fix

- `babel-plugin-transform-parameters`
  - [#11242](https://github.com/babel/babel/pull/11242) fix: do not remove shadowed for-loop declarators ([@JLHwung](https://github.com/JLHwung))
- `babel-generator`
  - [#11227](https://github.com/babel/babel/pull/11227) Force parentheses around array and conditional infer ([@smelukov](https://github.com/smelukov))
- `babel-parser`
  - [#11188](https://github.com/babel/babel/pull/11188) fix: non-directive "use strict" should not enable parsing in strict mode ([@kaicataldo](https://github.com/kaicataldo))
- `babel-preset-env`
  - [#11218](https://github.com/babel/babel/pull/11218) update: preset-env-fixtures ([@kaicataldo](https://github.com/kaicataldo))

#### :house: Internal

- `babel-plugin-syntax-export-namespace-from`
  - [#11236](https://github.com/babel/babel/pull/11236) Archive @babel/plugin-syntax-export-namespace-from ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- Other
  - [#11235](https://github.com/babel/babel/pull/11235) chore: pin `@rollup/plugin-json` to 4.0.1 ([@JLHwung](https://github.com/JLHwung))
  - [#11230](https://github.com/babel/babel/pull/11230) chore: update acorn to latest version ([@JLHwung](https://github.com/JLHwung))
- `babel-preset-env`
  - [#11225](https://github.com/babel/babel/pull/11225) Update @babel deps ([@existentialism](https://github.com/existentialism))
- `babel-parser`
  - [#11219](https://github.com/babel/babel/pull/11219) refactor: remove redundant contextDescription empty check ([@JLHwung](https://github.com/JLHwung))

## v7.8.7 (2020-03-05)

#### :bug: Bug Fix

- `babel-preset-env`
  - [#11201](https://github.com/babel/babel/pull/11201) Allow using `preset-env` with newer versions of `compat-data` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`
  - [#11193](https://github.com/babel/babel/pull/11193) Pass URLs to import() rather than paths ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`
  - [#11198](https://github.com/babel/babel/pull/11198) fix(babel-parser): chain off optionally chained keys named class and function ([@Vages](https://github.com/Vages))
- `babel-helper-call-delegate`, `babel-plugin-transform-parameters`
  - [#11158](https://github.com/babel/babel/pull/11158) Fix scope of function body when var redeclares param ([@openorclose](https://github.com/openorclose))
- `babel-generator`
  - [#11190](https://github.com/babel/babel/pull/11190) Fix printing parentheses around optional chains ([@sag1v](https://github.com/sag1v))
- `babel-types`
  - [#11184](https://github.com/babel/babel/pull/11184) Add "Statement" as alias to Flow enum declaration ([@gkz](https://github.com/gkz))
- `babel-plugin-transform-typescript`
  - [#11129](https://github.com/babel/babel/pull/11129) Typescript: Preserve decorated definite class properties ([@jamescdavis](https://github.com/jamescdavis))

#### :house: Internal

- `babel-parser`
  - [#11192](https://github.com/babel/babel/pull/11192) Refactor: add parser message template ([@JLHwung](https://github.com/JLHwung))
- Other
  - [#11181](https://github.com/babel/babel/pull/11181) Set correct version for @babel/eslint-plugin-development ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.8.6 (2020-02-27)

#### :eyeglasses: Spec Compliance

- `babel-helper-module-transforms`, `babel-helper-replace-supers`, `babel-plugin-transform-modules-commonjs`
  - [#11109](https://github.com/babel/babel/pull/11109) Fix rewriteThis in helper-module-transforms for computed class elements ([@sidntrivedi012](https://github.com/sidntrivedi012))
- `babel-parser`
  - [#10956](https://github.com/babel/babel/pull/10956) Refactor await/yield production parameter tracking ([@JLHwung](https://github.com/JLHwung))

#### :boom: Breaking Change

- [#11137](https://github.com/babel/babel/pull/11137) Breaking: align babel-eslint-parser & espree ([@kaicataldo](https://github.com/kaicataldo))

#### :rocket: New Feature

- `babel-helper-create-regexp-features-plugin`, `babel-plugin-transform-classes`, `babel-plugin-transform-named-capturing-groups-regex`, `babel-preset-env`
  - [#11134](https://github.com/babel/babel/pull/11134) Mark `wrapNativeSuper` and `wrapRegExp` as pure ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :bug: Bug Fix

- `babel-helper-compilation-targets`
  - [#11124](https://github.com/babel/babel/pull/11124) fix: search for browserslist if esmodules is falsy ([@fengzilong](https://github.com/fengzilong))
- `babel-register`
  - [#11160](https://github.com/babel/babel/pull/11160) fix: workaround misleading node.js ENOENT error ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#11146](https://github.com/babel/babel/pull/11146) Parse declare modifier around accessibility modifiers ([@JLHwung](https://github.com/JLHwung))
  - [#11092](https://github.com/babel/babel/pull/11092) Fix Async Generic After Await Parsing Error ([@liamfd](https://github.com/liamfd))
- Other
  - [#11137](https://github.com/babel/babel/pull/11137) Breaking: align babel-eslint-parser & espree ([@kaicataldo](https://github.com/kaicataldo))
- `babel-compat-data`, `babel-preset-env`
  - [#10929](https://github.com/babel/babel/pull/10929) Update preset-env builtin-definitions ([@JLHwung](https://github.com/JLHwung))
- `babel-traverse`
  - [#11136](https://github.com/babel/babel/pull/11136) fix @babel/traverse can't use path.remove() with noScope ([@liuxingbaoyu](https://github.com/liuxingbaoyu))
- `babel-helper-create-class-features-plugin`, `babel-helper-replace-supers`
  - [#11068](https://github.com/babel/babel/pull/11068) Fix classNameTDZError in computed prototype methods with class fields ([@sidntrivedi012](https://github.com/sidntrivedi012))
- `babel-template`
  - [#11112](https://github.com/babel/babel/pull/11112) Respect preserveComments option in tempate.ast() ([@dentrado](https://github.com/dentrado))
- `babel-plugin-transform-for-of`
  - [#11088](https://github.com/babel/babel/pull/11088) Allow redeclaration of loop variable in body ([@openorclose](https://github.com/openorclose))
- `babel-helper-module-transforms`, `babel-plugin-transform-modules-commonjs`
  - [#11074](https://github.com/babel/babel/pull/11074) Fix export bindings not updated by 'for ... in' and 'for ... of' ([@vedantroy](https://github.com/vedantroy))
- `babel-standalone`
  - [#10797](https://github.com/babel/babel/pull/10797) fix: specify sourceFileName when generating inline sourcemaps ([@JLHwung](https://github.com/JLHwung))
- `babel-types`
  - [#11089](https://github.com/babel/babel/pull/11089) Make `isReferenced` return false for method parameter name ([@brokensandals](https://github.com/brokensandals))

#### :nail_care: Polish

- `babel-core`, `babel-generator`, `babel-plugin-external-helpers`, `babel-plugin-proposal-async-generator-functions`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-decorators`, `babel-plugin-proposal-function-bind`, `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-classes`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-flow-strip-types`, `babel-plugin-transform-function-name`, `babel-plugin-transform-parameters`, `babel-plugin-transform-react-constant-elements`, `babel-plugin-transform-react-jsx`, `babel-plugin-transform-regenerator`, `babel-plugin-transform-runtime`, `babel-plugin-transform-typescript`, `babel-preset-env`
  - [#11133](https://github.com/babel/babel/pull/11133) Skip newlines around inline `#__PURE__` annotations ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :house: Internal

- Other
  - [#11175](https://github.com/babel/babel/pull/11175) replace `gulp-watch` by `gulp.watch` ([@JLHwung](https://github.com/JLHwung))
  - [#11163](https://github.com/babel/babel/pull/11163) chore: migrate lock threads to github actions ([@JLHwung](https://github.com/JLHwung))
  - [#11164](https://github.com/babel/babel/pull/11164) chore: specify dependency rule of check-compat-data-ci ([@JLHwung](https://github.com/JLHwung))
  - [#11106](https://github.com/babel/babel/pull/11106) Centralize @babel/eslint-\* tests ([@kaicataldo](https://github.com/kaicataldo))
  - [#11072](https://github.com/babel/babel/pull/11072) Update @babel deps ([@existentialism](https://github.com/existentialism))
  - [#11070](https://github.com/babel/babel/pull/11070) Clean babel-eslint-\*/\*\*/lib ([@kaicataldo](https://github.com/kaicataldo))
- `babel-generator`, `babel-helper-fixtures`, `babel-parser`, `babel-traverse`
  - [#11168](https://github.com/babel/babel/pull/11168) Enable more eslint recommended rules ([@JLHwung](https://github.com/JLHwung))
- `babel-helper-replace-supers`
  - [#11121](https://github.com/babel/babel/pull/11121) Fix typing of ReplaceSupers options ([@existentialism](https://github.com/existentialism))
- `babel-core`, `babel-plugin-syntax-decorators`, `babel-template`, `babel-traverse`
  - [#11119](https://github.com/babel/babel/pull/11119) Add eslint-plugin-jest ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#11096](https://github.com/babel/babel/pull/11096) Wrap type-only class fields in flow comments ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`, `babel-parser`, `babel-types`
  - [#11093](https://github.com/babel/babel/pull/11093) Turn on no-fallthrough rule ([@JLHwung](https://github.com/JLHwung))
- `babel-preset-stage-0`, `babel-preset-stage-1`, `babel-preset-stage-2`, `babel-preset-stage-3`
  - [#11101](https://github.com/babel/babel/pull/11101) Remove stage presets from the monorepo ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-preset-env-standalone`
  - [#10993](https://github.com/babel/babel/pull/10993) Archive @babel/preset-env-standalone ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.8.5 (2020-01-31)

#### :bug: Bug Fix

- `babel-compat-data`
  - [#11078](https://github.com/babel/babel/pull/11078) Do not publish build directory of compat-data ([@danez](https://github.com/danez))

#### :house: Internal

- [#11071](https://github.com/babel/babel/pull/11071) Further refactoring of @babel/eslint-parser ([@kaicataldo](https://github.com/kaicataldo))

## v7.8.4 (2020-01-30)

> :warning: In Babel 7.8.0 we introduced the `--copy-ignored` option for `@babel/cli`, defaulting to `false`. However, previous versions behaved as if that option was present: for this reason, we changed its default value to `true` (when `--copy-files` is provided) and introduced a `--no-copy-ignored` option to disable it.

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#11031](https://github.com/babel/babel/pull/11031) fix: properly parse member expression after property initializer ([@vedantroy](https://github.com/vedantroy))
  - [#11017](https://github.com/babel/babel/pull/11017) Update coalesce precedence ([@JLHwung](https://github.com/JLHwung))
  - [#11009](https://github.com/babel/babel/pull/11009) fix: triple `__proto__` in object patterns should be allowed ([@JLHwung](https://github.com/JLHwung))
  - [#10987](https://github.com/babel/babel/pull/10987) Duplicate `__proto__` key should be allowed in object patterns ([@JLHwung](https://github.com/JLHwung))

#### :bug: Bug Fix

- `babel-cli`
  - [#11063](https://github.com/babel/babel/pull/11063) [@babel/cli] Copy ignored files by default ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-compat-data`
  - [#11066](https://github.com/babel/babel/pull/11066) Fix core-js 2 builtin data for opera ([@danez](https://github.com/danez))
- `babel-helpers`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-decorators`, `babel-plugin-transform-classes`, `babel-plugin-transform-parameters`, `babel-plugin-transform-typeof-symbol`, `babel-preset-env`
  - [#11049](https://github.com/babel/babel/pull/11049) Avoid compiling the \_typeof helper with itself ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-traverse`
  - [#11011](https://github.com/babel/babel/pull/11011) Bug/missing references after crawl ([@regiontog](https://github.com/regiontog))
- `babel-plugin-transform-parameters`
  - [#9714](https://github.com/babel/babel/pull/9714) Fix rest parameters indexing with TypeScript 'this parameter' ([@BenoitZugmeyer](https://github.com/BenoitZugmeyer))
- `babel-plugin-transform-for-of`
  - [#11023](https://github.com/babel/babel/pull/11023) fix: for-of transform should skip for-await-of ([@JLHwung](https://github.com/JLHwung))
- `babel-compat-data`, `babel-preset-env`
  - [#11016](https://github.com/babel/babel/pull/11016) Re-generate preset-env fixtures ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-generator`
  - [#11014](https://github.com/babel/babel/pull/11014) Fix parentheses removal in nullish-coalescing operation ([@sidntrivedi012](https://github.com/sidntrivedi012))
- `babel-helper-compilation-targets`
  - [#11006](https://github.com/babel/babel/pull/11006) fix: supply '.' subpath for backward compatibility with node.js 13.0-13.1 ([@JLHwung](https://github.com/JLHwung))

#### :nail_care: Polish

- `babel-core`
  - [#10969](https://github.com/babel/babel/pull/10969) polish: throw human-friendly error when item-option pair is incorrectly unwrapped ([@JLHwung](https://github.com/JLHwung))

#### :memo: Documentation

- `babel-parser`
  - [#11015](https://github.com/babel/babel/pull/11015) add AST for the module attribute proposal ([@xtuc](https://github.com/xtuc))

#### :house: Internal

- `babel-compat-data`
  - [#11039](https://github.com/babel/babel/pull/11039) Update compat table ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#11041](https://github.com/babel/babel/pull/11041) Delete duplicated file in `@babel/compat-data` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#10814](https://github.com/babel/babel/pull/10814) chore: map mobile browser data to their desktop version ([@JLHwung](https://github.com/JLHwung))
  - [#11024](https://github.com/babel/babel/pull/11024) Check that generated compat-data is up to date on CI ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`
  - [#11032](https://github.com/babel/babel/pull/11032) refactor: simplify toAssignable routine ([@JLHwung](https://github.com/JLHwung))
  - [#11026](https://github.com/babel/babel/pull/11026) chore: use @babel/eslint-config-internal ([@JLHwung](https://github.com/JLHwung))
- `babel-preset-env`
  - [#11030](https://github.com/babel/babel/pull/11030) update compat-data related docs/config [skip ci] ([@JLHwung](https://github.com/JLHwung))
- `babel-compat-data`, `babel-node`, `babel-parser`, `babel-preset-env`
  - [#11025](https://github.com/babel/babel/pull/11025) Enable `no-process-exit` ([@JLHwung](https://github.com/JLHwung))
- Other
  - [#11021](https://github.com/babel/babel/pull/11021) chore: replace yarn-upgrade by bump-babel-dependencies in vuejs e2e tests ([@JLHwung](https://github.com/JLHwung))
  - [#11004](https://github.com/babel/babel/pull/11004) chore: test against @vue/babel-preset-app ([@JLHwung](https://github.com/JLHwung))
- `babel-core`
  - [#10995](https://github.com/babel/babel/pull/10995) Exclude `import()` tests from pubilsh build ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :running_woman: Performance

- `babel-parser`
  - [#11029](https://github.com/babel/babel/pull/11029) fix(babel-parser): avoid state.clone() to clone the whole token store ([@3cp](https://github.com/3cp))

## v7.8.3 (2020-01-13)

#### :bug: Bug Fix

- `babel-types`
  - [#11002](https://github.com/babel/babel/pull/11002) fix: generated builder parameter should respect builder keys ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal

- `babel-preset-env-standalone`, `babel-standalone`
  - [#10994](https://github.com/babel/babel/pull/10994) Ignore .map files in standalone packages ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-proposal-decorators`, `babel-plugin-proposal-dynamic-import`, `babel-plugin-proposal-logical-assignment-operators`, `babel-plugin-proposal-object-rest-spread`, `babel-plugin-syntax-async-generators`, `babel-plugin-syntax-bigint`, `babel-plugin-syntax-dynamic-import`, `babel-plugin-syntax-json-strings`, `babel-plugin-syntax-nullish-coalescing-operator`, `babel-plugin-syntax-object-rest-spread`, `babel-plugin-syntax-optional-catch-binding`, `babel-plugin-syntax-optional-chaining`, `babel-plugin-transform-flow-strip-types`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-modules-systemjs`, `babel-plugin-transform-react-constant-elements`, `babel-preset-env-standalone`, `babel-preset-env`, `babel-standalone`
  - [#10820](https://github.com/babel/babel/pull/10820) Archive syntax plugins enabled by default ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :leftwards_arrow_with_hook: Revert

- _Every package_
  - [#11003](https://github.com/babel/babel/pull/11003) Revert "chore: specify package type (#10849)" ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.8.2 (2020-01-12)

#### :bug: Bug Fix

- `babel-preset-env`
  - [#10992](https://github.com/babel/babel/pull/10992) fix: `isPluginRequired` returns the opposite result in v7.8.0 ([@sodatea](https://github.com/sodatea))

## v7.8.1 (2020-01-12)

#### :bug: Bug Fix

- `babel-compat-data`, `babel-helper-compilation-targets`
  - [#10991](https://github.com/babel/babel/pull/10991) Downgrade semver for compatibility with Node 6 ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.8.0 (2020-01-12)

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#10980](https://github.com/babel/babel/pull/10980) Disallow private name in object elements and TS type elements ([@JLHwung](https://github.com/JLHwung))
  - [#10955](https://github.com/babel/babel/pull/10955) LiteralPropertyName should allow BigIntLiteral ([@JLHwung](https://github.com/JLHwung))
  - [#10953](https://github.com/babel/babel/pull/10953) fix: check await when parsing AsyncArrowBindingIdentifier ([@JLHwung](https://github.com/JLHwung))
  - [#10947](https://github.com/babel/babel/pull/10947) Fix: TopLevelAwait should respect await identifiers defined in sub scope. ([@JLHwung](https://github.com/JLHwung))
  - [#10946](https://github.com/babel/babel/pull/10946) fix: Class Field Initializer should not allow await expression as immediate child ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-proposal-numeric-separator`
  - [#10938](https://github.com/babel/babel/pull/10938) StringNumericLiteral does not include NumericLiteralSeparator ([@JLHwung](https://github.com/JLHwung))
- `babel-generator`, `babel-parser`, `babel-plugin-proposal-private-methods`
  - [#10456](https://github.com/babel/babel/pull/10456) [parser] Disallow duplicate and undeclared private names ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :boom: Breaking Change

- `babel-types`
  - [#10917](https://github.com/babel/babel/pull/10917) (opt-in) Improve @babel/types with env.BABEL_TYPES_8_BREAKING ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :rocket: New Feature

- `babel-standalone`
  - [#10821](https://github.com/babel/babel/pull/10821) Merge env-standalone to babel-standalone ([@JLHwung](https://github.com/JLHwung))
- `babel-core`
  - [#10783](https://github.com/babel/babel/pull/10783) Add babelrc.json support ([@yordis](https://github.com/yordis))
  - [#10903](https://github.com/babel/babel/pull/10903) Add support for babel.config.mjs and .babelrc.mjs ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-compat-data`, `babel-preset-env-standalone`, `babel-preset-env`
  - [#10811](https://github.com/babel/babel/pull/10811) Add optional-chaining and nullish-coalescing to preset-env ([@Druotic](https://github.com/Druotic))
- `babel-helper-module-transforms`, `babel-plugin-transform-modules-systemjs`
  - [#10780](https://github.com/babel/babel/pull/10780) add `allowTopLevelThis` option to `transform-modules-systemjs` ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#10817](https://github.com/babel/babel/pull/10817) enable optional chaining by default in @babel/parser ([@jackisherwood](https://github.com/jackisherwood))
- `babel-cli`
  - [#10887](https://github.com/babel/babel/pull/10887) --copy-ignored flag added to CLI ([@rajasekarm](https://github.com/rajasekarm))
  - [#9144](https://github.com/babel/babel/pull/9144) Add --out-file-extension option to babel-cli ([@eps1lon](https://github.com/eps1lon))
- `babel-core`, `babel-generator`, `babel-parser`
  - [#10819](https://github.com/babel/babel/pull/10819) Enable nullish coalescing by default in @babel/parser ([@layershifter](https://github.com/layershifter))
- `babel-core`, `babel-parser`
  - [#10843](https://github.com/babel/babel/pull/10843) [parser] enable dynamic import by default ([@AbdulAli19](https://github.com/AbdulAli19))

#### :bug: Bug Fix

- `babel-node`
  - [#10763](https://github.com/babel/babel/pull/10763) Filename detection should respect short flags ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-proposal-numeric-separator`
  - [#10938](https://github.com/babel/babel/pull/10938) StringNumericLiteral does not include NumericLiteralSeparator ([@JLHwung](https://github.com/JLHwung))
- `babel-preset-env`
  - [#10790](https://github.com/babel/babel/pull/10790) Use chrome data when android is absent ([@JLHwung](https://github.com/JLHwung))
  - [#10930](https://github.com/babel/babel/pull/10930) fix: Promise.any requires global.AggregateError ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#10944](https://github.com/babel/babel/pull/10944) When reading a new string, U+2028/2029 should correctly set the new column ([@JLHwung](https://github.com/JLHwung))
  - [#10937](https://github.com/babel/babel/pull/10937) Refactor parseSubscript ([@JLHwung](https://github.com/JLHwung))
  - [#10901](https://github.com/babel/babel/pull/10901) fix: lost leading comment after named import ([@elevatebart](https://github.com/elevatebart))
- `babel-traverse`
  - [#10949](https://github.com/babel/babel/pull/10949) Override toString in case this function is printed ([@jayenashar](https://github.com/jayenashar))
- `babel-helper-module-transforms`, `babel-plugin-transform-modules-commonjs`
  - [#10934](https://github.com/babel/babel/pull/10934) helper-module-transforms: dereference imported template tag ([@ajafff](https://github.com/ajafff))
- `babel-traverse`, `babel-types`
  - [#10912](https://github.com/babel/babel/pull/10912) Fix parameter expression get binding ([@JLHwung](https://github.com/JLHwung))
- `babel-core`
  - [#10914](https://github.com/babel/babel/pull/10914) @babel-core: parse should parse only ([@kaicataldo](https://github.com/kaicataldo))
- `babel-helpers`
  - [#10902](https://github.com/babel/babel/pull/10902) fix: Object.getOwnPropertySymbols called on non-object ([@bassaer](https://github.com/bassaer))

#### :nail_care: Polish

- `babel-node`
  - [#9695](https://github.com/babel/babel/pull/9695) Use `babel > ` as prompt in babel-node ([@ZYSzys](https://github.com/ZYSzys))
- `babel-parser`
  - [#10906](https://github.com/babel/babel/pull/10906) refactor: remove inClassProperty parser state ([@JLHwung](https://github.com/JLHwung))

#### :memo: Documentation

- `babel-preset-env`
  - [#10982](https://github.com/babel/babel/pull/10982) CONTRIBUTING: Update link to plugin-features.js [skip ci] ([@andersk](https://github.com/andersk))
- Other
  - [#10973](https://github.com/babel/babel/pull/10973) Added instructions to fork the repo in order to setup. ([@sidntrivedi012](https://github.com/sidntrivedi012))

#### :house: Internal

- `babel-preset-env`
  - [#10983](https://github.com/babel/babel/pull/10983) chore: update corejs fixtures ([@JLHwung](https://github.com/JLHwung))
  - [#10974](https://github.com/babel/babel/pull/10974) chore: update caniuse-usage Chrome 49 related fixtures ([@JLHwung](https://github.com/JLHwung))
  - [#10924](https://github.com/babel/babel/pull/10924) Replace custom "findSuggestion" function with "levenary" ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`
  - [#10507](https://github.com/babel/babel/pull/10507) Prepare @babel/core for asynchronicity ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- Other
  - [#10979](https://github.com/babel/babel/pull/10979) Reduce false negative cases of typescript parser tests ([@JLHwung](https://github.com/JLHwung))
  - [#10976](https://github.com/babel/babel/pull/10976) Update Test262, Flow and TS parser tests ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#10964](https://github.com/babel/babel/pull/10964) Bump coverage target from 80% to 90% ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#10958](https://github.com/babel/babel/pull/10958) Fix recent e2e-vuejs-cli error ([@JLHwung](https://github.com/JLHwung))
  - [#10919](https://github.com/babel/babel/pull/10919) Add integration test: e2e-vue-cli ([@JLHwung](https://github.com/JLHwung))
  - [#10943](https://github.com/babel/babel/pull/10943) chore: update test262 ([@JLHwung](https://github.com/JLHwung))
  - [#10918](https://github.com/babel/babel/pull/10918) chore: refine e2e test scripts ([@JLHwung](https://github.com/JLHwung))
  - [#10905](https://github.com/babel/babel/pull/10905) chore: separate build-standalone with coverage ([@JLHwung](https://github.com/JLHwung))
  - [#10898](https://github.com/babel/babel/pull/10898) Move coverage to GitHub actions ([@JLHwung](https://github.com/JLHwung))
- `babel-compat-data`, `babel-helper-compilation-targets`, `babel-preset-env`
  - [#10899](https://github.com/babel/babel/pull/10899) Extract targets parser and compat data from preset-env ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`
  - [#10950](https://github.com/babel/babel/pull/10950) test: add invalid-lone-import test ([@JLHwung](https://github.com/JLHwung))
  - [#10936](https://github.com/babel/babel/pull/10936) refactor: remove unecessary checkYieldAwaitInDefaultParams ([@JLHwung](https://github.com/JLHwung))
  - [#10935](https://github.com/babel/babel/pull/10935) refactor: remove unused invalidTemplateEscapePosition tokenizer state ([@JLHwung](https://github.com/JLHwung))
  - [#10939](https://github.com/babel/babel/pull/10939) TSTypeCastExpression should not be inside call parameters ([@JLHwung](https://github.com/JLHwung))
  - [#10942](https://github.com/babel/babel/pull/10942) Remove unused parser methods ([@JLHwung](https://github.com/JLHwung))
- _Every package_
  - [#10849](https://github.com/babel/babel/pull/10849) chore: specify package type [skip-ci] ([@JLHwung](https://github.com/JLHwung))

#### :leftwards_arrow_with_hook: Revert

- `babel-cli`
  - [#10923](https://github.com/babel/babel/pull/10923) fix: minified should not accept optional argument ([@JLHwung](https://github.com/JLHwung))

## v7.7.7 (2019-12-19)

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#10576](https://github.com/babel/babel/pull/10576) [parser] validation for parentheses in the left-hand side of assignment expressions ([@boweihan](https://github.com/boweihan))

#### :bug: Bug Fix

- `babel-plugin-proposal-object-rest-spread`
  - [#10863](https://github.com/babel/babel/pull/10863) fix: add computed property support for object Ref ([@JLHwung](https://github.com/JLHwung))
- `babel-core`
  - [#10890](https://github.com/babel/babel/pull/10890) fix: skip merging large input sourcemaps ([@JLHwung](https://github.com/JLHwung))
  - [#10885](https://github.com/babel/babel/pull/10885) fix: avoid string copy when processing input source-map ([@JLHwung](https://github.com/JLHwung))
- `babel-node`
  - [#10871](https://github.com/babel/babel/pull/10871) Allow -r from node_modules with @babel/node ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-transform-parameters`
  - [#10053](https://github.com/babel/babel/pull/10053) Check shadow variable to identifier in default parameters ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#10828](https://github.com/babel/babel/pull/10828) @babel/parser: fix ImportExpression node to match ESTree spec ([@kaicataldo](https://github.com/kaicataldo))
  - [#10827](https://github.com/babel/babel/pull/10827) @babel/parser: fix BigIntLiteral node to match ESTree spec ([@kaicataldo](https://github.com/kaicataldo))

#### :nail_care: Polish

- `babel-plugin-transform-react-jsx`
  - [#10868](https://github.com/babel/babel/pull/10868) Fix pragmaFrag spelling in error message ([@azizhk](https://github.com/azizhk))

#### :house: Internal

- `babel-generator`, `babel-plugin-proposal-pipeline-operator`, `babel-plugin-proposal-unicode-property-regex`, `babel-plugin-syntax-pipeline-operator`, `babel-plugin-transform-dotall-regex`, `babel-preset-env-standalone`, `babel-preset-typescript`, `babel-standalone`
  - [#10882](https://github.com/babel/babel/pull/10882) Ignore some files in npm package ([@JLHwung](https://github.com/JLHwung))
- Other
  - [#10874](https://github.com/babel/babel/pull/10874) chore: cache chocolatey installation temporary files ([@JLHwung](https://github.com/JLHwung))
  - [#10880](https://github.com/babel/babel/pull/10880) chore: add PR Intent checkbox [ci-skip] ([@JLHwung](https://github.com/JLHwung))
  - [#10870](https://github.com/babel/babel/pull/10870) chore: update babel-eslint to 11.0.0-beta.2 ([@JLHwung](https://github.com/JLHwung))
  - [#10848](https://github.com/babel/babel/pull/10848) Tune eslint packages test configuration ([@JLHwung](https://github.com/JLHwung))
- `babel-preset-env`
  - [#10873](https://github.com/babel/babel/pull/10873) chore: download compat-table when build-data is run ([@JLHwung](https://github.com/JLHwung))
  - [#10846](https://github.com/babel/babel/pull/10846) Update corejs fixtures ([@JLHwung](https://github.com/JLHwung))
  - [#10837](https://github.com/babel/babel/pull/10837) refactor: rewrite available-plugins to esm ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#10858](https://github.com/babel/babel/pull/10858) Properly serialize non-json values in parser tests ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-cli`, `babel-node`, `babel-register`
  - [#10847](https://github.com/babel/babel/pull/10847) Add missing dev dependencies ([@JLHwung](https://github.com/JLHwung))

#### :leftwards_arrow_with_hook: Revert

- `babel-plugin-transform-classes`, `babel-plugin-transform-regenerator`, `babel-preset-env`
  - [#10839](https://github.com/babel/babel/pull/10839) Use `async-to-generator` even when `regenerator` is enabled ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.7.6 (2019-12-08)

#### :house: Internal

- [#10836](https://github.com/babel/babel/pull/10836) chore: add PR Revert labels to changelog [ci-skip] ([@JLHwung](https://github.com/JLHwung))

#### :leftwards_arrow_with_hook: Revert

- `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-regenerator`, `babel-plugin-transform-runtime`, `babel-preset-env`, `babel-runtime-corejs2`
  - [#10835](https://github.com/babel/babel/pull/10835) Revert "Add ".js" extension to injected polyfill imports" ([@JLHwung](https://github.com/JLHwung))

## v7.7.5 (2019-12-06)

#### :bug: Bug Fix

- `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-regenerator`, `babel-plugin-transform-runtime`, `babel-preset-env`, `babel-runtime-corejs2`
  - [#10549](https://github.com/babel/babel/pull/10549) Add ".js" extension to injected polyfill imports ([@shimataro](https://github.com/shimataro))
- `babel-cli`
  - [#10283](https://github.com/babel/babel/pull/10283) `babel --watch` should have equivalent file selection logic with `babel` ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#10801](https://github.com/babel/babel/pull/10801) Use scope flags to check arguments ([@JLHwung](https://github.com/JLHwung))
  - [#10800](https://github.com/babel/babel/pull/10800) Allow tuple rest trailing comma ([@yeonjuan](https://github.com/yeonjuan))
  - [#10475](https://github.com/babel/babel/pull/10475) Correctly disambiguate / after async fuctions ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`, `babel-plugin-proposal-optional-chaining`, `babel-plugin-transform-modules-amd`
  - [#10806](https://github.com/babel/babel/pull/10806) fix(optional chaining): Optional delete returns true with nullish base ([@mpaarating](https://github.com/mpaarating))
- `babel-helper-module-transforms`, `babel-plugin-transform-modules-amd`
  - [#10764](https://github.com/babel/babel/pull/10764) fix: rewriteBindingInitVisitor should skip on scopable node ([@JLHwung](https://github.com/JLHwung))

#### :nail_care: Polish

- `babel-plugin-transform-runtime`
  - [#10788](https://github.com/babel/babel/pull/10788) Do not transpile typeof helper with itself in babel/runtime ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`
  - [#10778](https://github.com/babel/babel/pull/10778) refactor: Improve error message in @babel/core ([@jaroslav-kubicek](https://github.com/jaroslav-kubicek))

#### :house: Internal

- `babel-preset-env-standalone`
  - [#10779](https://github.com/babel/babel/pull/10779) Bundle standalone using rollup ([@JLHwung](https://github.com/JLHwung))
- Other
  - [#10781](https://github.com/babel/babel/pull/10781) Tune makefile scripts ([@JLHwung](https://github.com/JLHwung))
- `babel-helper-transform-fixture-test-runner`
  - [#10566](https://github.com/babel/babel/pull/10566) Incorrect trace position in fixture runner ([@JLHwung](https://github.com/JLHwung))

## v7.7.4 (2019-11-23)

#### :bug: Bug Fix

- `babel-runtime-corejs2`, `babel-runtime-corejs3`, `babel-runtime`
  - [#10748](https://github.com/babel/babel/pull/10748) Add support for native esm to @babel/runtime. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-preset-env`
  - [#10742](https://github.com/babel/babel/pull/10742) Update preset-env mappings. ([@existentialism](https://github.com/existentialism))
- `babel-parser`
  - [#10737](https://github.com/babel/babel/pull/10737) Flow enums: fix enum body location. ([@gkz](https://github.com/gkz))
  - [#10657](https://github.com/babel/babel/pull/10657) Fix some incorrect typeof parsing in flow. ([@existentialism](https://github.com/existentialism))
  - [#10582](https://github.com/babel/babel/pull/10582) [parser] Allow optional async methods. ([@gonzarodriguezt](https://github.com/gonzarodriguezt))
  - [#10710](https://github.com/babel/babel/pull/10710) register import equals specifier. ([@JLHwung](https://github.com/JLHwung))
  - [#10592](https://github.com/babel/babel/pull/10592) Allow TypeScript type assertions in array destructuring. ([@SakibulMowla](https://github.com/SakibulMowla))
- `babel-preset-env-standalone`
  - [#10732](https://github.com/babel/babel/pull/10732) fix: add missing available plugins to babel-preset-env-standalone. ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-transform-function-name`, `babel-plugin-transform-modules-umd`, `babel-preset-env`
  - [#10701](https://github.com/babel/babel/pull/10701) Circumvent typeof transform for umd build template. ([@JLHwung](https://github.com/JLHwung))
- `babel-cli`
  - [#10698](https://github.com/babel/babel/pull/10698) Babel should not silently remove unknown options after commander arguments. ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-proposal-optional-chaining`
  - [#10694](https://github.com/babel/babel/pull/10694) Fix optional method chaining in derived classes. ([@Shriram-Balaji](https://github.com/Shriram-Balaji))
- `babel-parser`, `babel-types`
  - [#10677](https://github.com/babel/babel/pull/10677) Add `asserts this [is type]` parsing support. ([@JLHwung](https://github.com/JLHwung))
- `babel-traverse`
  - [#10598](https://github.com/babel/babel/pull/10598) Fix parentheses on replaceWithMultiple for JSX. ([@khoumani](https://github.com/khoumani))
- `babel-helpers`, `babel-plugin-proposal-object-rest-spread`, `babel-preset-env`
  - [#10683](https://github.com/babel/babel/pull/10683) Fix: Don't call Object.keys on non-objects (babel#10482). ([@chrishinrichs](https://github.com/chrishinrichs))

#### :nail_care: Polish

- `babel-plugin-proposal-nullish-coalescing-operator`
  - [#10720](https://github.com/babel/babel/pull/10720) polish: skip creating extra reference for safely re-used node. ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal

- Other
  - [#10731](https://github.com/babel/babel/pull/10731) Removed duplicate key in package.json. ([@rajasekarm](https://github.com/rajasekarm))
  - [#10718](https://github.com/babel/babel/pull/10718) chore: use loose mode of transform. ([@JLHwung](https://github.com/JLHwung))
  - [#10579](https://github.com/babel/babel/pull/10579) Implement PR workflow for running test262 on babel PRs. ([@jbhoosreddy](https://github.com/jbhoosreddy))
  - [#10648](https://github.com/babel/babel/pull/10648) bump @babel/\* dev dependencies. ([@JLHwung](https://github.com/JLHwung))
  - [#10569](https://github.com/babel/babel/pull/10569) E2E test Babel with itself before publishing. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`
  - [#10668](https://github.com/babel/babel/pull/10668) Reduce standalone build size. ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-transform-literals`, `babel-preset-env-standalone`
  - [#10725](https://github.com/babel/babel/pull/10725) fix typo [ci-skip]. ([@JLHwung](https://github.com/JLHwung))
- `babel-cli`
  - [#10692](https://github.com/babel/babel/pull/10692) Add missing flow type to babel-cli for consistency. ([@ZYSzys](https://github.com/ZYSzys))

## v7.7.3 (2019-11-08)

#### :bug: Bug Fix

- `babel-parser`
  - [#10682](https://github.com/babel/babel/pull/10682) Don't recover from "adjacent jsx elements" parser error ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.7.2 (2019-11-07)

#### :bug: Bug Fix

- `babel-parser`
  - [#10669](https://github.com/babel/babel/pull/10669) Parse arrows with params annotations in conditional expressions ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-transform-typescript`
  - [#10658](https://github.com/babel/babel/pull/10658) fix: remove accessibility of constructor ([@JLHwung](https://github.com/JLHwung))
- `babel-traverse`
  - [#10656](https://github.com/babel/babel/pull/10656) fix: add inList setter for compatibility with babel-minify ([@JLHwung](https://github.com/JLHwung))

## v7.7.1 (2019-11-05)

#### :bug: Bug Fix

- `babel-types`
  - [#10650](https://github.com/babel/babel/pull/10650) Revert "throw a TypeError if identifier validation fails (#10621)" ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-preset-env`
  - [#10649](https://github.com/babel/babel/pull/10649) Fix(babel-preset-env): check api.caller is a function to avoid to thr… ([@love2me](https://github.com/love2me))

## v7.7.0 (2019-11-05)

#### :eyeglasses: Spec Compliance

- `babel-types`
  - [#10621](https://github.com/babel/babel/pull/10621) throw a TypeError if identifier validation fails. ([@dentrado](https://github.com/dentrado))
- `babel-parser`
  - [#10559](https://github.com/babel/babel/pull/10559) fix: Exclude catch clause from let identifier error. ([@gonzarodriguezt](https://github.com/gonzarodriguezt))
  - [#10567](https://github.com/babel/babel/pull/10567) [parser] Exception to 8 and 9 in tagged template. ([@pnowak](https://github.com/pnowak))
  - [#10532](https://github.com/babel/babel/pull/10532) Allow duplicate **proto** keys in patterns, simple case (#6705). ([@alejo90](https://github.com/alejo90))

#### :rocket: New Feature

- `babel-generator`, `babel-helper-create-class-features-plugin`, `babel-parser`, `babel-plugin-transform-typescript`, `babel-preset-typescript`, `babel-types`
  - [#10545](https://github.com/babel/babel/pull/10545) Add support for TS declare modifier on fields. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`, `babel-parser`, `babel-preset-typescript`
  - [#10363](https://github.com/babel/babel/pull/10363) @babel/parser error recovery. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`
  - [#10599](https://github.com/babel/babel/pull/10599) Add support for .cjs config files. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#10501](https://github.com/babel/babel/pull/10501) Add support for babel.config.json. ([@devongovett](https://github.com/devongovett))
  - [#10361](https://github.com/babel/babel/pull/10361) feat: if code frame error is on a single line, highlight the whole path. ([@SimenB](https://github.com/SimenB))
- `babel-plugin-syntax-top-level-await`, `babel-preset-env`
  - [#10573](https://github.com/babel/babel/pull/10573) Create @babel/plugin-syntax-top-level-await. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-builder-react-jsx`, `babel-plugin-transform-react-jsx`, `babel-preset-react`
  - [#10572](https://github.com/babel/babel/pull/10572) [transform-react-jsx] Add useSpread option to transform JSX. ([@ivandevp](https://github.com/ivandevp))
- `babel-generator`, `babel-parser`, `babel-plugin-proposal-decorators`, `babel-plugin-syntax-flow`, `babel-types`
  - [#10344](https://github.com/babel/babel/pull/10344) Flow enums parsing. ([@gkz](https://github.com/gkz))
- `babel-plugin-transform-function-name`, `babel-plugin-transform-modules-umd`, `babel-preset-env`
  - [#10477](https://github.com/babel/babel/pull/10477) Changes UMD callsite to be more likely to pass in the intended object.. ([@MicahZoltu](https://github.com/MicahZoltu))
- `babel-parser`
  - [#10449](https://github.com/babel/babel/pull/10449) Create parser plugin "topLevelAwait". ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#10521](https://github.com/babel/babel/pull/10521) [parser] Enable "exportNamespaceFrom" by default. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#10483](https://github.com/babel/babel/pull/10483) [parser] Add support for private fields in TypeScript. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-generator`, `babel-parser`, `babel-types`
  - [#10543](https://github.com/babel/babel/pull/10543) add assertions signature for TypeScript. ([@tanhauhau](https://github.com/tanhauhau))
- `babel-cli`, `babel-register`
  - [#8622](https://github.com/babel/babel/pull/8622) Make dir for babel --out-file. ([@TrySound](https://github.com/TrySound))
- `babel-cli`
  - [#10399](https://github.com/babel/babel/pull/10399) Closes [#8326](https://github.com/babel/babel/issues/8326), add back --quiet option.. ([@chris-peng-1244](https://github.com/chris-peng-1244))

#### :bug: Bug Fix

- `babel-helpers`, `babel-plugin-proposal-async-generator-functions`, `babel-plugin-proposal-function-sent`, `babel-preset-env`
  - [#10422](https://github.com/babel/babel/pull/10422) Correctly delegate .return() in async generator. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-module-transforms`, `babel-plugin-transform-modules-commonjs`
  - [#10628](https://github.com/babel/babel/pull/10628) Don't throw when destructuring into a var named as an import. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-transform-modules-systemjs`
  - [#10638](https://github.com/babel/babel/pull/10638) fix: remove ExportNamedDeclaration when the specifier is empty. ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#10631](https://github.com/babel/babel/pull/10631) [TS] Parse calls with type args in optional chains. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#10607](https://github.com/babel/babel/pull/10607) fixed missing errors on assignment pattern in object expression. ([@vivek12345](https://github.com/vivek12345))
  - [#10594](https://github.com/babel/babel/pull/10594) [parser] Parse only modifiers of actual methods. ([@gonzarodriguezt](https://github.com/gonzarodriguezt))
- `babel-plugin-transform-typescript`
  - [#10555](https://github.com/babel/babel/pull/10555) [TS] Correctly transform computed strings and templates in enums. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`
  - [#10623](https://github.com/babel/babel/pull/10623) Fix: inputSourceMap should work when it is an external file. ([@JLHwung](https://github.com/JLHwung))
  - [#10539](https://github.com/babel/babel/pull/10539) fix: remove filename annotation in buildCodeFrameError. ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-proposal-decorators`
  - [#10578](https://github.com/babel/babel/pull/10578) [decorators] fix: support string literal properties. ([@mwhitworth](https://github.com/mwhitworth))
- `babel-helpers`, `babel-plugin-proposal-dynamic-import`, `babel-plugin-transform-modules-commonjs`, `babel-preset-env`
  - [#10574](https://github.com/babel/babel/pull/10574) fix: \_interopRequireWildcard should only cache objects. ([@samMeow](https://github.com/samMeow))
- `babel-traverse`
  - [#9777](https://github.com/babel/babel/pull/9777) [traverse] Allow skipping nodes inserted with .replaceWith(). ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-preset-env`
  - [#10146](https://github.com/babel/babel/pull/10146) Inject core-js@3 imports in Program:exit instead of on post(). ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-generator`
  - [#10519](https://github.com/babel/babel/pull/10519) Fix generator missing parens around an arrow returning function type. ([@existentialism](https://github.com/existentialism))
- `babel-plugin-transform-async-to-generator`, `babel-preset-env`, `babel-traverse`
  - [#9939](https://github.com/babel/babel/pull/9939) Don't use args rest/spread to hoist super method calls. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :nail_care: Polish

- `babel-plugin-transform-classes`, `babel-plugin-transform-regenerator`, `babel-preset-env`
  - [#9481](https://github.com/babel/babel/pull/9481) [preset-env] Don't use async-to-generator when already using regenerator. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helpers`, `babel-plugin-transform-modules-commonjs`, `babel-preset-env`
  - [#10585](https://github.com/babel/babel/pull/10585) fix(babel‑helpers/interopRequireWildcard): Avoid double nullish check. ([@ExE-Boss](https://github.com/ExE-Boss))
- `babel-register`
  - [#10557](https://github.com/babel/babel/pull/10557) fix: disable caching when babel could not read/write cache. ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal

- `babel-cli`, `babel-node`
  - [#10619](https://github.com/babel/babel/pull/10619) chore: remove output-file-sync dependency. ([@JLHwung](https://github.com/JLHwung))
- `babel-register`
  - [#10614](https://github.com/babel/babel/pull/10614) chore: bump source-map-support to 0.5.14. ([@JLHwung](https://github.com/JLHwung))
- `babel-helper-create-regexp-features-plugin`, `babel-plugin-proposal-unicode-property-regex`, `babel-plugin-transform-dotall-regex`, `babel-plugin-transform-named-capturing-groups-regex`, `babel-plugin-transform-unicode-regex`, `babel-preset-env`
  - [#10447](https://github.com/babel/babel/pull/10447) Merge multiple regex transform plugin. ([@JLHwung](https://github.com/JLHwung))
- `babel-preset-env`
  - [#10612](https://github.com/babel/babel/pull/10612) chore: update web.immediate support fixtures. ([@JLHwung](https://github.com/JLHwung))
- `babel-helper-module-imports`
  - [#10608](https://github.com/babel/babel/pull/10608) Use .find instead of .filter to get targetPath in ImportInjector. ([@Andarist](https://github.com/Andarist))
- Other
  - [#10600](https://github.com/babel/babel/pull/10600) Test node@13 on circle. ([@existentialism](https://github.com/existentialism))
  - [#10593](https://github.com/babel/babel/pull/10593) chore: replace outdated travis-ci.org badges [ci skip]. ([@JLHwung](https://github.com/JLHwung))
  - [#10591](https://github.com/babel/babel/pull/10591) chore: test against Node.js 13. ([@JLHwung](https://github.com/JLHwung))
  - [#10556](https://github.com/babel/babel/pull/10556) Add master branch workflow for test262 tests. ([@jbhoosreddy](https://github.com/jbhoosreddy))
  - [#10553](https://github.com/babel/babel/pull/10553) chore: introduce envinfo into environment section. ([@JLHwung](https://github.com/JLHwung))
- `babel-runtime`
  - [#10418](https://github.com/babel/babel/pull/10418) docs: add homepage link. ([@DanArthurGallagher](https://github.com/DanArthurGallagher))
- `babel-helper-annotate-as-pure`, `babel-helper-bindify-decorators`, `babel-helper-builder-binary-assignment-operator-visitor`, `babel-helper-builder-react-jsx`, `babel-helper-call-delegate`, `babel-helper-define-map`, `babel-helper-explode-assignable-expression`, `babel-helper-explode-class`, `babel-helper-function-name`, `babel-helper-get-function-arity`, `babel-helper-hoist-variables`, `babel-helper-member-expression-to-functions`, `babel-helper-module-imports`, `babel-helper-module-transforms`, `babel-helper-optimise-call-expression`, `babel-helper-remap-async-to-generator`, `babel-helper-replace-supers`, `babel-helper-simple-access`, `babel-helper-split-export-declaration`, `babel-helper-wrap-function`, `babel-helpers`, `babel-template`
  - [#10568](https://github.com/babel/babel/pull/10568) Bump babel-types to ^7.6.3. ([@JLHwung](https://github.com/JLHwung))

#### :running_woman: Performance

- `babel-traverse`
  - [#10480](https://github.com/babel/babel/pull/10480) Traverse performance. ([@JLHwung](https://github.com/JLHwung))

## v7.6.4 (2019-10-10)

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#10491](https://github.com/babel/babel/pull/10491) Trailing comma after rest - The final fix ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :bug: Bug Fix

- `babel-cli`, `babel-core`, `babel-generator`, `babel-helper-transform-fixture-test-runner`
  - [#10536](https://github.com/babel/babel/pull/10536) Revert "chore: Upgrade source-map to 0.6.1 (#10446)" ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.6.3 (2019-10-08)

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#10469](https://github.com/babel/babel/pull/10469) Disallow await inside async arrow params ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#10493](https://github.com/babel/babel/pull/10493) [parser] Disallow numeric separators in legacy octal like integers ([@gonzarodriguezt](https://github.com/gonzarodriguezt))

#### :rocket: New Feature

- `babel-types`
  - [#10504](https://github.com/babel/babel/pull/10504) Add declarations for more of @babel/types exports ([@Jessidhia](https://github.com/Jessidhia))

#### :bug: Bug Fix

- `babel-plugin-transform-block-scoping`
  - [#10343](https://github.com/babel/babel/pull/10343) Do not remove let bindings even they are wrapped in closure ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`
  - [#10119](https://github.com/babel/babel/pull/10119) add scope to TSModuleDeclaration ([@tanhauhau](https://github.com/tanhauhau))
  - [#10332](https://github.com/babel/babel/pull/10332) Do not allow member expressions to start async arrows ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#10490](https://github.com/babel/babel/pull/10490) [parser] Don't crash on comment after trailing comma after elision ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-transform-react-constant-elements`, `babel-traverse`
  - [#10529](https://github.com/babel/babel/pull/10529) Do not hoist jsx referencing a mutable binding ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-generator`, `babel-parser`, `babel-plugin-transform-block-scoping`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-flow-strip-types`, `babel-plugin-transform-typescript`
  - [#10220](https://github.com/babel/babel/pull/10220) Flow: interface identifier should be declared in the scope ([@JLHwung](https://github.com/JLHwung))

#### :nail_care: Polish

- `babel-core`
  - [#10419](https://github.com/babel/babel/pull/10419) assertNoDuplicates throw with more context ([@hjdivad](https://github.com/hjdivad))
  - [#10511](https://github.com/babel/babel/pull/10511) Add filename to transform error ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal

- Other
  - [#10506](https://github.com/babel/babel/pull/10506) Use `make -j` for parallel build ([@JLHwung](https://github.com/JLHwung))
  - [#10443](https://github.com/babel/babel/pull/10443) perf: only apply lazy cjs module transform on cli and core ([@JLHwung](https://github.com/JLHwung))
  - [#10494](https://github.com/babel/babel/pull/10494) Enable optional chaining and nullish coalescing plugins ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-cli`, `babel-core`, `babel-generator`, `babel-helper-fixtures`, `babel-helper-transform-fixture-test-runner`, `babel-node`, `babel-plugin-transform-react-jsx-source`, `babel-plugin-transform-runtime`, `babel-preset-env`, `babel-preset-react`
  - [#10249](https://github.com/babel/babel/pull/10249) Add windows to travis ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :running_woman: Performance

- `babel-parser`
  - [#10371](https://github.com/babel/babel/pull/10371) perf: replace lookahead by lookaheadCharCode ([@JLHwung](https://github.com/JLHwung))
- Other
  - [#10443](https://github.com/babel/babel/pull/10443) perf: only apply lazy cjs module transform on cli and core ([@JLHwung](https://github.com/JLHwung))

## v7.6.2 (2019-09-23)

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#10472](https://github.com/babel/babel/pull/10472) added check to disallow super.private variable access and test case added. ([@vivek12345](https://github.com/vivek12345))
  - [#10468](https://github.com/babel/babel/pull/10468) [parser] Disallow numeric separator in unicode scape sequences. ([@ivandevp](https://github.com/ivandevp))
  - [#10467](https://github.com/babel/babel/pull/10467) [parser] Invalid NonOctal Decimal. ([@gonzarodriguezt](https://github.com/gonzarodriguezt))
  - [#10461](https://github.com/babel/babel/pull/10461) [parser] Disallow static fields named `constructor`. ([@guywaldman](https://github.com/guywaldman))
  - [#10455](https://github.com/babel/babel/pull/10455) [parser] Report escapes in kws only if they won't be used as identifiers. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :bug: Bug Fix

- `babel-parser`
  - [#10445](https://github.com/babel/babel/pull/10445) Leave trailing comments after handling a possible trailing comma. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-cli`
  - [#10400](https://github.com/babel/babel/pull/10400) fix: allow the process to exit naturally. ([@JLHwung](https://github.com/JLHwung))
- `babel-core`
  - [#10402](https://github.com/babel/babel/pull/10402) fix: pass optionLoc when validating plugin object. ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-transform-block-scoping`, `babel-plugin-transform-spread`, `babel-traverse`
  - [#10417](https://github.com/babel/babel/pull/10417) Do not guess relative execution status for exported fns. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-proposal-object-rest-spread`, `babel-preset-env`
  - [#10275](https://github.com/babel/babel/pull/10275) fix object rest in array pattern. ([@tanhauhau](https://github.com/tanhauhau))

#### :house: Internal

- `babel-plugin-transform-named-capturing-groups-regex`
  - [#10430](https://github.com/babel/babel/pull/10430) refactor: replace regexp-tree by regexpu. ([@JLHwung](https://github.com/JLHwung))
- Other
  - [#10441](https://github.com/babel/babel/pull/10441) Update GitHub actions to v2. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#10427](https://github.com/babel/babel/pull/10427) chore: add lint-ts rule. ([@JLHwung](https://github.com/JLHwung))
- `babel-helper-fixtures`
  - [#10428](https://github.com/babel/babel/pull/10428) chore: remove tryResolve dependency. ([@JLHwung](https://github.com/JLHwung))
- `babel-node`
  - [#10429](https://github.com/babel/babel/pull/10429) Remove babel polyfill dependency of babel-node. ([@bdwain](https://github.com/bdwain))
- `babel-generator`, `babel-helper-fixtures`
  - [#10420](https://github.com/babel/babel/pull/10420) chore: remove trim-right dependency. ([@JLHwung](https://github.com/JLHwung))
- `babel-core`, `babel-plugin-transform-runtime`, `babel-register`
  - [#10405](https://github.com/babel/babel/pull/10405) Remove circular dependency. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :running_woman: Performance

- `babel-parser`
  - [#10421](https://github.com/babel/babel/pull/10421) Miscellaneous perf tweak. ([@JLHwung](https://github.com/JLHwung))

## v7.6.1 (2019-09-06)

#### :bug: Bug Fix

- `babel-types`
  - [#10404](https://github.com/babel/babel/pull/10404) fix(types): correct typescript function headers ([@forstermatth](https://github.com/forstermatth))
- `babel-node`
  - [#9758](https://github.com/babel/babel/pull/9758) Remove process.exit(1) from babel-node ([@dword-design](https://github.com/dword-design))

## v7.6.0 (2019-09-06)

#### :eyeglasses: Spec Compliance

- `babel-generator`, `babel-parser`
  - [#10269](https://github.com/babel/babel/pull/10269) Fix parenthesis for nullish coalescing ([@vivek12345](https://github.com/vivek12345))
- `babel-helpers`, `babel-plugin-transform-block-scoping`, `babel-traverse`
  - [#9498](https://github.com/babel/babel/pull/9498) Fix tdz checks in transform-block-scoping plugin ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :rocket: New Feature

- `babel-core`
  - [#10181](https://github.com/babel/babel/pull/10181) feat(errors): validate preset when filename is absent ([@JLHwung](https://github.com/JLHwung))
- `babel-helper-create-class-features-plugin`, `babel-helpers`, `babel-plugin-proposal-private-methods`
  - [#10217](https://github.com/babel/babel/pull/10217) Class Private Static Accessors ([@tim-mc](https://github.com/tim-mc))
- `babel-generator`, `babel-parser`, `babel-types`
  - [#10148](https://github.com/babel/babel/pull/10148) V8intrinsic syntax plugin ([@JLHwung](https://github.com/JLHwung))
- `babel-preset-typescript`
  - [#10382](https://github.com/babel/babel/pull/10382) Allow setting 'allowNamespaces' in typescript preset ([@dsgkirkby](https://github.com/dsgkirkby))
- `babel-parser`
  - [#10352](https://github.com/babel/babel/pull/10352) Do not register ambient classes to the TS scope ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-types`
  - [#10248](https://github.com/babel/babel/pull/10248) Add static to class property builder ([@yuri-karadzhov](https://github.com/yuri-karadzhov))

#### :bug: Bug Fix

- `babel-helpers`, `babel-plugin-transform-destructuring`, `babel-plugin-transform-modules-commonjs`, `babel-preset-env`
  - [#10396](https://github.com/babel/babel/pull/10396) fix: early return when instance is not iterable ([@JLHwung](https://github.com/JLHwung))
- `babel-plugin-transform-runtime`
  - [#10398](https://github.com/babel/babel/pull/10398) Add supports for polyfill computed methods ([@rhyzx](https://github.com/rhyzx))
- `babel-preset-env`
  - [#10397](https://github.com/babel/babel/pull/10397) Don't polyfill when evaluation is not confident ([@rhyzx](https://github.com/rhyzx))
  - [#10218](https://github.com/babel/babel/pull/10218) [preset-env] Include / exclude module plugins properly ([@AdamRamberg](https://github.com/AdamRamberg))
  - [#10284](https://github.com/babel/babel/pull/10284) Replace es.string.reverse with es.array.reverse ([@epicfaace](https://github.com/epicfaace))
- `babel-plugin-transform-named-capturing-groups-regex`
  - [#10395](https://github.com/babel/babel/pull/10395) fix: transform name capturing regex once ([@JLHwung](https://github.com/JLHwung))
- `babel-types`
  - [#10098](https://github.com/babel/babel/pull/10098) fix typescript for babel-types ([@tanhauhau](https://github.com/tanhauhau))
  - [#10319](https://github.com/babel/babel/pull/10319) Add a builder definition including name for tsTypeParameter ([@deificx](https://github.com/deificx))
- `babel-parser`
  - [#10380](https://github.com/babel/babel/pull/10380) Refactor trailing comment adjustment ([@banga](https://github.com/banga))
  - [#10369](https://github.com/babel/babel/pull/10369) Retain trailing comments in array expressions ([@banga](https://github.com/banga))
  - [#10292](https://github.com/babel/babel/pull/10292) fix: assign trailing comment to ObjectProperty only when inside an ObjectExpression ([@JLHwung](https://github.com/JLHwung))
- `babel-parser`, `babel-types`
  - [#10366](https://github.com/babel/babel/pull/10366) Don't allow JSXNamespacedName to chain ([@jridgewell](https://github.com/jridgewell))
- `babel-generator`, `babel-plugin-transform-typescript`, `babel-types`
  - [#10341](https://github.com/babel/babel/pull/10341) Add TSBigIntKeyword to @babel/types ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`, `babel-types`
  - [#9960](https://github.com/babel/babel/pull/9960) Do not delete "fake" source map comments from strings ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-transform-flow-comments`
  - [#10329](https://github.com/babel/babel/pull/10329) Fix flow comments plugin issues ([@zaygraveyard](https://github.com/zaygraveyard))
- `babel-helpers`, `babel-plugin-transform-react-constant-elements`
  - [#10307](https://github.com/babel/babel/pull/10307) [fix] jsx helper calls order ([@Sinewyk](https://github.com/Sinewyk))
- `babel-plugin-proposal-decorators`
  - [#10302](https://github.com/babel/babel/pull/10302) fix: register inserted class declaration ([@thiagoarrais](https://github.com/thiagoarrais))
- `babel-plugin-proposal-do-expressions`, `babel-traverse`
  - [#10070](https://github.com/babel/babel/pull/10070) Do expressions transform for switch statements ([@tanhauhau](https://github.com/tanhauhau))
  - [#10277](https://github.com/babel/babel/pull/10277) remove finally from completion record in try statement ([@tanhauhau](https://github.com/tanhauhau))
- `babel-helpers`, `babel-plugin-transform-named-capturing-groups-regex`
  - [#10136](https://github.com/babel/babel/pull/10136) fix capturing group for matchAll ([@tanhauhau](https://github.com/tanhauhau))

#### :nail_care: Polish

- `babel-plugin-transform-runtime`, `babel-preset-env`
  - [#10372](https://github.com/babel/babel/pull/10372) Don't allow instance properties transformation on namespace ([@rhyzx](https://github.com/rhyzx))

#### :memo: Documentation

- [#10313](https://github.com/babel/babel/pull/10313) Adds note about two approval policy to PR template ([@thiagoarrais](https://github.com/thiagoarrais))

#### :house: Internal

- `babel-register`
  - [#9847](https://github.com/babel/babel/pull/9847) Remove core-js dependency from @babel/register ([@coreyfarrell](https://github.com/coreyfarrell))
- `babel-helper-fixtures`, `babel-helper-transform-fixture-test-runner`, `babel-preset-env`
  - [#10401](https://github.com/babel/babel/pull/10401) Use "validateLogs" for preset-env's debug fixtures ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`
  - [#10380](https://github.com/babel/babel/pull/10380) Refactor trailing comment adjustment ([@banga](https://github.com/banga))
- `babel-helper-fixtures`, `babel-helper-transform-fixture-test-runner`, `babel-plugin-proposal-dynamic-import`, `babel-preset-env`
  - [#10326](https://github.com/babel/babel/pull/10326) Allow testing logs with `@babel/helper-transform-fixture-test-runner` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-runtime-corejs2`, `babel-runtime`, `babel-types`
  - [#10331](https://github.com/babel/babel/pull/10331) Commit generated code ([@JLHwung](https://github.com/JLHwung))
- `babel-cli`, `babel-core`, `babel-generator`, `babel-helper-create-class-features-plugin`, `babel-helper-fixtures`, `babel-node`, `babel-parser`, `babel-plugin-proposal-do-expressions`, `babel-plugin-proposal-pipeline-operator`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-runtime`, `babel-preset-env`, `babel-standalone`, `babel-template`, `babel-traverse`, `babel-types`
  - [#10228](https://github.com/babel/babel/pull/10228) Update dev dependencies and fix linting errors ([@danez](https://github.com/danez))
- `babel-cli`
  - [#10244](https://github.com/babel/babel/pull/10244) added flow to babel cli ([@Letladi](https://github.com/Letladi))

#### :running_woman: Performance

- `babel-helpers`, `babel-plugin-transform-modules-commonjs`, `babel-preset-env`
  - [#10161](https://github.com/babel/babel/pull/10161) Improves the logic to import objects in helpers ([@ifsnow](https://github.com/ifsnow))
- `babel-traverse`
  - [#10243](https://github.com/babel/babel/pull/10243) perf: always return `void 0` as undefined node ([@JLHwung](https://github.com/JLHwung))

## v7.5.5 (2019-07-17)

#### :bug: Bug Fix

- `babel-code-frame`
  - [#10211](https://github.com/babel/babel/pull/10211) fix code-frame marker with highlighting ([@tanhauhau](https://github.com/tanhauhau))
- `babel-plugin-proposal-object-rest-spread`
  - [#10200](https://github.com/babel/babel/pull/10200) Workaround #10179 in proposal-object-rest-spread ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-types`
  - [#10198](https://github.com/babel/babel/pull/10198) add assertShape to validate templateElement ([@tanhauhau](https://github.com/tanhauhau))
- `babel-helper-create-class-features-plugin`, `babel-helper-member-expression-to-functions`, `babel-helper-replace-supers`, `babel-helpers`, `babel-plugin-proposal-class-properties`, `babel-plugin-transform-classes`, `babel-plugin-transform-object-super`, `babel-types`
  - [#10017](https://github.com/babel/babel/pull/10017) destructuring private fields with array pattern / object pattern ([@tanhauhau](https://github.com/tanhauhau))
- `babel-plugin-transform-flow-comments`
  - [#9901](https://github.com/babel/babel/pull/9901) fix transform-flow-comments for import types ([@tanhauhau](https://github.com/tanhauhau))
- `babel-core`, `babel-helpers`
  - [#10208](https://github.com/babel/babel/pull/10208) always throw when add missing helpers ([@tanhauhau](https://github.com/tanhauhau))
- `babel-plugin-transform-runtime`
  - [#10207](https://github.com/babel/babel/pull/10207) Closes [#10205](https://github.com/babel/babel/issues/10205) ([@sag1v](https://github.com/sag1v))
- `babel-helpers`, `babel-plugin-transform-instanceof`
  - [#10197](https://github.com/babel/babel/pull/10197) fix: custom instOfHandler result should be cast to boolean ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal

- `babel-parser`, `babel-plugin-transform-typescript`
  - [#10014](https://github.com/babel/babel/pull/10014) Use correct extension for typescript fixtures ([@danez](https://github.com/danez))

#### :running_woman: Performance

- `babel-helpers`, `babel-plugin-proposal-object-rest-spread`, `babel-preset-env`
  - [#10189](https://github.com/babel/babel/pull/10189) perf: match ownKeys perf to the one of objectSpread ([@JLHwung](https://github.com/JLHwung))

## v7.5.4 (2019-07-09)

#### :bug: Bug Fix

- `babel-helpers`, `babel-plugin-proposal-object-rest-spread`, `babel-preset-env`
  - [#10188](https://github.com/babel/babel/pull/10188) Fix \_objectSpread2 for real ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.5.3 (2019-07-09)

#### :bug: Bug Fix

- `babel-helpers`, `babel-plugin-proposal-object-rest-spread`, `babel-preset-env`
  - [#10180](https://github.com/babel/babel/pull/10180) [_objectSpread2] Do not use hoisted var from prev iteration ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.5.2 (2019-07-08)

#### :bug: Bug Fix

- `babel-plugin-transform-typescript`
  - [#10174](https://github.com/babel/babel/pull/10174) Do not trust Scope when removing TypeScript types ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helpers`, `babel-plugin-proposal-object-rest-spread`, `babel-preset-env`
  - [#10171](https://github.com/babel/babel/pull/10171) Don't rely on getOwnPropertyDescriptors in objectSpread2 ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-proposal-export-default-from`, `babel-plugin-proposal-export-namespace-from`
  - [#10172](https://github.com/babel/babel/pull/10172) fix: register injected importDeclaration ([@JLHwung](https://github.com/JLHwung))

## v7.5.1 (2019-07-06)

#### :bug: Bug Fix

- `babel-helpers`, `babel-plugin-proposal-object-rest-spread`
  - [#10170](https://github.com/babel/babel/pull/10170) Fix objectSpread2 backward compatibility ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-transform-typescript`
  - [#10167](https://github.com/babel/babel/pull/10167) Retain typescript export-from-source ([@Wolvereness](https://github.com/Wolvereness))

## v7.5.0 (2019-07-04)

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#10099](https://github.com/babel/babel/pull/10099) Disallow "let" as name at lexical bindings ([@g-plane](https://github.com/g-plane))

#### :rocket: New Feature

- `babel-parser`
  - [#10091](https://github.com/babel/babel/pull/10091) BigInt type for Flow ([@tanhauhau](https://github.com/tanhauhau))
  - [#9450](https://github.com/babel/babel/pull/9450) Implement f# pipeline in parser ([@mAAdhaTTah](https://github.com/mAAdhaTTah))
  - [#9912](https://github.com/babel/babel/pull/9912) [legacy decorators] Allow decorating generator methods ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#9864](https://github.com/babel/babel/pull/9864) [@babel/parser] Add "allowUndeclaredExports" option ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-proposal-dynamic-import`, `babel-preset-env-standalone`, `babel-preset-env`
  - [#10109](https://github.com/babel/babel/pull/10109) Add @babel/plugin-proposal-dynamic-import to @babel/preset-env ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-proposal-dynamic-import`, `babel-plugin-transform-modules-amd`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-modules-systemjs`
  - [#9552](https://github.com/babel/babel/pull/9552) Create @babel/plugin-proposal-dynamic-import ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-proposal-pipeline-operator`, `babel-plugin-syntax-pipeline-operator`
  - [#9984](https://github.com/babel/babel/pull/9984) Transform for F# Pipeline ([@thiagoarrais](https://github.com/thiagoarrais))
- `babel-plugin-transform-typescript`, `babel-types`
  - [#9785](https://github.com/babel/babel/pull/9785) Implement TypeScript namespace support ([@Wolvereness](https://github.com/Wolvereness))

#### :bug: Bug Fix

- `babel-plugin-proposal-do-expressions`, `babel-traverse`
  - [#10072](https://github.com/babel/babel/pull/10072) fix await and yield for do expression ([@tanhauhau](https://github.com/tanhauhau))
- `babel-helpers`, `babel-plugin-transform-react-constant-elements`
  - [#10155](https://github.com/babel/babel/pull/10155) Added es3 backward compatibility for react helper code ([@sormy](https://github.com/sormy))
- `babel-preset-env`
  - [#10127](https://github.com/babel/babel/pull/10127) Bump compat-table and updating preset-env mappings ([@existentialism](https://github.com/existentialism))
  - [#8897](https://github.com/babel/babel/pull/8897) Allow `defaults` query in preset-env ([@existentialism](https://github.com/existentialism))
- `babel-parser`
  - [#10132](https://github.com/babel/babel/pull/10132) fix import typeof in declare module ([@tanhauhau](https://github.com/tanhauhau))
  - [#10084](https://github.com/babel/babel/pull/10084) flow - allow type parameter defaults in function declarations ([@tanhauhau](https://github.com/tanhauhau))
- `babel-types`
  - [#10126](https://github.com/babel/babel/pull/10126) fix exportKind declaration in babel-types ([@zxbodya](https://github.com/zxbodya))
- `babel-node`
  - [#9951](https://github.com/babel/babel/pull/9951) Prevents exception on PnP ([@arcanis](https://github.com/arcanis))
- `babel-generator`
  - [#10041](https://github.com/babel/babel/pull/10041) Fix printer for explicitly inexact Flow types ([@mrtnzlml](https://github.com/mrtnzlml))
- `babel-plugin-transform-typescript`
  - [#10034](https://github.com/babel/babel/pull/10034) Use scope for typescript export removals ([@Wolvereness](https://github.com/Wolvereness))
  - [#10019](https://github.com/babel/babel/pull/10019) fix(typescript): erase default export if exporting a TS type ([@airato](https://github.com/airato))
- `babel-helper-create-class-features-plugin`, `babel-plugin-proposal-class-properties`, `babel-traverse`
  - [#10029](https://github.com/babel/babel/pull/10029) Fixed computed keys for class expression ([@tanhauhau](https://github.com/tanhauhau))
- `babel-helpers`, `babel-plugin-proposal-object-rest-spread`, `babel-preset-env`
  - [#9384](https://github.com/babel/babel/pull/9384) Retry to fix object spread helper compatibility ([@saschanaz](https://github.com/saschanaz))
- `babel-plugin-transform-destructuring`
  - [#10013](https://github.com/babel/babel/pull/10013) fix destructuring rest with template literal ([@tanhauhau](https://github.com/tanhauhau))
- `babel-helper-create-class-features-plugin`, `babel-plugin-transform-typescript`
  - [#9610](https://github.com/babel/babel/pull/9610) Use `injectInitialization` to generate ts parameter properties ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :nail_care: Polish

- `babel-core`
  - [#10157](https://github.com/babel/babel/pull/10157) Fix incorrect usage of $o instead of %o in debug ([@ChlorideCull](https://github.com/ChlorideCull))
- `babel-helpers`
  - [#10117](https://github.com/babel/babel/pull/10117) Simplify the helpers for classPrivateField{Get,Set} ([@arv](https://github.com/arv))
- `babel-plugin-transform-typescript`
  - [#10047](https://github.com/babel/babel/pull/10047) Refactor isImportTypeOnly helper function ([@Andarist](https://github.com/Andarist))

#### :memo: Documentation

- `babel-plugin-proposal-partial-application`, `babel-plugin-syntax-partial-application`
  - [#10103](https://github.com/babel/babel/pull/10103) docs: update readmes ([@xtuc](https://github.com/xtuc))

## v7.4.5 (2019-05-21)

#### :bug: Bug Fix

- `babel-parser`
  - [#9998](https://github.com/babel/babel/pull/9998) Fix location for optional params in arrow functions ([@danez](https://github.com/danez))
  - [#9982](https://github.com/babel/babel/pull/9982) Avoid unnecessary work during lookahead ([@danez](https://github.com/danez))
  - [#9922](https://github.com/babel/babel/pull/9922) fix: allow shebang directive ([@tanhauhau](https://github.com/tanhauhau))
- `babel-preset-env`
  - [#10002](https://github.com/babel/babel/pull/10002) Update preset-env dependencies and fix fixtures ([@danez](https://github.com/danez))
  - [#9978](https://github.com/babel/babel/pull/9978) Fix mobile browsers support in preset-env ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#9902](https://github.com/babel/babel/pull/9902) Fix destructuring assignments being transpiled for edge 15 ([@eps1lon](https://github.com/eps1lon))
- `babel-plugin-transform-typescript`
  - [#9944](https://github.com/babel/babel/pull/9944) fix(typescript): erase type exports ([@airato](https://github.com/airato))

#### :nail_care: Polish

- `babel-parser`
  - [#9995](https://github.com/babel/babel/pull/9995) Do not use lookahead when parsing construct signature declarations in TS ([@danez](https://github.com/danez))
  - [#9989](https://github.com/babel/babel/pull/9989) Only compute Position if not already in state ([@danez](https://github.com/danez))
  - [#9988](https://github.com/babel/babel/pull/9988) Do not use lookahead when parsing jsx expression containers ([@danez](https://github.com/danez))
  - [#9987](https://github.com/babel/babel/pull/9987) Do not use lookahead when parsing imports in declare module in flow ([@danez](https://github.com/danez))
  - [#9985](https://github.com/babel/babel/pull/9985) Do not use lookahead when parsing declare module or declare module.exports in flow ([@danez](https://github.com/danez))
  - [#9983](https://github.com/babel/babel/pull/9983) Do not use lookahead when parsing dynamic import or import.meta ([@danez](https://github.com/danez))
  - [#9979](https://github.com/babel/babel/pull/9979) Remove guardedHandlers from ASTs ([@danez](https://github.com/danez))
- `babel-preset-env`
  - [#9992](https://github.com/babel/babel/pull/9992) use console.warn for warning ([@schu34](https://github.com/schu34))
- `babel-core`
  - [#9945](https://github.com/babel/babel/pull/9945) Fixed null error in plugin opts and added a test for it ([@divbhasin](https://github.com/divbhasin))
- `babel-core`, `babel-traverse`
  - [#9909](https://github.com/babel/babel/pull/9909) Add missing space in error messages ([@pnavarrc](https://github.com/pnavarrc))

#### :house: Internal

- `babel-node`
  - [#9914](https://github.com/babel/babel/pull/9914) [babel-node] Do not hardcode node flags ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.4.4 (2019-04-26)

#### :bug: Bug Fix

- `babel-plugin-transform-flow-comments`
  - [#9897](https://github.com/babel/babel/pull/9897) fix flow-comments - class type paramters and implements ([@tanhauhau](https://github.com/tanhauhau))
  - [#9893](https://github.com/babel/babel/pull/9893) fix flow-comment - object destructuring ([@tanhauhau](https://github.com/tanhauhau))
- `babel-parser`
  - [#9766](https://github.com/babel/babel/pull/9766) Add TS support to @babel/parser's Scope ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#9865](https://github.com/babel/babel/pull/9865) Always register global bindings as exportable ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#9887](https://github.com/babel/babel/pull/9887) Fix TypeScript readonly error location ([@existentialism](https://github.com/existentialism))
  - [#9869](https://github.com/babel/babel/pull/9869) ! remove constant context assertions ([@tanhauhau](https://github.com/tanhauhau))
  - [#9890](https://github.com/babel/babel/pull/9890) Fix parsing typescript bodiless methods with the estree plugin also enabled ([@devongovett](https://github.com/devongovett))
- `babel-traverse`
  - [#9870](https://github.com/babel/babel/pull/9870) Fix flow types in traverse/path/family and enable flow ([@danez](https://github.com/danez))
- `babel-plugin-proposal-class-properties`, `babel-plugin-transform-modules-commonjs`, `babel-types`
  - [#9861](https://github.com/babel/babel/pull/9861) Fix: PrivateName Identifier should not be isReferenced. ([@coreyfarrell](https://github.com/coreyfarrell))
- `babel-types`
  - [#9832](https://github.com/babel/babel/pull/9832) Fix typo in cloneNode. ([@evandervalk](https://github.com/evandervalk))

## v7.4.3 (2019-04-02)

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#9769](https://github.com/babel/babel/pull/9769) Don't accept '\08' or '\09' in strict mode. ([@danez](https://github.com/danez))
  - [#9768](https://github.com/babel/babel/pull/9768) Correctly check for-in and for-of loop for invalid left-hand side. ([@danez](https://github.com/danez))
  - [#9767](https://github.com/babel/babel/pull/9767) Parse right-hand-side of for/of as an assignment expression. ([@danez](https://github.com/danez))
  - [#9748](https://github.com/babel/babel/pull/9748) [typescript] parsing template literal as type . ([@tanhauhau](https://github.com/tanhauhau))

#### :rocket: New Feature

- `babel-plugin-transform-runtime`
  - [#9754](https://github.com/babel/babel/pull/9754) [runtime-corejs3] Only polyfill instance methods when it might be needed. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :bug: Bug Fix

- `babel-polyfill`
  - [#9780](https://github.com/babel/babel/pull/9780) Closes [#9232](https://github.com/babel/babel/issues/9232), add some missed modules to `@babel/polyfill/noConflict`. ([@zloirock](https://github.com/zloirock))
- `babel-cli`
  - [#9807](https://github.com/babel/babel/pull/9807) Upgrade lodash to 4.17.11. ([@danez](https://github.com/danez))
- `babel-helper-module-transforms`, `babel-plugin-transform-modules-commonjs`
  - [#9802](https://github.com/babel/babel/pull/9802) Fix lazy option of babel-plugin-transform-modules-commonjs. ([@AndreasCag](https://github.com/AndreasCag))
- `babel-helper-create-class-features-plugin`, `babel-plugin-proposal-private-methods`
  - [#9801](https://github.com/babel/babel/pull/9801) Fix super method call in private instance method calling overridden method. ([@MattiasBuelens](https://github.com/MattiasBuelens))
- `babel-plugin-proposal-object-rest-spread`, `babel-plugin-transform-destructuring`
  - [#9416](https://github.com/babel/babel/pull/9416) Destructuring: Fix handling of impure computed keys with object rest. ([@motiz88](https://github.com/motiz88))
- `babel-plugin-transform-destructuring`
  - [#9412](https://github.com/babel/babel/pull/9412) Destructuring: Fix array unpacking assignments with holes on RHS. ([@motiz88](https://github.com/motiz88))
- `babel-traverse`
  - [#9415](https://github.com/babel/babel/pull/9415) @babel/traverse: Fix NodePath.getData. ([@71](https://github.com/71))
- `babel-parser`
  - [#9760](https://github.com/babel/babel/pull/9760) Allow HTML comments on first line. ([@danez](https://github.com/danez))
  - [#9700](https://github.com/babel/babel/pull/9700) Fix compatibility between estree and TS plugin. ([@danez](https://github.com/danez))
- `babel-helpers`
  - [#9756](https://github.com/babel/babel/pull/9756) Allow coreJS Symbol to be type object. ([@conartist6](https://github.com/conartist6))
- `babel-preset-env`
  - [#9752](https://github.com/babel/babel/pull/9752) Normalize `core-js` entry points. ([@zloirock](https://github.com/zloirock))

#### :nail_care: Polish

- `babel-parser`
  - [#9762](https://github.com/babel/babel/pull/9762) Optimize parseBindingAtom code to get better error messages. ([@danez](https://github.com/danez))
- `babel-core`, `babel-plugin-transform-for-of`
  - [#9698](https://github.com/babel/babel/pull/9698) Move array reference into `for` head initializer. ([@danez](https://github.com/danez))

#### :house: Internal

- Other
  - [#9806](https://github.com/babel/babel/pull/9806) Update test262. ([@danez](https://github.com/danez))
- `babel-parser`, `babel-preset-typescript`
  - [#9761](https://github.com/babel/babel/pull/9761) Explicit labels for tokenTypes. ([@danez](https://github.com/danez))

## v7.4.2 (2019-03-21)

#### :bug: Bug Fix

- `babel-parser`
  - [#9725](https://github.com/babel/babel/pull/9725) Modules might be in loose mode when checking for undecl exports ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#9719](https://github.com/babel/babel/pull/9719) Fix scope checks with enabled flow plugin ([@danez](https://github.com/danez))
- `babel-helpers`, `babel-plugin-transform-named-capturing-groups-regex`
  - [#9726](https://github.com/babel/babel/pull/9726) Fix typo in wrapRegExp helper ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-preset-env`
  - [#9724](https://github.com/babel/babel/pull/9724) Closes [#9713](https://github.com/babel/babel/issues/9713) ([@zloirock](https://github.com/zloirock))

#### :nail_care: Polish

- `babel-preset-env`
  - [#9732](https://github.com/babel/babel/pull/9732) Mark the core-js warning as such ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#9716](https://github.com/babel/babel/pull/9716) Tweak preset-env corejs/useBuiltIns warning and error messages ([@existentialism](https://github.com/existentialism))

#### :house: Internal

- [#9718](https://github.com/babel/babel/pull/9718) Bump Babel deps ([@existentialism](https://github.com/existentialism))

## v7.4.1 (2019-03-20)

#### :bug: Bug Fix

- `babel-preset-env`
  - [#9711](https://github.com/babel/babel/pull/9711) Alias @babel/preset-env/data/built-ins.json.js ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#9709](https://github.com/babel/babel/pull/9709) Bring back isPluginRequired ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.4.0 (2019-03-19)

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#9529](https://github.com/babel/babel/pull/9529) Add `readonly` to TypeScript type modifier ([@tanhauhau](https://github.com/tanhauhau))
  - [#9534](https://github.com/babel/babel/pull/9534) TypeScript Constant contexts ([@tanhauhau](https://github.com/tanhauhau))
  - [#9637](https://github.com/babel/babel/pull/9637) Update identifier parsing per Unicode v12 ([@mathiasbynens](https://github.com/mathiasbynens))
  - [#9616](https://github.com/babel/babel/pull/9616) Allow any reserved word in `export {} from` specifiers ([@danez](https://github.com/danez))
  - [#9612](https://github.com/babel/babel/pull/9612) [TS] Disallow type casts in arrow parameters ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#9607](https://github.com/babel/babel/pull/9607) Refactor parsing object members ([@danez](https://github.com/danez))
  - [#9599](https://github.com/babel/babel/pull/9599) Disallow duplicate params in methods ([@danez](https://github.com/danez))
  - [#9586](https://github.com/babel/babel/pull/9586) Treat for loop body as part of loop scope ([@danez](https://github.com/danez))
- `babel-parser`, `babel-plugin-transform-typescript`
  - [#9641](https://github.com/babel/babel/pull/9641) Allow context type annotation on getters/setters ([@matt-tingen](https://github.com/matt-tingen))
- `babel-plugin-proposal-unicode-property-regex`, `babel-plugin-transform-dotall-regex`, `babel-plugin-transform-unicode-regex`
  - [#9636](https://github.com/babel/babel/pull/9636) Update babel-plugin-proposal-unicode-property-regex for Unicode v12 ([@mathiasbynens](https://github.com/mathiasbynens))
- `babel-generator`, `babel-parser`, `babel-plugin-transform-flow-strip-types`, `babel-plugin-transform-modules-systemjs`
  - [#9589](https://github.com/babel/babel/pull/9589) Check exported bindings are defined ([@danez](https://github.com/danez))
- `babel-generator`, `babel-parser`, `babel-plugin-transform-classes`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-flow-strip-types`, `babel-plugin-transform-new-target`
  - [#9493](https://github.com/babel/babel/pull/9493) Introduce scope tracking in the parser ([@danez](https://github.com/danez))

#### :rocket: New Feature

- `babel-helpers`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-decorators`, `babel-plugin-proposal-object-rest-spread`, `babel-plugin-transform-runtime`, `babel-plugin-transform-typescript`, `babel-polyfill`, `babel-preset-env`, `babel-register`, `babel-runtime-corejs2`, `babel-runtime-corejs3`
  - [#7646](https://github.com/babel/babel/pull/7646) Update to `core-js@3` ([@zloirock](https://github.com/zloirock))
- `babel-template`
  - [#9648](https://github.com/babel/babel/pull/9648) Add %%placeholders%% support to @babel/template ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`, `babel-plugin-proposal-partial-application`
  - [#9474](https://github.com/babel/babel/pull/9474) Partial application plugin ([@byara](https://github.com/byara))
- `babel-generator`, `babel-helper-create-class-features-plugin`, `babel-helpers`, `babel-plugin-proposal-private-methods`
  - [#9446](https://github.com/babel/babel/pull/9446) Private Static Class Methods (Stage 3) ([@tim-mc](https://github.com/tim-mc))
- `babel-generator`, `babel-types`
  - [#9542](https://github.com/babel/babel/pull/9542) Add placeholders support to @babel/types and @babel/generator ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`
  - [#9364](https://github.com/babel/babel/pull/9364) Add parser support for placeholders ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-generator`, `babel-parser`, `babel-plugin-syntax-partial-application`, `babel-types`
  - [#9343](https://github.com/babel/babel/pull/9343) Partial Application Syntax: Stage 1 ([@byara](https://github.com/byara))

#### :bug: Bug Fix

- `babel-helper-create-class-features-plugin`, `babel-helper-replace-supers`, `babel-plugin-proposal-private-methods`
  - [#9704](https://github.com/babel/babel/pull/9704) Fix `super` Method Calls in Class Private Methods ([@tim-mc](https://github.com/tim-mc))
- `babel-parser`
  - [#9699](https://github.com/babel/babel/pull/9699) Correctly parse TS TypeAssertions around arrow functions ([@danez](https://github.com/danez))
  - [#9600](https://github.com/babel/babel/pull/9600) Fix scope check for 2nd+ lexical bindings ([@danez](https://github.com/danez))
  - [#9593](https://github.com/babel/babel/pull/9593) [TS] Correctly forget `await`s after parsing async arrows with type args ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#9585](https://github.com/babel/babel/pull/9585) Fix strict mode prescanning with EmptyStatement ([@danez](https://github.com/danez))
- `babel-core`, `babel-plugin-transform-for-of`
  - [#9697](https://github.com/babel/babel/pull/9697) Correctly preserve reference to array in for-of loop ([@danez](https://github.com/danez))
- `babel-plugin-transform-typescript`
  - [#9693](https://github.com/babel/babel/pull/9693) [plugin-transform-typescript] Fix transpiling of TS abstract classes with decorators ([@agoldis](https://github.com/agoldis))
- `babel-traverse`, `babel-types`
  - [#9692](https://github.com/babel/babel/pull/9692) Fix TSFunctionType visitors definition ([@penielse](https://github.com/penielse))
- `babel-plugin-proposal-object-rest-spread`
  - [#9628](https://github.com/babel/babel/pull/9628) [proposal-object-rest-spread] fix templateLiteral in extractNormalizedKeys ([@pnowak](https://github.com/pnowak))
- `babel-plugin-transform-modules-systemjs`
  - [#9639](https://github.com/babel/babel/pull/9639) System modules - Hoist classes like other variables ([@guybedford](https://github.com/guybedford))
- `babel-generator`, `babel-parser`
  - [#9618](https://github.com/babel/babel/pull/9618) Disallow escape sequences in contextual keywords ([@danez](https://github.com/danez))
- `babel-helper-split-export-declaration`, `babel-plugin-transform-modules-commonjs`, `babel-traverse`
  - [#9613](https://github.com/babel/babel/pull/9613) Don't add params of anonymous exported function decls to the outer scope ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-transform-parameters`, `babel-plugin-transform-typescript`, `babel-types`
  - [#9605](https://github.com/babel/babel/pull/9605) [plugin-transform-typescript] Strip type imports used in Enums and object types ([@echenley](https://github.com/echenley))
- `babel-helper-call-delegate`, `babel-plugin-transform-parameters`
  - [#9601](https://github.com/babel/babel/pull/9601) Don't loose "this" in helper-call-delegate ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-proposal-object-rest-spread`, `babel-plugin-transform-modules-commonjs`, `babel-traverse`, `babel-types`
  - [#9492](https://github.com/babel/babel/pull/9492) Mark FOO in "var { x: FOO }˝ as a binding, not as a reference ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-preset-env`
  - [#9595](https://github.com/babel/babel/pull/9595) preset-env: Sort versions before determining lowest ([@jridgewell](https://github.com/jridgewell))
- `babel-helper-define-map`, `babel-helper-hoist-variables`, `babel-parser`, `babel-plugin-proposal-object-rest-spread`, `babel-plugin-transform-block-scoping`, `babel-plugin-transform-destructuring`, `babel-plugin-transform-modules-systemjs`, `babel-traverse`, `babel-types`
  - [#9518](https://github.com/babel/babel/pull/9518) Use `for..of Object.keys` instead of `for..in` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :nail_care: Polish

- `babel-parser`
  - [#9646](https://github.com/babel/babel/pull/9646) Remove input and length from state ([@danez](https://github.com/danez))
  - [#9645](https://github.com/babel/babel/pull/9645) Reorganize token types and use a map for them ([@danez](https://github.com/danez))
  - [#9591](https://github.com/babel/babel/pull/9591) Remove always false param allowExpressionBody ([@danez](https://github.com/danez))
- `babel-standalone`, `babel-types`
  - [#9025](https://github.com/babel/babel/pull/9025) Make babel-standalone an ESModule and enable flow ([@danez](https://github.com/danez))
- `babel-generator`
  - [#9579](https://github.com/babel/babel/pull/9579) change var name for coherence ([@tanohzana](https://github.com/tanohzana))

#### :house: Internal

- Other
  - [#9588](https://github.com/babel/babel/pull/9588) Publish to npm using a GitHub action ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#9640](https://github.com/babel/babel/pull/9640) Switch from rollup-stream to rollup ([@danez](https://github.com/danez))
  - [#9647](https://github.com/babel/babel/pull/9647) Add WarningsToErrorsPlugin to webpack to avoid missing build problems on CI ([@danez](https://github.com/danez))
  - [#9624](https://github.com/babel/babel/pull/9624) Update dependencies ([@danez](https://github.com/danez))
  - [#9623](https://github.com/babel/babel/pull/9623) Add editorconfig for Makefile ([@danez](https://github.com/danez))
  - [#9587](https://github.com/babel/babel/pull/9587) Update test262 ([@danez](https://github.com/danez))
  - [#9582](https://github.com/babel/babel/pull/9582) Minify bundles on circle for repl ([@danez](https://github.com/danez))
- `babel-register`
  - [#9678](https://github.com/babel/babel/pull/9678) Remove dependency on home-or-tmp package ([@AmirS](https://github.com/AmirS))

## v7.3.4 (2019-02-25)

#### :bug: Bug Fix

- `babel-parser`
  - [#9572](https://github.com/babel/babel/pull/9572) Fix TypeScript parsers missing token check (#9571) ([@elevatebart](https://github.com/elevatebart))
  - [#9521](https://github.com/babel/babel/pull/9521) Also check AssignmentPatterns for duplicate export name ([@danez](https://github.com/danez))
- `babel-helper-create-class-features-plugin`, `babel-helper-replace-supers`, `babel-plugin-proposal-class-properties`, `babel-traverse`
  - [#9508](https://github.com/babel/babel/pull/9508) Use correct "this" in static fields ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-preset-env`
  - [#9566](https://github.com/babel/babel/pull/9566) Closes [#9465](https://github.com/babel/babel/issues/9465) ([@zloirock](https://github.com/zloirock))
- `babel-types`
  - [#9539](https://github.com/babel/babel/pull/9539) babel-types is\* type checks accept null | undefiend as value TS type ([@ian-craig](https://github.com/ian-craig))
- `babel-plugin-transform-block-scoping`, `babel-traverse`
  - [#9532](https://github.com/babel/babel/pull/9532) Migrate some duplicate binding tests to traverse ([@danez](https://github.com/danez))
- `babel-generator`
  - [#9524](https://github.com/babel/babel/pull/9524) Fix typescript generator params ([@tanhauhau](https://github.com/tanhauhau))
  - [#9523](https://github.com/babel/babel/pull/9523) Fix flow babel-generator function parantheses ([@tanhauhau](https://github.com/tanhauhau))

#### :house: Internal

- Other
  - [#9561](https://github.com/babel/babel/pull/9561) Update CHANGELOG.md using the "Trigger GitHub release" action ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-proposal-object-rest-spread`, `babel-plugin-transform-modules-systemjs`
  - [#9541](https://github.com/babel/babel/pull/9541) Enable eqeqeq rule in eslint ([@danez](https://github.com/danez))
- `babel-generator`, `babel-parser`, `babel-plugin-transform-flow-strip-types`, `babel-traverse`
  - [#9522](https://github.com/babel/babel/pull/9522) Make tests spec compliant by avoiding duplicate declarations in input files ([@danez](https://github.com/danez))
- `babel-plugin-transform-proto-to-assign`
  - [#9533](https://github.com/babel/babel/pull/9533) Add import/no-extraneous-dependencies to ESLint ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.3.3 (2019-02-15)

#### :eyeglasses: Spec Compliance

- `babel-generator`
  - [#9501](https://github.com/babel/babel/pull/9501) Correctly output escapes in directives ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :bug: Bug Fix

- `babel-parser`
  - [#9477](https://github.com/babel/babel/pull/9477) Fix regression with let ([@danez](https://github.com/danez))
  - [#9431](https://github.com/babel/babel/pull/9431) Typescript function destructured params ([@mhcgrq](https://github.com/mhcgrq))
  - [#9463](https://github.com/babel/babel/pull/9463) Fix range for TypeScript optional parameter in arrow function ([@existentialism](https://github.com/existentialism))

#### :nail_care: Polish

- `babel-plugin-proposal-class-properties`, `babel-plugin-transform-classes`, `babel-plugin-transform-parameters`
  - [#9458](https://github.com/babel/babel/pull/9458) Fix duplicated assertThisInitialized calls in constructors ([@rubennorte](https://github.com/rubennorte))

#### :house: Internal

- Other
  - [#9517](https://github.com/babel/babel/pull/9517) Add duplicate-package-checker-webpack-plugin ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#9469](https://github.com/babel/babel/pull/9469) Exclude generate @babel/types files from coverage report ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`
  - [#9491](https://github.com/babel/babel/pull/9491) Better error output in parser tests ([@danez](https://github.com/danez))

## v7.3.2 (2019-02-04)

Various spec compliance fixes and better support for smart pipelines and private methods.

Thanks @gverni, @naffiq, @spondbob and @dstaley for their first PRs!

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#9403](https://github.com/babel/babel/pull/9403) Fix line continuation with Unicode line terminators. ([@danez](https://github.com/danez))
  - [#9400](https://github.com/babel/babel/pull/9400) Make yield a contextual keyword. ([@danez](https://github.com/danez))
  - [#9398](https://github.com/babel/babel/pull/9398) Correctly fail for invalid yield in for. ([@danez](https://github.com/danez))
  - [#9375](https://github.com/babel/babel/pull/9375) Make let a contextual keyword. ([@danez](https://github.com/danez))

#### :rocket: New Feature

- `babel-plugin-proposal-pipeline-operator`
  - [#9401](https://github.com/babel/babel/pull/9401) Support for await and yield in pipelines. ([@thiagoarrais](https://github.com/thiagoarrais))

#### :bug: Bug Fix

- `babel-plugin-proposal-private-methods`, `babel-types`
  - [#9453](https://github.com/babel/babel/pull/9453) Fix duplicate definition error in private class methods. ([@gverni](https://github.com/gverni))
- `babel-helper-create-class-features-plugin`, `babel-plugin-proposal-private-methods`
  - [#9423](https://github.com/babel/babel/pull/9423) Transform private async and generator functions. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-proposal-object-rest-spread`, `babel-plugin-transform-destructuring`
  - [#9414](https://github.com/babel/babel/pull/9414) Destructuring: Create assignments from ForX non-declaration patterns. ([@motiz88](https://github.com/motiz88))
- `babel-plugin-transform-typescript`
  - [#9095](https://github.com/babel/babel/pull/9095) Retain JSX pragma if defined as a comment. ([@dstaley](https://github.com/dstaley))
- `babel-parser`
  - [#9406](https://github.com/babel/babel/pull/9406) Fix location/range on TypeScript ExportNamedDeclarations. ([@existentialism](https://github.com/existentialism))
  - [#9371](https://github.com/babel/babel/pull/9371) Allow toplevel await with option and correctly mark await keyword as unexpected. ([@danez](https://github.com/danez))
- `babel-plugin-transform-typescript`, `babel-types`
  - [#8738](https://github.com/babel/babel/pull/8738) Fix typescript side effects. ([@yuri-karadzhov](https://github.com/yuri-karadzhov))
- `babel-generator`, `babel-types`
  - [#9396](https://github.com/babel/babel/pull/9396) Fix support for Flow's QualifiedTypeIdentifier. ([@existentialism](https://github.com/existentialism))

#### :nail_care: Polish

- `babel-parser`
  - [#9405](https://github.com/babel/babel/pull/9405) Simplify await and yield tracking in params. ([@danez](https://github.com/danez))
- `babel-parser`, `babel-preset-typescript`
  - [#9402](https://github.com/babel/babel/pull/9402) Unify reserved word checking and update error messages. ([@danez](https://github.com/danez))

## v7.3.1 (2019-01-22)

This release fixes some regressions introduced in v7.3.0

#### :bug: Bug Fix

- `babel-helpers`, `babel-plugin-proposal-object-rest-spread`, `babel-preset-env`
  - [#9379](https://github.com/babel/babel/pull/9379) Revert "Differentiate object spread and non-spread properties (#9341)". ([@danez](https://github.com/danez))
- `babel-parser`
  - [#9377](https://github.com/babel/babel/pull/9377) fix new keyword broken by recent refactoring. ([@danez](https://github.com/danez))

## v7.3.0 (2019-01-21)

Thanks to @jamesgeorge007 and @armano2 for their first PR!

#### :eyeglasses: Spec Compliance

- `babel-parser`
  - [#9314](https://github.com/babel/babel/pull/9314) Disallow async functions as loop body. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#9315](https://github.com/babel/babel/pull/9315) Parse class heritage as strict mode code. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#9313](https://github.com/babel/babel/pull/9313) Disallow `new import(x)` and `import(x,)`. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#9311](https://github.com/babel/babel/pull/9311) Disallow trailing comma after rest. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :rocket: New Feature

- `babel-helper-create-class-features-plugin`, `babel-helpers`, `babel-plugin-proposal-private-methods`
  - [#9101](https://github.com/babel/babel/pull/9101) Private Class Methods Stage 3: Private Accessors. ([@tim-mc](https://github.com/tim-mc))
- `babel-plugin-proposal-pipeline-operator`, `babel-plugin-syntax-pipeline-operator`
  - [#9179](https://github.com/babel/babel/pull/9179) Transform for the smart pipeline operator proposal. ([@thiagoarrais](https://github.com/thiagoarrais))
- `babel-preset-env-standalone`, `babel-preset-env`
  - [#9345](https://github.com/babel/babel/pull/9345) Add support for transform-named-capturing-groups-regex in preset-env. ([@existentialism](https://github.com/existentialism))
- `babel-helpers`, `babel-plugin-transform-named-capturing-groups-regex`
  - [#7105](https://github.com/babel/babel/pull/7105) Add @babel/plugin-transform-named-capturing-groups-regex. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-preset-env`
  - [#9323](https://github.com/babel/babel/pull/9323) Add support for proposal-json-strings in preset-env. ([@existentialism](https://github.com/existentialism))
- `babel-generator`, `babel-types`
  - [#9309](https://github.com/babel/babel/pull/9309) Add emit and builder for TSImportType. ([@hzoo](https://github.com/hzoo))
- `babel-parser`
  - [#9302](https://github.com/babel/babel/pull/9302) @babel/parser(ts): Add parsing of type import. ([@armano2](https://github.com/armano2))

#### :bug: Bug Fix

- `babel-parser`
  - [#9336](https://github.com/babel/babel/pull/9336) Disallow usage of invalid keyword after export abstract statement in Typescript. ([@armano2](https://github.com/armano2))
  - [#9328](https://github.com/babel/babel/pull/9328) Fix handling newline with TypeScript declare and abstract classes. ([@existentialism](https://github.com/existentialism))
  - [#9335](https://github.com/babel/babel/pull/9335) Fix range on TypeScript index signature parameters. ([@existentialism](https://github.com/existentialism))
  - [#9292](https://github.com/babel/babel/pull/9292) Throw error if TypeScript class has empty implements. ([@existentialism](https://github.com/existentialism))
  - [#9284](https://github.com/babel/babel/pull/9284) Fix location for typescript type assertions in AST. ([@danez](https://github.com/danez))
  - [#9276](https://github.com/babel/babel/pull/9276) Ensure modifiers are included in TSParameterProperty ranges. ([@existentialism](https://github.com/existentialism))
  - [#9230](https://github.com/babel/babel/pull/9230) babel-parser: typescript: add missing bigint keyword. ([@armano2](https://github.com/armano2))
- `babel-types`
  - [#9333](https://github.com/babel/babel/pull/9333) Copy "optional" property when cloning Identifier node. ([@unconfident](https://github.com/unconfident))
- `babel-helper-create-class-features-plugin`, `babel-helpers`, `babel-plugin-proposal-decorators`
  - [#9244](https://github.com/babel/babel/pull/9244) [decorators] Set method names at compile time instead of at runtime. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helper-builder-react-jsx`, `babel-plugin-transform-react-jsx`
  - [#9119](https://github.com/babel/babel/pull/9119) Revert "Revert babel-helper-builder-react-jsx change from #4988". ([@danez](https://github.com/danez))
- `babel-helper-create-class-features-plugin`, `babel-plugin-proposal-private-methods`
  - [#9248](https://github.com/babel/babel/pull/9248) [private methods] Define private methods before executing initializers. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-preset-env`
  - [#9219](https://github.com/babel/babel/pull/9219) Fix handling scoped packages in preset-env include/exclude options. ([@existentialism](https://github.com/existentialism))

#### :nail_care: Polish

- `babel-parser`
  - [#9348](https://github.com/babel/babel/pull/9348) Parser Performance Collection. ([@danez](https://github.com/danez))

#### :memo: Documentation

- [#9370](https://github.com/babel/babel/pull/9370) add v7 downloads [skip ci]. ([@hzoo](https://github.com/hzoo))

#### :house: Internal

- `babel-parser`
  - [#9312](https://github.com/babel/babel/pull/9312) Merge declaration and init of props in parser's state. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-types`
  - [#9245](https://github.com/babel/babel/pull/9245) [@babel/types] Moved generators related to babel-types into the babel-types package directory.. ([@cameron-martin](https://github.com/cameron-martin))
- Other
  - [#9288](https://github.com/babel/babel/pull/9288) Test262 update. ([@existentialism](https://github.com/existentialism))
  - [#9290](https://github.com/babel/babel/pull/9290) Use 2014-present in license. ([@xtuc](https://github.com/xtuc))
  - [#9271](https://github.com/babel/babel/pull/9271) Bump license years for 2019. ([@berlamhenderson](https://github.com/berlamhenderson))
- `babel-helpers`
  - [#9166](https://github.com/babel/babel/pull/9166) Add mixins support to the \_decorate helper. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.2.5 (2018-12-21)

`@babel/polyfill` didn't get published correctly in v7.2.3 (#9227).

## v7.2.4 (2018-12-20)

Minify `@babel/standalone` and `@babel/preset-env-standalone`.

## v7.2.3 (2018-12-20)

This is a small release, mainly to test Lerna 3.
We force-published `@babel/polyfill` and `@babel/preset-env`, since they should have been released respectively in v7.1.0 and v7.2.2 but for different reasons they didn't get updated.

Half of the commits in this release are made by first time contributors! Thanks to @cameron-martin, @cphamlet, @tanhauhau and @jedwards1211. :tada:

#### :rocket: New Feature

- [#9110](https://github.com/babel/babel/pull/9110) Added type-level mapping between aliases and nodes that have that alias. ([@cameron-martin](https://github.com/cameron-martin))

#### :bug: Bug Fix

- `babel-plugin-transform-flow-strip-types`
  - [#9197](https://github.com/babel/babel/pull/9197) Strips flow directive fully. ([@tanhauhau](https://github.com/tanhauhau))
- `babel-parser`
  - [#9184](https://github.com/babel/babel/pull/9184) Allow keywords to be used in type annotations. ([@danez](https://github.com/danez))

#### :house: Internal

- `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-decorators`, `babel-plugin-proposal-private-methods`, `babel-traverse`
  - [#9206](https://github.com/babel/babel/pull/9206) Use @babel/eslint-plugin-developement. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.2.2 (2018-12-15)

Mostly bug fixes and internal changes.
Thanks to @paleite, @saschanaz and @joeldenning for their first PRs!

#### :bug: Bug Fix

- `babel-plugin-transform-destructuring`, `babel-plugin-transform-spread`
  - [#9108](https://github.com/babel/babel/pull/9108) Correctly transform spreads to use proper concat method. ([@danez](https://github.com/danez))
- `babel-parser`
  - [#9168](https://github.com/babel/babel/pull/9168) [parser] Handle flow comments with leading spaces. ([@vikr01](https://github.com/vikr01))
- `babel-helper-module-transforms`, `babel-plugin-transform-modules-commonjs`
  - [#9171](https://github.com/babel/babel/pull/9171) Fix transforming empty export statement. ([@danez](https://github.com/danez))
- `babel-node`
  - [#9148](https://github.com/babel/babel/pull/9148) Fix --root-mode option in babel-node. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-transform-classes`
  - [#9135](https://github.com/babel/babel/pull/9135) Inherit properties in function from method in loose mode. ([@rubennorte](https://github.com/rubennorte))
- `babel-preset-env`
  - [#9140](https://github.com/babel/babel/pull/9140) Disable parameter-destructuring in Edge 18. ([@saschanaz](https://github.com/saschanaz))
- `babel-plugin-transform-arrow-functions`, `babel-traverse`
  - [#9060](https://github.com/babel/babel/pull/9060) Not depending on return value of super(). Closes [#9020](https://github.com/babel/babel/issues/9020).. ([@joeldenning](https://github.com/joeldenning))

#### :house: Internal

- `babel-helper-create-class-features-plugin`, `babel-plugin-proposal-nullish-coalescing-operator`, `babel-plugin-syntax-bigint`, `babel-plugin-transform-dotall-regex`
  - [#9176](https://github.com/babel/babel/pull/9176) Fix package.json repository URLs. ([@paleite](https://github.com/paleite))
- Other
  - [#9158](https://github.com/babel/babel/pull/9158) add triage label to new issues [skip ci]. ([@danez](https://github.com/danez))
  - [#9143](https://github.com/babel/babel/pull/9143) Fix a typo from the issue template for bugs. ([@saschanaz](https://github.com/saschanaz))
  - [#9133](https://github.com/babel/babel/pull/9133) Move to travis vm based builds. ([@danez](https://github.com/danez))
  - [#9132](https://github.com/babel/babel/pull/9132) Ensure we always use repository versions of babel dependencies in tests. ([@danez](https://github.com/danez))
  - [#9131](https://github.com/babel/babel/pull/9131) Update issue templates [skip ci]. ([@hzoo](https://github.com/hzoo))
- `babel-helper-create-class-features-plugin`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-decorators`
  - [#9059](https://github.com/babel/babel/pull/9059) Move decorators transform to @babel/helper-create-class-features-plugin. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`, `babel-parser`, `babel-template`
  - [#9128](https://github.com/babel/babel/pull/9128) Fix running flow on travis and update flow. ([@danez](https://github.com/danez))

## v7.2.1 (2018-12-04)

This release fixes a regression introduced in v7.2.0 (https://github.com/babel/babel/issues/9120)

#### :bug: Bug Fix

- `babel-helper-create-class-features-plugin`
  - [#9121](https://github.com/babel/babel/pull/9121) Don't use isClassPrivateMethod because it isn't supported in <7.2.0. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.2.0 (2018-12-03)

You can read more about this release at https://babeljs.io/blog/2018/12/03/7.2.0.

#### :rocket: New Feature

- `babel-parser`
  - [#8289](https://github.com/babel/babel/pull/8289) Implement Smart Pipeline proposal in @babel/parser. ([@mAAdhaTTah](https://github.com/mAAdhaTTah))
- `babel-core`
  - [#8986](https://github.com/babel/babel/pull/8986) Export @babel/parser#tokTypes in @babel/core. ([@kaicataldo](https://github.com/kaicataldo))
- `babel-node`
  - [#9078](https://github.com/babel/babel/pull/9078) Pass `rootMode` from `@babel/node`.. ([@wtgtybhertgeghgtwtg](https://github.com/wtgtybhertgeghgtwtg))
- `babel-generator`, `babel-helpers`, `babel-plugin-class-features`, `babel-plugin-proposal-private-methods`, `babel-plugin-syntax-class-properties`, `babel-types`
  - [#8654](https://github.com/babel/babel/pull/8654) Private class methods stage 3. ([@tim-mc](https://github.com/tim-mc))
- `babel-preset-env`
  - [#9048](https://github.com/babel/babel/pull/9048) Update mappings for node 10 in preset-env. ([@existentialism](https://github.com/existentialism))

#### :bug: Bug Fix

- `babel-parser`
  - [#9114](https://github.com/babel/babel/pull/9114) Parse non-octals with leading zeros in non strict mode correctly. ([@danez](https://github.com/danez))
  - [#9074](https://github.com/babel/babel/pull/9074) Disallow await inside arrow functions. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#9069](https://github.com/babel/babel/pull/9069) [flow] Allow type casts in array patterns inside arrow parameters. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#9058](https://github.com/babel/babel/pull/9058) Fix compatibility between typescript and jsx plugins in interface declarations. ([@danez](https://github.com/danez))
  - [#9055](https://github.com/babel/babel/pull/9055) Fix bug with parsing TS generic async arrow function. ([@existentialism](https://github.com/existentialism))
  - [#9035](https://github.com/babel/babel/pull/9035) Fix parsing typescript function types with destructuring. ([@danez](https://github.com/danez))
- `babel-helper-fixtures`, `babel-parser`
  - [#9113](https://github.com/babel/babel/pull/9113) Ignore empty fixture directories and fix fixtures in the parser. ([@danez](https://github.com/danez))
- `babel-preset-env`
  - [#9091](https://github.com/babel/babel/pull/9091) Update mapping for regex unicode plugin in preset-env. ([@existentialism](https://github.com/existentialism))
- `babel-plugin-transform-destructuring`
  - [#8916](https://github.com/babel/babel/pull/8916) Fix destructuring assignment in arrow functions without block. ([@RubenVerborgh](https://github.com/RubenVerborgh))
- `babel-plugin-proposal-optional-chaining`
  - [#9073](https://github.com/babel/babel/pull/9073) Microbouji patch/8136. ([@jridgewell](https://github.com/jridgewell))
- `babel-core`, `babel-helper-wrap-function`, `babel-plugin-proposal-async-generator-functions`, `babel-plugin-proposal-function-sent`, `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-classes`
  - [#9039](https://github.com/babel/babel/pull/9039) Fix recursive async function expressions. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-core`
  - [#9034](https://github.com/babel/babel/pull/9034) Normalize presets before merging config with others.. ([@loganfsmyth](https://github.com/loganfsmyth))

#### :nail_care: Polish

- `babel-generator`
  - [#9089](https://github.com/babel/babel/pull/9089) Remove unused variable. ([@Gcaufy](https://github.com/Gcaufy))
- `babel-node`
  - [#9079](https://github.com/babel/babel/pull/9079) Move `fs-readdir-recursive` and `output-file-sync` to `devDependencies` for `@babel/node`.. ([@wtgtybhertgeghgtwtg](https://github.com/wtgtybhertgeghgtwtg))
- `babel-parser`
  - [#9046](https://github.com/babel/babel/pull/9046) a better error message for disallowed trailing commas/additional parameters after rest elements in function params. ([@morozRed](https://github.com/morozRed))
- `babel-*`
  - [#8769](https://github.com/babel/babel/pull/8769) Add plugins name. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :house: Internal

- `babel-helper-create-class-features-plugin`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-private-methods`
  - [#9083](https://github.com/babel/babel/pull/9083) Make @babel/plugin-class-features a normal helper package. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- Other
  - [#9096](https://github.com/babel/babel/pull/9096) Add node 11 to CI and remove node 9. ([@danez](https://github.com/danez))
  - [#9094](https://github.com/babel/babel/pull/9094) Skip minifying standalone in non-publish runs. ([@danez](https://github.com/danez))
- `babel-types`
  - [#9093](https://github.com/babel/babel/pull/9093) Fix warning when using prettier in code generators. ([@danez](https://github.com/danez))
- `babel-generator`
  - [#9089](https://github.com/babel/babel/pull/9089) Remove unused variable. ([@Gcaufy](https://github.com/Gcaufy))

## v7.1.6 (2018-11-13)

#### :bug: Bug Fix

- `babel-generator`
  - [#9003](https://github.com/babel/babel/pull/9003) Fix retainLines regression for arrow functions. ([@loganfsmyth](https://github.com/loganfsmyth))
- `babel-types`
  - [#8997](https://github.com/babel/babel/pull/8997) Fix cloneNode with typeAnnotation.. ([@neoziro](https://github.com/neoziro))
- `babel-plugin-transform-flow-strip-types`, `babel-plugin-transform-react-jsx`
  - [#8701](https://github.com/babel/babel/pull/8701) Fix "TypeError: comments is not iterable". ([@AlicanC](https://github.com/AlicanC))
- `babel-core`
  - [#9004](https://github.com/babel/babel/pull/9004) Fix browser files to have the same API as the nodejs ones. ([@danez](https://github.com/danez))
- Other
  - [#9007](https://github.com/babel/babel/pull/9007) [Types] fix generated TS/Flow comment types. ([@ljqx](https://github.com/ljqx))
- `babel-preset-env`
  - [#8555](https://github.com/babel/babel/pull/8555) preset-env: fix `opera` from `esmodules` target and Browserslist not used. ([@ylemkimon](https://github.com/ylemkimon))
- `babel-plugin-proposal-decorators`, `babel-traverse`
  - [#8970](https://github.com/babel/babel/pull/8970) [decorators] Correctly insert `_initialize(this)` after `super()`.. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`
  - [#8972](https://github.com/babel/babel/pull/8972) Fix several edge cases with context expression state. ([@danez](https://github.com/danez))

#### :nail_care: Polish

- `babel-parser`
  - [#8984](https://github.com/babel/babel/pull/8984) Rename primitive types to reserved types. ([@danez](https://github.com/danez))

#### :house: Internal

- [#8982](https://github.com/babel/babel/pull/8982) fix publish command [skip ci]. ([@hzoo](https://github.com/hzoo))
- [#8988](https://github.com/babel/babel/pull/8988) Remove definition of micromatch which was removed.. ([@danez](https://github.com/danez))

## v7.1.5 (2018-11-06)

#### :eyeglasses: Spec Compliance

- `babel-parser`, `babylon`
  - [#7727](https://github.com/babel/babel/pull/7727) Fix await in function name and parameters. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :rocket: New Feature

- `babel-parser`
  - [#8828](https://github.com/babel/babel/pull/8828) Typescript: Validate tuple type element positions. ([@Retsam](https://github.com/Retsam))
  - [#8883](https://github.com/babel/babel/pull/8883) [flow] Add support for parsing `_` as implicit instantiation in call/new. ([@jbrown215](https://github.com/jbrown215))
- `babel-core`, `babel-generator`, `babel-parser`, `babel-plugin-syntax-typescript`, `babel-traverse`
  - [#8448](https://github.com/babel/babel/pull/8448) Remove Babylon plugins for features already merged to the ECMAScript spec. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-parser`, `babel-types`
  - [#8884](https://github.com/babel/babel/pull/8884) [flow] Explicit inexact objects with `...`. ([@jbrown215](https://github.com/jbrown215))
- `babel-preset-env`
  - [#8898](https://github.com/babel/babel/pull/8898) Update preset-env data. ([@existentialism](https://github.com/existentialism))

#### :bug: Bug Fix

- `babel-parser`
  - [#8956](https://github.com/babel/babel/pull/8956) Do not allow TypeCastExpressions w/o parens . ([@danez](https://github.com/danez))
  - [#8954](https://github.com/babel/babel/pull/8954) Allow function types in type params within arrow return types. ([@danez](https://github.com/danez))
  - [#8866](https://github.com/babel/babel/pull/8866) Closes [#8865](https://github.com/babel/babel/issues/8865). ([@byronluk](https://github.com/byronluk))
- `babel-core`
  - [#8910](https://github.com/babel/babel/pull/8910) Resolve babel.config.js 'babelrcRoots' values relative to the config file.. ([@loganfsmyth](https://github.com/loganfsmyth))
  - [#8950](https://github.com/babel/babel/pull/8950) Fix message when plugin of a wrong type is passed. ([@everdimension](https://github.com/everdimension))
- `babel-plugin-transform-block-scoping`
  - [#8937](https://github.com/babel/babel/pull/8937) rename colliding let bindings with for loop init. ([@byronluk](https://github.com/byronluk))
  - [#8914](https://github.com/babel/babel/pull/8914) Treat break inside block inside loop. ([@thiagoarrais](https://github.com/thiagoarrais))
- `babel-preset-env`
  - [#8926](https://github.com/babel/babel/pull/8926) preset-env: Edge support for arrow param destructuring. ([@benmosher](https://github.com/benmosher))
- `babel-generator`
  - [#8868](https://github.com/babel/babel/pull/8868) fix single-arg async arrows when retainLines=true. ([@ryanwmarsh](https://github.com/ryanwmarsh))
- `babel-traverse`
  - [#8880](https://github.com/babel/babel/pull/8880) fix: Expression x === 'y' && '' should not evaluate to undefined.. ([@Cyp](https://github.com/Cyp))

#### :nail_care: Polish

- [#8873](https://github.com/babel/babel/pull/8873) fixed an extra word. ([@vvyomjjain](https://github.com/vvyomjjain))

## v7.1.4 (2018-10-11)

Just re-published `@babel/traverse` without `**` so that it works in Node 6.

## v7.1.3 (2018-10-11)

#### :bug: Bug Fix

- `babel-generator`, `babel-parser`, `babel-plugin-transform-typescript`, `babel-types`
  - [#8720](https://github.com/babel/babel/pull/8720) Typescript - Tuple elements can be optional. ([@Retsam](https://github.com/Retsam))
- `babel-traverse`
  - [#8833](https://github.com/babel/babel/pull/8833) Insertafter jsx fix. ([@kevintab95](https://github.com/kevintab95))
- `babel-parser`
  - [#8830](https://github.com/babel/babel/pull/8830) Correct handling of newline after async with paren-less arrow func. ([@Retsam](https://github.com/Retsam))
  - [#8756](https://github.com/babel/babel/pull/8756) class private methods and properties: should not allow spaces between # and identifier. ([@macabeus](https://github.com/macabeus))
  - [#8804](https://github.com/babel/babel/pull/8804) Fix parsing of slash after class expression. ([@existentialism](https://github.com/existentialism))
  - [#8767](https://github.com/babel/babel/pull/8767) [decorators] [typescript] Parse type parameters. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  - [#8792](https://github.com/babel/babel/pull/8792) Fix perf issue in typescript parser plugin. ([@matthewrobertson](https://github.com/matthewrobertson))
- `babel-generator`, `babel-parser`, `babel-plugin-transform-typescript`, `babel-types`
  - [#8805](https://github.com/babel/babel/pull/8805) Typescript - Tuples can include rest elements. ([@Retsam](https://github.com/Retsam))
- `babel-types`
  - [#8791](https://github.com/babel/babel/pull/8791) types: allow jsxEmptyExpression inside jsxExpressionContainer. ([@tvooo](https://github.com/tvooo))
- `babel-plugin-transform-modules-systemjs`
  - [#8820](https://github.com/babel/babel/pull/8820) System module format - fixes function hoisting failure case. ([@guybedford](https://github.com/guybedford))
- `babel-plugin-transform-destructuring`
  - [#8793](https://github.com/babel/babel/pull/8793) Ensure destructuring's computed key handling matches object-rest-spread. ([@existentialism](https://github.com/existentialism))

## 7.1.2 (2018-09-28)

Same as v7.1.1, except compiled against Node 6 instead of Node 8 by accident (e.g had `async functions`).

## v7.1.1 (2018-09-28)

> EDIT: had a publish issue here as well where it compiled against Node 8 instead of Node 6 so 7.1.2 will fix this.
> Also force publish `@babel/runtime` and `@babel/runtime-corejs2`. We need to fix the publishing around that since Lerna doesn't pickup the `@babel/helpers` changes as there is no "dependency"

#### :bug: Bug Fix

- `babel-generator`, `babel-parser`, `babel-types`
  - [#8755](https://github.com/babel/babel/pull/8755) TypeScript: reserve `unknown` as TSUnknownKeyword. ([@g-plane](https://github.com/g-plane))
- `babel-plugin-transform-destructuring`
  - [#8535](https://github.com/babel/babel/pull/8535) Do not unpack array patterns that update a referenced binding. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-plugin-proposal-decorators`
  - [#8742](https://github.com/babel/babel/pull/8742) [decorators] Support async and generator methods. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helpers`, `babel-plugin-proposal-decorators`
  - [#8761](https://github.com/babel/babel/pull/8761) [decorators] Fields are enumerable. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-generator`
  - [#8751](https://github.com/babel/babel/pull/8751) Fix some missing parens cases with OptionalMemberExpression in generator. ([@existentialism](https://github.com/existentialism))
  - [#8727](https://github.com/babel/babel/pull/8727) Handle throw expressions in generator. ([@existentialism](https://github.com/existentialism))

#### :house: Internal

- Other
  - [#8780](https://github.com/babel/babel/pull/8780) Run test262 tests for exportNamespaceFrom. ([@existentialism](https://github.com/existentialism))
- `babel-helper-transform-fixture-test-runner`
  - [#8768](https://github.com/babel/babel/pull/8768) Use babel-check-duplicated-nodes. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

## v7.1.0 (2018-09-17)

Check http://babeljs.io/blog/2018/09/17/7.1.0

#### :rocket: New Feature

- `babel-cli`, `babel-core`
  - [#8660](https://github.com/babel/babel/pull/8660) Better support monorepos by allowing users to opt into automatically resolving 'root' with `rootMode: "upward"`.. ([@loganfsmyth](https://github.com/loganfsmyth))
- `babel-helper-transform-fixture-test-runner`
  - [#7582](https://github.com/babel/babel/pull/7582) Allow regular plugins/presets resolution algorithm for packages outsi…. ([@Andarist](https://github.com/Andarist))
- `babel-helpers`, `babel-plugin-proposal-decorators`, `babel-plugin-syntax-decorators`
  - [#7976](https://github.com/babel/babel/pull/7976) Add support for the new decorators proposal. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
- `babel-helpers`, `babel-plugin-proposal-class-properties`
  - [#8205](https://github.com/babel/babel/pull/8205) Private Static Fields Features: Stage 3. ([@rricard](https://github.com/rricard))

#### :bug: Bug Fix

- `babel-parser`
  - [#8698](https://github.com/babel/babel/pull/8698) Fix parsing of newline between 'async' and 'function'. ([@existentialism](https://github.com/existentialism))
  - [#8677](https://github.com/babel/babel/pull/8677) Fix typescript parsing typed object shorthand methods. ([@existentialism](https://github.com/existentialism))
- `babel-plugin-transform-typescript`
  - [#8682](https://github.com/babel/babel/pull/8682) Fix TSParameterProperty getting lost with transform-classes. ([@existentialism](https://github.com/existentialism))
  - [#8695](https://github.com/babel/babel/pull/8695) Adjust TSParameterProperty handling to work with transform-parameters. ([@existentialism](https://github.com/existentialism))
  - [#8666](https://github.com/babel/babel/pull/8666) Fix typescript import elision. ([@Retsam](https://github.com/Retsam))
- `babel-preset-env`
  - [#8693](https://github.com/babel/babel/pull/8693) Fix es6.string.iterator mapping in babel-preset-env. ([@existentialism](https://github.com/existentialism))
- `babel-core`, `babel-plugin-proposal-class-properties`, `babel-plugin-proposal-decorators`, `babel-plugin-transform-runtime`
  - [#8659](https://github.com/babel/babel/pull/8659) Fix version checks in .availableHelper and transform-runtime definitions.. ([@loganfsmyth](https://github.com/loganfsmyth))
- Other
  - [#8627](https://github.com/babel/babel/pull/8627) ts generator: allow reserved keywords in interfaces. ([@43081j](https://github.com/43081j))
- `babel-plugin-transform-parameters`
  - [#8414](https://github.com/babel/babel/pull/8414) Allow patterns as argument of RestElement. ([@microbouji](https://github.com/microbouji))
- `babel-core`, `babel-plugin-transform-runtime`
  - [#8624](https://github.com/babel/babel/pull/8624) Verify 'sourceMap' option with hasOwnProperty, and verify string-typed 'version'. ([@loganfsmyth](https://github.com/loganfsmyth))
- `babel-helpers`, `babel-plugin-proposal-class-properties`
  - [#8614](https://github.com/babel/babel/pull/8614) [static private] Unify loose handling of static and instance props. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :nail_care: Polish

- `babel-plugin-transform-runtime`
  - [#8581](https://github.com/babel/babel/pull/8581) Fix grammar in error message at @babel/plugin-transform-runtime. ([@tricknotes](https://github.com/tricknotes))
- `babel-parser`
  - [#8576](https://github.com/babel/babel/pull/8576) More helpful errorr message for missing decoratorsBeforeExport in parser. ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :memo: Documentation

- [#8561](https://github.com/babel/babel/pull/8561) Added pronounciation of babel. ([@siddhant1](https://github.com/siddhant1))

#### :house: Internal

- `babel-core`
  - [#8714](https://github.com/babel/babel/pull/8714) Fix Flow error with new versionRange test.. ([@loganfsmyth](https://github.com/loganfsmyth))
- Other
  - [#8679](https://github.com/babel/babel/pull/8679) remove force publish, temp tag [skip ci]. ([@hzoo](https://github.com/hzoo))
- `babel-plugin-transform-runtime`
  - [#8661](https://github.com/babel/babel/pull/8661) Makefile: run fix json on fix. ([@xtuc](https://github.com/xtuc))
- `babel-*`
  - [#8658](https://github.com/babel/babel/pull/8658) Format fixture options.json with Prettier.. ([@loganfsmyth](https://github.com/loganfsmyth))
- `babel-parser`
  - [#8630](https://github.com/babel/babel/pull/8630) Bump flow to 0.80 and fix sourceType error. ([@existentialism](https://github.com/existentialism))
  - [#8610](https://github.com/babel/babel/pull/8610) types: missing `unambiguous` sourceType. ([@xtuc](https://github.com/xtuc))
  - [#8170](https://github.com/babel/babel/pull/8170) @babel/parser: expose a TypeScript definition file from package. ([@AviVahl](https://github.com/AviVahl))
- `babel-*`
  - [#8573](https://github.com/babel/babel/pull/8573) add access public to all packages [skip ci]. ([@hzoo](https://github.com/hzoo))

## v7.0.1 (2018-09-11)

Doing a quick patch regarding helpers versioning to prevent future issues: https://github.com/babel/babel/pull/8659

## v7.0.0 (2018-08-27)

No change from rc.4. Finally released as https://babeljs.io/blog/2018/08/27/7.0.0!
