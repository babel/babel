// Async.

function* gen() {
  yield 1;
  yield 2;
}

var p2 = Promise.all(gen());

p2.then((v) => {
  assert.deepEqual(v, [1,2]);
  done();
});
