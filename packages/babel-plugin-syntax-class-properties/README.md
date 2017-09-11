# babel-plugin-syntax-class-properties

> Allow parsing of class properties.

## Installation

```sh
npm install --save-dev babel-plugin-syntax-class-properties
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-class-properties"]
}
```

### Via CLI

```sh
babel --plugins syntax-class-properties script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-class-properties"]
});
```
