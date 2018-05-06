var Foo = function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  Object.defineProperty(this, _bar, {
    writable: true,
    value: "foo"
  });
};

var _bar = babelHelpers.classPrivateFieldLooseKey("bar");
