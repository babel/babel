function f([a, b, ...c], d) {
  return [a, b, c, d];
}
expect(f([1, 2, 3, 4], 5)).toEqual([1, 2, [3, 4], 5]);

function g([, a]) {
  return a;
}
expect(g([0, 1])).toBe(1);

function h([, [, a]]) {
  return a;
}
expect(h([0, [1, 2]])).toBe(2);
