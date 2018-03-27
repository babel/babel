// Tests taken from https://mths.be/endswith

expect(String.prototype.endsWith).toHaveLength(1);

expect('undefined'.endsWith()).toBe(true);
expect('undefined'.endsWith(undefined)).toBe(true);
expect('undefined'.endsWith(null)).toBe(false);
expect('null'.endsWith()).toBe(false);
expect('null'.endsWith(undefined)).toBe(false);
expect('null'.endsWith(null)).toBe(true);

expect('abc'.endsWith()).toBe(false);
expect('abc'.endsWith('')).toBe(true);
expect('abc'.endsWith('\0')).toBe(false);
expect('abc'.endsWith('c')).toBe(true);
expect('abc'.endsWith('b')).toBe(false);
expect('abc'.endsWith('ab')).toBe(false);
expect('abc'.endsWith('bc')).toBe(true);
expect('abc'.endsWith('abc')).toBe(true);
expect('abc'.endsWith('bcd')).toBe(false);
expect('abc'.endsWith('abcd')).toBe(false);
expect('abc'.endsWith('bcde')).toBe(false);

expect('abc'.endsWith('', NaN)).toBe(true);
expect('abc'.endsWith('\0', NaN)).toBe(false);
expect('abc'.endsWith('c', NaN)).toBe(false);
expect('abc'.endsWith('b', NaN)).toBe(false);
expect('abc'.endsWith('ab', NaN)).toBe(false);
expect('abc'.endsWith('bc', NaN)).toBe(false);
expect('abc'.endsWith('abc', NaN)).toBe(false);
expect('abc'.endsWith('bcd', NaN)).toBe(false);
expect('abc'.endsWith('abcd', NaN)).toBe(false);
expect('abc'.endsWith('bcde', NaN)).toBe(false);

expect('abc'.endsWith('', false)).toBe(true);
expect('abc'.endsWith('\0', false)).toBe(false);
expect('abc'.endsWith('c', false)).toBe(false);
expect('abc'.endsWith('b', false)).toBe(false);
expect('abc'.endsWith('ab', false)).toBe(false);
expect('abc'.endsWith('bc', false)).toBe(false);
expect('abc'.endsWith('abc', false)).toBe(false);
expect('abc'.endsWith('bcd', false)).toBe(false);
expect('abc'.endsWith('abcd', false)).toBe(false);
expect('abc'.endsWith('bcde', false)).toBe(false);

expect('abc'.endsWith('', undefined)).toBe(true);
expect('abc'.endsWith('\0', undefined)).toBe(false);
expect('abc'.endsWith('c', undefined)).toBe(true);
expect('abc'.endsWith('b', undefined)).toBe(false);
expect('abc'.endsWith('ab', undefined)).toBe(false);
expect('abc'.endsWith('bc', undefined)).toBe(true);
expect('abc'.endsWith('abc', undefined)).toBe(true);
expect('abc'.endsWith('bcd', undefined)).toBe(false);
expect('abc'.endsWith('abcd', undefined)).toBe(false);
expect('abc'.endsWith('bcde', undefined)).toBe(false);

expect('abc'.endsWith('', null)).toBe(true);
expect('abc'.endsWith('\0', null)).toBe(false);
expect('abc'.endsWith('c', null)).toBe(false);
expect('abc'.endsWith('b', null)).toBe(false);
expect('abc'.endsWith('ab', null)).toBe(false);
expect('abc'.endsWith('bc', null)).toBe(false);
expect('abc'.endsWith('abc', null)).toBe(false);
expect('abc'.endsWith('bcd', null)).toBe(false);
expect('abc'.endsWith('abcd', null)).toBe(false);
expect('abc'.endsWith('bcde', null)).toBe(false);

expect('abc'.endsWith('', -Infinity)).toBe(true);
expect('abc'.endsWith('\0', -Infinity)).toBe(false);
expect('abc'.endsWith('c', -Infinity)).toBe(false);
expect('abc'.endsWith('b', -Infinity)).toBe(false);
expect('abc'.endsWith('ab', -Infinity)).toBe(false);
expect('abc'.endsWith('bc', -Infinity)).toBe(false);
expect('abc'.endsWith('abc', -Infinity)).toBe(false);
expect('abc'.endsWith('bcd', -Infinity)).toBe(false);
expect('abc'.endsWith('abcd', -Infinity)).toBe(false);
expect('abc'.endsWith('bcde', -Infinity)).toBe(false);

expect('abc'.endsWith('', -1)).toBe(true);
expect('abc'.endsWith('\0', -1)).toBe(false);
expect('abc'.endsWith('c', -1)).toBe(false);
expect('abc'.endsWith('b', -1)).toBe(false);
expect('abc'.endsWith('ab', -1)).toBe(false);
expect('abc'.endsWith('bc', -1)).toBe(false);
expect('abc'.endsWith('abc', -1)).toBe(false);
expect('abc'.endsWith('bcd', -1)).toBe(false);
expect('abc'.endsWith('abcd', -1)).toBe(false);
expect('abc'.endsWith('bcde', -1)).toBe(false);

