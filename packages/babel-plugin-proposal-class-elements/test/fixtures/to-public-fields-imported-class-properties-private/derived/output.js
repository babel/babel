var _prop = /*#__PURE__*/new WeakMap();

class Foo {
  constructor() {
    _prop.set(this, "foo");
  }

}

var _prop2 = /*#__PURE__*/new WeakMap();

class Bar extends Foo {
  constructor(...args) {
    super(...args);

    _prop2.set(this, "bar");
  }

}
