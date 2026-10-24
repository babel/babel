// `this` in the static block is C, which doesn't have the instance field #x.
let x = "untouched";
expect(() => {
  class C {
    #x;
    static {
      for ({ #x: x } of [this]);
    }
  }
}).toThrow(TypeError);
expect(x).toBe("untouched");

const log = [];
class D {
  #x;
  constructor(x) {
    this.#x = x;
  }
  static {
    for ({ #x: x } of [new this("x1"), new this("x2")]) log.push(x);
  }
}
expect(log).toEqual(["x1", "x2"]);
expect(x).toBe("x2");
