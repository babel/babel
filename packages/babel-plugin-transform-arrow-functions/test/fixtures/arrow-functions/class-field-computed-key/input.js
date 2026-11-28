function f() {
  class A {
    static [(() => this.key)()] = 1;
    [(() => this.key)()] = 2;
  }
  return A;
}
