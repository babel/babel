# babel-plugin-transform-babel-native

## Installation

```sh
$ npm install babel-plugin-transform-babel-native
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-babel-native"]
}
```

### Via CLI

```sh
$ babel --plugins transform-babel-native script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-babel-native"]
});
```
