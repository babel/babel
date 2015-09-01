# babel-plugin-comprehensions

Compile array and generator comprehensions to ES5

## Installation

```sh
$ npm install babel-plugin-comprehensions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["comprehensions"]
}
```

### Via CLI

```sh
$ babel --plugins comprehensions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["comprehensions"]
});
```
