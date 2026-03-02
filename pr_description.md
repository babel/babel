<!--
Before making a PR, please read our contributing guidelines
https://github.com/babel/babel/blob/main/CONTRIBUTING.md

Please note that the Babel Team requires two approvals before merging most PRs.

For issue references: Add a comma-separated list of a [closing word](https://help.github.com/articles/closing-issues-via-commit-messages/) followed by the ticket number fixed by the PR. (it should be underlined in the preview if done correctly)

If you are making a change that should have a docs update: submit another PR to https://github.com/babel/website
-->

| Q                        | A 
| ------------------------ | ---
| Fixed Issues?            | Fixes #3840 
| Patch: Bug Fix?          | 👍
| Major: Breaking Change?  | 
| Minor: New Feature?      | 
| Tests Added + Pass?      | Yes
| Documentation PR Link    | 
| Any Dependency Changes?  | 
| License                  | MIT

<!-- Describe your changes below in as much detail as possible -->

### Description

This PR implements the optimization originally proposed in Issue #3840 for merged rest and spread operations to prevent the duplication of `Object.assign` (or `_objectSpread`) targets when there are no intervening side-effects.

Previously, Babel transformed consecutive object rest and spread operations like the following:

```javascript
let { a, b, ...rest } = obj;
let abc = { ...rest, c: 123 };
```

Into code that unnecessarily instantiates an intermediate empty object `{}` prior to pushing the unused `rest` object onto it:

```javascript
let abc = babelHelpers.objectSpread2(babelHelpers.objectSpread2({}, rest), {}, {
  c: 123
});
```

With this PR, if `prop.argument` in an `ObjectExpression` evaluates to a newly created "fresh" object generated unambiguously from `_objectWithoutProperties()` (with `references <= 1`), the compiler avoids the intermediate `{}` allocation, resulting in optimization:

```javascript
let abc = babelHelpers.objectSpread2(rest, {}, {
  c: 123
});
```

### Changes Made

- Added `isKnownFreshObjectCall()` inside `@babel/plugin-transform-object-rest-spread/src/index.ts` to determine if a binding represents a one-time-use fresh object.
- Modified the loop building `objectSpread()` properties to test if the initial arguments inside `make()` can directly reuse the fresh `_objectWithoutProperties` compilation target.
- Added a new integration fixture in `test/fixtures/object-rest/optimization-merged-rest-spread` to strictly assert generating this output.
