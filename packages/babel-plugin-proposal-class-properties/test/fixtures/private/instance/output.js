var Foo = function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);

  _bar.set(this, {
    writable: true,
    value: "foo"
  });
};

var _bar = new WeakMap();
