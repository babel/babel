function f1(a, ...rest) {
  let b = rest[rest.length - 3];
  let c = rest[rest.length - 2];
  let d = rest[rest.length - 1];
  return [a, b, c, d];
}
assert.deepEqual(f1(1, 2), [1, undefined, undefined, 2])

function f2(a, ...rest) {
  return rest[-1];
}
assert.equal(f2(1, 2), undefined)
