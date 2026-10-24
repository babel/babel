function f({ ...a }, { ...b } = a) {
  return [a, b];
}
const [a, b] = f({ x: 1 });
expect(a).toEqual({ x: 1 });
expect(b).toEqual({ x: 1 });
expect(b).not.toBe(a);

function g({ a, ...r }, { [a]: b, ...s }) {
  return [b, r, s];
}
expect(g({ a: "k", c: 1 }, { k: 2, d: 3 })).toEqual([2, { c: 1 }, { d: 3 }]);
expect(g.length).toBe(2);
