var foo = "bar";

var Foo = function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  Object.defineProperty(this, "bar", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: foo
  });
  var _foo = "foo";
};
