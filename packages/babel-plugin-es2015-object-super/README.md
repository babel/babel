# babel-plugin-es2015-object-super

Compile ES2015 object super to ES5

## Installation

```sh
$ npm install babel-plugin-es2015-object-super
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["es2015-object-super"]
}
```

### Via CLI

```sh
$ babel --plugins es2015-object-super script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["es2015-object-super"]
});
```
