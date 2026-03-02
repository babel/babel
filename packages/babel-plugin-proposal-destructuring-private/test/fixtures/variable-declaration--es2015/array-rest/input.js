class C {
  static #x;
  static {
    var [{ #x: x = 1 }, ...z] = [C];
  }
}
