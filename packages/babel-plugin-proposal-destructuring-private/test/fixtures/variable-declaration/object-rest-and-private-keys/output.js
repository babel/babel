let result;
class C {
  static #x = "#x";
  static #y = "#y";
  static a = "a";
  static b = "b";
  static c = "c";
  static {
    var x = C.#x,
      y = C.#y,
      z = Object.assign({}, (babelHelpers.objectDestructuringEmpty(C), C));
    result = {
      x,
      y,
      z
    };
  }
}
