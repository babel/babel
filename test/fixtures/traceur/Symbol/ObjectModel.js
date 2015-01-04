// Options: --symbols

var s = Symbol('s');
assert.equal(typeof s, 'symbol');
assert.equal(s.constructor, Symbol);
assert.isFalse(s instanceof Symbol);

assert.throws(() => {
	new Symbol;
});

assert.equal(s.toString(), 'Symbol(s)');
assert.equal(s.valueOf(), s);
