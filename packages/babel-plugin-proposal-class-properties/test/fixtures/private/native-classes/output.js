class Foo {
  constructor() {
    _bar.set(this, {
      writable: true,
      value: "bar"
    });
  }

  static test() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _FooStatics, "foo");
  }

  test() {
    return babelHelpers.classPrivateFieldGet(this, _bar);
  }

}

var _FooStatics = Object.create(null);

babelHelpers.defineProperty(_FooStatics, "foo", "foo");

var _bar = new WeakMap();
