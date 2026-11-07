// `this` in the static block is C, which doesn't have the instance field #x.
let x = "untouched";
expect(() => {
  class C {
    #x;
    static {
      for ({ #x: x } = this;;) { break; }
    }
  }
}).toThrow(TypeError);
expect(x).toBe("untouched");

class D {
  #x;
  constructor(x) {
    this.#x = x;
  }
  static {
    for ({ #x: x } = new this("x");;) { break; }
  }
}
expect(x).toBe("x");
