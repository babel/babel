# babel-plugin-transform-es2015-modules-amd

## Installation

```sh
$ npm install babel-plugin-transform-es2015-modules-amd
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-modules-amd"]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-modules-amd script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-modules-amd"]
});
```
