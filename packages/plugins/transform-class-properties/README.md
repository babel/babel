# babel-plugin-transform-class-properties

## Installation

```sh
$ npm install babel-plugin-transform-class-properties
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-class-properties"]
}
```

### Via CLI

```sh
$ babel --plugins transform-class-properties script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-class-properties"]
});
```
