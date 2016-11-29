# babel-plugin-transform-eval

Compile eval calls with string literals

## Example

**In**

```javascript
eval("(() => 'foo')");
```

**Out**

```javascript
eval("(function () { return 'foo'; })");
```

## Installation

```sh
npm install babel-plugin-transform-eval
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-eval"]
}
```

### Via CLI

```sh
babel --plugins transform-eval script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-eval"]
});
```
