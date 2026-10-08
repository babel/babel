class A {
  #f() {}
  static test(o) {
    o?.#f~(?);
    o?.x.#f~(?);
  }
}
