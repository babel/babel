// Tests taken from https://mths.be/startswith

Object.prototype[1] = 2; // try to break `arguments[1]`

expect(String.prototype.startsWith).toHaveLength(1);

expect('undefined'.startsWith()).toBe(true);
expect('undefined'.startsWith(undefined)).toBe(true);
expect('undefined'.startsWith(null)).toBe(false);
expect('null'.startsWith()).toBe(false);
expect('null'.startsWith(undefined)).toBe(false);
expect('null'.startsWith(null)).toBe(true);

expect('abc'.startsWith()).toBe(false);
expect('abc'.startsWith('')).toBe(true);
expect('abc'.startsWith('\0')).toBe(false);
expect('abc'.startsWith('a')).toBe(true);
expect('abc'.startsWith('b')).toBe(false);
expect('abc'.startsWith('ab')).toBe(true);
expect('abc'.startsWith('bc')).toBe(false);
expect('abc'.startsWith('abc')).toBe(true);
expect('abc'.startsWith('bcd')).toBe(false);
expect('abc'.startsWith('abcd')).toBe(false);
expect('abc'.startsWith('bcde')).toBe(false);

expect('abc'.startsWith('', NaN)).toBe(true);
expect('abc'.startsWith('\0', NaN)).toBe(false);
expect('abc'.startsWith('a', NaN)).toBe(true);
expect('abc'.startsWith('b', NaN)).toBe(false);
expect('abc'.startsWith('ab', NaN)).toBe(true);
expect('abc'.startsWith('bc', NaN)).toBe(false);
expect('abc'.startsWith('abc', NaN)).toBe(true);
expect('abc'.startsWith('bcd', NaN)).toBe(false);
expect('abc'.startsWith('abcd', NaN)).toBe(false);
expect('abc'.startsWith('bcde', NaN)).toBe(false);

expect('abc'.startsWith('', false)).toBe(true);
expect('abc'.startsWith('\0', false)).toBe(false);
expect('abc'.startsWith('a', false)).toBe(true);
expect('abc'.startsWith('b', false)).toBe(false);
expect('abc'.startsWith('ab', false)).toBe(true);
expect('abc'.startsWith('bc', false)).toBe(false);
expect('abc'.startsWith('abc', false)).toBe(true);
expect('abc'.startsWith('bcd', false)).toBe(false);
expect('abc'.startsWith('abcd', false)).toBe(false);
expect('abc'.startsWith('bcde', false)).toBe(false);

expect('abc'.startsWith('', undefined)).toBe(true);
expect('abc'.startsWith('\0', undefined)).toBe(false);
expect('abc'.startsWith('a', undefined)).toBe(true);
expect('abc'.startsWith('b', undefined)).toBe(false);
expect('abc'.startsWith('ab', undefined)).toBe(true);
expect('abc'.startsWith('bc', undefined)).toBe(false);
expect('abc'.startsWith('abc', undefined)).toBe(true);
expect('abc'.startsWith('bcd', undefined)).toBe(false);
expect('abc'.startsWith('abcd', undefined)).toBe(false);
expect('abc'.startsWith('bcde', undefined)).toBe(false);

expect('abc'.startsWith('', null)).toBe(true);
expect('abc'.startsWith('\0', null)).toBe(false);
expect('abc'.startsWith('a', null)).toBe(true);
expect('abc'.startsWith('b', null)).toBe(false);
expect('abc'.startsWith('ab', null)).toBe(true);
expect('abc'.startsWith('bc', null)).toBe(false);
expect('abc'.startsWith('abc', null)).toBe(true);
expect('abc'.startsWith('bcd', null)).toBe(false);
expect('abc'.startsWith('abcd', null)).toBe(false);
expect('abc'.startsWith('bcde', null)).toBe(false);

expect('abc'.startsWith('', -Infinity)).toBe(true);
expect('abc'.startsWith('\0', -Infinity)).toBe(false);
expect('abc'.startsWith('a', -Infinity)).toBe(true);
expect('abc'.startsWith('b', -Infinity)).toBe(false);
expect('abc'.startsWith('ab', -Infinity)).toBe(true);
expect('abc'.startsWith('bc', -Infinity)).toBe(false);
expect('abc'.startsWith('abc', -Infinity)).toBe(true);
expect('abc'.startsWith('bcd', -Infinity)).toBe(false);
expect('abc'.startsWith('abcd', -Infinity)).toBe(false);
expect('abc'.startsWith('bcde', -Infinity)).toBe(false);

