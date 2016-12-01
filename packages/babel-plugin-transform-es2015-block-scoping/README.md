# babel-plugin-transform-es2015-block-scoping

> Compile ES2015 block scoping (const and let) to ES5

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-block-scoping
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-block-scoping"]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-block-scoping script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-block-scoping"]
});
```
