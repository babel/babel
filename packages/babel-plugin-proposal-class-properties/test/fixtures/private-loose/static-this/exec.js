class A {
  static #self = this;
  static #getA = () => this;

  static extract() {
    return { self: A.#self, getA: A.#getA };
  }
}

const { self, getA } = A.extract();

expect(self).toBe(A);
expect(getA()).toBe(A);
