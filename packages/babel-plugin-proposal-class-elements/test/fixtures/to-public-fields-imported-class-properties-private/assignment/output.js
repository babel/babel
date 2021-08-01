var _foo = /*#__PURE__*/new WeakMap();

class Foo {
  constructor() {
    _foo.set(this, 0);
  }

  test(other) {
    var _other$obj;

    babelHelpers.classPrivateFieldSet2(this, _foo, babelHelpers.classPrivateFieldGet2(this, _foo) + 1);
    babelHelpers.classPrivateFieldSet2(this, _foo, 2);
    babelHelpers.classPrivateFieldSet2(_other$obj = other.obj, _foo, babelHelpers.classPrivateFieldGet2(_other$obj, _foo) + 1);
    babelHelpers.classPrivateFieldSet2(other.obj, _foo, 2);
  }

}
