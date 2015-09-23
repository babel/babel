# babel-plugin-transform-react-constant-elements

Treat React JSX elements as value types and hoist them to the highest scope

## Installation

```sh
$ npm install babel-plugin-transform-react-constant-elements
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-react-constant-elements"]
}
```

### Via CLI

```sh
$ babel --plugins transform-react-constant-elements script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-react-constant-elements"]
});
```
