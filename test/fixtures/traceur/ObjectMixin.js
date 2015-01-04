var target = {a: 0, b: 2};
var source = {a: 1, c: 3, get d() { return this.b || this.a + 64; }};
var mixed = Object.mixin(target, source);

// ----------------------------------------------------------------------------

assert.isTrue(Object.hasOwnProperty("mixin"));
assert.equal(mixed.a, source.a);
assert.equal(mixed.b, target.b);
assert.equal(mixed.c, source.c);
assert.notEqual(mixed.d, source.d);
