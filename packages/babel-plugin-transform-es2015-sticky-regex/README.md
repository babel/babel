# babel-plugin-transform-es2015-sticky-regex

> Compile ES2015 sticky regex to an ES5 RegExp constructor

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-sticky-regex
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-sticky-regex"]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-sticky-regex script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-sticky-regex"]
});
```
