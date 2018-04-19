// Options: --async-functions
// Async.

async function empty() {
}

empty().then((v) => {
  expect(v).toBeUndefined();
  done();
});
