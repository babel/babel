# babel-plugin-transform-react-jsx

Turn JSX into React function calls

## Installation

```sh
$ npm install babel-plugin-transform-react-jsx
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-react-jsx"]
}
// with options
{
  "plugins": [
    ["transform-react-jsx", {
      "pragma": "dom" // default pragma is React.createElement
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-react-jsx script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-react-jsx"]
});
```
