"use strict";

(function () {
  var _this = this,
      _arguments2 = arguments;

  var foo = function foo() {
    var _again = true;

    _function: while (_again) {
      _again = false;

      _this;
      _arguments2;
      _again = true;
      continue _function;
    }
  };
  foo();
});
