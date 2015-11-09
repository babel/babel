// Options: --async-functions
// Async.

var f = async x => x;

f(1).then((result) => {
  assert.equal(result, 1);
  done();
}).catch(done);
