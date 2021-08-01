var _arr = /*#__PURE__*/new WeakMap();

var D = /*#__PURE__*/function () {
  "use strict";

  function D() {
    babelHelpers.classCallCheck(this, D);

    _arr.set(this, void 0);
  }

  babelHelpers.createClass(D, [{
    key: "f",
    value: function f() {
      for (var el of babelHelpers.classPrivateFieldGet2(this, _arr)) {
        ;
      }
    }
  }]);
  return D;
}();

var _p = /*#__PURE__*/new WeakMap();

var C = /*#__PURE__*/function () {
  "use strict";

  function C() {
    babelHelpers.classCallCheck(this, C);

    _p.set(this, void 0);
  }

  babelHelpers.createClass(C, [{
    key: "m",
    value: function m() {
      for (babelHelpers.classInstancePrivateFieldDestructureSet2(this, _p)._ of []) {
        ;
      }
    }
  }]);
  return C;
}();

var _arr2 = /*#__PURE__*/new WeakMap();

var E = /*#__PURE__*/function () {
  "use strict";

  function E() {
    babelHelpers.classCallCheck(this, E);

    _arr2.set(this, void 0);
  }

  babelHelpers.createClass(E, [{
    key: "f",
    value: function f() {
      for (babelHelpers.classInstancePrivateFieldDestructureSet2(this, _arr2)._ of [1, 2]) {
        ;
      }
    }
  }]);
  return E;
}();

var _ar = /*#__PURE__*/new WeakMap();

var F = /*#__PURE__*/function () {
  "use strict";

  function F() {
    babelHelpers.classCallCheck(this, F);

    _ar.set(this, void 0);
  }

  babelHelpers.createClass(F, [{
    key: "g",
    value: function g() {
      for (babelHelpers.classInstancePrivateFieldDestructureSet2(this, _ar)._ in [1, 2, 3]) {
        ;
      }
    }
  }]);
  return F;
}();
