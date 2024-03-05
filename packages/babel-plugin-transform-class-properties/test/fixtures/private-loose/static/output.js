var _bar = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("bar");
class Foo {
  static test() {
    return babelHelpers.assertClassBrandLoose(Foo, _bar, 1);
  }
  test() {
    return babelHelpers.assertClassBrandLoose(Foo, _bar, 1);
  }
}
Object.defineProperty(Foo, _bar, {
  writable: true,
  value: "foo"
});
