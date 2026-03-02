class Cl {
  static #privateField = 0;

  static get #privateFieldValue() {
    return this.#privateField;
  }

  constructor() {
    Cl.#privateFieldValue = 1;
    ([Cl.#privateFieldValue] = [1]);
  }
}

const cl = new Cl();

