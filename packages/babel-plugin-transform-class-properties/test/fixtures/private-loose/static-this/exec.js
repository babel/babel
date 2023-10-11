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

const oldA = A;
A = null;

expect(oldA.extract().self).toBe(oldA);
expect(oldA.extract().getA()).toBe(oldA);
