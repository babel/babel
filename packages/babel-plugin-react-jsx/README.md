# babel-plugin-react-jsx

Turn JSX into React function calls

## Installation

```sh
$ npm install babel-plugin-react-jsx
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["react-jsx"]
}
```

### Via CLI

```sh
$ babel --plugins react-jsx script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["react-jsx"]
});
```
