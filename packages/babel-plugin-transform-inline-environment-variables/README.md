# babel-plugin-transform-inline-environment-variables

Inline environment variables

## Installation

```sh
$ npm install babel-plugin-transform-inline-environment-variables
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-inline-environment-variables"]
}
```

### Via CLI

```sh
$ babel --plugins transform-inline-environment-variables script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-inline-environment-variables"]
});
```
