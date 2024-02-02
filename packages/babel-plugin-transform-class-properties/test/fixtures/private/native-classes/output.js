var _bar = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _bar, "bar");
  }
  static test() {
    return _foo._;
  }
  test() {
    return babelHelpers.classPrivateFieldGet2(this, _bar);
  }
}
var _foo = {
  _: "foo"
};
