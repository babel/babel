class A {
  #x = 1;
  static getB() {
    return class B {
      accessor #x = 2;
      static read(o) {
        return o.#x;
      }
      static has(o) {
        return #x in o;
      }
    };
  }
}

const B = A.getB();
expect(B.read(new B())).toBe(2);
expect(B.has(new B())).toBe(true);
expect(B.has(new A())).toBe(false);
