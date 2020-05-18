class Foo {
  constructor() {
    _bar.set(this, {
      writable: true,
      value: "bar"
    });
  }

  static test() {
    return Foo === Foo;
  }

  test() {
    return _bar.has(this);
  }

}

var _bar = new WeakMap();

var _foo = {
  writable: true,
  value: "foo"
};
