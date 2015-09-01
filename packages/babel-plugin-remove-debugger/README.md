# babel-plugin-remove-debugger

Remove debugger statements

## Installation

```sh
$ npm install babel-plugin-remove-debugger
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["remove-debugger"]
}
```

### Via CLI

```sh
$ babel --plugins remove-debugger script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["remove-debugger"]
});
```
