var _m = /*#__PURE__*/new WeakMap();

class Foo {
  constructor() {
    _m.set(this, void 0);
  }

  init() {
    babelHelpers.classPrivateFieldSet2(this, _m, (...args) => args);
  }

  static test() {
    const f = new Foo();
    f.init();
    return babelHelpers.classPrivateFieldGet2(f, _m)?.apply(f, arguments);
  }

  static testNull() {
    const f = new Foo();
    return babelHelpers.classPrivateFieldGet2(f, _m)?.apply(f, arguments);
  }

}
