var foo = "bar";

var Foo = function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  Object.defineProperty(this, _bar, {
    writable: true,
    value: foo
  });
  var _foo = "foo";
};

var _bar = babelHelpers.classPrivateFieldLooseKey("bar");
