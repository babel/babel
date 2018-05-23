// Tests taken from https://mths.be/repeat

expect(String.prototype.repeat.length).toBe(1);

expect('abc'.repeat()).toBe('');
expect('abc'.repeat(undefined)).toBe('');
expect('abc'.repeat(null)).toBe('');
expect('abc'.repeat(false)).toBe('');
expect('abc'.repeat(NaN)).toBe('');
expect('abc'.repeat('abc')).toBe('');
expect(function() { 'abc'.repeat(-Infinity); }).toThrow(RangeError);
expect(function() { 'abc'.repeat(-1); }).toThrow(RangeError);
expect('abc'.repeat(-0)).toBe('');
expect('abc'.repeat(+0)).toBe('');
expect('abc'.repeat(1)).toBe('abc');
expect('abc'.repeat(2)).toBe('abcabc');
expect('abc'.repeat(3)).toBe('abcabcabc');
expect('abc'.repeat(4)).toBe('abcabcabcabc');
expect(function() { 'abc'.repeat(+Infinity); }).toThrow(RangeError);

expect(function() { String.prototype.repeat.call(undefined); }).toThrow(TypeError);
expect(function() { String.prototype.repeat.call(undefined, 4); }).toThrow(TypeError);
expect(function() { String.prototype.repeat.call(null); }).toThrow(TypeError);
expect(function() { String.prototype.repeat.call(null, 4); }).toThrow(TypeError);
expect(String.prototype.repeat.call(42, 4)).toBe('42424242');
expect(
  String.prototype.repeat.call({ 'toString': function() { return 'abc'; } }, 2)
).toBe('abcabc');

expect(function() { String.prototype.repeat.apply(undefined); }).toThrow(TypeError);
expect(function() { String.prototype.repeat.apply(undefined, [4]); }).toThrow(TypeError);
expect(function() { String.prototype.repeat.apply(null); }).toThrow(TypeError);
expect(function() { String.prototype.repeat.apply(null, [4]); }).toThrow(TypeError);
expect(String.prototype.repeat.apply(42, [4])).toBe('42424242');
expect(
  String.prototype.repeat.apply({ 'toString': function() { return 'abc'; } }, [2])
).toBe('abcabc');
