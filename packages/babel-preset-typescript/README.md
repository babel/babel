# @babel/preset-typescript

> Babel preset for TypeScript.

This preset includes the following plugins:

- [@babel/plugin-transform-typescript](https://babeljs.io/docs/plugins/transform-typescript/)

> You will need to specify `--extensions ".ts"` for `@babel/cli` & `@babel/node` cli's to handle `.ts` files.

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
  "presets": ["@babel/preset-typescript"]
}
```

### Via CLI

```sh
babel --presets @babel/preset-typescript script.ts
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  presets: ["@babel/preset-typescript"]
});
```
