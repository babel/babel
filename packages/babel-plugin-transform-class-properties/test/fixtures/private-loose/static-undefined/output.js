var _bar = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("bar");
class Foo {
  static test() {
    return babelHelpers.classPrivateFieldLoose(Foo, _bar);
  }
  test() {
    return babelHelpers.classPrivateFieldLoose(Foo, _bar);
  }
}
Object.defineProperty(Foo, _bar, {
  writable: true,
  value: void 0
});
