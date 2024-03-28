var _x = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("x");
var C = /*#__PURE__*/babelHelpers.createClass(function C() {
  "use strict";

  babelHelpers.classCallCheck(this, C);
  this.y = babelHelpers.assertClassBrandLoose(this, _x, 1);
  Object.defineProperty(this, _x, {
    writable: true,
    value: void 0
  });
});
expect(() => {
  new C();
}).toThrow();
