# babel-plugin-do-expressions

Compile do expressions to ES5

## Installation

```sh
$ npm install babel-plugin-do-expressions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["do-expressions"]
}
```

### Via CLI

```sh
$ babel --plugins do-expressions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["do-expressions"]
});
```
