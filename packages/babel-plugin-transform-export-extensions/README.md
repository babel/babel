# babel-plugin-transform-export-extensions

> Compile additional export-from statements to ES2015

## Example

```js
export * as ns from 'mod';
export v from 'mod';
```
[Try in REPL](http://babeljs.io/repl/#?evaluate=true&presets=es2015%2Cstage-0&code=export%20*%20as%20ns%20from%20'mod'%3B%0Aexport%20v%20from%20'mod'%3B)

## Installation

```sh
npm install --save-dev babel-plugin-transform-export-extensions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-export-extensions"]
}
```

### Via CLI

```sh
babel --plugins transform-export-extensions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-export-extensions"]
});
```
## References

* ~~[Proposal: Additional export-from statements in ES7](https://github.com/leebyron/ecmascript-more-export-from)~~ (Withdrawn)
* [ECMAScript Proposal: export ns from](https://github.com/leebyron/ecmascript-export-ns-from)
* [ECMAScript Proposal: export default from](https://github.com/leebyron/ecmascript-export-default-from)
