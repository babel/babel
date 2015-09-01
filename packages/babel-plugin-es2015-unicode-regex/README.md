# babel-plugin-es2015-unicode-regex

Compile ES2015 unicode regex to ES5

## Installation

```sh
$ npm install babel-plugin-es2015-unicode-regex
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["es2015-unicode-regex"]
}
```

### Via CLI

```sh
$ babel --plugins es2015-unicode-regex script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["es2015-unicode-regex"]
});
```
