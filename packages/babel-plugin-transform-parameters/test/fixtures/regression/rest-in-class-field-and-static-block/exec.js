function f(...a) {
  class A {
    x = a[0];
    static {
      this.y = a[1];
    }
  }
  return [new A().x, A.y, a.length];
}

expect(f("a", "b")).toEqual(["a", "b", 2]);
