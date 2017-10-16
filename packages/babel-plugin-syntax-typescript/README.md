# @babel/plugin-syntax-typescript

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-typescript
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-typescript"]
}
```

### Via CLI

```sh
babel --plugins syntax-typescript script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["syntax-typescript"]
});
```
