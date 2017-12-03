# babel-plugin-transform-es2015-literals

> Compile ES2015 unicode string and number literals to ES5

## Example

**In**

```js
var b = 0b11; // binary integer literal
var o = 0o7; // octal integer literal
const u = 'Hello\u{000A}\u{0009}!'; // unicode string literals, newline and tab
```

**Out**

```js
var b = 3; // binary integer literal
var o = 7; // octal integer literal
const u = 'Hello\n\t!'; // unicode string literals, newline and tab
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-literals
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-literals"]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-literals script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-literals"]
});
```
