// Options: --async-generators --for-on --async-functions
// Async.

var C = {
  async* f() {
    yield 1;
  }
};

(async function() {
  var list = [];
  var g = C.f();
  for (var i on g) {
    list.push(i);
  }
  expect(list).toEqual([1]);

  done();
})().catch(done);

