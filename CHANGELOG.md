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

This file contains the changelog from v7.28.6 onwards. Changes in this file are not included in the v8 release line, unless they also appear in its changelog.

- See [CHANGELOG - v7.15.0 to v7.28.5](/.github/CHANGELOG-v7.15.0-v7.28.5.md) for v7.15.0 to v7.28.5 changes.
- See [CHANGELOG - v7.0.0 to v7.14.9](/.github/CHANGELOG-v7.0.0-v7.14.9.md) for v7.0.0 to v7.14.9 changes.
- See [CHANGELOG - v7 prereleases](/.github/CHANGELOG-v7-prereleases.md) for v7.0.0-alpha.1 to v7.0.0-rc.4 changes.
- See [CHANGELOG - v4](/.github/CHANGELOG-v4.md), [CHANGELOG - v5](/.github/CHANGELOG-v5.md), and [CHANGELOG - v6](/.github/CHANGELOG-v6.md) for v4.x-v6.x changes.
- See [CHANGELOG - 6to5](/.github/CHANGELOG-6to5.md) for the pre-4.0.0 version changelog.
- See [Babylon's CHANGELOG](packages/babel-parser/CHANGELOG.md) for the Babylon pre-7.0.0-beta.29 version changelog.
- See [`babel-eslint`'s releases](https://github.com/babel/babel-eslint/releases) for the changelog before `@babel/eslint-parser` 7.8.0.
- See [`eslint-plugin-babel`'s releases](https://github.com/babel/eslint-plugin-babel/releases) for the changelog before `@babel/eslint-plugin` 7.8.0.

<!-- DO NOT CHANGE THESE COMMENTS - See .github/actions/trigger-github-release/update-changelog.js -->
<!-- insert-new-changelog-here -->
## v7.29.11 (2026-10-23)

#### :eyeglasses: Spec Compliance
* `babel-parser`
  * [#18405](https://github.com/babel/babel/pull/18405) Disallow `eval` and `arguments` as class names ([@babel-bot](https://github.com/babel-bot))
  * [#18404](https://github.com/babel/babel/pull/18404) fix(parser): disallow const x followed by linebreak and of ([@babel-bot](https://github.com/babel-bot))
  * [#18400](https://github.com/babel/babel/pull/18400) fix(parser): disallow named specifiers after * as ns ([@babel-bot](https://github.com/babel-bot))
  * [#18374](https://github.com/babel/babel/pull/18374) fix(parser): reject delete (x) when createParenthesizedExpressions: true ([@babel-bot](https://github.com/babel-bot))
  * [#18373](https://github.com/babel/babel/pull/18373) Disallow call expressions as arrow function parameters in sloppy mode ([@babel-bot](https://github.com/babel-bot))

#### :bug: Bug Fix
* `babel-parser`
  * [#18403](https://github.com/babel/babel/pull/18403) fix(parser): ASI between arrow body and `/=` regex ([@babel-bot](https://github.com/babel-bot))
  * [#18402](https://github.com/babel/babel/pull/18402) Allow ASI after `export default from` without `exportDefaultFrom` ([@babel-bot](https://github.com/babel-bot))
  * [#18401](https://github.com/babel/babel/pull/18401) fix(parser): allow arguments as a label in class ([@babel-bot](https://github.com/babel-bot))
  * [#18378](https://github.com/babel/babel/pull/18378) Skip HTML-like comments in the parser's character lookahead ([@babel-bot](https://github.com/babel-bot))
  * [#18375](https://github.com/babel/babel/pull/18375) fix(parser): register function id in labeled function declaration ([@babel-bot](https://github.com/babel-bot))
  * [#18377](https://github.com/babel/babel/pull/18377) fix(parser): allow ASI between property init and escaped in ([@babel-bot](https://github.com/babel-bot))
* `babel-plugin-transform-classes`
  * [#18408](https://github.com/babel/babel/pull/18408) Leave loose class prototype mutable with accessors ([@babel-bot](https://github.com/babel-bot))
* `babel-plugin-transform-typescript`, `babel-types`
  * [#18391](https://github.com/babel/babel/pull/18391) fix(types): visit decorators of TSParameterProperty ([@babel-bot](https://github.com/babel-bot))
* `babel-plugin-transform-block-scoping`
  * [#18370](https://github.com/babel/babel/pull/18370) fix: wrap enclosing loop when a nested for head closure captures its bindings ([@babel-bot](https://github.com/babel-bot))
  * [#18364](https://github.com/babel/babel/pull/18364) fix: closures in for-loop init capture wrong binding ([@babel-bot](https://github.com/babel-bot))

#### :house: Internal
* `babel-plugin-transform-classes`
  * [#18398](https://github.com/babel/babel/pull/18398) Remove internal usage of `loose` in class transform ([@babel-bot](https://github.com/babel-bot))

#### :microscope: Output optimization
* `babel-plugin-transform-spread`
  * [#18390](https://github.com/babel/babel/pull/18390) Avoid `arrayLikeToArray` for spreading literals ([@babel-bot](https://github.com/babel-bot))
## v7.29.10 (2026-10-07)

#### :bug: Bug Fix
* `babel-helpers`, `babel-plugin-transform-class-properties`, `babel-plugin-transform-modules-systemjs`, `babel-plugin-transform-runtime`, `babel-preset-env`, `babel-runtime-corejs3`
  * [#18287](https://github.com/babel/babel/pull/18287) Guard `@@toPrimitive` usage in toPrimitive helper ([@babel-bot](https://github.com/babel-bot))
* `babel-traverse`
  * [#18281](https://github.com/babel/babel/pull/18281) fix(traverse): do not evaluate destructured bindings in `path.evaluate` ([@babel-bot](https://github.com/babel-bot))

#### :house: Internal
* `babel-helpers`, `babel-plugin-transform-modules-commonjs`, `babel-runtime-corejs3`
  * [#18279](https://github.com/babel/babel/pull/18279) Simplify `interopRequireWildcard` helper ([@babel-bot](https://github.com/babel-bot))
## v7.29.9 (2026-09-18)

#### :bug: Bug Fix
* `babel-plugin-transform-typescript`
  * [#18247](https://github.com/babel/babel/pull/18247) [ts] Allow merging `enum` into a `namespace` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-parser`
  * [#18241](https://github.com/babel/babel/pull/18241) Fix parsing of arrow function params inside ternaries with Flow ([@robhogan](https://github.com/robhogan))

#### :house: Internal
* `babel-parser`
  * [#18245](https://github.com/babel/babel/pull/18245) test: test with ts-eslint 8.70.0 ([@JLHwung](https://github.com/JLHwung))
## v7.29.8 (2026-07-31)

#### :eyeglasses: Spec Compliance
* `babel-generator`, `babel-parser`, `babel-plugin-transform-spread`, `babel-traverse`, `babel-types`
  * [#17871](https://github.com/babel/babel/pull/17871) Disallow super call after new ([@JLHwung](https://github.com/JLHwung))

#### :bug: Bug Fix
* `babel-generator`
  * [#18046](https://github.com/babel/babel/pull/18046) fix(generator): improve new callee parens check ([@JLHwung](https://github.com/JLHwung))
* `babel-node`, `babel-plugin-transform-modules-systemjs`
  * [#18044](https://github.com/babel/babel/pull/18044) fix(systemjs): support __proto__ as an export name ([@JLHwung](https://github.com/JLHwung))

## v7.29.6 (2026-05-25)

#### :bug: Bug Fix
* `babel-generator`
  * [#18014](https://github.com/babel/babel/pull/18014) Catchup source map position in preserveFormat ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-core`
  * [#18001](https://github.com/babel/babel/pull/18001) [7.x packport]Improve input source map handling ([@JLHwung](https://github.com/JLHwung))
* `babel-core`, `babel-generator`
  * [#17998](https://github.com/babel/babel/pull/17998) Preserve original identifier names from input sourcemaps (#17992) ([@Andarist](https://github.com/Andarist))

## v7.29.4 (2026-05-05)

#### :bug: Bug Fix
* `babel-plugin-transform-modules-systemjs`
  * [#17974](https://github.com/babel/babel/pull/17974) [7.x backport]fix(systemjs): improve module string name support ([@JLHwung](https://github.com/JLHwung))
## v7.29.3 (2026-04-30)

#### :eyeglasses: Spec Compliance
* `babel-parser`
  * [#17923](https://github.com/babel/babel/pull/17923) Support flow extends bound ([@JLHwung](https://github.com/JLHwung))

#### :bug: Bug Fix
* `babel-helper-create-class-features-plugin`, `babel-plugin-proposal-decorators`
  * [#17931](https://github.com/babel/babel/pull/17931) fix(decorators): replace super within all removed static elements ([@JLHwung](https://github.com/JLHwung))
* `babel-register`
  * [#17915](https://github.com/babel/babel/pull/17915) Fix thread synchronization issues in `@babel/register` ([@liuxingbaoyu](https://github.com/liuxingbaoyu))
* `babel-compat-data`, `babel-plugin-bugfix-safari-rest-destructuring-rhs-array`, `babel-preset-env`
  * [#17788](https://github.com/babel/babel/pull/17788) Add bugfix plugin for Safari array rest destructuring bug ([@JLHwung](https://github.com/JLHwung))

#### :nail_care: Polish
* `babel-parser`
  * [#17782](https://github.com/babel/babel/pull/17782) Improve trailing comma comment handling ([@JLHwung](https://github.com/JLHwung))

#### :memo: Documentation
* [#17847](https://github.com/babel/babel/pull/17847) Replace npmjs.com links with npmx.dev ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :running_woman: Performance
* `babel-helper-import-to-platform-api`, `babel-plugin-proposal-import-wasm-source`, `babel-plugin-transform-json-modules`
  * [#17818](https://github.com/babel/babel/pull/17818) Load async Wasm and JSON imports in parallel ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
## v7.29.2 (2026-03-16)

#### :eyeglasses: Spec Compliance
* `babel-parser`
  * [#17840](https://github.com/babel/babel/pull/17840) [7.x backport] async x => {} must be in leading pos ([@JLHwung](https://github.com/JLHwung))

#### :bug: Bug Fix
* `babel-helpers`, `babel-plugin-transform-async-generator-functions`, `babel-preset-env`, `babel-runtime-corejs3`
  * [#17805](https://github.com/babel/babel/pull/17805) [7.x backport] fix: Properly handle await in finally ([@liuxingbaoyu](https://github.com/liuxingbaoyu))
* `babel-preset-env`
  * [#17789](https://github.com/babel/babel/pull/17789) [7.x backport] preset-env include/exclude should accept bugfix plugins ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal
* [#17813](https://github.com/babel/babel/pull/17813) chore: update eslint peer deps ([@JLHwung](https://github.com/JLHwung))
## v7.29.1 (2026-02-04)

#### :bug: Bug Fix
* `babel-standalone`
  * [#17771](https://github.com/babel/babel/pull/17771) [7.x backport] fix: ensure `targets.esmodules` is validated ([@JLHwung](https://github.com/JLHwung))
* `babel-generator`
  * [#17776](https://github.com/babel/babel/pull/17776) [7.x backport] Fix undefined when 64 indents ([@liuxingbaoyu](https://github.com/liuxingbaoyu))
## v7.29.0 (2026-01-31)

#### :rocket: New Feature
* `babel-types`
  * [#17750](https://github.com/babel/babel/pull/17750) [7.x backport] Add attributes import declaration builder ([@JLHwung](https://github.com/JLHwung))
* `babel-standalone`
  * [#17663](https://github.com/babel/babel/pull/17663) [7.x backport] feat(standalone): export async transform ([@JLHwung](https://github.com/JLHwung))
  * [#17725](https://github.com/babel/babel/pull/17725) [7.x backport] feat: read standalone targets from data-targets ([@JLHwung](https://github.com/JLHwung))

#### :bug: Bug Fix
* `babel-parser`
  * [#17765](https://github.com/babel/babel/pull/17765) fix(parser): correctly parse type assertions in `extends` clause ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
  * [#17723](https://github.com/babel/babel/pull/17723) [7.x backport] fix(parser): improve super type argument parsing ([@JLHwung](https://github.com/JLHwung))
* `babel-traverse`
  * [#17708](https://github.com/babel/babel/pull/17708) fix(traverse): provide a hub when traversing a File or Program and no parentPath is given ([@simbahax](https://github.com/simbahax))
* `babel-plugin-transform-block-scoping`, `babel-traverse`
  * [#17737](https://github.com/babel/babel/pull/17737) [7.x backport] fix: Rename switch discriminant references when body creates shadowing variable ([@magic-akari](https://github.com/magic-akari))

#### :running_woman: Performance
* `babel-generator`, `babel-runtime-corejs3`
  * [#17642](https://github.com/babel/babel/pull/17642) [Babel 7] Improve generator performance ([@liuxingbaoyu](https://github.com/liuxingbaoyu))
## v7.28.6 (2026-01-12)

#### :bug: Bug Fix
* `babel-cli`, `babel-code-frame`, `babel-core`, `babel-helper-check-duplicate-nodes`, `babel-helper-fixtures`, `babel-helper-plugin-utils`, `babel-node`, `babel-plugin-transform-flow-comments`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-property-mutators`, `babel-preset-env`, `babel-traverse`, `babel-types`
  * [#17589](https://github.com/babel/babel/pull/17589) Improve Unicode handling in code-frame tokenizer ([@JLHwung](https://github.com/JLHwung))
* `babel-plugin-transform-regenerator`
  * [#17556](https://github.com/babel/babel/pull/17556) fix: `transform-regenerator` correctly handles scope ([@liuxingbaoyu](https://github.com/liuxingbaoyu))
* `babel-plugin-transform-react-jsx`
  * [#17538](https://github.com/babel/babel/pull/17538) fix: Keep jsx comments ([@liuxingbaoyu](https://github.com/liuxingbaoyu))

#### :nail_care: Polish
* `babel-core`, `babel-standalone`
  * [#17606](https://github.com/babel/babel/pull/17606) Polish(standalone): improve message on invalid preset/plugin ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal
* `babel-plugin-bugfix-v8-static-class-fields-redefine-readonly`, `babel-plugin-proposal-decorators`, `babel-plugin-proposal-import-attributes-to-assertions`, `babel-plugin-proposal-import-wasm-source`, `babel-plugin-syntax-async-do-expressions`, `babel-plugin-syntax-decorators`, `babel-plugin-syntax-destructuring-private`, `babel-plugin-syntax-do-expressions`, `babel-plugin-syntax-explicit-resource-management`, `babel-plugin-syntax-export-default-from`, `babel-plugin-syntax-flow`, `babel-plugin-syntax-function-bind`, `babel-plugin-syntax-function-sent`, `babel-plugin-syntax-import-assertions`, `babel-plugin-syntax-import-attributes`, `babel-plugin-syntax-import-defer`, `babel-plugin-syntax-import-source`, `babel-plugin-syntax-jsx`, `babel-plugin-syntax-module-blocks`, `babel-plugin-syntax-optional-chaining-assign`, `babel-plugin-syntax-partial-application`, `babel-plugin-syntax-pipeline-operator`, `babel-plugin-syntax-throw-expressions`, `babel-plugin-syntax-typescript`, `babel-plugin-transform-async-generator-functions`, `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-class-properties`, `babel-plugin-transform-class-static-block`, `babel-plugin-transform-dotall-regex`, `babel-plugin-transform-duplicate-named-capturing-groups-regex`, `babel-plugin-transform-explicit-resource-management`, `babel-plugin-transform-exponentiation-operator`, `babel-plugin-transform-json-strings`, `babel-plugin-transform-logical-assignment-operators`, `babel-plugin-transform-nullish-coalescing-operator`, `babel-plugin-transform-numeric-separator`, `babel-plugin-transform-object-rest-spread`, `babel-plugin-transform-optional-catch-binding`, `babel-plugin-transform-optional-chaining`, `babel-plugin-transform-private-methods`, `babel-plugin-transform-private-property-in-object`, `babel-plugin-transform-regexp-modifiers`, `babel-plugin-transform-unicode-property-regex`, `babel-plugin-transform-unicode-sets-regex`
  * [#17580](https://github.com/babel/babel/pull/17580) Allow Babel 8 in compatible Babel 7 plugins ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :running_woman: Performance
* `babel-plugin-transform-react-jsx`
  * [#17555](https://github.com/babel/babel/pull/17555) perf: Use lighter traversal for jsx `__source,__self` ([@liuxingbaoyu](https://github.com/liuxingbaoyu))

---

- See [CHANGELOG - v7.15.0 to v7.28.5](/.github/CHANGELOG-v7.15.0-v7.28.5.md) for v7.15.0 to v7.28.5 changes.
- See [CHANGELOG - v7.0.0 to v7.14.9](/.github/CHANGELOG-v7.0.0-v7.14.9.md) for v7.0.0 to v7.14.9 changes.
- See [CHANGELOG - v7 prereleases](/.github/CHANGELOG-v7-prereleases.md) for v7.0.0-alpha.1 to v7.0.0-rc.4 changes.

We have to split the v7 changelog in multiple files otherwise it's too big to render on GitHub.
