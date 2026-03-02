var x;
class C {
  #x;
  static {
    x = "x";
    try { throw new C() } catch ({ #x: x }) {
    }
  }
}
expect(x).toBe("x");
