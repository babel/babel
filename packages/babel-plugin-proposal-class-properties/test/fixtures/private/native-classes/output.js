var _bar = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _bar, {
      writable: true,
      value: "bar"
    });
  }
  static test() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _foo);
  }
  test() {
    return babelHelpers.classPrivateFieldGet(this, _bar);
  }
}
var _foo = {
  writable: true,
  value: "foo"
};
