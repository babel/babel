function f({ a, ...r }) {
  var a;
  return [a, r];
}
expect(f({ a: 1, b: 2 })).toEqual([1, { b: 2 }]);

function g({ a, ...r }) {
  var a = 3;
  return [a, r];
}
expect(g({ a: 1, b: 2 })).toEqual([3, { b: 2 }]);
