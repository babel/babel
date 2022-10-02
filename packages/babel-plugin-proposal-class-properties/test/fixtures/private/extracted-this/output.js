var foo = "bar";
var _bar = /*#__PURE__*/new WeakMap();
var _baz = /*#__PURE__*/new WeakMap();
var Foo = /*#__PURE__*/babelHelpers.createClass(function Foo(_foo) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  babelHelpers.classPrivateFieldInitSpec(this, _bar, {
    writable: true,
    value: this
  });
  babelHelpers.classPrivateFieldInitSpec(this, _baz, {
    writable: true,
    value: foo
  });
});
