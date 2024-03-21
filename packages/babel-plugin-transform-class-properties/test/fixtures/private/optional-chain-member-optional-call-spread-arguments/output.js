var _m = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _m, void 0);
  }
  init() {
    babelHelpers.classPrivateFieldSet2(_m, this, (...args) => args);
  }
  static test() {
    const f = new Foo();
    f.init();
    return babelHelpers.classPrivateFieldGet2(_m, f)?.apply(f, arguments);
  }
  static testNull() {
    const f = new Foo();
    return babelHelpers.classPrivateFieldGet2(_m, f)?.apply(f, arguments);
  }
}
