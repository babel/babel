class C {
  static set #p(v) { C.#q = v }
  static #q;
  constructor() {
    ([C.#p] = [0]);
  }
}

new C;
