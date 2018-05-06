var Foo = function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  Object.defineProperty(this, _x, {
    writable: true,
    value: 0
  });
  Object.defineProperty(this, _y, {
    writable: true,
    value: babelHelpers.classPrivateFieldLooseBase(this, _x)[_x]
  });
};

var _x = babelHelpers.classPrivateFieldLooseKey("x");

var _y = babelHelpers.classPrivateFieldLooseKey("y");
