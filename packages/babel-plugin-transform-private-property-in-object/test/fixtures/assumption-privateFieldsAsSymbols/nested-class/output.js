var _foo = Symbol("foo");
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
        Object.prototype.hasOwnProperty.call(babelHelpers.checkInRHS(this), _foo);
      }
    }
    Object.prototype.hasOwnProperty.call(babelHelpers.checkInRHS(this), _foo);
  }
}
