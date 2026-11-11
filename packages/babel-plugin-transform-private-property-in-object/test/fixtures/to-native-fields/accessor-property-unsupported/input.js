class A {
  accessor #x = 1;
  static has(o) {
    return #x in o;
  }
}
