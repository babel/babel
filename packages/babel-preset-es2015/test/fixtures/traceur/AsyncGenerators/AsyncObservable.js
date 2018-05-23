// Options: --async-generators --for-on --async-functions
// Async.

async function* f() {
  await yield 1;
  await yield 2;
  await yield 3;
}

(async function() {
  var list = [];
  var g = f();
  for (var i on g) {
    list.push(i);
    await Promise.resolve().then(() => list.push(i + 3));
  }
  expect(list).toEqual([1, 4, 2, 5, 3, 6]);

  done();
})().catch(done);

