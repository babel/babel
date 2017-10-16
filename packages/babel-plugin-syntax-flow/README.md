# babel-plugin-syntax-flow



## Installation

```sh
npm install --save-dev @babel/plugin-syntax-flow
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-flow"]
}
```

### Via CLI

```sh
babel --plugins syntax-flow script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["syntax-flow"]
});
```
