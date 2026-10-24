// `b = a` references a parameter moved into the body: the following
// parameters, including the rest one, must be moved too.
function f({ ...a }, b = a, ...[{ ...c }]) {
  return [a, b, c];
}
function g({ ...a }, b = a, ...{ length, ...d }) {
  return [a, b, length, d];
}
const x = { x: 1 };
const [a, b, c] = f(x, undefined, { y: 2 });
expect(a).toEqual({ x: 1 });
expect(b).toBe(a);
expect(c).toEqual({ y: 2 });
expect(f.length).toBe(1);

expect(g(x, 1, "p", "q")).toEqual([{ x: 1 }, 1, 2, { 0: "p", 1: "q" }]);

// arrow functions don't have their own `arguments`
const self = this;
function outer() {
  const h = ({ ...a }, b = a, ...rest) => [this, a, b, rest];
  return h(x, undefined, 3, 4);
}
expect(outer.call(self, "ignored")).toEqual([self, { x: 1 }, { x: 1 }, [3, 4]]);

// references to the rest parameter are optimised
function i({ ...a }, b = a, ...rest) {
  return rest[0] + rest.length;
}
expect(i({}, 1, 10, 20)).toBe(12);
expect(i({}, 1)).toBeNaN();
