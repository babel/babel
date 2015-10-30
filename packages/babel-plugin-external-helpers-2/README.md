# babel-plugin-external-helpers-2

## Installation

```sh
$ npm install babel-plugin-external-helpers-2
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["external-helpers"]
}
```

### Via CLI

```sh
$ babel --plugins external-helpers script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["external-helpers"]
});
```
