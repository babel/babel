let result;
class C {
  static #x = "#x";
  static y = "y";
  static a = "a";
  static b = "b";
  static c = "c";
  static {
    var { #x: x, y, ...z } = C;
    result = { x, y, z };
  }
}
