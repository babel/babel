# babel-plugin-transform-jsx

Turn JSX into static objects.

## Installation

```sh
$ npm install babel-plugin-transform-jsx
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-jsx"]
}
```

### Via CLI

```sh
$ babel --plugins transform-jsx script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-jsx"]
});
```
