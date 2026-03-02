class A {
  #getA() { return A };
  getA() {
    return this.#getA();
  }
}

const oldA = A;
A = null;

expect(new oldA().getA()).toBe(oldA);
