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
