var Foo = function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
};

Object.defineProperty(Foo, "bar", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: "foo"
});
