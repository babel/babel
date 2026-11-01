function* g() {
  class A {
    x = this;
    static {
      this;
    }
  }
  yield A;
}
