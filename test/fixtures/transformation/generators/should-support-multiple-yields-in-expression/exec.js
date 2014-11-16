function *gen() { return (yield 0) + (yield 0); }
var itr = gen();
itr.next();
itr.next(1);
assert.equal(itr.next(2).value, 3);
