# babel-plugin-transform-node-env-inline

Inline the `NODE_ENV` environment variable and if it's a part of a binary expression
(eg. `process.env.NODE_ENV === "development"`) then statically evaluate and replace it.

## Example

**In**

```javascript
process.env.NODE_ENV === "development";
process.env.NODE_ENV === "production";
```

**Out**

```sh
$ NODE_ENV=development babel in.js --plugins transform-node-env-inline
```

```javascript
true;
false;
```

## Installation

```sh
$ npm install babel-plugin-transform-node-env-inline
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-node-env-inline"]
}
```

### Via CLI

```sh
$ babel --plugins transform-node-env-inline script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-node-env-inline"]
});
```
