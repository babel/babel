class Foo {
  constructor() {
    Object.defineProperty(this, _bar, {
      writable: true,
      value: "bar"
    });
  }

  static test() {
    return babelHelpers.classPrivateFieldLooseBase(Foo, _foo)[_foo];
  }

  test() {
    return babelHelpers.classPrivateFieldLooseBase(this, _bar)[_bar];
  }

}

var _foo = babelHelpers.classPrivateFieldLooseKey("foo");

Object.defineProperty(Foo, _foo, {
  writable: true,
  value: "foo"
});

var _bar = babelHelpers.classPrivateFieldLooseKey("bar");

var f = new Foo();
expect("foo" in Foo).toBe(false);
expect("bar" in f).toBe(false);
expect(Foo.test()).toBe("foo");
expect(f.test()).toBe("bar");
