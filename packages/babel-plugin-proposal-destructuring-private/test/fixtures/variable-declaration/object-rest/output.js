let result;
class C {
  static #x = "#x";
  static #y = "#y";
  static a = "a";
  static b = "b";
  static c = "c";
  static {
    var _m, _m2;
    var {
        [_m = C.a]: a
      } = C,
      x = C.#x,
      {
        [_m2 = C.b]: b
      } = C,
      y = C.#y,
      z = babelHelpers.objectWithoutProperties(C, [_m, _m2].map(babelHelpers.toPropertyKey));
    result = {
      a,
      b,
      x,
      y,
      z
    };
  }
}
