class Cl {
  #privateField = 0;

  set #foo(newValue) {
    this.#privateField = newValue;
  }

  #foo() {
    return 'foo';
  }
}