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
    return babelHelpers.classPrivateFieldGet2(_A, this);
  }
  set a(v) {
    babelHelpers.classPrivateFieldSet2(_A, this, v);
  }
  get b() {
    return babelHelpers.classPrivateFieldGet2(_B, this);
  }
  set b(v) {
    babelHelpers.classPrivateFieldSet2(_B, this, v);
  }
  get ['c']() {
    return babelHelpers.classPrivateFieldGet2(_C, this);
  }
  set ['c'](v) {
    babelHelpers.classPrivateFieldSet2(_C, this, v);
  }
}
