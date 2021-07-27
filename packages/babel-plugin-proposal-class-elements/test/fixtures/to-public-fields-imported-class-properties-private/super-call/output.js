class A {
  foo() {
    return "bar";
  }

}

var _foo = /*#__PURE__*/new WeakMap();

class B extends A {
  constructor(...args) {
    super(...args);

    _foo.set(this, super.foo());
  }

}
