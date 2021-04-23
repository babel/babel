var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");

class Foo {
  constructor() {
    Object.defineProperty(this, _foo, {
      writable: true,
      value: 1
    });
  }

  test() {
    class Nested {
      test() {
        Object.prototype.hasOwnProperty.call(this, _foo);
      }

    }

    Object.prototype.hasOwnProperty.call(this, _foo);
  }

}
