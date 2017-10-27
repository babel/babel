# @babel/plugin-proposal-pipeline-operator

Transform pipeline operator `|>` into call expressions. See [the proposal](https://github.com/tc39/proposal-pipeline-operator) for details.

## Installation

```sh
$ npm install @babel/plugin-proposal-pipeline-operator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/proposal-pipeline-operator"]
}
```

### Via CLI

```sh
$ babel --plugins @babel/proposal-pipeline-operator script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/proposal-pipeline-operator"]
});
```
