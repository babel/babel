var _foo = Symbol("foo");
class Foo {
  constructor() {
    Object.defineProperty(this, _foo, {
      writable: true,
      value: 1
    });
  }
  test(other) {
    return Object.prototype.hasOwnProperty.call(babelHelpers.checkInRHS(other), _foo);
  }
}
