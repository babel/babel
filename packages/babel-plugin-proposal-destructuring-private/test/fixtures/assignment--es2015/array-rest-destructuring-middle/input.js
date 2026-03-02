let x, y, z;
class C {
  static #x;
  static {
    ([{ y }, { #x: x = y }, ...z] = [{ y: 1}, C]);
  }
}
