# babel-plugin-transform-pipeline-operator

Compile pipeline operator `|>` usage to ES5. See [the ES.next proposal](https://github.com/mindeavor/es-pipeline-operator) for details.

## Installation

```sh
$ npm install babel-plugin-transform-pipeline-operator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-pipeline-operator"]
}
```

### Via CLI

```sh
$ babel --plugins transform-pipeline-operator script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-pipeline-operator"]
});
```
