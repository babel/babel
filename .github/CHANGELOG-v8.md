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

This file contains the changelog starting from v8.0.0-alpha.0.

<!-- DO NOT CHANGE THESE COMMENTS -->
<!-- insert-new-changelog-here -->
## v8.0.0-alpha.2 (2023-08-09)

#### :bug: Bug Fix
* `babel-core`, `babel-traverse`
  * [#15759](https://github.com/babel/babel/pull/15759) [babel 8] Reland "Use `NodePath#hub` as part of the paths cache key" ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))

#### :nail_care: Polish
* `babel-preset-typescript`
  * [#15847](https://github.com/babel/babel/pull/15847) Provide better error message when allowDeclareFields is enabled ([@JLHwung](https://github.com/JLHwung))

#### :house: Internal
* `babel-helper-create-class-features-plugin`, `babel-plugin-transform-async-generator-functions`, `babel-plugin-transform-class-static-block`, `babel-plugin-transform-dynamic-import`, `babel-plugin-transform-export-namespace-from`, `babel-plugin-transform-json-strings`, `babel-plugin-transform-logical-assignment-operators`, `babel-plugin-transform-modules-commonjs`, `babel-plugin-transform-modules-systemjs`, `babel-plugin-transform-nullish-coalescing-operator`, `babel-plugin-transform-numeric-separator`, `babel-plugin-transform-object-rest-spread`, `babel-plugin-transform-optional-catch-binding`, `babel-plugin-transform-optional-chaining`, `babel-plugin-transform-private-property-in-object`
  * [#15823](https://github.com/babel/babel/pull/15823) Do not use syntax plugins for syntax enabled by default ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
* `babel-code-frame`, `babel-highlight`
  * [#15814](https://github.com/babel/babel/pull/15814) [babel 8] Use `chalk@4` ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo))
