let result;
class C {
  static x = "x";
  static y = "y";
  static z = "z";
  static #x = C;
  static {
    var x, y, z;
    ({ x, #x: { y, ...z } } = C);
    result = { x, y, z };
  }
}
expect(result).toStrictEqual({ x: "x", y: "y", z: { x: "x", z: "z" } })
