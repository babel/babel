// Options: --async-functions
// Async.

async function rethrow(x) {
  1;
  throw x;
  2;
}

rethrow(2).catch((err) => {
  expect(err).toBe(2);
  done();
});
