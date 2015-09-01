# babel-plugin-eval

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
$ npm install babel-plugin-eval
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["eval"]
}
```

### Via CLI

```sh
$ babel --plugins eval script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["eval"]
});
```
