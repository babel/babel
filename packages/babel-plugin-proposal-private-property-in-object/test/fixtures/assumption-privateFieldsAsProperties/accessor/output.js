var _foo = babelHelpers.classPrivateFieldLooseKey("foo");

class Foo {
  constructor() {
    Object.defineProperty(this, _foo, {
      get: _get_foo,
      set: void 0
    });
  }

  test(other) {
    return Object.prototype.hasOwnProperty.call(other, _foo);
  }

}

var _get_foo = function () {};
