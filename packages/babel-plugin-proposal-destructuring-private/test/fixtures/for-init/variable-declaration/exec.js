const x = "outer";
const seen = [];
class C {
  static #x;
  static {
    C.#x = "x";
    for (let { #x: x } = C;;) { seen.push(x); break; }
  }
}
expect(seen).toEqual(["x"]);
expect(x).toBe("outer");

expect(() => {
  class D {
    static #x;
    static {
      for (let { #x: x } = {};;) { break; }
    }
  }
}).toThrow(TypeError);
