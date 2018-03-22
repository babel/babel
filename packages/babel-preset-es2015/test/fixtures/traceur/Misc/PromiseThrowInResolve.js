// Async.

var message = 'testing';
var throwInResolve = new Promise((resolve, reject) => {
  resolve(42);
});
throwInResolve.then((v) => {
  throw new Error(message);
}).catch(function(ex) {
	// When catch() is used in testing, these asserts would
	// not be called, just the done() to avoid timeout.
  expect(ex instanceof Error).toBe(true);
  expect(ex.toString()).toEqual(expect.stringContaining(message));
  done();
}).catch(done);
