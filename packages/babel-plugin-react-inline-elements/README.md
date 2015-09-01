# babel-plugin-react-inline-elements

Turn JSX elements into exploded React objects

## Installation

```sh
$ npm install babel-plugin-react-inline-elements
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["react-inline-elements"]
}
```

### Via CLI

```sh
$ babel --plugins react-inline-elements script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["react-inline-elements"]
});
```
