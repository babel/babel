# babel-plugin-syntax-decorators-2

> Updated parsing of decorators.

## Installation

```sh
npm install --save-dev babel-plugin-syntax-decorators-2
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-decorators-2"]
}
```

### Via CLI

```sh
babel --plugins syntax-decorators-2 script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-decorators-2"]
});
```
