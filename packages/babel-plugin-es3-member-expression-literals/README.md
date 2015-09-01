# babel-plugin-es3-member-expression-literals

Ensure that reserved words are quoted in property accesses

## Installation

```sh
$ npm install babel-plugin-es3-member-expression-literals
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["es3-member-expression-literals"]
}
```

### Via CLI

```sh
$ babel --plugins es3-member-expression-literals script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["es3-member-expression-literals"]
});
```
