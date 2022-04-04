class C {
  static #x;
  static 0(...[...{0: { #x: x }}]) {}
  static 1(a, b = 1, { #x: x }, ...c) {}
  static 2(a, b, { #x: x } = C) {}
  static 3(a, b, { #x: x }, c = 1) {}
}
