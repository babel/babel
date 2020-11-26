const X = class B {
  static #a = 0;
  static #b = B.#a;
  static c = B.#b;
}

expect(X.c).toBe(0);
