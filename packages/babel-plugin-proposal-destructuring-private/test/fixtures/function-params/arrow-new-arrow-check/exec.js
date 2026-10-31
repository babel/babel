// `new` on an arrow function throws before evaluating the parameters.
const log = [];
const g = () => log.push("default");
class C {
  static #x = 1;
  static m() {
    return ({ #x: x }, y = g(), z = x) => this;
  }
}
const arrow = C.m();
expect(() => new arrow(C)).toThrow(TypeError);
expect(log).toEqual([]);
expect(arrow(C)).toBe(C);
expect(log).toEqual(["default"]);
