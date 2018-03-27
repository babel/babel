// Options: --async-functions
// Async.

var f = async () => 1;

f().then((result) => {
  expect(result).toBe(1);
  done();
}).catch(done);
