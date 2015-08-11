var finallyVisited = false;

function* test() {
  try {
    yield 42;
  } finally {
    finallyVisited = true;
  }
}

var it = test();
assert.deepEqual({value: 42, done: false}, it.next());
assert.isFalse(finallyVisited);

assert.deepEqual({value: undefined, done: true}, it.next());
assert.isTrue(finallyVisited);

finallyVisited = false;
for (var i of test()) {
  assert.equal(42, i);
}
assert.isTrue(finallyVisited);
