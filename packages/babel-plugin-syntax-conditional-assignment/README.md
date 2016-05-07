# babel-plugin-syntax-conditional-assignment

Allow parsing of the conditional assignment operator.

## Installation

```sh
$ npm install babel-plugin-syntax-conditional-assignment
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-conditional-assignment"]
}
```

### Via CLI

```sh
$ babel --plugins syntax-conditional-assignment script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-conditional-assignment"]
});
```
