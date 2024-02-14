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
  return babelHelpers.classPrivateFieldGet2(this, _A);
}
function _set_a(v) {
  babelHelpers.classPrivateFieldSet2(this, _A, v);
}
function _get_b() {
  return babelHelpers.classPrivateFieldGet2(this, _B);
}
function _set_b(v) {
  babelHelpers.classPrivateFieldSet2(this, _B, v);
}
