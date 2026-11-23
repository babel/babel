class A {
  #x = 1;
  m() {
    return class B {
      accessor #x = 2;
      g() {
        return this.#x;
      }
    };
  }
}
