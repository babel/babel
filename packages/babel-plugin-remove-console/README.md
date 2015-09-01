# babel-plugin-remove-console

Remove console.* calls

## Installation

```sh
$ npm install babel-plugin-remove-console
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["remove-console"]
}
```

### Via CLI

```sh
$ babel --plugins remove-console script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["remove-console"]
});
```
