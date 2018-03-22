// Tests taken from https://mths.be/includes

expect(String.prototype.includes).toHaveLength(1);
expect(String.prototype.propertyIsEnumerable('includes')).toBe(false);

expect('abc'.includes()).toBe(false);
expect('aundefinedb'.includes()).toBe(true);
expect('abc'.includes(undefined)).toBe(false);
expect('aundefinedb'.includes(undefined)).toBe(true);
expect('abc'.includes(null)).toBe(false);
expect('anullb'.includes(null)).toBe(true);
expect('abc'.includes(false)).toBe(false);
expect('afalseb'.includes(false)).toBe(true);
expect('abc'.includes(NaN)).toBe(false);
expect('aNaNb'.includes(NaN)).toBe(true);
expect('abc'.includes('abc')).toBe(true);
expect('abc'.includes('def')).toBe(false);
expect('abc'.includes('')).toBe(true);
expect(''.includes('')).toBe(true);

expect('abc'.includes('b', -Infinity)).toBe(true);
expect('abc'.includes('b', -1)).toBe(true);
expect('abc'.includes('b', -0)).toBe(true);
expect('abc'.includes('b', +0)).toBe(true);
expect('abc'.includes('b', NaN)).toBe(true);
expect('abc'.includes('b', 'x')).toBe(true);
expect('abc'.includes('b', false)).toBe(true);
expect('abc'.includes('b', undefined)).toBe(true);
expect('abc'.includes('b', null)).toBe(true);
expect('abc'.includes('b', 1)).toBe(true);
expect('abc'.includes('b', 2)).toBe(false);
expect('abc'.includes('b', 3)).toBe(false);
expect('abc'.includes('b', 4)).toBe(false);
expect('abc'.includes('b', +Infinity)).toBe(false);
expect('abc'.includes('bc')).toBe(true);
expect('abc'.includes('bc\0')).toBe(false);

expect('abc123def'.includes(1, -Infinity)).toBe(true);
expect('abc123def'.includes(1, -1)).toBe(true);
expect('abc123def'.includes(1, -0)).toBe(true);
expect('abc123def'.includes(1, +0)).toBe(true);
expect('abc123def'.includes(1, NaN)).toBe(true);
expect('abc123def'.includes(1, 'x')).toBe(true);
expect('abc123def'.includes(1, false)).toBe(true);
expect('abc123def'.includes(1, undefined)).toBe(true);
expect('abc123def'.includes(1, null)).toBe(true);
expect('abc123def'.includes(1, 1)).toBe(true);
expect('abc123def'.includes(1, 2)).toBe(true);
expect('abc123def'.includes(1, 3)).toBe(true);
expect('abc123def'.includes(1, 4)).toBe(false);
expect('abc123def'.includes(1, 5)).toBe(false);
expect('abc123def'.includes(1, +Infinity)).toBe(false);

expect('abc123def'.includes(9, -Infinity)).toBe(false);
expect('abc123def'.includes(9, -1)).toBe(false);
expect('abc123def'.includes(9, -0)).toBe(false);
expect('abc123def'.includes(9, +0)).toBe(false);
expect('abc123def'.includes(9, NaN)).toBe(false);
expect('abc123def'.includes(9, 'x')).toBe(false);
expect('abc123def'.includes(9, false)).toBe(false);
expect('abc123def'.includes(9, undefined)).toBe(false);
expect('abc123def'.includes(9, null)).toBe(false);
expect('abc123def'.includes(9, 1)).toBe(false);
expect('abc123def'.includes(9, 2)).toBe(false);
expect('abc123def'.includes(9, 3)).toBe(false);
expect('abc123def'.includes(9, 4)).toBe(false);
expect('abc123def'.includes(9, 5)).toBe(false);
expect('abc123def'.includes(9, +Infinity)).toBe(false);

