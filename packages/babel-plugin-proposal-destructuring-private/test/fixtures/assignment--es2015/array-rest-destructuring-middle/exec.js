let x, y, z;
class C {
  static #x;
  static {
    ([{ y }, { #x: x = y }, ...z] = [{ y: 1}, C]);
  }
}

expect(x).toBe(1);
expect(z).toStrictEqual([]);
