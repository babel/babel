# babel-plugin-transform-react-inline-elements

Turn JSX elements into exploded React objects

## Installation

```sh
$ npm install babel-plugin-transform-react-inline-elements
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-react-inline-elements"]
}
```

### Via CLI

```sh
$ babel --plugins transform-react-inline-elements script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-react-inline-elements"]
});
```
