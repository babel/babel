"use strict";

function sum() {
  var _arguments = arguments;
  var _again = true;

  _function: while (_again) {
    let a = _arguments.length <= 0 || _arguments[0] === undefined ? 1 : _arguments[0];
    _again = false;
    let b = _arguments.length <= 1 || _arguments[1] === undefined ? 2 : _arguments[1];

    if (b > 0) {
      _arguments = [a + 1, b - 1];
      _again = true;
      a = b = undefined;
      continue _function;
    }
    return a;
  }
}