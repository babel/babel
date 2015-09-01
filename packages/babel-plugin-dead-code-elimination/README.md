# babel-plugin-dead-code-elimination

Eliminate dead code

## Installation

```sh
$ npm install babel-plugin-dead-code-elimination
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["dead-code-elimination"]
}
```

### Via CLI

```sh
$ babel --plugins dead-code-elimination script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["dead-code-elimination"]
});
```
