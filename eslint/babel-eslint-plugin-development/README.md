# eslint-plugin-babel-plugin

A set of eslint rules to enforce best practices in the development of Babel plugins.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm install --save-dev eslint
```

Next, install `eslint-plugin-babel-plugin`:

```
$ npm install --save-dev eslint-plugin-babel-plugin
```

Then, load the plugin in your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["babel-plugin"]
}
```

## Supported Rules

> Note: Rules marked with :wrench: are autofixable.

* `babel-plugin/no-deprecated-clone` (:wrench:): Disallows using the deprecated
  `t.clone(node)` and `t.cloneDeep(node)` methods from `@babel/types`. Those
  calls are replaced with `t.cloneNode(node)` when using `eslint --fix`.
* `babel-plugin/no-undefined-identifier`: Disallows using
  `t.identifier("undefined")` to create a node which represents an `undefined`
  value, since it might cause problem if `undefined` is redeclared.
* `babel-plugin/plugin-name`: Requires plugins to have a `name` property, which
  can be useful for debugging purposes.
