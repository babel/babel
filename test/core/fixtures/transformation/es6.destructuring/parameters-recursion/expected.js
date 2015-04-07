"use strict";

function resolve(_x, _x2) {
  var _again = true;

  _function: while (_again) {
    a = b = undefined;
    _again = false;
    var _ref = _x,
        c = _x2;
    var a = _ref.a;
    var b = _ref.b;

    c += 1;
    _again = true;
    continue _function;
  }
}
