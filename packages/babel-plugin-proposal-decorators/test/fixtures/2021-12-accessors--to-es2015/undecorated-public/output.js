const dec = () => {};
var _A = /*#__PURE__*/new WeakMap();
var _B = /*#__PURE__*/new WeakMap();
var _C = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _A, void 0);
    babelHelpers.classPrivateFieldInitSpec(this, _B, 123);
    babelHelpers.classPrivateFieldInitSpec(this, _C, 456);
  }
  get a() {
    return babelHelpers.classPrivateFieldGet2(this, _A);
  }
  set a(v) {
    babelHelpers.classPrivateFieldSet2(this, _A, v);
  }
  get b() {
    return babelHelpers.classPrivateFieldGet2(this, _B);
  }
  set b(v) {
    babelHelpers.classPrivateFieldSet2(this, _B, v);
  }
  get ['c']() {
    return babelHelpers.classPrivateFieldGet2(this, _C);
  }
  set ['c'](v) {
    babelHelpers.classPrivateFieldSet2(this, _C, v);
  }
}
