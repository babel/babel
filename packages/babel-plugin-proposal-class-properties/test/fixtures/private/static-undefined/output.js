class Foo {
  static test() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _FooStatics, "bar");
  }

  test() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _FooStatics, "bar");
  }

}

var _FooStatics = Object.create(null);

babelHelpers.defineProperty(_FooStatics, "bar", void 0);
