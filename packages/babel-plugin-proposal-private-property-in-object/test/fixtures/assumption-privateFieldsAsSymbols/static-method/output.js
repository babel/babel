var _foo = Symbol("foo");
class Foo {
  test(other) {
    return Object.prototype.hasOwnProperty.call(babelHelpers.checkInRHS(other), _foo);
  }
}
function _foo2() {}
Object.defineProperty(Foo, _foo, {
  value: _foo2
});
