# babel-plugin-transform-export-default

> Compile export-default-from statements to ES2015

## Example

```js
export v from 'mod';
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-export-default
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-export-default"]
}
```

### Via CLI

```sh
babel --plugins transform-export-default script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-export-default"]
});
```
## References

* ~~[Proposal: Additional export-from statements in ES7](https://github.com/leebyron/ecmascript-more-export-from)~~ (Withdrawn)
* [ECMAScript Proposal: export default from](https://github.com/leebyron/ecmascript-export-default-from)