expect('abc'.endsWith('', -0)).toBe(true);
expect('abc'.endsWith('\0', -0)).toBe(false);
expect('abc'.endsWith('c', -0)).toBe(false);
expect('abc'.endsWith('b', -0)).toBe(false);
expect('abc'.endsWith('ab', -0)).toBe(false);
expect('abc'.endsWith('bc', -0)).toBe(false);
expect('abc'.endsWith('abc', -0)).toBe(false);
expect('abc'.endsWith('bcd', -0)).toBe(false);
expect('abc'.endsWith('abcd', -0)).toBe(false);
expect('abc'.endsWith('bcde', -0)).toBe(false);

expect('abc'.endsWith('', +0)).toBe(true);
expect('abc'.endsWith('\0', +0)).toBe(false);
expect('abc'.endsWith('c', +0)).toBe(false);
expect('abc'.endsWith('b', +0)).toBe(false);
expect('abc'.endsWith('ab', +0)).toBe(false);
expect('abc'.endsWith('bc', +0)).toBe(false);
expect('abc'.endsWith('abc', +0)).toBe(false);
expect('abc'.endsWith('bcd', +0)).toBe(false);
expect('abc'.endsWith('abcd', +0)).toBe(false);
expect('abc'.endsWith('bcde', +0)).toBe(false);

expect('abc'.endsWith('', 1)).toBe(true);
expect('abc'.endsWith('\0', 1)).toBe(false);
expect('abc'.endsWith('c', 1)).toBe(false);
expect('abc'.endsWith('b', 1)).toBe(false);
expect('abc'.endsWith('ab', 1)).toBe(false);
expect('abc'.endsWith('bc', 1)).toBe(false);
expect('abc'.endsWith('abc', 1)).toBe(false);
expect('abc'.endsWith('bcd', 1)).toBe(false);
expect('abc'.endsWith('abcd', 1)).toBe(false);
expect('abc'.endsWith('bcde', 1)).toBe(false);

expect('abc'.endsWith('', 2)).toBe(true);
expect('abc'.endsWith('\0', 2)).toBe(false);
expect('abc'.endsWith('c', 2)).toBe(false);
expect('abc'.endsWith('b', 2)).toBe(true);
expect('abc'.endsWith('ab', 2)).toBe(true);
expect('abc'.endsWith('bc', 2)).toBe(false);
expect('abc'.endsWith('abc', 2)).toBe(false);
expect('abc'.endsWith('bcd', 2)).toBe(false);
expect('abc'.endsWith('abcd', 2)).toBe(false);
expect('abc'.endsWith('bcde', 2)).toBe(false);

expect('abc'.endsWith('', +Infinity)).toBe(true);
expect('abc'.endsWith('\0', +Infinity)).toBe(false);
expect('abc'.endsWith('c', +Infinity)).toBe(true);
expect('abc'.endsWith('b', +Infinity)).toBe(false);
expect('abc'.endsWith('ab', +Infinity)).toBe(false);
expect('abc'.endsWith('bc', +Infinity)).toBe(true);
expect('abc'.endsWith('abc', +Infinity)).toBe(true);
expect('abc'.endsWith('bcd', +Infinity)).toBe(false);
expect('abc'.endsWith('abcd', +Infinity)).toBe(false);
expect('abc'.endsWith('bcde', +Infinity)).toBe(false);

expect('abc'.endsWith('', true)).toBe(true);
expect('abc'.endsWith('\0', true)).toBe(false);
expect('abc'.endsWith('c', true)).toBe(false);
expect('abc'.endsWith('b', true)).toBe(false);
expect('abc'.endsWith('ab', true)).toBe(false);
expect('abc'.endsWith('bc', true)).toBe(false);
expect('abc'.endsWith('abc', true)).toBe(false);
expect('abc'.endsWith('bcd', true)).toBe(false);
expect('abc'.endsWith('abcd', true)).toBe(false);
expect('abc'.endsWith('bcde', true)).toBe(false);

expect('abc'.endsWith('', 'x')).toBe(true);
expect('abc'.endsWith('\0', 'x')).toBe(false);
expect('abc'.endsWith('c', 'x')).toBe(false);
expect('abc'.endsWith('b', 'x')).toBe(false);
expect('abc'.endsWith('ab', 'x')).toBe(false);
expect('abc'.endsWith('bc', 'x')).toBe(false);
expect('abc'.endsWith('abc', 'x')).toBe(false);
expect('abc'.endsWith('bcd', 'x')).toBe(false);
expect('abc'.endsWith('abcd', 'x')).toBe(false);
expect('abc'.endsWith('bcde', 'x')).toBe(false);

