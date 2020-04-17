class Foo {
  static test() {
    return babelHelpers.classPrivateFieldLooseBase(Foo, _bar)[_bar];
  }

  test() {
    return babelHelpers.classPrivateFieldLooseBase(Foo, _bar)[_bar];
  }

}

var _bar = babelHelpers.classPrivateFieldLooseKey("bar");

Object.defineProperty(Foo, _bar, {
  writable: true,
  value: void 0
});
