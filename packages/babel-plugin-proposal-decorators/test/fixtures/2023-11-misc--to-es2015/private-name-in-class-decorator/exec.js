let called = false;

class A {
  static #x() { called = true }
  constructor() {
    @(A.#x)
    class B extends A {
      static #x() { throw new Error("Should not be called") }
    }
  }
}

new A();
expect(called).toBe(true);
