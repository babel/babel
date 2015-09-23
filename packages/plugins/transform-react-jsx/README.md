# babel-plugin-transform-react-jsx

Turn JSX into React function calls

## Installation

```sh
$ npm install babel-plugin-transform-react-jsx
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-react-jsx"]
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
