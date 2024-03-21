class Foo {
  static test() {
    return _bar._;
  }
  test() {
    return _bar._;
  }
}
var _bar = {
  _: "foo"
};
expect("bar" in Foo).toBe(false);
expect(Foo.test()).toBe("foo");
expect(Foo.test()).toBe("foo");
