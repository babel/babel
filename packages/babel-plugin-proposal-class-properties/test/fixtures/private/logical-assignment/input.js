class Foo {
  #nullish = 0;
  #and = 0;
  #or = 0;

  self() {
    return this;
  }

  test() {
    this.#nullish ??= 42;
    this.#and &&= 0;
    this.#or ||= 0;

    this.self().#nullish ??= 42;
  }
}
