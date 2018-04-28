var C = function C() {
  "use strict";

  babelHelpers.classCallCheck(this, C);
  this.y = babelHelpers.classPrivateFieldBase(this, _x)[_x];
  Object.defineProperty(this, _x, {
    writable: true,
    value: void 0
  });
};

expect(() => {
  new C();
}).toThrow();
