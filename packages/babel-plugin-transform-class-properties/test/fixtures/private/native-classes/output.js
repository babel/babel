var _bar = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _bar, "bar");
  }
  static test() {
    return _foo._;
  }
  test() {
    return babelHelpers.classPrivateFieldGet2(_bar, this);
  }
}
var _foo = {
  _: "foo"
};
