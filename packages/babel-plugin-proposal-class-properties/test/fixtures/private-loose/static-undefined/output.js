var _bar = /*#__PURE__*/Symbol("bar");
class Foo {
  static test() {
    return babelHelpers.classPrivateFieldLooseBase(Foo, _bar)[_bar];
  }
  test() {
    return babelHelpers.classPrivateFieldLooseBase(Foo, _bar)[_bar];
  }
}
Object.defineProperty(Foo, _bar, {
  writable: true,
  value: void 0
});
