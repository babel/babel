var _x = new WeakMap();

var C = function C() {
  "use strict";

  babelHelpers.classCallCheck(this, C);
  babelHelpers.defineProperty(this, "y", babelHelpers.classPrivateFieldGet(this, _x));

  _x.set(this, {
    writable: true,
    value: void 0
  });
};

expect(() => {
  new C();
}).toThrow();