expect('foo[a-z]+(bar)?'.includes('[a-z]+')).toBe(true);
expect(function() { 'foo[a-z]+(bar)?'.includes(/[a-z]+/); }).toThrow(TypeError);
expect(function() { 'foo/[a-z]+/(bar)?'.includes(/[a-z]+/); }).toThrow(TypeError);
expect('foo[a-z]+(bar)?'.includes('(bar)?')).toBe(true);
expect(function() { 'foo[a-z]+(bar)?'.includes(/(bar)?/); }).toThrow(TypeError);
expect(function() { 'foo[a-z]+/(bar)?/'.includes(/(bar)?/); }).toThrow(TypeError);

// https://mathiasbynens.be/notes/javascript-unicode#poo-test
var string = 'I\xF1t\xEBrn\xE2ti\xF4n\xE0liz\xE6ti\xF8n\u2603\uD83D\uDCA9';
expect(string.includes('')).toBe(true);
expect(string.includes('\xF1t\xEBr')).toBe(true);
expect(string.includes('\xE0liz\xE6')).toBe(true);
expect(string.includes('\xF8n\u2603\uD83D\uDCA9')).toBe(true);
expect(string.includes('\u2603')).toBe(true);
expect(string.includes('\uD83D\uDCA9')).toBe(true);

expect(function() { String.prototype.includes.call(undefined); }).toThrow(TypeError);
expect(function() { String.prototype.includes.call(undefined, 'b'); }).toThrow(TypeError);
expect(function() { String.prototype.includes.call(undefined, 'b', 4); }).toThrow(TypeError);
expect(function() { String.prototype.includes.call(null); }).toThrow(TypeError);
expect(function() { String.prototype.includes.call(null, 'b'); }).toThrow(TypeError);
expect(function() { String.prototype.includes.call(null, 'b', 4); }).toThrow(TypeError);
expect(String.prototype.includes.call(42, '2')).toBe(true);
expect(String.prototype.includes.call(42, 'b', 4)).toBe(false);
expect(String.prototype.includes.call(42, '2', 4)).toBe(false);
expect(
  String.prototype.includes.call({ 'toString': function() { return 'abc'; } }, 'b', 0)
).toBe(true);
expect(
  String.prototype.includes.call({ 'toString': function() { return 'abc'; } }, 'b', 1)
).toBe(true);
expect(
  String.prototype.includes.call({ 'toString': function() { return 'abc'; } }, 'b', 2)
).toBe(false);
expect(function() { String.prototype.includes.call({ 'toString': function() { throw RangeError(); } }, /./); }).toThrow(RangeError);
expect(function() { String.prototype.includes.call({ 'toString': function() { return 'abc'; } }, /./); }).toThrow(TypeError);

expect(function() { String.prototype.includes.apply(undefined); }).toThrow(TypeError);
expect(function() { String.prototype.includes.apply(undefined, ['b']); }).toThrow(TypeError);
expect(function() { String.prototype.includes.apply(undefined, ['b', 4]); }).toThrow(TypeError);
expect(function() { String.prototype.includes.apply(null); }).toThrow(TypeError);
expect(function() { String.prototype.includes.apply(null, ['b']); }).toThrow(TypeError);
expect(function() { String.prototype.includes.apply(null, ['b', 4]); }).toThrow(TypeError);
expect(String.prototype.includes.apply(42, ['2'])).toBe(true);
expect(String.prototype.includes.apply(42, ['b', 4])).toBe(false);
expect(String.prototype.includes.apply(42, ['2', 4])).toBe(false);
expect(
  String.prototype.includes.apply({ 'toString': function() { return 'abc'; } }, ['b', 0])
).toBe(true);
expect(
  String.prototype.includes.apply({ 'toString': function() { return 'abc'; } }, ['b', 1])
).toBe(true);
expect(
  String.prototype.includes.apply({ 'toString': function() { return 'abc'; } }, ['b', 2])
).toBe(false);
expect(function() { String.prototype.includes.apply({ 'toString': function() { throw RangeError(); } }, [/./]); }).toThrow(RangeError);
expect(function() { String.prototype.includes.apply({ 'toString': function() { return 'abc'; } }, [/./]); }).toThrow(TypeError);
