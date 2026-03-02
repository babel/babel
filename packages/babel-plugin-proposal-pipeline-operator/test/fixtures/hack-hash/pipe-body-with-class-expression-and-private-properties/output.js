const result = new class {
  #baz;
  constructor() {
    this.#baz = 1;
  }
  #bar() {
    return this.#baz + 2;
  }
  foo() {
    return this.#bar() + 3;
  }
}().foo();
expect(result).toBe(1 + 2 + 3);