expect('[a-z]+(bar)?'.endsWith('(bar)?')).toBe(true);
expect(function() { '[a-z]+(bar)?'.endsWith(/(bar)?/); }).toThrow(TypeError);
expect('[a-z]+(bar)?'.endsWith('[a-z]+', 6)).toBe(true);
expect(function() { '[a-z]+(bar)?'.endsWith(/(bar)?/); }).toThrow(TypeError);
expect(function() { '[a-z]+/(bar)?/'.endsWith(/(bar)?/); }).toThrow(TypeError);

// https://mathiasbynens.be/notes/javascript-unicode#poo-test
var string = 'I\xF1t\xEBrn\xE2ti\xF4n\xE0liz\xE6ti\xF8n\u2603\uD83D\uDCA9';
expect(string.endsWith('')).toBe(true);
expect(string.endsWith('\xF1t\xEBr')).toBe(false);
expect(string.endsWith('\xF1t\xEBr', 5)).toBe(true);
expect(string.endsWith('\xE0liz\xE6')).toBe(false);
expect(string.endsWith('\xE0liz\xE6', 16)).toBe(true);
expect(string.endsWith('\xF8n\u2603\uD83D\uDCA9')).toBe(true);
expect(string.endsWith('\xF8n\u2603\uD83D\uDCA9', 23)).toBe(true);
expect(string.endsWith('\u2603')).toBe(false);
expect(string.endsWith('\u2603', 21)).toBe(true);
expect(string.endsWith('\uD83D\uDCA9')).toBe(true);
expect(string.endsWith('\uD83D\uDCA9', 23)).toBe(true);

expect(function() { String.prototype.endsWith.call(undefined); }).toThrow(TypeError);
expect(function() { String.prototype.endsWith.call(undefined, 'b'); }).toThrow(TypeError);
expect(function() { String.prototype.endsWith.call(undefined, 'b', 4); }).toThrow(TypeError);
expect(function() { String.prototype.endsWith.call(null); }).toThrow(TypeError);
expect(function() { String.prototype.endsWith.call(null, 'b'); }).toThrow(TypeError);
expect(function() { String.prototype.endsWith.call(null, 'b', 4); }).toThrow(TypeError);
expect(String.prototype.endsWith.call(42, '2')).toBe(true);
expect(String.prototype.endsWith.call(42, '4')).toBe(false);
expect(String.prototype.endsWith.call(42, 'b', 4)).toBe(false);
expect(String.prototype.endsWith.call(42, '2', 1)).toBe(false);
expect(String.prototype.endsWith.call(42, '2', 4)).toBe(true);
expect(
  String.prototype.endsWith.call({ 'toString': function() { return 'abc'; } }, 'b', 0)
).toBe(false);
expect(
  String.prototype.endsWith.call({ 'toString': function() { return 'abc'; } }, 'b', 1)
).toBe(false);
expect(
  String.prototype.endsWith.call({ 'toString': function() { return 'abc'; } }, 'b', 2)
).toBe(true);
expect(function() { String.prototype.endsWith.call({ 'toString': function() { throw RangeError(); } }, /./); }).toThrow(RangeError);

expect(function() { String.prototype.endsWith.apply(undefined); }).toThrow(TypeError);
expect(function() { String.prototype.endsWith.apply(undefined, ['b']); }).toThrow(TypeError);
expect(function() { String.prototype.endsWith.apply(undefined, ['b', 4]); }).toThrow(TypeError);
expect(function() { String.prototype.endsWith.apply(null); }).toThrow(TypeError);
expect(function() { String.prototype.endsWith.apply(null, ['b']); }).toThrow(TypeError);
expect(function() { String.prototype.endsWith.apply(null, ['b', 4]); }).toThrow(TypeError);
expect(String.prototype.endsWith.apply(42, ['2'])).toBe(true);
expect(String.prototype.endsWith.apply(42, ['4'])).toBe(false);
expect(String.prototype.endsWith.apply(42, ['b', 4])).toBe(false);
expect(String.prototype.endsWith.apply(42, ['2', 1])).toBe(false);
expect(String.prototype.endsWith.apply(42, ['2', 4])).toBe(true);
expect(
  String.prototype.endsWith.apply({ 'toString': function() { return 'abc'; } }, ['b', 0])
).toBe(false);
expect(
  String.prototype.endsWith.apply({ 'toString': function() { return 'abc'; } }, ['b', 1])
).toBe(false);
expect(
  String.prototype.endsWith.apply({ 'toString': function() { return 'abc'; } }, ['b', 2])
).toBe(true);
expect(function() { String.prototype.endsWith.apply({ 'toString': function() { throw RangeError(); } }, [/./]); }).toThrow(RangeError);
