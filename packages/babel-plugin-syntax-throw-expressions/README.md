# @babel/plugin-syntax-throw-expressions

Allow parsing of Throw Expressions:

```js
function test(param = throw new Error('required!')) {
  const test = param === true || throw new Error('Falsey!');
}
```


## Installation

```sh
npm install --save-dev @babel/plugin-syntax-throw-expressions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-syntax-throw-expressions"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-throw-expressions script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-throw-expressions"]
});
```
