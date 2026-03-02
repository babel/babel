let x, z;
class C {
  static #x;
  static {
    ([{ #x: x = 1 }, ...z] = [C]);
  }
}
