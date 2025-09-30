const _excluded = ["a"];
class C {
  static #p = "#p";
  static a = "a";
  static {
    var {
        a
      } = C,
      p = C.#p,
      {
        a: x
      } = C,
      r = babelHelpers.objectWithoutProperties(C, _excluded);
    console.log(x);
  }
}
