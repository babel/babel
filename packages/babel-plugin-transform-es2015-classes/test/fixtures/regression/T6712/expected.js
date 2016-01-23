"use strict";

var A = function () {
  function A() {
    babelHelpers.classCallCheck(this, A);
  }

  babelHelpers.createClass(A, [{
    key: "foo",
    value: function foo() {
      var foo = 2;
    }
  }]);
  return A;
}();
