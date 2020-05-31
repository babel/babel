var _bar = babelHelpers.classPrivateFieldLooseKey("bar");

var Foo = function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  Object.defineProperty(this, _bar, {
    writable: true,
    value: void 0
  });
};
