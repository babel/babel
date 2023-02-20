class Cl {
  static #privateStaticMethod() { }

  constructor() {
    Cl.#privateStaticMethod = null;
  }
}

new Cl();