class C {
  #x;
  constructor(x) {
    this.#x = x;
  }
  m(a = 1, { #x: x }, b, ...c) {
    return [a, x, b, c];
  }
}
const instance = new C("own");
expect(instance.m(undefined, new C("x"), "b", "c1", "c2")).toEqual([
  1,
  "x",
  "b",
  ["c1", "c2"],
]);
expect(instance.m("a", new C("x2"), "b2")).toEqual(["a", "x2", "b2", []]);
expect(() => instance.m("a", {}, "b")).toThrow(TypeError);
expect(() => instance.m("a")).toThrow(TypeError);
expect(C.prototype.m.length).toBe(0);
