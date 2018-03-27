var s = Symbol('s');
expect(typeof s).toBe('symbol');
expect(s.constructor).toBe(Symbol);
expect(s).toBeInstanceOf(Symbol);

expect(() => {
	new Symbol;
}).toThrow();

// TODO(jjb): Our impl not to spec so generators can use Symbols without
// requiring transcoding
// expect(s.toString()).toBe('Symbol(s)');
expect(s.valueOf()).toBe(s);
