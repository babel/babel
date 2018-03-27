// Options: --async-generators --for-on --async-functions
// Async.

async function* f() {
  yield 1;
  yield 2;
}

async function* g() {
  for (i on f()) {
    yield 2 * i;
  }
}

(async function() {
  var list = [];
  for (var i on g()) {
    list.push(i);
  }
  expect(list).toEqual([2, 4]);

  done();
})().catch(done);

