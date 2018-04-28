var foo = "bar";

var Foo = function Foo(_foo) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  Object.defineProperty(this, _bar, {
    writable: true,
    value: this
  });
  Object.defineProperty(this, _baz, {
    writable: true,
    value: foo
  });
};

var _bar = babelHelpers.classPrivateFieldKey("bar");

var _baz = babelHelpers.classPrivateFieldKey("baz");
