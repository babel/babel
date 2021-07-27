var _foo = /*#__PURE__*/new WeakMap();

class Foo {
  constructor() {
    _foo.set(this, 1);
  }

  test() {
    var _foo2 = /*#__PURE__*/new WeakMap();

    class Nested {
      constructor() {
        _foo2.set(this, 2);
      }

      [babelHelpers.classPrivateFieldGet2(this, _foo2)]() {}

    }

    babelHelpers.classPrivateFieldGet2(this, _foo);
  }

}
