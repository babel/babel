// Options: --async-generators --for-on --async-functions
// Async.

async function* f(a) {
  yield this[0];
  yield arguments[0];
}

(async function() {
  var list = [];
  var g = f.call([1], 2);
  for (var i on g) {
    list.push(i);
  }
  assert.deepEqual(list, [1, 2]);

  done();
})().catch(done);

