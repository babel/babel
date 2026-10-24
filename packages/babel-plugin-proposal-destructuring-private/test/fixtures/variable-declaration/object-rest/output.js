let result;
class C {
  static #x = "#x";
  static #y = "#y";
  static a = "a";
  static b = "b";
  static c = "c";
  static {
    var _C$a, _C$b;
    var {
        [_C$a = C.a]: a
      } = C,
      x = C.#x,
      {
        [_C$b = C.b]: b
      } = C,
      y = C.#y,
      z = babelHelpers.objectWithoutProperties(C, [_C$a, _C$b].map(babelHelpers.toPropertyKey));
    result = {
      a,
      b,
      x,
      y,
      z
    };
  }
}
