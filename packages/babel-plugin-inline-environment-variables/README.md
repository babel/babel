# babel-plugin-inline-environment-variables

Inline environment variables

## Installation

```sh
$ npm install babel-plugin-inline-environment-variables
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["inline-environment-variables"]
}
```

### Via CLI

```sh
$ babel --plugins inline-environment-variables script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["inline-environment-variables"]
});
```
