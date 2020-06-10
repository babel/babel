var _arr = new WeakMap();

var D = /*#__PURE__*/function () {
  "use strict";

  function D() {
    babelHelpers.classCallCheck(this, D);

    _arr.set(this, {
      writable: true,
      value: void 0
    });
  }

  babelHelpers.createClass(D, [{
    key: "f",
    value: function f() {
      for (var el of babelHelpers.classPrivateFieldGet(this, _arr)) {
        ;
      }
    }
  }]);
  return D;
}();
