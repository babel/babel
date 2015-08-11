// Tests taken from https://mths.be/repeat

assert.equal(String.prototype.repeat.length, 1);

assert.equal('abc'.repeat(), '');
assert.equal('abc'.repeat(undefined), '');
assert.equal('abc'.repeat(null), '');
assert.equal('abc'.repeat(false), '');
assert.equal('abc'.repeat(NaN), '');
assert.equal('abc'.repeat('abc'), '');
assert.throw(function() { 'abc'.repeat(-Infinity); }, RangeError);
assert.throw(function() { 'abc'.repeat(-1); }, RangeError);
assert.equal('abc'.repeat(-0), '');
assert.equal('abc'.repeat(+0), '');
assert.equal('abc'.repeat(1), 'abc');
assert.equal('abc'.repeat(2), 'abcabc');
assert.equal('abc'.repeat(3), 'abcabcabc');
assert.equal('abc'.repeat(4), 'abcabcabcabc');
assert.throw(function() { 'abc'.repeat(+Infinity); }, RangeError);

assert.throw(function() { String.prototype.repeat.call(undefined); }, TypeError);
assert.throw(function() { String.prototype.repeat.call(undefined, 4); }, TypeError);
assert.throw(function() { String.prototype.repeat.call(null); }, TypeError);
assert.throw(function() { String.prototype.repeat.call(null, 4); }, TypeError);
assert.equal(String.prototype.repeat.call(42, 4), '42424242');
assert.equal(String.prototype.repeat.call({ 'toString': function() { return 'abc'; } }, 2), 'abcabc');

assert.throw(function() { String.prototype.repeat.apply(undefined); }, TypeError);
assert.throw(function() { String.prototype.repeat.apply(undefined, [4]); }, TypeError);
assert.throw(function() { String.prototype.repeat.apply(null); }, TypeError);
assert.throw(function() { String.prototype.repeat.apply(null, [4]); }, TypeError);
assert.equal(String.prototype.repeat.apply(42, [4]), '42424242');
assert.equal(String.prototype.repeat.apply({ 'toString': function() { return 'abc'; } }, [2]), 'abcabc');
