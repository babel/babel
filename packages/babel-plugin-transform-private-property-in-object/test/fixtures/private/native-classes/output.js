var _bar = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _bar, "bar");
  }
  static test() {
    return babelHelpers.checkInRHS(Foo) === Foo && !!_foo;
  }
  test() {
    return _bar.has(babelHelpers.checkInRHS(this));
  }
}
var _foo = {
  _: "foo"
};
