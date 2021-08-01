class A {
  foo() {
    return "bar";
  }

}

class B extends A {
  constructor(...args) {
    super(...args);
    babelHelpers.defineProperty(this, "foo", super.foo());
  }

}
