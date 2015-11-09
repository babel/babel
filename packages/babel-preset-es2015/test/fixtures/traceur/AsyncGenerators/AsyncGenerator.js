// Options: --async-generators --for-on --async-functions
// Async.

async function* f() {
  yield 1;
}

(async function() {
  var list = [];
  var g = f();
  for (var i on g) {
    list.push(i);
  }
  assert.deepEqual(list, [1]);

  done();
})().catch(done);

