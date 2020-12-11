var _foo = babelHelpers.classPrivateFieldLooseKey("foo");

class Foo {
  test(other) {
    return Object.prototype.hasOwnProperty.call(other, _foo);
  }

}

var _get_foo = function () {};

Object.defineProperty(Foo, _foo, {
  get: _get_foo,
  set: void 0
});
