# FULL_NAME

DESCRIPTION

## Installation

```sh
$ npm install FULL_NAME
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["NAME"]
}
```

### Via CLI

```sh
$ babel --plugins NAME script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["NAME"]
});
```
