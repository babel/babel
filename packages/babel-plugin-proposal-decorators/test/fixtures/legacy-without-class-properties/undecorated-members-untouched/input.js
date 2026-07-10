class Example {
  undecorated = 2;
  #privateField = 3;
  static staticUndecorated = 4;
  method() {}
  #privateMethod() {
    return this.#privateField;
  }
  @dec decorated = 1;
}
