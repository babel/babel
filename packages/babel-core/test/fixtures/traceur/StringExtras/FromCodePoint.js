// Tests taken from https://mths.be/fromcodepoint

assert.equal(String.fromCodePoint.length, 1);

assert.equal(String.fromCodePoint(''), '\0');
assert.equal(String.fromCodePoint(), '');
assert.equal(String.fromCodePoint(-0), '\0');
assert.equal(String.fromCodePoint(0), '\0');
assert.equal(String.fromCodePoint(0x1D306), '\uD834\uDF06');
assert.equal(String.fromCodePoint(0x1D306, 0x61, 0x1D307), '\uD834\uDF06a\uD834\uDF07');
assert.equal(String.fromCodePoint(0x61, 0x62, 0x1D307), 'ab\uD834\uDF07');
assert.equal(String.fromCodePoint(false), '\0');
assert.equal(String.fromCodePoint(null), '\0');

assert.throw(function() { String.fromCodePoint('_'); }, RangeError);
assert.throw(function() { String.fromCodePoint('+Infinity'); }, RangeError);
assert.throw(function() { String.fromCodePoint('-Infinity'); }, RangeError);
assert.throw(function() { String.fromCodePoint(-1); }, RangeError);
assert.throw(function() { String.fromCodePoint(0x10FFFF + 1); }, RangeError);
assert.throw(function() { String.fromCodePoint(3.14); }, RangeError);
assert.throw(function() { String.fromCodePoint(3e-2); }, RangeError);
assert.throw(function() { String.fromCodePoint(Infinity); }, RangeError);
assert.throw(function() { String.fromCodePoint(NaN); }, RangeError);
assert.throw(function() { String.fromCodePoint(undefined); }, RangeError);
assert.throw(function() { String.fromCodePoint({}); }, RangeError);
