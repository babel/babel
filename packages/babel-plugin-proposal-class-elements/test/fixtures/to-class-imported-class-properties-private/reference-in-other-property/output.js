var _two = /*#__PURE__*/new WeakMap(),
    _private = /*#__PURE__*/new WeakMap(),
    _four = /*#__PURE__*/new WeakMap();

var Foo = function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  babelHelpers.defineProperty(this, "one", babelHelpers.classPrivateFieldGet2(this, _private));

  _two.set(this, babelHelpers.classPrivateFieldGet2(this, _private));

  _private.set(this, 0);

  babelHelpers.defineProperty(this, "three", babelHelpers.classPrivateFieldGet2(this, _private));

  _four.set(this, babelHelpers.classPrivateFieldGet2(this, _private));
};
