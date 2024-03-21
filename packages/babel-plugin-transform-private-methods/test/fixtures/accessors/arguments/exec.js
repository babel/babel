class Cl {
  #privateField = "top secret string";

  constructor() {
    this.publicField = "not secret string";
  }

  get #privateFieldValue() {
    expect(arguments.length).toBe(0);
    return this.#privateField;
  }

  set #privateFieldValue(newValue) {
    expect(arguments.length).toBe(1);
    this.#privateField = newValue;
  }

  publicGetPrivateField() {
    return this.#privateFieldValue;
  }

  publicSetPrivateField(newValue) {
    this.#privateFieldValue = newValue;
  }
}

const cl = new Cl();

expect(cl.publicGetPrivateField()).toEqual("top secret string");

cl.publicSetPrivateField("new secret string");
expect(cl.publicGetPrivateField()).toEqual("new secret string");

