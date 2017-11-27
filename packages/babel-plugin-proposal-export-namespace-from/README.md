# @babel/plugin-proposal-export-namespace-from

> Compile export-ns-from statements to ES2015

## Example

```js
export * as ns from 'mod';
```

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-export-namespace-from
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-proposal-export-namespace-from"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-proposal-export-namespace-from script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-proposal-export-namespace-from"]
});
```
## References

* ~~[Proposal: Additional export-from statements in ES7](https://github.com/leebyron/ecmascript-more-export-from)~~ (Withdrawn)
* [ECMAScript Proposal: export ns from](https://github.com/leebyron/ecmascript-export-ns-from)
