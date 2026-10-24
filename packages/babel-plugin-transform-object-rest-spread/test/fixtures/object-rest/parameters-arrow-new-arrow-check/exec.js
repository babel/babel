// `new` on an arrow function throws before evaluating the parameters.
const log = [];
const g = () => log.push("default");
function outer() {
  return ({ ...a }, b = g(), c = a) => this;
}
const self = {};
const arrow = outer.call(self);
expect(() => new arrow({})).toThrow(TypeError);
expect(log).toEqual([]);
expect(arrow({})).toBe(self);
expect(log).toEqual(["default"]);
