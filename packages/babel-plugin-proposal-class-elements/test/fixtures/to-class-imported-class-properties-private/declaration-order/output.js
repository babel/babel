var _x = /*#__PURE__*/new WeakMap();

var C = function C() {
  "use strict";

  babelHelpers.classCallCheck(this, C);
  babelHelpers.defineProperty(this, "y", babelHelpers.classPrivateFieldGet2(this, _x));

  _x.set(this, void 0);
};

expect(() => {
  new C();
}).toThrow();
