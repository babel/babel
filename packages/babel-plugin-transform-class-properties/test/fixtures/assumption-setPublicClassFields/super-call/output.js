class A {
  foo() {
    return "bar";
  }
}
class B extends A {
  constructor() {
    super(...arguments);
    this.foo = super.foo();
  }
}
