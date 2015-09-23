# babel-plugin-transform-remove-debugger

Remove debugger statements

## Installation

```sh
$ npm install babel-plugin-transform-remove-debugger
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-remove-debugger"]
}
```

### Via CLI

```sh
$ babel --plugins transform-remove-debugger script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-remove-debugger"]
});
```
