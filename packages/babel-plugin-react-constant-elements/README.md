# babel-plugin-react-constant-elements

Treat React JSX elements as value types and hoist them to the highest scope

## Installation

```sh
$ npm install babel-plugin-react-constant-elements
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["react-constant-elements"]
}
```

### Via CLI

```sh
$ babel --plugins react-constant-elements script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["react-constant-elements"]
});
```
