var _two = /*#__PURE__*/new WeakMap();
var _private = /*#__PURE__*/new WeakMap();
var _four = /*#__PURE__*/new WeakMap();
let Foo = /*#__PURE__*/babelHelpers.createClass(function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  babelHelpers.defineProperty(this, "one", babelHelpers.classPrivateFieldGet2(_private, this));
  babelHelpers.classPrivateFieldInitSpec(this, _two, babelHelpers.classPrivateFieldGet2(_private, this));
  babelHelpers.classPrivateFieldInitSpec(this, _private, 0);
  babelHelpers.defineProperty(this, "three", babelHelpers.classPrivateFieldGet2(_private, this));
  babelHelpers.classPrivateFieldInitSpec(this, _four, babelHelpers.classPrivateFieldGet2(_private, this));
});
