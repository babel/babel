# babel-plugin-syntax-decorators

Allow parsing of decorators.

## Installation

```sh
$ npm install babel-plugin-syntax-decorators
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-decorators"]
}
```

### Via CLI

```sh
$ babel --plugins syntax-decorators script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-decorators"]
});
```
