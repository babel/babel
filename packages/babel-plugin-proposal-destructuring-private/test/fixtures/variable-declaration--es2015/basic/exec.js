let result;
class C {
  static #x;
  static {
    var { a = 1, #x: x = 2, b = 3 } = C;
    result = { a, x, b };
  }
}
expect(result).toStrictEqual({ a: 1, x: 2, b: 3 });