expect('abc'.startsWith('', -1)).toBe(true);
expect('abc'.startsWith('\0', -1)).toBe(false);
expect('abc'.startsWith('a', -1)).toBe(true);
expect('abc'.startsWith('b', -1)).toBe(false);
expect('abc'.startsWith('ab', -1)).toBe(true);
expect('abc'.startsWith('bc', -1)).toBe(false);
expect('abc'.startsWith('abc', -1)).toBe(true);
expect('abc'.startsWith('bcd', -1)).toBe(false);
expect('abc'.startsWith('abcd', -1)).toBe(false);
expect('abc'.startsWith('bcde', -1)).toBe(false);

expect('abc'.startsWith('', -0)).toBe(true);
expect('abc'.startsWith('\0', -0)).toBe(false);
expect('abc'.startsWith('a', -0)).toBe(true);
expect('abc'.startsWith('b', -0)).toBe(false);
expect('abc'.startsWith('ab', -0)).toBe(true);
expect('abc'.startsWith('bc', -0)).toBe(false);
expect('abc'.startsWith('abc', -0)).toBe(true);
expect('abc'.startsWith('bcd', -0)).toBe(false);
expect('abc'.startsWith('abcd', -0)).toBe(false);
expect('abc'.startsWith('bcde', -0)).toBe(false);

expect('abc'.startsWith('', +0)).toBe(true);
expect('abc'.startsWith('\0', +0)).toBe(false);
expect('abc'.startsWith('a', +0)).toBe(true);
expect('abc'.startsWith('b', +0)).toBe(false);
expect('abc'.startsWith('ab', +0)).toBe(true);
expect('abc'.startsWith('bc', +0)).toBe(false);
expect('abc'.startsWith('abc', +0)).toBe(true);
expect('abc'.startsWith('bcd', +0)).toBe(false);
expect('abc'.startsWith('abcd', +0)).toBe(false);
expect('abc'.startsWith('bcde', +0)).toBe(false);

expect('abc'.startsWith('', 1)).toBe(true);
expect('abc'.startsWith('\0', 1)).toBe(false);
expect('abc'.startsWith('a', 1)).toBe(false);
expect('abc'.startsWith('b', 1)).toBe(true);
expect('abc'.startsWith('ab', 1)).toBe(false);
expect('abc'.startsWith('bc', 1)).toBe(true);
expect('abc'.startsWith('abc', 1)).toBe(false);
expect('abc'.startsWith('bcd', 1)).toBe(false);
expect('abc'.startsWith('abcd', 1)).toBe(false);
expect('abc'.startsWith('bcde', 1)).toBe(false);

expect('abc'.startsWith('', +Infinity)).toBe(true);
expect('abc'.startsWith('\0', +Infinity)).toBe(false);
expect('abc'.startsWith('a', +Infinity)).toBe(false);
expect('abc'.startsWith('b', +Infinity)).toBe(false);
expect('abc'.startsWith('ab', +Infinity)).toBe(false);
expect('abc'.startsWith('bc', +Infinity)).toBe(false);
expect('abc'.startsWith('abc', +Infinity)).toBe(false);
expect('abc'.startsWith('bcd', +Infinity)).toBe(false);
expect('abc'.startsWith('abcd', +Infinity)).toBe(false);
expect('abc'.startsWith('bcde', +Infinity)).toBe(false);

expect('abc'.startsWith('', true)).toBe(true);
expect('abc'.startsWith('\0', true)).toBe(false);
expect('abc'.startsWith('a', true)).toBe(false);
expect('abc'.startsWith('b', true)).toBe(true);
expect('abc'.startsWith('ab', true)).toBe(false);
expect('abc'.startsWith('bc', true)).toBe(true);
expect('abc'.startsWith('abc', true)).toBe(false);
expect('abc'.startsWith('bcd', true)).toBe(false);
expect('abc'.startsWith('abcd', true)).toBe(false);
expect('abc'.startsWith('bcde', true)).toBe(false);

expect('abc'.startsWith('', 'x')).toBe(true);
expect('abc'.startsWith('\0', 'x')).toBe(false);
expect('abc'.startsWith('a', 'x')).toBe(true);
expect('abc'.startsWith('b', 'x')).toBe(false);
expect('abc'.startsWith('ab', 'x')).toBe(true);
expect('abc'.startsWith('bc', 'x')).toBe(false);
expect('abc'.startsWith('abc', 'x')).toBe(true);
expect('abc'.startsWith('bcd', 'x')).toBe(false);
expect('abc'.startsWith('abcd', 'x')).toBe(false);
expect('abc'.startsWith('bcde', 'x')).toBe(false);

