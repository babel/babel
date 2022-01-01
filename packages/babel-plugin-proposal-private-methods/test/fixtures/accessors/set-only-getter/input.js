class Cl {
  #privateField = 0;
  counter = 0;

  get #privateFieldValue() {
    return this.#privateField;
  }

  get self() {
    this.counter++;
    return this;
  }

  constructor() {
    this.self.#privateFieldValue = 1
    ([this.self.#privateFieldValue] = [1]);
  }
}

const cl = new Cl();
