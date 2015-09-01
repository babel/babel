# babel-plugin-class-properties



## Installation

```sh
$ npm install babel-plugin-class-properties
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["class-properties"]
}
```

### Via CLI

```sh
$ babel --plugins class-properties script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["class-properties"]
});
```
