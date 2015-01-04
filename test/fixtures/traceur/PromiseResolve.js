var p = Promise.resolve(42);

assert.equal(p, Promise.resolve(p));
