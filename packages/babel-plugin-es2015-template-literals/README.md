# babel-plugin-es2015-template-literals

Compile ES2015 template literals to ES5

## Installation

```sh
$ npm install babel-plugin-es2015-template-literals
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["es2015-template-literals"]
}
```

### Via CLI

```sh
$ babel --plugins es2015-template-literals script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["es2015-template-literals"]
});
```
