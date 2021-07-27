var _foo = /*#__PURE__*/new WeakMap();

class Foo {
  constructor() {
    _foo.set(this, 1);
  }

  test() {
    var _foo2 = /*#__PURE__*/new WeakMap();

    var _foo3 = /*#__PURE__*/new WeakMap();

    class Nested extends class _class {
      [babelHelpers.classPrivateFieldGet2(this, _foo3)] = (_foo3.set(this, 2), 2);
    } {
      constructor(...args) {
        super(...args);

        _foo2.set(this, 3);
      }

    }
  }

}
