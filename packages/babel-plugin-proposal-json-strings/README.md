# @babel/plugin-syntax-json-strings

Allow parsing of the U+2028 LINE SEPARATOR and U+2029 PARAGRAPH SEPARATOR in JS strings

## Examples

**In**

```js
const ex = "before after";
//                ^ There's a U+2028 char between 'before' and 'after'
```

**Out**

```js
const ex = "before\u2028after";
//                ^ There's a U+2028 char between 'before' and 'after'
```

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-json-strings
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-proposal-json-strings"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-proposal-json-strings script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-proposal-json-strings"]
});
```

## References
- [Proposal: Optional Catch Binding for ECMAScript](https://github.com/babel/proposals/issues/7)
