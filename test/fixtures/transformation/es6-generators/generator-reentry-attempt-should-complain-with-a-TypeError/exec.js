function *gen(x) {
  try {
    (yield x).next(x);
  } catch (err) {
    yield err;
  }
  return x + 1;
}

var g = gen(3);
assert.deepEqual(g.next(), { value: 3, done: false });
var complaint = g.next(g); // Sending the generator to itself.
assert.ok(complaint.value instanceof Error);
assert.strictEqual(
  complaint.value.message,
  "Generator is already running"
);
assert.deepEqual(g.next(), { value: 4, done: true });
