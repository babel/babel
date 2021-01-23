var _foo = babelHelpers.classPrivateFieldLooseKey("foo");

class Foo {
  constructor() {
    Object.defineProperty(this, _foo, {
      writable: true,
      value: 1
    });
  }

  test(other) {
    return Object.prototype.hasOwnProperty.call(other, _foo);
  }

}
