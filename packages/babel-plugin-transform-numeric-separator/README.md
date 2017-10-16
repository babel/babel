# babel-plugin-transform-numeric-separator

> This plugin allows Babel to transform Decimal, Binary, Hex and Octal literals containing Numeric Literal Separator to their non-separated form.

## Example

### Decimal Literals

```js
let budget = 1_000_000_000_000;

// What is the value of `budget`? It's 1 trillion!
//
// Let's confirm:
console.log(budget === 10 ** 12); // true
```

### Binary Literals

```js
let nibbles = 0b1010_0001_1000_0101;

// Is bit 7 on? It sure is!
// 0b1010_0001_1000_0101
//             ^
//
// We can double check:
console.log(!!(nibbles & (1 << 7))); // true
```

### Hex Literal

```js
// Messages are sent as 24 bit values, but should be
// treated as 3 distinct bytes:
let message = 0xA0_B0_C0;

// What's the value of the upper most byte? It's A0, or 160.
// We can confirm that:
let a = (message >> 16) & 0xFF;
console.log(a.toString(16), a); // a0, 160

// What's the value of the middle byte? It's B0, or 176.
// Let's just make sure...
let b = (message >> 8) & 0xFF;
console.log(b.toString(16), b); // b0, 176

// What's the value of the lower most byte? It's C0, or 192.
// Again, let's prove that:
let c = message & 0xFF;
console.log(c.toString(16), b); // c0, 192
```

### Octal Literal

*hand wave emoji*

Octals are great for permissions, but also look better when represented in `0o0000` form. No real benefit with separators here.

## Installation

```sh
npm install --save-dev babel-plugin-transform-numeric-separator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-numeric-separator"]
}
```

### Via CLI

```sh
babel --plugins transform-numeric-separator script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-numeric-separator"]
});
```

## Additional Information

If you need to further compile ES2015 Decimal, Binary, Hex and Octal number representations to their pre-ES2015 numeric literal form, add the [`"transform-es2015-literals"`](http://babeljs.io/docs/plugins/transform-es2015-literals/) plugin:

> `transform-es2015-literals` is already included in [babel-preset-env](https://github.com/babel/babel-preset-env) and babel-preset-es2015.

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["env"],
  "plugins": ["transform-numeric-separator"]
}
{
  "plugins": ["transform-numeric-separator", "transform-es2015-literals"]
}
```

## References

* [Proposal: Numeric Separators](https://github.com/samuelgoto/proposal-numeric-separator)
