# babel-helper-wrap-function

This helper wraps a function with a call epression.
It works with every type of function: statements, expressions and methods; both named and anonymous.


For eample, it can be used to transform

```js
(function () {
}());
```

into

```js
_wrapper(function () {
})();
```

## Usage

```js
import wrapFunction from "babel-helper-wrap-function";

wrapFunction(nodePathOfTheFunction, nodeWhichReferencesToTheWrapper);
```
