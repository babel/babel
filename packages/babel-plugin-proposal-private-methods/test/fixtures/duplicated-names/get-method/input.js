class Cl {
  #privateField = 0;
  
  get #foo() {
    return this.#privateField;
  }

  #foo() {
    return 'foo';
  }
}