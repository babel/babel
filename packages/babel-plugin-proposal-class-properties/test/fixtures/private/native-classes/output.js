class Foo {
  constructor() {
    _bar.set(this, {
      writable: true,
      value: "bar"
    });
  }

  static test() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _foo);
  }

  test() {
    return babelHelpers.classPrivateFieldGet(this, _bar);
  }

}

var _bar = new WeakMap();

var _foo = {
  writable: true,
  value: "foo"
};
