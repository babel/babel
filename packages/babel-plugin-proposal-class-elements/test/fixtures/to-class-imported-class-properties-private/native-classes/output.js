var _foo = babelHelpers.temporalUndefined,
    _bar = /*#__PURE__*/new WeakMap();

class Foo {
  constructor() {
    _bar.set(this, "bar");
  }

  static test() {
    return babelHelpers.classCheckPrivateStaticAccess(Foo, Foo, _foo);
  }

  test() {
    return babelHelpers.classPrivateFieldGet2(this, _bar);
  }

}

_foo = "foo";
