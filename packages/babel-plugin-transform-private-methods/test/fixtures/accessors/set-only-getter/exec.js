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
    expect(() => this.self.#privateFieldValue = 1).toThrow(TypeError);
    expect(this.counter).toBe(1);
    expect(() => ([this.self.#privateFieldValue] = [1])).toThrow(TypeError);
    expect(this.counter).toBe(2);
  }
}

const cl = new Cl();
