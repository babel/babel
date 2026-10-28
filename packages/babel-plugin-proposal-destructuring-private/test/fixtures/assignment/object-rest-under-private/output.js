let result;
class C {
  static x = "x";
  static y = "y";
  static z = "z";
  static #x = C;
  static {
    var x, y, z;
    ({
      x
    } = C), {
      y,
      ...z
    } = C.#x;
    result = {
      x,
      y,
      z
    };
  }
}