expect('[a-z]+(bar)?'.startsWith('[a-z]+')).toBe(true);
expect(function() { '[a-z]+(bar)?'.startsWith(/[a-z]+/); }).toThrow(TypeError);
expect('[a-z]+(bar)?'.startsWith('(bar)?', 6)).toBe(true);
expect(function() { '[a-z]+(bar)?'.startsWith(/(bar)?/); }).toThrow(TypeError);
expect(function() { '[a-z]+/(bar)?/'.startsWith(/(bar)?/); }).toThrow(TypeError);

// https://mathiasbynens.be/notes/javascript-unicode#poo-test
var string = 'I\xF1t\xEBrn\xE2ti\xF4n\xE0liz\xE6ti\xF8n\u2603\uD83D\uDCA9';
expect(string.startsWith('')).toBe(true);
expect(string.startsWith('\xF1t\xEBr')).toBe(false);
expect(string.startsWith('\xF1t\xEBr', 1)).toBe(true);
expect(string.startsWith('\xE0liz\xE6')).toBe(false);
expect(string.startsWith('\xE0liz\xE6', 11)).toBe(true);
expect(string.startsWith('\xF8n\u2603\uD83D\uDCA9')).toBe(false);
expect(string.startsWith('\xF8n\u2603\uD83D\uDCA9', 18)).toBe(true);
expect(string.startsWith('\u2603')).toBe(false);
expect(string.startsWith('\u2603', 20)).toBe(true);
expect(string.startsWith('\uD83D\uDCA9')).toBe(false);
expect(string.startsWith('\uD83D\uDCA9', 21)).toBe(true);

expect(function() { String.prototype.startsWith.call(undefined); }).toThrow(TypeError);
expect(function() { String.prototype.startsWith.call(undefined, 'b'); }).toThrow(TypeError);
expect(function() { String.prototype.startsWith.call(undefined, 'b', 4); }).toThrow(TypeError);
expect(function() { String.prototype.startsWith.call(null); }).toThrow(TypeError);
expect(function() { String.prototype.startsWith.call(null, 'b'); }).toThrow(TypeError);
expect(function() { String.prototype.startsWith.call(null, 'b', 4); }).toThrow(TypeError);
expect(String.prototype.startsWith.call(42, '2')).toBe(false);
expect(String.prototype.startsWith.call(42, '4')).toBe(true);
expect(String.prototype.startsWith.call(42, 'b', 4)).toBe(false);
expect(String.prototype.startsWith.call(42, '2', 1)).toBe(true);
expect(String.prototype.startsWith.call(42, '2', 4)).toBe(false);
expect(
  String.prototype.startsWith.call({ 'toString': function() { return 'abc'; } }, 'b', 0)
).toBe(false);
expect(
  String.prototype.startsWith.call({ 'toString': function() { return 'abc'; } }, 'b', 1)
).toBe(true);
expect(
  String.prototype.startsWith.call({ 'toString': function() { return 'abc'; } }, 'b', 2)
).toBe(false);
expect(function() { String.prototype.startsWith.call({ 'toString': function() { throw RangeError(); } }, /./); }).toThrow(RangeError);

expect(function() { String.prototype.startsWith.apply(undefined); }).toThrow(TypeError);
expect(function() { String.prototype.startsWith.apply(undefined, ['b']); }).toThrow(TypeError);
expect(function() { String.prototype.startsWith.apply(undefined, ['b', 4]); }).toThrow(TypeError);
expect(function() { String.prototype.startsWith.apply(null); }).toThrow(TypeError);
expect(function() { String.prototype.startsWith.apply(null, ['b']); }).toThrow(TypeError);
expect(function() { String.prototype.startsWith.apply(null, ['b', 4]); }).toThrow(TypeError);
expect(String.prototype.startsWith.apply(42, ['2'])).toBe(false);
expect(String.prototype.startsWith.apply(42, ['4'])).toBe(true);
expect(String.prototype.startsWith.apply(42, ['b', 4])).toBe(false);
expect(String.prototype.startsWith.apply(42, ['2', 1])).toBe(true);
expect(String.prototype.startsWith.apply(42, ['2', 4])).toBe(false);
expect(
  String.prototype.startsWith.apply({ 'toString': function() { return 'abc'; } }, ['b', 0])
).toBe(false);
expect(
  String.prototype.startsWith.apply({ 'toString': function() { return 'abc'; } }, ['b', 1])
).toBe(true);
expect(
  String.prototype.startsWith.apply({ 'toString': function() { return 'abc'; } }, ['b', 2])
).toBe(false);
expect(function() { String.prototype.startsWith.apply({ 'toString': function() { throw RangeError(); } }, [/./]); }).toThrow(RangeError);

delete Object.prototype[1];
