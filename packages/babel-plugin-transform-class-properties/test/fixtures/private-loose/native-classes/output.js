var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");
var _bar = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("bar");
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
Object.defineProperty(Foo, _foo, {
  writable: true,
  value: "foo"
});
var f = new Foo();
expect("foo" in Foo).toBe(false);
expect("bar" in f).toBe(false);
expect(Foo.test()).toBe("foo");
expect(f.test()).toBe("bar");
