# babel-plugin-transform-es2015-destructuring

> Compile ES2015 destructuring to ES5

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-destructuring
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-destructuring"]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-destructuring script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-destructuring"]
});
```
