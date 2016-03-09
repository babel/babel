# babel-plugin-syntax-pipeline-operator

Allow parsing of the pipeline operator `|>`. See [the ES.next proposal](https://github.com/mindeavor/es-pipeline-operator) for details.

## Installation

```sh
$ npm install babel-plugin-syntax-pipeline-operator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-pipeline-operator"]
}
```

### Via CLI

```sh
$ babel --plugins syntax-pipeline-operator script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-pipeline-operator"]
});
```
