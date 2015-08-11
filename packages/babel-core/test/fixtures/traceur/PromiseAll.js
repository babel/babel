// Skip.
// Async.

// V8 does not yet support iterable argument to Promise.all.
// https://code.google.com/p/v8/issues/detail?id=3705

function* gen() {
  yield 1;
  yield 2;
}

var p2 = Promise.all(gen());

p2.then((v) => {
  assert.deepEqual(v, [1,2]);
  done();
});
