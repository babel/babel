function A(first, second) {
  this.first = first;
  this.second = second;
}

function *gen() {
  return yield new (yield 0)(yield 1, yield 2);
}

var g = gen();

assert.deepEqual(g.next(), { value: 0, done: false });
assert.deepEqual(g.next(A), { value: 1, done: false });
assert.deepEqual(g.next("asdf"), { value: 2, done: false });

var info = g.next("zxcv");
assert.strictEqual(info.done, false);
assert.ok(info.value instanceof A);
assert.strictEqual(info.value.first, "asdf");
assert.strictEqual(info.value.second, "zxcv");

assert.deepEqual(g.next("qwer"), { value: "qwer", done: true });
