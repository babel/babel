// Options: --async-generators --for-on --async-functions
// Async.

async function* f1() {
  yield 1;
  yield* f2();
  yield 4;
}

async function* f2() {
  yield 2;
  yield 3;
}

(async function() {
  var list = [];
  var g = f1();
  for (var i on g) {
    list.push(i);
  }
  expect(list).toEqual([1, 2, 3, 4]);

  done();
})().catch(done);

