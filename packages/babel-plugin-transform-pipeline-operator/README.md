# @babel/plugin-transform-pipeline-operator

Transform pipeline operator `|>` into call expressions. See [the proposal](https://github.com/tc39/proposal-pipeline-operator) for details.

## Installation

```sh
$ npm install @babel/plugin-transform-pipeline-operator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/transform-pipeline-operator"]
}
```

### Via CLI

```sh
$ babel --plugins @babel/transform-pipeline-operator script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/transform-pipeline-operator"]
});
```
