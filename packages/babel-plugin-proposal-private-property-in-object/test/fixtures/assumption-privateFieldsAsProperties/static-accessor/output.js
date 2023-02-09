var _foo = /*#__PURE__*/Symbol("foo");
class Foo {
  test(other) {
    return Object.prototype.hasOwnProperty.call(babelHelpers.checkInRHS(other), _foo);
  }
}
function _get_foo() {}
Object.defineProperty(Foo, _foo, {
  get: _get_foo,
  set: void 0
});
