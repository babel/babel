let result;
class C {
  static #p = "#p";
  static a = "a";
  static {
    var { a, #p: p, a: x, ...r } = C;
    result = { a, p, x, r };
  }
}
expect(result).toStrictEqual({
  a: "a",
  p: "#p", 
  x: "a",
  r: {}
});
