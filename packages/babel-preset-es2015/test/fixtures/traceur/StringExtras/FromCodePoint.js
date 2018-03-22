// Tests taken from https://mths.be/fromcodepoint

expect(String.fromCodePoint).toHaveLength(1);

expect(String.fromCodePoint('')).toBe('\0');
expect(String.fromCodePoint()).toBe('');
expect(String.fromCodePoint(-0)).toBe('\0');
expect(String.fromCodePoint(0)).toBe('\0');
expect(String.fromCodePoint(0x1D306)).toBe('\uD834\uDF06');
expect(String.fromCodePoint(0x1D306, 0x61, 0x1D307)).toBe('\uD834\uDF06a\uD834\uDF07');
expect(String.fromCodePoint(0x61, 0x62, 0x1D307)).toBe('ab\uD834\uDF07');
expect(String.fromCodePoint(false)).toBe('\0');
expect(String.fromCodePoint(null)).toBe('\0');

expect(function() { String.fromCodePoint('_'); }).toThrow(RangeError);
expect(function() { String.fromCodePoint('+Infinity'); }).toThrow(RangeError);
expect(function() { String.fromCodePoint('-Infinity'); }).toThrow(RangeError);
expect(function() { String.fromCodePoint(-1); }).toThrow(RangeError);
expect(function() { String.fromCodePoint(0x10FFFF + 1); }).toThrow(RangeError);
expect(function() { String.fromCodePoint(3.14); }).toThrow(RangeError);
expect(function() { String.fromCodePoint(3e-2); }).toThrow(RangeError);
expect(function() { String.fromCodePoint(Infinity); }).toThrow(RangeError);
expect(function() { String.fromCodePoint(NaN); }).toThrow(RangeError);
expect(function() { String.fromCodePoint(undefined); }).toThrow(RangeError);
expect(function() { String.fromCodePoint({}); }).toThrow(RangeError);
