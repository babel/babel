"use strict";

function fact(_x2) {
  var _arguments = arguments;
  _function: while (true) {
    var n = _x2;
    acc = undefined;
    var acc = _arguments[1] === undefined ? 1 : _arguments[1];
    if (n > 1) {
      _arguments = [_x2 = n - 1, acc * n];
      continue _function;
    } else {
      return acc;
    }return;
  }
}
