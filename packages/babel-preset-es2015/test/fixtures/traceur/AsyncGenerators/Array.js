// Options: --for-on --async-functions
// Async.

(async function() {
  const list = [];
  const g = [1, 2, 3];
  for (var i on g) {
    list.push(i);
  }
  expect(list).toEqual([1, 2, 3]);

  done();
})().catch(done);

