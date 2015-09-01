# babel-plugin-member-expression-literals

Turn valid member expression property literals into plain identifiers

## Example

**In**

```javascript
obj["foo"] = "isValid";

obj.const = "isKeyword";
obj["var"] = "isKeyword";
```

**Out**

```javascript
obj.foo = "isValid";

obj["const"] = "isKeyword";
obj["var"] = "isKeyword";
```

## Installation

```sh
$ npm install babel-plugin-member-expression-literals
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["member-expression-literals"]
}
```

### Via CLI

```sh
$ babel --plugins member-expression-literals script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["member-expression-literals"]
});
```
