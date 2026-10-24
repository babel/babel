class C {
  static #x = 1;
  static m({ #x: x }, y = x, ...rest) {}
}
