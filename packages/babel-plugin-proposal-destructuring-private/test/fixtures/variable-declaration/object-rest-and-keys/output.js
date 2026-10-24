const _excluded = ["y"];
let result;
class C {
  static #x = "#x";
  static y = "y";
  static a = "a";
  static b = "b";
  static c = "c";
  static {
    var x = C.#x,
      {
        y
      } = C,
      z = babelHelpers.objectWithoutProperties(C, _excluded);
    result = {
      x,
      y,
      z
    };
  }
}
