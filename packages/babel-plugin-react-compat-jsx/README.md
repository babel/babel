# babel-plugin-react-compat-jsx

Turn JSX into React Pre-0.12 function calls

## Installation

```sh
$ npm install babel-plugin-react-compat-jsx
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["react-compat-jsx"]
}
```

### Via CLI

```sh
$ babel --plugins react-compat-jsx script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["react-compat-jsx"]
});
```
