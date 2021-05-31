var foo = "bar";

var _bar = /*#__PURE__*/new WeakMap();

var _baz = /*#__PURE__*/new WeakMap();

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
