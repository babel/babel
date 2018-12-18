# @babel/eslint-plugin-developement

A set of eslint rules to enforce best practices in the development of Babel plugins.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm install --save-dev eslint
```

Next, install `@babel/eslint-plugin-developement`:

```
$ npm install --save-dev @babel/eslint-plugin-developement
```

Then, load the plugin in your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["@babel/developement"]
}
```

## Supported Rules

> Note: Rules marked with :wrench: are autofixable.

* `@babel/developement/no-deprecated-clone` (:wrench:): Disallows using the deprecated
  `t.clone(node)` and `t.cloneDeep(node)` methods from `@babel/types`. Those
  calls are replaced with `t.cloneNode(node)` when using `eslint --fix`.
* `@babel/developement/no-undefined-identifier`: Disallows using
  `t.identifier("undefined")` to create a node which represents an `undefined`
  value, since it might cause problem if `undefined` is redeclared.
* `@babel/developement/plugin-name`: Requires plugins to have a `name` property, which
  can be useful for debugging purposes.
