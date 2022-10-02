var _x = /*#__PURE__*/new WeakMap();
var C = /*#__PURE__*/babelHelpers.createClass(function C() {
  "use strict";

  babelHelpers.classCallCheck(this, C);
  babelHelpers.defineProperty(this, "y", babelHelpers.classPrivateFieldGet(this, _x));
  babelHelpers.classPrivateFieldInitSpec(this, _x, {
    writable: true,
    value: void 0
  });
});
expect(() => {
  new C();
}).toThrow();
