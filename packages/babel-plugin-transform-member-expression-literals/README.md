# @babel/plugin-transform-member-expression-literals

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
npm install --save-dev @babel/plugin-transform-member-expression-literals
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/transform-member-expression-literals"]
}
```

### Via CLI

```sh
babel --plugins @babel/transform-member-expression-literals script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/transform-member-expression-literals"]
});
```
