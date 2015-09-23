# babel-plugin-transform-comprehensions

Compile array and generator comprehensions to ES5

## Installation

```sh
$ npm install babel-plugin-transform-comprehensions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-comprehensions"]
}
```

### Via CLI

```sh
$ babel --plugins transform-comprehensions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-comprehensions"]
});
```
