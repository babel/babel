var foo = "bar";

var Foo = function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);

  _bar.set(this, {
    writable: true,
    value: foo
  });

  var _foo = "foo";
};

var _bar = new WeakMap();
