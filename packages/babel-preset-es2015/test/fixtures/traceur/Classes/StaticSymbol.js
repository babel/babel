var sym = Symbol();
class C {
  static [sym]() {
    return 42;
  }
}
expect(C[sym]()).toBe(42);
