class A {
  static #self = A;
  static #getA = () => A;

  static extract() {
    return { self: A.#self, getA: A.#getA };
  }
}


const oldA = A;
A = null;

expect(oldA.extract().self).toBe(oldA);
expect(oldA.extract().getA()).toBe(oldA);
