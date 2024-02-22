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
function _get_a() {
  return babelHelpers.classPrivateFieldGet2(_A, this);
}
function _set_a(v) {
  babelHelpers.classPrivateFieldSet2(_A, this, v);
}
function _get_b() {
  return babelHelpers.classPrivateFieldGet2(_B, this);
}
function _set_b(v) {
  babelHelpers.classPrivateFieldSet2(_B, this, v);
}
