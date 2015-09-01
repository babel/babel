# babel-plugin-merge-sibling-variables

Merge sibling variables into one.

## Example

**In**

```javascript
var foo = "bar";
var bar = "foo";
foobar();
```

**Out**

```javascript
var foo = "bar",
    bar = "foo";
foobar();
```

## Installation

```sh
$ npm install babel-plugin-merge-sibling-variables
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["merge-sibling-variables"]
}
```

### Via CLI

```sh
$ babel --plugins merge-sibling-variables script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["merge-sibling-variables"]
});
```
