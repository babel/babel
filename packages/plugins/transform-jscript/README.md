# babel-plugin-transform-jscript

Babel plugin to fix buggy JScript named function expressions

## Installation

```sh
$ npm install babel-plugin-transform-jscript
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-jscript"]
}
```

### Via CLI

```sh
$ babel --plugins transform-jscript script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-jscript"]
});
```
