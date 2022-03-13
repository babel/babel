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

## Usage

The plugin can be loaded in your `.eslintrc.*` configuration file as follows: (note that you can omit the `eslint-plugin-` prefix):

```json
{
  "plugins": ["@babel/development-internal"]
}
```

## Rules

### `@babel/development-internal/report-error-message-format`

This rule is inspired by https://github.com/not-an-aardvark/eslint-plugin-eslint-plugin/blob/master/docs/rules/report-message-format.md.

Intended for use in `packages/babel-parser/src/**/*`. When enabled, this rule warns for inconsistently error messages format in arguments of `makeErrorTemplates` function calls.

Basically, it starts with an uppercase Latin letter(A~Z) and ends with a period(.) or a question(?). But it can start with `'keyword'` or `` `code` `` to include JavaScript keywords or code in error messages.

valid:

```js
makeErrorTemplates({ ThisIsAnError: "This is an error." });
makeErrorTemplates({ ThisIsAnError: "'this' is an error." });
makeErrorTemplates({ ThisIsAnError: "`this` is an error." });
makeErrorTemplates({ ThisIsAnError: "This is an error?" });
makeErrorTemplates({ ThisIsAnError: "'this' is an error?" });
makeErrorTemplates({ ThisIsAnError: "`this` is an error?" });
```

invalid:

```js
makeErrorTemplates({ ThisIsAnError: 'this is an error.' });
makeErrorTemplates({ ThisIsAnError: 'This is an error' });
makeErrorTemplates({ ThisIsAnError: 'this is an error?' });
makeErrorTemplates({ ThisIsAnError: '`this` is an error' });
makeErrorTemplates({ ThisIsAnError: "'this' is an error" });
```

Example configuration:

```js
{
  rules: {
    "@babel/development-internal/report-error-message-format": "error"
  }
}
```
