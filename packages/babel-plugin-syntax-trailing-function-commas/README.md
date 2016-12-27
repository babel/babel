# babel-plugin-syntax-trailing-function-commas

Compile trailing function commas to ES5


```js
function clownPuppiesEverywhere(
  param1,
  param2,
) { /* ... */ }

clownPuppiesEverywhere(
  'foo',
  'bar',
);
```
[Try in REPL](http://babeljs.io/repl/#?evaluate=true&presets=es2015%2Cstage-0&code=function%20clownPuppiesEverywhere(%0A%20%20param1%2C%0A%20%20param2%2C%0A)%20%7B%20%2F*%20...%20*%2F%20%7D%0A%0AclownPuppiesEverywhere(%0A%20%20'foo'%2C%0A%20%20'bar'%2C%0A)%3B)

## Example

### Basic
This is an example from the [Proposal](https://github.com/jeffmo/es-trailing-function-commas).

Let's say you have this function:

```js
function clownPuppiesEverywhere(
  param1,
  param2
) { /* ... */ }

clownPuppiesEverywhere(
  'foo',
  'bar'
);
```

If you want to have a new parameter called `param3`, the diff output would be like that:

```diff
function clownPuppiesEverywhere(
  param1,
- param2
+ param2, // Change this line to add a comma
+ param3  // Add param3
) { /* ... */ }

clownPuppiesEverywhere(
  'foo',
- 'bar'
+ 'bar', // Change this line to add a comma
+ 'baz'  // Add param3
);
```
In total, you have to change 2 lines for the function declaration and 2 lines for each usage.

If you had your function defined with trailing commas:

```js
function clownPuppiesEverywhere(
  param1,
  param2,
) { /* ... */ }

clownPuppiesEverywhere(
  'foo',
  'bar',
);
```
Adding a new parameter would only change one line in the function declaration and one line for each usage:

```diff
function clownPuppiesEverywhere(
  param1,
  param2,
+ param3, // Add param3
) { /* ... */ }

clownPuppiesEverywhere(
  'foo',
  'bar',
+ 'baz', // Add param3
);
```
In the end, your diff output will be cleaner and easier to read, it would be much quicker to add a new parameter to your functions, it also makes it easier to copy paste elements and move code around.

## Installation

```sh
npm install --save-dev babel-plugin-syntax-trailing-function-commas
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-trailing-function-commas"]
}
```

### Via CLI

```sh
babel --plugins syntax-trailing-function-commas script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-trailing-function-commas"]
});
```

## References

* [Proposal](https://github.com/jeffmo/es-trailing-function-commas)
* [Spec](http://jeffmo.github.io/es-trailing-function-commas/)
* [Why you should enforce Dangling Commas for Multiline Statements](https://medium.com/@nikgraf/why-you-should-enforce-dangling-commas-for-multiline-statements-d034c98e36f8)
