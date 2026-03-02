class A {
  #method() {}

  get #getter() {}

  set #setter(v) {}

  get #getset() {}
  set #getset(v) {}

  constructor() {
    this.#method();
    this.#getter;
    this.#setter = 1;
    this.#getset;
    this.#getset = 2;
  }
}
