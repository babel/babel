function *outer(n) {
  yield* inner(n << 1);
  yield "zxcv";
}

function *inner(n) {
  return yield yield yield n;
}

var g = outer(3);
assert.deepEqual(g.next(), { value: 6, done: false });
assert.deepEqual(g.next(1), { value: 1, done: false });
assert.deepEqual(g.next(2), { value: 2, done: false });
assert.deepEqual(g.next(4), { value: "zxcv", done: false });
assert.deepEqual(g.next(5), { value: void 0, done: true });
