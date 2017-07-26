# babel-plugin-transform-bigint


## Example



## Installation

```sh
npm install --save-dev babel-plugin-transform-numeric-separator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-bigint"]
}
```

### Via CLI

```sh
babel --plugins transform-bigint script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-bigint"]
});
```
