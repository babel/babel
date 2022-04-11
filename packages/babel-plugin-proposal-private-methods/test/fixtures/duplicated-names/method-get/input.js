class Cl {
  #privateField = 0;

  #foo() {
    return 'foo';
  }

  get #foo() {
    return this.#privateField;
  }
}