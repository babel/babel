var C = function C() {
  "use strict";

  babelHelpers.classCallCheck(this, C);
  this.y = babelHelpers.classPrivateFieldLooseBase(this, _x)[_x];
  Object.defineProperty(this, _x, {
    writable: true,
    value: void 0
  });
};

var _x = babelHelpers.classPrivateFieldLooseKey("x");

expect(() => {
  new C();
}).toThrow();
