var _foo = /*#__PURE__*/new WeakMap();

class Foo {
  constructor() {
    _foo.set(this, 1);
  }

  test() {
    var _foo2 = /*#__PURE__*/new WeakMap();

    class Nested extends class _class {
      [babelHelpers.classPrivateFieldGet2(this, _foo)] = 2;
    } {
      constructor(...args) {
        super(...args);

        _foo2.set(this, 3);
      }

    }
  }

}
