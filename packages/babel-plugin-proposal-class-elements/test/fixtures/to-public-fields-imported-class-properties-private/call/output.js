var _foo = /*#__PURE__*/new WeakMap();

class Foo {
  constructor() {
    _foo.set(this, function () {
      return this;
    });
  }

  test(other) {
    var _other$obj;

    babelHelpers.classPrivateFieldGet2(this, _foo).call(this);
    babelHelpers.classPrivateFieldGet2(_other$obj = other.obj, _foo).call(_other$obj);
  }

}
