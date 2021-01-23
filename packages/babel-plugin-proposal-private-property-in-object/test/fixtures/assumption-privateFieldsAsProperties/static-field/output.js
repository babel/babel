var _foo = babelHelpers.classPrivateFieldLooseKey("foo");

class Foo {
  test(other) {
    return Object.prototype.hasOwnProperty.call(other, _foo);
  }

}

Object.defineProperty(Foo, _foo, {
  writable: true,
  value: 1
});
