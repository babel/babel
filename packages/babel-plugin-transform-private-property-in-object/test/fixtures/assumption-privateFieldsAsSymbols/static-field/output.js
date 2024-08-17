var _foo = Symbol("foo");
class Foo {
  test(other) {
    return Object.prototype.hasOwnProperty.call(babelHelpers.checkInRHS(other), _foo);
  }
}
Object.defineProperty(Foo, _foo, {
  writable: true,
  value: 1
});
