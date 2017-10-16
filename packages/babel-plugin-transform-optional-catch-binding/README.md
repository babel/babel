# babel-plugin-transform-optional-catch-binding

> Optional catch binding enables the catch block to execute whether or not an argument is passed to the catch statement (CatchClause).


## Examples

```js
try {
  throw 0;
} catch {
  doSomethingWhichDoesntCareAboutTheValueThrown();
}
```

```js
try {
  throw 0;
} catch {
  doSomethingWhichDoesntCareAboutTheValueThrown();
} finally {
  doSomeCleanup();
}
```


## Installation

```sh
npm install --save-dev @babel/plugin-transform-optional-catch-binding
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-optional-catch-binding"]
}
```

### Via CLI

```sh
babel --plugins transform-optional-catch-binding script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-optional-catch-binding"]
});
```

## References
- [Proposal: Optional Catch Binding for ECMAScript](https://github.com/babel/proposals/issues/7)
