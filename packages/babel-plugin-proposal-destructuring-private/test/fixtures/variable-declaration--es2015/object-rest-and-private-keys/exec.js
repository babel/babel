let result;
class C {
  static #x = "#x";
  static #y = "#y";
  static a = "a";
  static b = "b";
  static c = "c";
  static {
    var { #x: x, #y: y, ...z } = C;
    result = { x, y, z };
  }
}
expect(result).toStrictEqual({
  x: "#x", y: "#y", z: { a: "a", b: "b", c: "c" }
});
