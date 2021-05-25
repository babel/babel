var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");

class Foo {
  constructor() {
    Object.defineProperty(this, _foo, {
      writable: true,
      value: 1
    });
  }

  test() {
    var _foo2 = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");

    class Nested {
      constructor() {
        Object.defineProperty(this, _foo2, {
          writable: true,
          value: 2
        });
      }

      test() {
        Object.prototype.hasOwnProperty.call(this, _foo2);
      }

    }

    Object.prototype.hasOwnProperty.call(this, _foo);
  }

}
