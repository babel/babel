let result;
class C {
  static x = "x";
  static y = "y";
  static z = "z";
  static #x = C;
  static {
    var { x, #x: { y, ...z } } = C;
    result = { x, y, z };
  }
}
