function classFactory() {
  var _Foo;

  var _foo = /*#__PURE__*/new WeakMap(),
      _bar = babelHelpers.temporalUndefined;

  return _Foo = class Foo {
    constructor() {
      _foo.set(this, "foo");
    }

    instance() {
      return babelHelpers.classPrivateFieldGet2(this, _foo);
    }

    static() {
      return babelHelpers.classCheckPrivateStaticAccess(Foo, Foo, _bar);
    }

    static instance(inst) {
      return babelHelpers.classPrivateFieldGet2(inst, _foo);
    }

    static static() {
      return babelHelpers.classCheckPrivateStaticAccess(Foo, Foo, _bar);
    }

  }, _bar = "bar", _Foo;
}
