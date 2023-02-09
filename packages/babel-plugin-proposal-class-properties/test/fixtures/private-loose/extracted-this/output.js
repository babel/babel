var foo = "bar";
var _bar = /*#__PURE__*/Symbol("bar");
var _baz = /*#__PURE__*/Symbol("baz");
var Foo = /*#__PURE__*/babelHelpers.createClass(function Foo(_foo) {
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
});
