let a, x, b;
class C {
  static #x;
  static {
    ({ a = 1, #x: x = 2, b = 3 } = C);
  }
}
