var _bar = babelHelpers.temporalUndefined;

class Foo {
  static test() {
    return babelHelpers.classCheckPrivateStaticAccess(Foo, Foo, _bar);
  }

  test() {
    return babelHelpers.classCheckPrivateStaticAccess(Foo, Foo, _bar);
  }

}

_bar = void 0;
