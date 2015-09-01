# babel-plugin-es2015-classes

Compile ES2015 classes to ES5

## Installation

```sh
$ npm install babel-plugin-es2015-classes
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["es2015-classes"]
}
```

### Via CLI

```sh
$ babel --plugins es2015-classes script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["es2015-classes"]
});
```
