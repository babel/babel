# babel-plugin-external-helpers

## Installation

```sh
npm install --save-dev babel-plugin-external-helpers
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["external-helpers"]
}
```

### Via CLI

```sh
babel --plugins external-helpers script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["external-helpers"]
});
```
