# @babel/plugin-syntax-pipeline-operator

Allow parsing of the pipeline operator `|>`. See [the proposal](https://github.com/tc39/proposal-pipeline-operator) for details.

## Installation

```sh
$ npm install @babel/plugin-syntax-pipeline-operator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-syntax-pipeline-operator"]
}
```

### Via CLI

```sh
$ babel --plugins @babel/plugin-syntax-pipeline-operator script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-pipeline-operator"]
});
```
