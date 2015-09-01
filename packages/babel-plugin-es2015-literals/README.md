# babel-plugin-es2015-literals

Compile ES2015 unicode string and number literals to ES5

## Installation

```sh
$ npm install babel-plugin-es2015-literals
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["es2015-literals"]
}
```

### Via CLI

```sh
$ babel --plugins es2015-literals script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["es2015-literals"]
});
```
