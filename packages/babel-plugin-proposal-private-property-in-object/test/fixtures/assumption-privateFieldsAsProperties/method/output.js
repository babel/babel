var _foo = babelHelpers.classPrivateFieldLooseKey("foo");

class Foo {
  constructor() {
    Object.defineProperty(this, _foo, {
      value: _foo2
    });
  }

  test(other) {
    return Object.prototype.hasOwnProperty.call(other, _foo);
  }

}

var _foo2 = function _foo2() {};
