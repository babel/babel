var _m = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("m");
class Foo {
  constructor() {
    Object.defineProperty(this, _m, {
      writable: true,
      value: void 0
    });
  }
  init() {
    babelHelpers.classPrivateFieldLooseBase(this, _m)[_m] = (...args) => args;
  }
  static test() {
    const f = new Foo();
    f.init();
    return babelHelpers.classPrivateFieldLooseBase(f, _m)[_m]?.(...arguments);
  }
  static testNull() {
    const f = new Foo();
    return babelHelpers.classPrivateFieldLooseBase(f, _m)[_m]?.(...arguments);
  }
}
