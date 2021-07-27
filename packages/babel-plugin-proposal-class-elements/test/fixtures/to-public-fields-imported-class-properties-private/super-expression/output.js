var _bar = /*#__PURE__*/new WeakMap();

class Foo extends Bar {
  constructor() {
    var _temp;

    foo((_temp = super(), _bar.set(this, "foo"), _temp));
  }

}
