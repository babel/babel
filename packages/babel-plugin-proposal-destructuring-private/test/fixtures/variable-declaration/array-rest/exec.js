let result;
class C {
  static #x;
  static {
    var [{ #x: x = 1 }, ...z] = [C];
    result = { x, z };
  }
}
expect(result).toStrictEqual({ x: 1, z: [] });
