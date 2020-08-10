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

var _p = new WeakMap();

var C = /*#__PURE__*/function () {
  "use strict";

  function C() {
    babelHelpers.classCallCheck(this, C);

    _p.set(this, {
      writable: true,
      value: void 0
    });
  }

  babelHelpers.createClass(C, [{
    key: "m",
    value: function m() {
      for (babelHelpers.classPrivateFieldDestructureSet(this, _p).value of []) {
        ;
      }
    }
  }]);
  return C;
}();

var _arr2 = new WeakMap();

var E = /*#__PURE__*/function () {
  "use strict";

  function E() {
    babelHelpers.classCallCheck(this, E);

    _arr2.set(this, {
      writable: true,
      value: void 0
    });
  }

  babelHelpers.createClass(E, [{
    key: "f",
    value: function f() {
      for (babelHelpers.classPrivateFieldDestructureSet(this, _arr2).value of [1, 2]) {
        ;
      }
    }
  }]);
  return E;
}();

var _ar = new WeakMap();

var F = /*#__PURE__*/function () {
  "use strict";

  function F() {
    babelHelpers.classCallCheck(this, F);

    _ar.set(this, {
      writable: true,
      value: void 0
    });
  }

  babelHelpers.createClass(F, [{
    key: "g",
    value: function g() {
      for (babelHelpers.classPrivateFieldDestructureSet(this, _ar).value in [1, 2, 3]) {
        ;
      }
    }
  }]);
  return F;
}();
