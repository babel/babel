class A {
  foo() {
    return "bar";
  }

}

class B extends A {
  constructor(...args) {
    super(...args);
    this.foo = super.foo();
  }

}
