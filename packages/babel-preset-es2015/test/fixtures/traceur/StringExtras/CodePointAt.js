// Tests taken from https://mths.be/codepointat

expect(String.prototype.codePointAt).toHaveLength(1);

// String that starts with a BMP symbol
expect('abc\uD834\uDF06def'.codePointAt('')).toBe(0x61);
expect('abc\uD834\uDF06def'.codePointAt('_')).toBe(0x61);
expect('abc\uD834\uDF06def'.codePointAt()).toBe(0x61);
expect('abc\uD834\uDF06def'.codePointAt(-Infinity)).toBeUndefined();
expect('abc\uD834\uDF06def'.codePointAt(-1)).toBeUndefined();
expect('abc\uD834\uDF06def'.codePointAt(-0)).toBe(0x61);
expect('abc\uD834\uDF06def'.codePointAt(0)).toBe(0x61);
expect('abc\uD834\uDF06def'.codePointAt(3)).toBe(0x1D306);
expect('abc\uD834\uDF06def'.codePointAt(4)).toBe(0xDF06);
expect('abc\uD834\uDF06def'.codePointAt(5)).toBe(0x64);
expect('abc\uD834\uDF06def'.codePointAt(42)).toBeUndefined();
expect('abc\uD834\uDF06def'.codePointAt(Infinity)).toBeUndefined();
expect('abc\uD834\uDF06def'.codePointAt(Infinity)).toBeUndefined();
expect('abc\uD834\uDF06def'.codePointAt(NaN)).toBe(0x61);
expect('abc\uD834\uDF06def'.codePointAt(false)).toBe(0x61);
expect('abc\uD834\uDF06def'.codePointAt(null)).toBe(0x61);
expect('abc\uD834\uDF06def'.codePointAt(undefined)).toBe(0x61);

// String that starts with an astral symbol
expect('\uD834\uDF06def'.codePointAt('')).toBe(0x1D306);
expect('\uD834\uDF06def'.codePointAt('1')).toBe(0xDF06);
expect('\uD834\uDF06def'.codePointAt('_')).toBe(0x1D306);
expect('\uD834\uDF06def'.codePointAt()).toBe(0x1D306);
expect('\uD834\uDF06def'.codePointAt(-1)).toBeUndefined();
expect('\uD834\uDF06def'.codePointAt(-0)).toBe(0x1D306);
expect('\uD834\uDF06def'.codePointAt(0)).toBe(0x1D306);
expect('\uD834\uDF06def'.codePointAt(1)).toBe(0xDF06);
expect('\uD834\uDF06def'.codePointAt(42)).toBeUndefined();
expect('\uD834\uDF06def'.codePointAt(false)).toBe(0x1D306);
expect('\uD834\uDF06def'.codePointAt(null)).toBe(0x1D306);
expect('\uD834\uDF06def'.codePointAt(undefined)).toBe(0x1D306);

// Lone high surrogates
expect('\uD834abc'.codePointAt('')).toBe(0xD834);
expect('\uD834abc'.codePointAt('_')).toBe(0xD834);
expect('\uD834abc'.codePointAt()).toBe(0xD834);
expect('\uD834abc'.codePointAt(-1)).toBeUndefined();
expect('\uD834abc'.codePointAt(-0)).toBe(0xD834);
expect('\uD834abc'.codePointAt(0)).toBe(0xD834);
expect('\uD834abc'.codePointAt(false)).toBe(0xD834);
expect('\uD834abc'.codePointAt(NaN)).toBe(0xD834);
expect('\uD834abc'.codePointAt(null)).toBe(0xD834);
expect('\uD834abc'.codePointAt(undefined)).toBe(0xD834);

// Lone low surrogates
expect('\uDF06abc'.codePointAt('')).toBe(0xDF06);
expect('\uDF06abc'.codePointAt('_')).toBe(0xDF06);
expect('\uDF06abc'.codePointAt()).toBe(0xDF06);
expect('\uDF06abc'.codePointAt(-1)).toBeUndefined();
expect('\uDF06abc'.codePointAt(-0)).toBe(0xDF06);
expect('\uDF06abc'.codePointAt(0)).toBe(0xDF06);
expect('\uDF06abc'.codePointAt(false)).toBe(0xDF06);
expect('\uDF06abc'.codePointAt(NaN)).toBe(0xDF06);
expect('\uDF06abc'.codePointAt(null)).toBe(0xDF06);
expect('\uDF06abc'.codePointAt(undefined)).toBe(0xDF06);

expect(function() { String.prototype.codePointAt.call(undefined); }).toThrow(TypeError);
expect(function() { String.prototype.codePointAt.call(undefined, 4); }).toThrow(TypeError);
expect(function() { String.prototype.codePointAt.call(null); }).toThrow(TypeError);
expect(function() { String.prototype.codePointAt.call(null, 4); }).toThrow(TypeError);
expect(String.prototype.codePointAt.call(42, 0)).toBe(0x34);
expect(String.prototype.codePointAt.call(42, 1)).toBe(0x32);
expect(
  String.prototype.codePointAt.call({ 'toString': function() { return 'abc'; } }, 2)
).toBe(0x63);

expect(function() { String.prototype.codePointAt.apply(undefined); }).toThrow(TypeError);
expect(function() { String.prototype.codePointAt.apply(undefined, [4]); }).toThrow(TypeError);
expect(function() { String.prototype.codePointAt.apply(null); }).toThrow(TypeError);
expect(function() { String.prototype.codePointAt.apply(null, [4]); }).toThrow(TypeError);
expect(String.prototype.codePointAt.apply(42, [0])).toBe(0x34);
expect(String.prototype.codePointAt.apply(42, [1])).toBe(0x32);
expect(
  String.prototype.codePointAt.apply({ 'toString': function() { return 'abc'; } }, [2])
).toBe(0x63);
