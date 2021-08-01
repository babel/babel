var _foo = /*#__PURE__*/new WeakMap(),
    _bar = /*#__PURE__*/new WeakMap();

class Foo {
  constructor() {
    _foo.set(this, 1);

    _bar.set(this, 1);
  }

  test() {
    var _bar2 = /*#__PURE__*/new WeakMap();

    class Nested {
      constructor() {
        _bar2.set(this, 2);
      }

      test() {
        babelHelpers.classPrivateFieldGet2(this, _foo);
        babelHelpers.classPrivateFieldGet2(this, _bar2);
      }

    }

    babelHelpers.classPrivateFieldGet2(this, _foo);
    babelHelpers.classPrivateFieldGet2(this, _bar);
  }

}
