var foo = "bar";

var Foo = function Foo(_foo) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);

  _bar.set(this, {
    writable: true,
    value: this
  });

  _baz.set(this, {
    writable: true,
    value: foo
  });
};

var _bar = new WeakMap();

var _baz = new WeakMap();
