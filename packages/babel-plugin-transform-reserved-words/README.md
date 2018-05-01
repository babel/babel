# @babel/plugin-transform-reserved-words

> Renames variables that are reserved words in ES3 but not ES5+

Some words were reserved in ES3 as potential future keywords but were not
reserved in ES5 and later. This plugin, to be used when targeting ES3
environments, renames variables from that set of words.

## Example

**In**

```javascript
var abstract = 1;
var x = abstract + 1;
```

**Out**

```javascript
var _abstract = 1;
var x = _abstract + 1;
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-reserved-words
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-transform-reserved-words"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-reserved-words script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-reserved-words"]
});
```

## References

* [ES3 Spec: Future Reserved Words](http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf#page=26)
