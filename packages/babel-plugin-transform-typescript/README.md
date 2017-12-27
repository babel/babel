# @babel/plugin-transform-typescript

> Transform [TypeScript](https://github.com/Microsoft/TypeScript) into ES.next.

Does not type-check its input. For that, you will need to install and set up TypeScript.

Does not support `namespace`s or `const enum`s because those require type information to transpile.
Also does not support `export =` and `import =`, because those cannot be transpiled to ES.next.

## Example

**In**

```javascript
const x: number = 0;
```

**Out**

```javascript
const x = 0;
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-typescript
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-transform-typescript"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-typescript script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-typescript"]
});
```
