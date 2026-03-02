let x, z;
class C {
  static #x;
  static {
    ([{ #x: x = 1 }, ...z] = [C]);
  }
}

expect(x).toBe(1);
expect(z).toStrictEqual([]);
