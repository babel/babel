const dec = () => {};
var _A = /*#__PURE__*/new WeakMap();
var _a = /*#__PURE__*/new WeakMap();
var _B = /*#__PURE__*/new WeakMap();
var _b = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _b, {
      get: _get_b,
      set: _set_b
    });
    babelHelpers.classPrivateFieldInitSpec(this, _a, {
      get: _get_a,
      set: _set_a
    });
    babelHelpers.classPrivateFieldInitSpec(this, _A, {
      writable: true,
      value: void 0
    });
    babelHelpers.classPrivateFieldInitSpec(this, _B, {
      writable: true,
      value: 123
    });
  }
}
function _get_a() {
  return babelHelpers.classPrivateFieldGet(this, _A);
}
function _set_a(v) {
  babelHelpers.classPrivateFieldSet(this, _A, v);
}
function _get_b() {
  return babelHelpers.classPrivateFieldGet(this, _B);
}
function _set_b(v) {
  babelHelpers.classPrivateFieldSet(this, _B, v);
}
