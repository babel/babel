// Options: --async-generators --for-on --async-functions
// Async.

async function* f() {
  yield 1;
  yield 2;
  yield 3;
}


(async function() {
  var list = [];
  var g = f();
  for (var i on g) {
    if (i === 2) {
      break;
    }
    list.push(i);
  }
  expect(list).toEqual([1]);

  done();
})().catch(done);

