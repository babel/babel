# @babel/plugin-transform-flow-strip-types

> Strip all [flow](http://flowtype.org) type annotations and declarations from your output code.

## Example

**In**

```javascript
function foo(one: any, two: number, three?): string {}
```

**Out**

```javascript
function foo(one, two, three) {}
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-flow-strip-types
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/transform-flow-strip-types"]
}
```

### Via CLI

```sh
babel --plugins @babel/transform-flow-strip-types script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/transform-flow-strip-types"]
});
```

## Options

### `requireDirective`

`boolean`, defaults to `false`.

Setting this to true will only strip annotations and declarations from files
that contain the `// @flow` directive. It will also throw errors for any Flow
annotations found in files without the directive.
