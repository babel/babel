var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");

class Foo {
  test(other) {
    return Object.prototype.hasOwnProperty.call(other, _foo);
  }

}

function _foo2() {}

Object.defineProperty(Foo, _foo, {
  value: _foo2
});
