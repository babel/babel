# @babel/plugin-transform-async-to-promises

> Turn async functions into ES2015 Promises

## Example

**In**

```javascript
async function tellYouLater(sayWhat) {
    if (sayWhat)
        return "I said: "+sayWhat;
    throw new Error("Nothing to say!") ;
}

async function test() {
    console.log(await tellYouLater("I'll tell you later")) ;
}
```

**Out**

```javascript
function tellYouLater(sayWhat) {
    return new Promise((function ($return, $error) {
        if (sayWhat) 
            return $return("I said: " + sayWhat);
        return $error(new Error("Nothing to say!"));
    }).bind(this));
}

function test() {
    return new Promise((function ($return, $error) {
        return Promise.resolve(tellYouLater("I'll tell you later")).then((function ($await_1) {
            try {
                console.log($await_1);
                return $return();
            } catch ($boundEx) {
                return $error($boundEx);
            }
        }).bind(this), $error);
    }).bind(this));
}
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-async-to-promises
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

Without options:

```json
{
  "plugins": ["@babel/plugin-transform-async-to-promises"]
}
```

With options:

```json
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-async-to-promises script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-async-to-promises"]
});
```

## References

* [Proposal: Async Functions for ECMAScript](https://github.com/tc39/ecmascript-asyncawait)
