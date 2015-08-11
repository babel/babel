// Async.

var p = new Promise((resolve, reject) => {
  resolve(42);
});
p.then((v) => {
	assert.equal(v, 42);
	done();
});
