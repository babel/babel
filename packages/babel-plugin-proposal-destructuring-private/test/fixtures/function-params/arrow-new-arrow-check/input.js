class C {
  static #x = 1;
  static m() {
    return ({ #x: x }, y = g(), z = x) => this;
  }
}
