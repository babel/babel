class Cl {
  #privateField = "top secret string";

  constructor() {
    this.publicField = "not secret string";
  }

  get #privateFieldValue() {
    return this.#privateField;
  }

  set #privateFieldValue(newValue) {
    this.#privateField = newValue;
  }

  publicGetPrivateField() {
    return this.#privateFieldValue;
  }

  publicSetPrivateField(newValue) {
    this.#privateFieldValue = newValue;
  }

  get publicFieldValue() {
    return this.publicField;
  }

  set publicFieldValue(newValue) {
    this.publicField = newValue;
  }

  testUpdates() {
    this.#privateField = 0n;
    this.publicField = 0n;
    this.#privateFieldValue = this.#privateFieldValue++;
    this.publicFieldValue = this.publicFieldValue++;
    expect(this.#privateField).toEqual(this.publicField);

    ++this.#privateFieldValue;
    ++this.publicFieldValue;
    expect(this.#privateField).toEqual(this.publicField);

    this.#privateFieldValue += 1n;
    this.publicFieldValue += 1n;
    expect(this.#privateField).toEqual(this.publicField);
  }
}

const cl = new Cl();
cl.testUpdates();
