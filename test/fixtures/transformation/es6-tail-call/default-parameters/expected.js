"use strict";

function sum() {
  var _arguments = arguments;
  var _again = true;

  _function: while (_again) {
    a = b = undefined;
    var a = _arguments[0] === undefined ? 1 : _arguments[0];
    _again = false;
    var b = _arguments[1] === undefined ? 2 : _arguments[1];

    if (b > 0) {
      _arguments = [a + 1, b - 1];
      _again = true;
      continue _function;
    }
    return a;
  }
}
