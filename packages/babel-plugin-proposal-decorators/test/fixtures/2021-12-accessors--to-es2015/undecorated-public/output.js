const dec = () => {};
var _A = /*#__PURE__*/new WeakMap();
var _B = /*#__PURE__*/new WeakMap();
var _C = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _A, {
      writable: true,
      value: void 0
    });
    babelHelpers.classPrivateFieldInitSpec(this, _B, {
      writable: true,
      value: 123
    });
    babelHelpers.classPrivateFieldInitSpec(this, _C, {
      writable: true,
      value: 456
    });
  }
  get a() {
    return babelHelpers.classPrivateFieldGet(this, _A);
  }
  set a(v) {
    babelHelpers.classPrivateFieldSet(this, _A, v);
  }
  get b() {
    return babelHelpers.classPrivateFieldGet(this, _B);
  }
  set b(v) {
    babelHelpers.classPrivateFieldSet(this, _B, v);
  }
  get ['c']() {
    return babelHelpers.classPrivateFieldGet(this, _C);
  }
  set ['c'](v) {
    babelHelpers.classPrivateFieldSet(this, _C, v);
  }
}
