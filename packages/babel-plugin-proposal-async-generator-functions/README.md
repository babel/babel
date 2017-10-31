# @babel/plugin-proposal-async-generator-functions

> Turn async generator functions and for-await statements to ES2015 generators

## Example

**In**

```javascript
async function* agf() {
  await 1;
  yield 2;
}
```

**Out**

```javascript
var _asyncGenerator = ...

let agf = (() => {
  var _ref = _asyncGenerator.wrap(function* () {
    yield _asyncGenerator.await(1);
    yield 2;
  });

  return function agf() {
    return _ref.apply(this, arguments);
  };
})();
```

For await example

```js
async function f() {
  for await (let x of y) {
    g(x);
  }
}
```

**Example Usage**

```js
async function* genAnswers() {
  var stream = [ Promise.resolve(4), Promise.resolve(9), Promise.resolve(12) ];
  var total = 0;
  for await (let val of stream) {
    total += await val;
    yield total;
  }
}

function forEach(ai, fn) {
  return ai.next().then(function (r) {
    if (!r.done) {
      fn(r);
      return forEach(ai, fn);
    }
  });
}

var output = 0;
forEach(genAnswers(), function(val) { output += val.value })
.then(function () {
  console.log(output); // 42
});
```

[Try it Out in the REPL](https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=stage-3&code=async%20function*%20genAnswers()%20%7B%0A%20%20var%20stream%20%3D%20%5B%20Promise.resolve(4)%2C%20Promise.resolve(9)%2C%20Promise.resolve(12)%20%5D%3B%0A%20%20var%20total%20%3D%200%3B%0A%20%20for%20await%20(let%20val%20of%20stream)%20%7B%0A%20%20%20%20total%20%2B%3D%20await%20val%3B%0A%20%20%20%20yield%20total%3B%0A%20%20%7D%0A%7D%0A%0Afunction%20forEach(ai%2C%20fn)%20%7B%0A%20%20return%20ai.next().then(function%20(r)%20%7B%0A%20%20%20%20if%20(!r.done)%20%7B%0A%20%20%20%20%20%20fn(r)%3B%0A%20%20%20%20%20%20return%20forEach(ai%2C%20fn)%3B%0A%20%20%20%20%7D%0A%20%20%7D)%3B%0A%7D%0A%0Avar%20output%20%3D%200%3B%0AforEach(genAnswers()%2C%20function(val)%20%7B%20output%20%2B%3D%20val.value%20%7D)%0A.then(function%20()%20%7B%0A%20%20console.log(output)%3B%20%2F%2F%2042%0A%7D)%3B&experimental=true&loose=false&spec=false&playground=true&stage=0)

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-async-generator-functions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/proposal-async-generator-functions"]
}
```

### Via CLI

```sh
babel --plugins @babel/proposal-async-generator-functions script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/proposal-async-generator-functions"]
});
```

## References

* [Proposal: Asynchronous iteration for ECMAScript](https://github.com/tc39/proposal-async-iteration)
