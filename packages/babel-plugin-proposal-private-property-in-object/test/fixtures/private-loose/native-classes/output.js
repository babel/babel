var _bar = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _bar, {
      writable: true,
      value: "bar"
    });
  }
  static test() {
    return babelHelpers.checkInRHS(Foo) === Foo;
  }
  test() {
    return _bar.has(babelHelpers.checkInRHS(this));
  }
}
var _foo = {
  writable: true,
  value: "foo"
};
