var _two = /*#__PURE__*/new WeakMap();
var _private = /*#__PURE__*/new WeakMap();
var _four = /*#__PURE__*/new WeakMap();
var Foo = /*#__PURE__*/babelHelpers.createClass(function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  babelHelpers.defineProperty(this, "one", babelHelpers.classPrivateFieldGet(this, _private));
  babelHelpers.classPrivateFieldInitSpec(this, _two, {
    writable: true,
    value: babelHelpers.classPrivateFieldGet(this, _private)
  });
  babelHelpers.classPrivateFieldInitSpec(this, _private, {
    writable: true,
    value: 0
  });
  babelHelpers.defineProperty(this, "three", babelHelpers.classPrivateFieldGet(this, _private));
  babelHelpers.classPrivateFieldInitSpec(this, _four, {
    writable: true,
    value: babelHelpers.classPrivateFieldGet(this, _private)
  });
});
