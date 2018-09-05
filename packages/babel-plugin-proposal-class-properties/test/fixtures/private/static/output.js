class Foo {
  static test() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _bar);
  }

  test() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _bar);
  }

}

var _bar = {
  writable: true,
  value: "foo"
};
expect("bar" in Foo).toBe(false);
expect(Foo.test()).toBe("foo");
expect(Foo.test()).toBe("foo");
