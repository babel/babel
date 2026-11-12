class C {
  static set #p(v) { C.#q = v }
  static #q;
  constructor() {
    ([C.#p] = [0]);
    expect(C.#q).toBe(0);
  }
}

new C;
