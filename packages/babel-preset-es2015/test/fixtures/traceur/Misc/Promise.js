// Async.

var p = new Promise((resolve, reject) => {
  resolve(42);
});
p.then((v) => {
	expect(v).toBe(42);
	done();
});
