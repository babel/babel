var _bar = /*#__PURE__*/new WeakMap();

class Foo extends Bar {
  constructor() {
    super();

    _bar.set(this, "foo");
  }

}
