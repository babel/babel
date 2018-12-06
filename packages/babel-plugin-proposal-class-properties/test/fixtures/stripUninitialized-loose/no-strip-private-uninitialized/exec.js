class A {
  #x;

  check() {
    this.#x;
  }
}

expect(() => new A().check()).not.toThrow();
