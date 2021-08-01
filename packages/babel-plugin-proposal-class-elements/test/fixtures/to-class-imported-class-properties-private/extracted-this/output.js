var foo = "bar";

var _bar = /*#__PURE__*/new WeakMap(),
    _baz = /*#__PURE__*/new WeakMap();

var Foo = function Foo(_foo) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);

  _bar.set(this, this);

  _baz.set(this, foo);
};
