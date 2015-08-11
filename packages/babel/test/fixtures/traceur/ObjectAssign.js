var target = {a: 0, b: 2};
var source = {a: 1, c: 3, get d() { return this.b || this.a + 64; }};
var assigned = Object.assign(target, source);

// ----------------------------------------------------------------------------

assert.isTrue(Object.hasOwnProperty("assign"));
assert.equal(assigned.a, source.a);
assert.equal(assigned.b, target.b);
assert.equal(assigned.c, source.c);
assert.equal(assigned.d, source.d);
