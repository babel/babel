var s = Symbol('s');
assert.equal(typeof s, 'symbol');
assert.equal(s.constructor, Symbol);
assert.isFalse(s instanceof Symbol);

assert.throws(() => {
	new Symbol;
});

// TODO(jjb): Our impl not to spec so generators can use Symbols without
// requiring transcoding
// assert.equal(s.toString(), 'Symbol(s)');
assert.equal(s.valueOf(), s);
