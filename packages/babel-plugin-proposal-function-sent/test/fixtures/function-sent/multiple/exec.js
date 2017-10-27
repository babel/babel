const values = [];

function* gen() {
  values.push(function.sent);
  values.push(function.sent);
  values.push(yield "foo");
  values.push(function.sent);
  values.push(yield);
  values.push(function.sent);
  values.push(function.sent);
}

const it = gen();
assert.deepEqual(values, []);

assert.equal(it.next(1).value, "foo");
assert.deepEqual(values, [ 1, 1 ]);

assert.equal(it.next(2).value, undefined);
assert.deepEqual(values, [ 1, 1, 2, 2 ]);

assert.equal(it.next(3).done, true);
assert.deepEqual(values, [ 1, 1, 2, 2, 3, 3, 3 ]);
