# babel-plugin-transform-es2015-modules-umd

## Installation

```sh
$ npm install babel-plugin-transform-es2015-modules-umd
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-modules-umd"]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-modules-umd script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-modules-umd"]
});
```
