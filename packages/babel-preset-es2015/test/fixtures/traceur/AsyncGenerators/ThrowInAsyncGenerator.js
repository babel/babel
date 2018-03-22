// Options: --async-generators --for-on --async-functions
// Async.

async function* f() {
  for (var i = 1; i < 4; ++i) {
    yield i;
  }
}


(async function() {
  var list = [];
  var g = f();
  try {
    for (var i on g) {
      if (i == 2) {
        throw 'ex';
      }
      list.push(i);
    }
  } catch (ex) {
    expect(ex).toBe('ex');
  }
  expect(list).toEqual([1]);

  done();
})().catch(done);

