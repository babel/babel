# babel-plugin-undeclared-variables-check

> This plugin throws a compile-time error on references to undeclared variables.

## Example

**In**

```javascript
function foo() {}
foo();
bar();
```

**Out**

```
ReferenceError: stdin: Line 3: Reference to undeclared variable "bar" - did you mean "foo"?
  1 | function foo() {}
  2 | foo();
> 3 | bar();
    | ^
  4 |
```

## Installation

```sh
npm install --save-dev babel-plugin-undeclared-variables-check
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["undeclared-variables-check"]
}
```

### Via CLI

```sh
babel --plugins undeclared-variables-check script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["undeclared-variables-check"]
});
```
