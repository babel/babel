# babel-plugin-async-functions

Compile async functions to ES5

## Installation

```sh
$ npm install babel-plugin-async-functions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["async-functions"]
}
```

### Via CLI

```sh
$ babel --plugins async-functions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["async-functions"]
});
```
