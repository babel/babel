"use strict";

function mandatory(paramName) {
  throw new Error(`Missing parameter: ${paramName}`);
}

function foo(_ref) {
  return new Promise(function ($return, $error) {
    let a = _ref.a,
        _ref$b = _ref.b,
        b = _ref$b === void 0 ? mandatory("b") : _ref$b;
    return $return(Promise.resolve(b));
  });
}
