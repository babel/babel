var _bar = /*#__PURE__*/new WeakMap();

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

var _foo = {
  writable: true,
  value: "foo"
};
