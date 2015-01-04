function f([a, b, ...c], d) {
  return [a, b, c, d];
}
assertArrayEquals([1, 2, [3, 4], 5], f([1, 2, 3, 4], 5));

function g([, a]) {
  return a;
}
assert.equal(g([0, 1]), 1);

function h([, [, a]]) {
  return a;
}
assert.equal(h([0, [1, 2]]), 2);
