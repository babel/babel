# babel-plugin-syntax-bigint

> Allow parsing of BigInt literals.


## Installation

```sh
npm install --save-dev babel-plugin-syntax-bigint
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-bigint"]
}
```

### Via CLI

```sh
babel --plugins syntax-bigint script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-bigint"]
});
```
