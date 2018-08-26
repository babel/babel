class Foo {
  constructor() {
    Object.defineProperty(this, _bar, {
      writable: true,
      value: "bar"
    });
  }

  static test() {
    return babelHelpers.classStaticPrivateFieldLooseBase(Foo, Foo)._foo;
  }

  test() {
    return babelHelpers.classPrivateFieldLooseBase(this, _bar)[_bar];
  }

}

Object.defineProperty(Foo, "_foo", {
  value: "foo",
  enumerable: false,
  configurable: false,
  writable: true
});

var _bar = babelHelpers.classPrivateFieldLooseKey("bar");

var f = new Foo();
expect("foo" in Foo).toBe(false);
expect("bar" in f).toBe(false);
expect(Foo.test()).toBe("foo");
expect(f.test()).toBe("bar");
