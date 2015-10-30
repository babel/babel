# babel-plugin-transform-do-expressions

Compile do expressions to ES5

## Installation

```sh
$ npm install babel-plugin-transform-do-expressions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-do-expressions"]
}
```

### Via CLI

```sh
$ babel --plugins transform-do-expressions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-do-expressions"]
});
```
