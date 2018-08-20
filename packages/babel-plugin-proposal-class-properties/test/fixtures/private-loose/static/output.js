class Foo {
  static test() {
    return babelHelpers.classStaticPrivateFieldLooseBase(Foo, Foo)._bar;
  }

  test() {
    return babelHelpers.classStaticPrivateFieldLooseBase(Foo, Foo)._bar;
  }

}

Foo._bar = "foo";
