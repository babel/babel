class A {
  static #method() {}

  run() {
    expect(() => A.#method = 2).toThrow(TypeError);
    expect(() => ([A.#method] = [2])).toThrow(TypeError);
  }
}


