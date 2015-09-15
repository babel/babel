# babel-plugin-transform-remove-console

Remove console.* calls

## Installation

```sh
$ npm install babel-plugin-transform-remove-console
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-remove-console"]
}
```

### Via CLI

```sh
$ babel --plugins transform-remove-console script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-remove-console"]
});
```
