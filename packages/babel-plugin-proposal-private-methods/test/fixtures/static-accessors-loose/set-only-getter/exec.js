class Cl {
  static #privateField = 0;

  static get #privateFieldValue() {
    return this.#privateField;
  }

  constructor() {
    expect(() => Cl.#privateFieldValue = 1).toThrow(TypeError);
    expect(() => ([Cl.#privateFieldValue] = [1])).toThrow(TypeError);
  }
}

const cl = new Cl();
