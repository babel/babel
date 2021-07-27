class A {
  counter = 0;
  #method() {}
  self() {
    this.counter++;
    return this;
  }

  constructor() {
    this.self().#method = 2;
    ([this.#method] = [2]);
  }
}
