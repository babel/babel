const _excluded = ["a"],
  _excluded2 = ["0"],
  _excluded3 = ["1"],
  _excluded4 = ["2"],
  _excluded5 = ["0", "1", "2"];
class C {
  static #p = "#p";
  static a = "a";
  static "0" = "string-zero";
  static 0 = "numeric-zero-updated";
  static 1 = "one";
  static 2n = "two-bigint";
  static {
    var {
        a
      } = C,
      p = C.#p,
      {
        a: x
      } = C,
      r1 = babelHelpers.objectWithoutProperties(C, _excluded);
    console.log(x);
    var {
        "0": y
      } = C,
      p2 = C.#p,
      {
        0: z
      } = C,
      r2 = babelHelpers.objectWithoutProperties(C, _excluded2);
    console.log(z);
    var {
        1: m
      } = C,
      p3 = C.#p,
      {
        1: n
      } = C,
      r3 = babelHelpers.objectWithoutProperties(C, _excluded3);
    console.log(n);
    var {
        2n: s
      } = C,
      p4 = C.#p,
      {
        2n: t
      } = C,
      r4 = babelHelpers.objectWithoutProperties(C, _excluded4);
    console.log(t);
    var {
        "0": v1,
        1: v2,
        2n: v3
      } = C,
      p5 = C.#p,
      r5 = babelHelpers.objectWithoutProperties(C, _excluded5);
  }
}
