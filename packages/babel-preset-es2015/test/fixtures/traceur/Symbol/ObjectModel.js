var s = Symbol('s');
expect(typeof s).toBe('symbol');
expect(s.constructor).toBe(Symbol);
expect(s instanceof Symbol).toBe(false);

expect(() => {
	new Symbol;
}).toThrow();

// TODO(jjb): Our impl not to spec so generators can use Symbols without
// requiring transcoding
// assert.equal(s.toString(), 'Symbol(s)');
expect(s.valueOf()).toBe(s);
