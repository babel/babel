# @babel/plugin-proposal-unicode-property-regex

Compile [Unicode property escapes](https://github.com/mathiasbynens/regexpu-core/blob/master/property-escapes.md) (`\p{…}` and `\P{…}`) in Unicode regular expressions to ES5 or ES6 that works in today’s environments.

**Note:** the Unicode property escape syntax is non-standard and may or may not reflect what eventually gets specified.

[Here’s an online demo.](https://mothereff.in/regexpu#input=var+regex+%3D+/%5Cp%7BScript_Extensions%3DGreek%7D/u%3B&unicodePropertyEscape=1)

## Installation

```sh
npm install @babel/plugin-proposal-unicode-property-regex
```

## Usage

### Via `.babelrc` (recommended)

`.babelrc`

```json
{
  "plugins": ["@babel/proposal-unicode-property-regex"]
}
```

### Via CLI

```sh
babel --plugins @babel/@babel/proposal-unicode-property-regex script.js
```

### Via Node.js API

```js
require("@babel/core").transform(code, {
  "plugins": ["@babel/proposal-unicode-property-regex"]
});
```

To transpile to ES6/ES2015:

```js
require("@babel/core").transform(code, {
  "plugins": [
    ["@babel/proposal-unicode-property-regex", { "useUnicodeFlag": false }]
  ]
});
```

## Options

* `useUnicodeFlag` (defaults to `true`)

When disabled with `false`, the transform will convert unicode regexes to
non-unicode regexes, removing the `u` flag. See https://www.npmjs.com/package/regexpu-core#useunicodeflag-default-false- for more information.

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |
