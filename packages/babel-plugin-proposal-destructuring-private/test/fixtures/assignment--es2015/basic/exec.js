let a, x, b;
class C {
  static #x;
  static {
    ({ a = 1, #x: x = 2, b = 3 } = C);
  }
}
expect(a).toBe(1);
expect(x).toBe(2);
expect(b).toBe(3);
