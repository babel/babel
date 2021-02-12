class A {
  #method() {}

  run() {
    this.#method = 2;
  }
}

expect(() => new A().run()).toThrow(TypeError);
