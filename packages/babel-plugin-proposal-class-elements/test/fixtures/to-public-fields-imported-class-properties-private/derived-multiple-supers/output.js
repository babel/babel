var _bar = /*#__PURE__*/new WeakMap();

class Foo extends Bar {
  constructor() {
    if (condition) {
      super();

      _bar.set(this, "foo");
    } else {
      super();

      _bar.set(this, "foo");
    }
  }

}
