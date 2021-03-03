class Cl {
  #privateField = 0;

  get #privateFieldValue() {
    return this.#privateField;
  }

  constructor() {
    this.#privateFieldValue = 1;
    ([this.#privateFieldValue] = [1]);
  }
}
