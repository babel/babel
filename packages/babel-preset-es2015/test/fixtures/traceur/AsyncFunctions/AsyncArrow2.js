// Options: --async-functions
// Async.

var f = async x => x;

f(1).then((result) => {
  expect(result).toBe(1);
  done();
}).catch(done);
