# babel-plugin-transform-strict-mode

TODO

## Installation

```sh
$ npm install babel-plugin-transform-strict-mode
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-strict-mode"]
}
```

### Via CLI

```sh
$ babel --plugins transform-strict-mode script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-strict-mode"]
});
```
