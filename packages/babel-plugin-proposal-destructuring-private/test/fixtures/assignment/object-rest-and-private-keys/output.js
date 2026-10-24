let result;
class C {
  static #x = "#x";
  static #y = "#y";
  static a = "a";
  static b = "b";
  static c = "c";
  static {
    let x, y, z;
    x = C.#x;
    y = C.#y;
    z = babelHelpers.objectWithoutProperties((babelHelpers.objectDestructuringEmpty(C), C), []);
    result = {
      x,
      y,
      z
    };
  }
}
