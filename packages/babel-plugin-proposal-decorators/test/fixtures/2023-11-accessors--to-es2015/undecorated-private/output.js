const dec = () => {};
var _A = /*#__PURE__*/new WeakMap();
var _Foo_brand = /*#__PURE__*/new WeakSet();
var _B = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Foo_brand);
    babelHelpers.classPrivateFieldInitSpec(this, _A, void 0);
    babelHelpers.classPrivateFieldInitSpec(this, _B, 123);
  }
}
function _get_a(_this) {
  return babelHelpers.classPrivateFieldGet2(_A, _this);
}
function _set_a(_this2, v) {
  babelHelpers.classPrivateFieldSet2(_A, _this2, v);
}
function _get_b(_this3) {
  return babelHelpers.classPrivateFieldGet2(_B, _this3);
}
function _set_b(_this4, v) {
  babelHelpers.classPrivateFieldSet2(_B, _this4, v);
}
