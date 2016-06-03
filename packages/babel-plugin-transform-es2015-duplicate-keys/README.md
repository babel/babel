# babel-plugin-transform-es2015-duplicate-keys

Compile objects with duplicate keys to valid strict ES5.

This plugin actually converts duplicate keys in objects to be computed
properties, which then must be handled by the
transform-es2015-computed-properties plugin. The final result won't contain any
object literals with duplicate keys.

## Installation

```sh
$ npm install babel-plugin-transform-es2015-duplicate-keys
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-duplicate-keys"]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-duplicate-keys script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-duplicate-keys"]
});
```
