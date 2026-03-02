class C {
  foo() {
    super.bar.bind(this);
    super.baz.call(this, 123);
  }
}
