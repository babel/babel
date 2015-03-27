"use strict";

function f() {
  var _again = true;

  _function: while (_again) {
    _again = false;

    if (true) {} else {
      _again = true;
      continue _function;
    }
  }
}
