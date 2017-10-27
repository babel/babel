# @babel/plugin-proposal-export-namespace

> Compile export-ns-from statements to ES2015

## Example

```js
export * as ns from 'mod';
```

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-export-namespace
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/proposal-export-namespace"]
}
```

### Via CLI

```sh
babel --plugins @babel/proposal-export-namespace script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/proposal-export-namespace"]
});
```
## References

* ~~[Proposal: Additional export-from statements in ES7](https://github.com/leebyron/ecmascript-more-export-from)~~ (Withdrawn)
* [ECMAScript Proposal: export ns from](https://github.com/leebyron/ecmascript-export-ns-from)
