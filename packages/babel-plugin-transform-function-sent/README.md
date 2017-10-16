# babel-plugin-transform-function-sent

> Compile the `function.sent` meta property, used inside generator functions, to valid ES2015 code.

## Example

```js
function* generator() {
    console.log("Sent", function.sent);
    console.log("Yield", yield);
}

const iterator = generator();
iterator.next(1); // Logs "Sent 1"
iterator.next(2); // Logs "Yield 2"
```

Is compiled roughly to

```js
let generator = _skipFirstGeneratorNext(function* () {
    const _functionSent = yield;
    console.log("Sent", _functionSent);
    console.log("Yield", yield);
});

const iterator = generator();
iterator.next(1); // Logs "Sent 1"
iterator.next(2); // Logs "Yield 1"
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-function-sent
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-function-sent"]
}
```

### Via CLI

```sh
babel --plugins transform-function-sent script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-function-sent"]
});
```

## References

* [Proposal](https://github.com/allenwb/ESideas/blob/master/Generator%20metaproperty.md)
