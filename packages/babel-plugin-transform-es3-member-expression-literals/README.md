# babel-plugin-transform-es3-member-expression-literals

> Ensure that reserved words are quoted in property accesses

## Example

**In**

```javascript
foo.catch;
```

**Out**

```javascript
foo["catch"];
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-es3-member-expression-literals
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es3-member-expression-literals"]
}
```

### Via CLI

```sh
babel --plugins transform-es3-member-expression-literals script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es3-member-expression-literals"]
});
```
