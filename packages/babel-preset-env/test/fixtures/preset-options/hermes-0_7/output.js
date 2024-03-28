"use strict";

var _foo;
var _bar = /*#__PURE__*/new WeakSet();
var Foo = /*#__PURE__*/babelHelpers.createClass(function Foo() {
  babelHelpers.classCallCheck(this, Foo);
  babelHelpers.classPrivateMethodInitSpec(this, _bar);
});
function _bar2() {
  // Should be transpiled
}
try {
  /** Should be transpiled */
  var scoped = function scoped() {};
  /** Should be transpiled */
  var arrow = function arrow() {
    return scoped;
  };
} /** Should be transpiled */ catch (_unused) {}
var short = 42;
var obj = {
  short // Should not be transpiled
};

/** Should be transpiled */
var _foo$bar = (_foo = foo) === null || _foo === void 0 ? void 0 : _foo.bar,
  _foo$bar$prop = _foo$bar.prop,
  prop = _foo$bar$prop === void 0 ? "bar".concat('baz') : _foo$bar$prop;
