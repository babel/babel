var a = ['a', 'b', 'c'];

var res = [];
for (var x of a) {
  res.push(x);
}
assert.deepEqual(res, ['a', 'b', 'c']);

assert.equal(a[Symbol.iterator], a.values);

res = [];
for (var x of a.values()) {
  res.push(x);
}
assert.deepEqual(res, ['a', 'b', 'c']);

res = [];
for (var x of a.keys()) {
  res.push(x);
}
assert.deepEqual(res, [0, 1, 2]);

res = [];
for (var x of a.entries()) {
  res.push(x);
}
assert.deepEqual(res, [[0, 'a'], [1, 'b'], [2, 'c']]);
