function f() {
  var [a, b] = arguments;
  return [a, b];
}
function g() {
  var [a, ...rest] = arguments;
  return [a, rest];
}
expect(f(1, 2, 3)).toEqual([1, 2]);
expect(f(1)).toEqual([1, undefined]);
expect(g(1, 2, 3)).toEqual([1, [2, 3]]);
expect(Array.isArray(g(1, 2)[1])).toBe(true);
