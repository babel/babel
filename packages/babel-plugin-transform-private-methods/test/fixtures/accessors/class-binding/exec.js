class A {
  get #getA() { return A };
  get getA() {
    return this.#getA;
  }
}

const oldA = A;
A = null;

expect(new oldA().getA).toBe(oldA);
