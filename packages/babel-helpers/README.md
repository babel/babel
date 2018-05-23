# @babel/helpers

> Collection of helper functions used by Babel transforms.

## Install

```sh
npm install --save-dev @babel/helpers
```

## Usage

Direct:

```js
import * as helpers from '@babel/helpers';
import * as t from '@babel/types';

const typeofHelper = helpers.get('typeof');

t.isExpressionStatement(typeofHelper);
// true
```

Inside a plugin:

```js
export default {
  visitor: {
    UnaryExpression(path) {
      // The .addHelper function adds, if needed, the helper to the file
      // and returns an expression which references the helper
      const typeofHelper = this.addHelper("typeof");
      t.isExpression(typeofHelper); // true
  }
};
```

## Defining Helpers

> **NOTE**: This package is only meant to be used by the packages inluded in this repository. There is currently no way for third-party plugins to define an helper.

Helpers are defined in the `src/helpers.js` file, and they must be valid modules which follow these guidelines:
 - They must have a default export, which is their entry-point.
 - They can import other helpers, exclusively by using default imports.
 - They can't have named exports.

```js
helpers.customHelper = defineHelper(`
  import dep from "dependency";
  const foo = 2;
  export default function getFooTimesDepPlusX(x) {
    return foo * dep() + x;
  }
`);
```
