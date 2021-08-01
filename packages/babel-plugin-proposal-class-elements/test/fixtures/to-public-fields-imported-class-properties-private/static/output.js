var _bar = babelHelpers.temporalUndefined;

class Foo {
  static test() {
    return babelHelpers.classCheckPrivateStaticAccess(Foo, Foo, _bar);
  }

  test() {
    return babelHelpers.classCheckPrivateStaticAccess(Foo, Foo, _bar);
  }

}

_bar = "foo";
expect("bar" in Foo).toBe(false);
expect(Foo.test()).toBe("foo");
expect(Foo.test()).toBe("foo");
