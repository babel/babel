var _foo = /*#__PURE__*/new WeakMap();

class Foo {
  constructor() {
    _foo.set(this, 1);
  }

  test() {
    class Nested {
      [babelHelpers.classPrivateFieldGet2(this, _foo)]() {}

    }

    babelHelpers.classPrivateFieldGet2(this, _foo);
  }

}
