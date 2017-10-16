# babel-helper-wrap-function

This helper wraps a function within a call expression. It works with any function: statements, expressions and methods; both named and anonymous.

## Example

**In**

```js
(function () {
}());
```

**Out**

```js
_wrapper(function () {
})();
```

## Usage

```js
import wrapFunction from "@babel/helper-wrap-function";

wrapFunction(nodePathOfTheFunction, nodeWhichReferencesToTheWrapper);
```
