var _foo = babelHelpers.classPrivateFieldLooseKey("foo");

class Foo {
  test(other) {
    return Object.prototype.hasOwnProperty.call(other, _foo);
  }

}

var _foo2 = function _foo2() {};

Object.defineProperty(Foo, _foo, {
  value: _foo2
});
