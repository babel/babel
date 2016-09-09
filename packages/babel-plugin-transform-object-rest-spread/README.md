# babel-plugin-transform-object-rest-spread

Compile object rest and spread to ES5

## Installation

```sh
$ npm install babel-plugin-transform-object-rest-spread
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-object-rest-spread"]
}
```

This plugin will polyfill `Object.assign` by default. If you want to prevent that use a config like
this instead:

```json
{
  "plugins": [["transform-object-rest-spread", {"polyfill": false}]]
}
```

### Via CLI

```sh
$ babel --plugins transform-object-rest-spread script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-object-rest-spread"]
});
```
