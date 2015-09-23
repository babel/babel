# babel-plugin-transform-decorators

Compile class and object decorators to ES5

## Installation

```sh
$ npm install babel-plugin-transform-decorators
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-decorators"]
}
```

### Via CLI

```sh
$ babel --plugins transform-decorators script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-decorators"]
});
```
