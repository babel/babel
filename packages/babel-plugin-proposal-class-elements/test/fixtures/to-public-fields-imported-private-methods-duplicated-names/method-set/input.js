class Cl {
  #privateField = 0;

  #foo() {
    return 'foo';
  }

  set #foo(newValue) {
    this.#privateField = newValue;
  }
}