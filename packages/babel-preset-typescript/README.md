# @babel/preset-typescript

> Babel preset for TypeScript.

This preset includes the following plugins:

- [transform-typescript](https://babeljs.io/docs/plugins/transform-typescript/)

> You will need to specify `--extensions ".ts"` for `babel-cli`, `babel-node` to handle `.ts` files.

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
npm install --save-dev @babel/preset-typescript
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["@babel/typescript"]
}
```

### Via CLI

```sh
babel --presets @babel/typescript script.ts
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  presets: ["@babel/typescript"]
});
```
