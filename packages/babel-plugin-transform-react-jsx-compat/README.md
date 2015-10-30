# babel-plugin-transform-react-jsx-compat

Turn JSX into React Pre-0.12 function calls

## Installation

```sh
$ npm install babel-plugin-transform-react-jsx-compat
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-react-jsx-compat"]
}
```

### Via CLI

```sh
$ babel --plugins transform-react-jsx-compat script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-react-jsx-compat"]
});
```
