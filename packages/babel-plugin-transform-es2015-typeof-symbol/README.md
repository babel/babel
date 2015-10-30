# babel-plugin-transform-es2015-typeof-symbol

## Installation

```sh
$ npm install babel-plugin-transform-es2015-typeof-symbol
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-typeof-symbol"]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-typeof-symbol script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-typeof-symbol"]
});
```
