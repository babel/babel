var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");

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

function _foo2() {}
