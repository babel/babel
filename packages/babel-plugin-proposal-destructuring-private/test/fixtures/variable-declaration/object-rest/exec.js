let result;
class C {
  static #x = "#x";
  static #y = "#y";
  static a = "a";
  static b = "b";
  static c = "c";
  static {
    var { [C.a]: a, #x: x, [C.b]: b, #y: y, ...z } = C;
    result = { a, b, x, y, z };
  }
}
expect(result).toStrictEqual({
  a: "a", b: "b", x: "#x", y: "#y", z: { c: "c" }
});
