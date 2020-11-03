class Cl {
  #privateField = 0;

  set #privateFieldValue(newValue) {
    this.#privateField = newValue;
  }

  constructor() {
    expect(this.#privateFieldValue).toBeUndefined();
  }
}

const cl = new Cl();
