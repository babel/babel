# babel-plugin-transform-dead-code-elimination

Eliminate dead code

## Installation

```sh
$ npm install babel-plugin-transform-dead-code-elimination
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-dead-code-elimination"]
}
```

### Via CLI

```sh
$ babel --plugins transform-dead-code-elimination script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-dead-code-elimination"]
});
```
