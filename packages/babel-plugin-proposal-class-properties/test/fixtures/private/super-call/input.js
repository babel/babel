class A {
  foo() {
    return "bar";
  }
}

class B extends A {
  #foo = super.foo();
}
