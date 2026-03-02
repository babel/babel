let result;
class C {
  static #x = "#x";
  static y = "y";
  static a = "a";
  static b = "b";
  static c = "c";
  static {
    let x, y, z;
    x = C.#x, {
      y,
      ...z
    } = C;
    result = {
      x,
      y,
      z
    };
  }
}
