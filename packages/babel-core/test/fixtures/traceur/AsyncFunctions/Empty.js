// Options: --async-functions
// Async.

async function empty() {
}

empty().then((v) => {
  assert.isUndefined(v);
  done();
});