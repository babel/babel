let result;
class C {
  static #x = "#x";
  static #y = "#y";
  static a = "a";
  static b = "b";
  static c = "c";
  static {
    var _C$a, _C$b;
    var a, b, x, y, z;
    ({
      [_C$a = babelHelpers.toPropertyKey(C.a)]: a
    } = C);
    x = C.#x;
    ({
      [_C$b = babelHelpers.toPropertyKey(C.b)]: b
    } = C);
    y = C.#y;
    z = babelHelpers.objectWithoutProperties(C, [_C$a, _C$b]);
    result = {
      a,
      b,
      x,
      y,
      z
    };
  }
}
