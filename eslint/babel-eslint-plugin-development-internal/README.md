# @babel/eslint-plugin-development-internal

The Babel team's custom ESLint rules for the babel/babel monorepo.

## Installation

```sh
$ npm install --save-dev @babel/eslint-plugin-development-internal
```
or
```sh
$ yarn add --save-dev @babel/eslint-plugin-development-internal
```


Then, load the plugin in your `.eslintrc.*` configuration file (note that you can omit the `eslint-plugin-` prefix):

```json
{
  "plugins": ["@babel/development-internal"]
}
```

## Rules

### `@babel/development-internal/dry-error-messages`

Intended for use in `packages/babel-parser/src/**/*`. When enabled, this rule warns when `this.raise()` invocations raise errors that are not imported from a designated error module.

Accepts an object configuration option:

```ts
{
  errorModule: string
}
```

`errorModule` (required): The rule expects either an absolute path or a module name (for a module in `node_modules`). Please note that the rule will not check anything if` errorModule` is not given.
