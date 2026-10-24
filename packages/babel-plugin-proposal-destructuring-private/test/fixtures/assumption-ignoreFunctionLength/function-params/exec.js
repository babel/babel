// Function lengths are not checked under the ignoreFunctionLength assumption.
class C {
  static #x;
  static {
    C.#x = "x";
  }
  static 0(...[...{0: { #x: x }}]) {
    return x;
  }
  static 1(a, b = 1, { #x: x }, ...c) {
    return [a, b, x, c];
  }
  static 2(a, b, { #x: x } = C) {
    return [a, b, x];
  }
  static 3(a, b, { #x: x }, c = 1) {
    return [a, b, x, c];
  }
}

expect(C[0](C, "ignored")).toBe("x");
expect(() => C[0]({})).toThrow(TypeError);
expect(() => C[0]()).toThrow(TypeError);

expect(C[1]("a", undefined, C, "c1", "c2")).toEqual(["a", 1, "x", ["c1", "c2"]]);
expect(C[1]("a", "b", C)).toEqual(["a", "b", "x", []]);
expect(() => C[1]("a", "b", {})).toThrow(TypeError);

expect(C[2]("a", "b")).toEqual(["a", "b", "x"]);
expect(C[2]("a", "b", C)).toEqual(["a", "b", "x"]);
expect(() => C[2]("a", "b", {})).toThrow(TypeError);
expect(() => C[2]("a", "b", null)).toThrow(TypeError);

expect(C[3]("a", "b", C)).toEqual(["a", "b", "x", 1]);
expect(C[3]("a", "b", C, "c")).toEqual(["a", "b", "x", "c"]);
expect(() => C[3]("a", "b", {})).toThrow(TypeError);
