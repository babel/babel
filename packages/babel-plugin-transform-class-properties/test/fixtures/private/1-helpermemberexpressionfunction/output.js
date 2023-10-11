var _arr = /*#__PURE__*/new WeakMap();
var D = /*#__PURE__*/function () {
  "use strict";

  function D() {
    babelHelpers.classCallCheck(this, D);
    babelHelpers.classPrivateFieldInitSpec(this, _arr, {
      writable: true,
      value: void 0
    });
  }
  babelHelpers.createClass(D, [{
    key: "f",
    value: function f() {
      for (var el of babelHelpers.classPrivateFieldGet(this, _arr));
    }
  }]);
  return D;
}();
var _p = /*#__PURE__*/new WeakMap();
var C = /*#__PURE__*/function () {
  "use strict";

  function C() {
    babelHelpers.classCallCheck(this, C);
    babelHelpers.classPrivateFieldInitSpec(this, _p, {
      writable: true,
      value: void 0
    });
  }
  babelHelpers.createClass(C, [{
    key: "m",
    value: function m() {
      for (babelHelpers.classPrivateFieldDestructureSet(this, _p).value of []);
    }
  }]);
  return C;
}();
var _arr2 = /*#__PURE__*/new WeakMap();
var E = /*#__PURE__*/function () {
  "use strict";

  function E() {
    babelHelpers.classCallCheck(this, E);
    babelHelpers.classPrivateFieldInitSpec(this, _arr2, {
      writable: true,
      value: void 0
    });
  }
  babelHelpers.createClass(E, [{
    key: "f",
    value: function f() {
      for (babelHelpers.classPrivateFieldDestructureSet(this, _arr2).value of [1, 2]);
    }
  }]);
  return E;
}();
var _ar = /*#__PURE__*/new WeakMap();
var F = /*#__PURE__*/function () {
  "use strict";

  function F() {
    babelHelpers.classCallCheck(this, F);
    babelHelpers.classPrivateFieldInitSpec(this, _ar, {
      writable: true,
      value: void 0
    });
  }
  babelHelpers.createClass(F, [{
    key: "g",
    value: function g() {
      for (babelHelpers.classPrivateFieldDestructureSet(this, _ar).value in [1, 2, 3]);
    }
  }]);
  return F;
}();
