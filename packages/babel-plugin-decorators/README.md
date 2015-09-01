# babel-plugin-decorators

Compile class and object decorators to ES5

## Installation

```sh
$ npm install babel-plugin-decorators
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["decorators"]
}
```

### Via CLI

```sh
$ babel --plugins decorators script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["decorators"]
});
```
