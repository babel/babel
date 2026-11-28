struct A {
  #a = 1;
  getA() {
    return this.#a;
  }
}
Object.freeze(globalThis[Symbol.for("babel.structs@1")]);
struct B extends A {
  b = 2;
}
const b = new B();
expect(b.getA()).toBe(1);
expect(b.b).toBe(2);
