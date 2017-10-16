# babel-plugin-transform-es2015-unicode-regex

> Compile ES2015 unicode regex to ES5

## Example

**In**

```js
var string = "foo💩bar";
var match = string.match(/foo(.)bar/u);
```

**Out**

```js
var string = "foo💩bar";
var match = string.match(/foo((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))bar/);
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-unicode-regex
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-unicode-regex"]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-unicode-regex script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-es2015-unicode-regex"]
});
```
