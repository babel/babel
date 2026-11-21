class C {
  #x;
  constructor(x) {
    this.#x = x;
  }
  m(a = 1, { #x: x }, b, ...c) {
    const before = b;
    var b = 1;
    return [a, x, before, b, c];
  }
}
const instance = new C("own");
expect(instance.m(undefined, new C("x"), "b", "c1", "c2")).toEqual([
  1,
  "x",
  "b",
  1,
  ["c1", "c2"],
]);
expect(instance.m("a", new C("x2"), "b2")).toEqual(["a", "x2", "b2", 1, []]);
expect(() => instance.m("a", {}, "b")).toThrow(TypeError);
expect(() => instance.m("a")).toThrow(TypeError);
expect(C.prototype.m.length).toBe(0);
