class Foo {
  static test() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _FooStatics, "bar");
  }

  test() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _FooStatics, "bar");
  }

}

var _FooStatics = Object.create(null);

babelHelpers.defineProperty(_FooStatics, "bar", "foo");
expect("bar" in Foo).toBe(false);
expect(Foo.test()).toBe("foo");
expect(Foo.test()).toBe("foo");
