// Tests taken from https://mths.be/startswith

Object.prototype[1] = 2; // try to break `arguments[1]`

assert.equal(String.prototype.startsWith.length, 1);

assert.equal('undefined'.startsWith(), true);
assert.equal('undefined'.startsWith(undefined), true);
assert.equal('undefined'.startsWith(null), false);
assert.equal('null'.startsWith(), false);
assert.equal('null'.startsWith(undefined), false);
assert.equal('null'.startsWith(null), true);

assert.equal('abc'.startsWith(), false);
assert.equal('abc'.startsWith(''), true);
assert.equal('abc'.startsWith('\0'), false);
assert.equal('abc'.startsWith('a'), true);
assert.equal('abc'.startsWith('b'), false);
assert.equal('abc'.startsWith('ab'), true);
assert.equal('abc'.startsWith('bc'), false);
assert.equal('abc'.startsWith('abc'), true);
assert.equal('abc'.startsWith('bcd'), false);
assert.equal('abc'.startsWith('abcd'), false);
assert.equal('abc'.startsWith('bcde'), false);

assert.equal('abc'.startsWith('', NaN), true);
assert.equal('abc'.startsWith('\0', NaN), false);
assert.equal('abc'.startsWith('a', NaN), true);
assert.equal('abc'.startsWith('b', NaN), false);
assert.equal('abc'.startsWith('ab', NaN), true);
assert.equal('abc'.startsWith('bc', NaN), false);
assert.equal('abc'.startsWith('abc', NaN), true);
assert.equal('abc'.startsWith('bcd', NaN), false);
assert.equal('abc'.startsWith('abcd', NaN), false);
assert.equal('abc'.startsWith('bcde', NaN), false);

assert.equal('abc'.startsWith('', false), true);
assert.equal('abc'.startsWith('\0', false), false);
assert.equal('abc'.startsWith('a', false), true);
assert.equal('abc'.startsWith('b', false), false);
assert.equal('abc'.startsWith('ab', false), true);
assert.equal('abc'.startsWith('bc', false), false);
assert.equal('abc'.startsWith('abc', false), true);
assert.equal('abc'.startsWith('bcd', false), false);
assert.equal('abc'.startsWith('abcd', false), false);
assert.equal('abc'.startsWith('bcde', false), false);

assert.equal('abc'.startsWith('', undefined), true);
assert.equal('abc'.startsWith('\0', undefined), false);
assert.equal('abc'.startsWith('a', undefined), true);
assert.equal('abc'.startsWith('b', undefined), false);
assert.equal('abc'.startsWith('ab', undefined), true);
assert.equal('abc'.startsWith('bc', undefined), false);
assert.equal('abc'.startsWith('abc', undefined), true);
assert.equal('abc'.startsWith('bcd', undefined), false);
assert.equal('abc'.startsWith('abcd', undefined), false);
assert.equal('abc'.startsWith('bcde', undefined), false);

assert.equal('abc'.startsWith('', null), true);
assert.equal('abc'.startsWith('\0', null), false);
assert.equal('abc'.startsWith('a', null), true);
assert.equal('abc'.startsWith('b', null), false);
assert.equal('abc'.startsWith('ab', null), true);
assert.equal('abc'.startsWith('bc', null), false);
assert.equal('abc'.startsWith('abc', null), true);
assert.equal('abc'.startsWith('bcd', null), false);
assert.equal('abc'.startsWith('abcd', null), false);
assert.equal('abc'.startsWith('bcde', null), false);

assert.equal('abc'.startsWith('', -Infinity), true);
assert.equal('abc'.startsWith('\0', -Infinity), false);
assert.equal('abc'.startsWith('a', -Infinity), true);
assert.equal('abc'.startsWith('b', -Infinity), false);
assert.equal('abc'.startsWith('ab', -Infinity), true);
assert.equal('abc'.startsWith('bc', -Infinity), false);
assert.equal('abc'.startsWith('abc', -Infinity), true);
assert.equal('abc'.startsWith('bcd', -Infinity), false);
assert.equal('abc'.startsWith('abcd', -Infinity), false);
assert.equal('abc'.startsWith('bcde', -Infinity), false);

assert.equal('abc'.startsWith('', -1), true);
assert.equal('abc'.startsWith('\0', -1), false);
assert.equal('abc'.startsWith('a', -1), true);
assert.equal('abc'.startsWith('b', -1), false);
assert.equal('abc'.startsWith('ab', -1), true);
assert.equal('abc'.startsWith('bc', -1), false);
assert.equal('abc'.startsWith('abc', -1), true);
assert.equal('abc'.startsWith('bcd', -1), false);
assert.equal('abc'.startsWith('abcd', -1), false);
assert.equal('abc'.startsWith('bcde', -1), false);

assert.equal('abc'.startsWith('', -0), true);
assert.equal('abc'.startsWith('\0', -0), false);
assert.equal('abc'.startsWith('a', -0), true);
assert.equal('abc'.startsWith('b', -0), false);
assert.equal('abc'.startsWith('ab', -0), true);
assert.equal('abc'.startsWith('bc', -0), false);
assert.equal('abc'.startsWith('abc', -0), true);
assert.equal('abc'.startsWith('bcd', -0), false);
assert.equal('abc'.startsWith('abcd', -0), false);
assert.equal('abc'.startsWith('bcde', -0), false);

assert.equal('abc'.startsWith('', +0), true);
assert.equal('abc'.startsWith('\0', +0), false);
assert.equal('abc'.startsWith('a', +0), true);
assert.equal('abc'.startsWith('b', +0), false);
assert.equal('abc'.startsWith('ab', +0), true);
assert.equal('abc'.startsWith('bc', +0), false);
assert.equal('abc'.startsWith('abc', +0), true);
assert.equal('abc'.startsWith('bcd', +0), false);
assert.equal('abc'.startsWith('abcd', +0), false);
assert.equal('abc'.startsWith('bcde', +0), false);

assert.equal('abc'.startsWith('', 1), true);
assert.equal('abc'.startsWith('\0', 1), false);
assert.equal('abc'.startsWith('a', 1), false);
assert.equal('abc'.startsWith('b', 1), true);
assert.equal('abc'.startsWith('ab', 1), false);
assert.equal('abc'.startsWith('bc', 1), true);
assert.equal('abc'.startsWith('abc', 1), false);
assert.equal('abc'.startsWith('bcd', 1), false);
assert.equal('abc'.startsWith('abcd', 1), false);
assert.equal('abc'.startsWith('bcde', 1), false);

assert.equal('abc'.startsWith('', +Infinity), true);
assert.equal('abc'.startsWith('\0', +Infinity), false);
assert.equal('abc'.startsWith('a', +Infinity), false);
assert.equal('abc'.startsWith('b', +Infinity), false);
assert.equal('abc'.startsWith('ab', +Infinity), false);
assert.equal('abc'.startsWith('bc', +Infinity), false);
assert.equal('abc'.startsWith('abc', +Infinity), false);
assert.equal('abc'.startsWith('bcd', +Infinity), false);
assert.equal('abc'.startsWith('abcd', +Infinity), false);
assert.equal('abc'.startsWith('bcde', +Infinity), false);

assert.equal('abc'.startsWith('', true), true);
assert.equal('abc'.startsWith('\0', true), false);
assert.equal('abc'.startsWith('a', true), false);
assert.equal('abc'.startsWith('b', true), true);
assert.equal('abc'.startsWith('ab', true), false);
assert.equal('abc'.startsWith('bc', true), true);
assert.equal('abc'.startsWith('abc', true), false);
assert.equal('abc'.startsWith('bcd', true), false);
assert.equal('abc'.startsWith('abcd', true), false);
assert.equal('abc'.startsWith('bcde', true), false);

assert.equal('abc'.startsWith('', 'x'), true);
assert.equal('abc'.startsWith('\0', 'x'), false);
assert.equal('abc'.startsWith('a', 'x'), true);
assert.equal('abc'.startsWith('b', 'x'), false);
assert.equal('abc'.startsWith('ab', 'x'), true);
assert.equal('abc'.startsWith('bc', 'x'), false);
assert.equal('abc'.startsWith('abc', 'x'), true);
assert.equal('abc'.startsWith('bcd', 'x'), false);
assert.equal('abc'.startsWith('abcd', 'x'), false);
assert.equal('abc'.startsWith('bcde', 'x'), false);

assert.equal('[a-z]+(bar)?'.startsWith('[a-z]+'), true);
assert.throw(function() { '[a-z]+(bar)?'.startsWith(/[a-z]+/); }, TypeError);
assert.equal('[a-z]+(bar)?'.startsWith('(bar)?', 6), true);
assert.throw(function() { '[a-z]+(bar)?'.startsWith(/(bar)?/); }, TypeError);
assert.throw(function() { '[a-z]+/(bar)?/'.startsWith(/(bar)?/); }, TypeError);

// https://mathiasbynens.be/notes/javascript-unicode#poo-test
var string = 'I\xF1t\xEBrn\xE2ti\xF4n\xE0liz\xE6ti\xF8n\u2603\uD83D\uDCA9';
assert.equal(string.startsWith(''), true);
assert.equal(string.startsWith('\xF1t\xEBr'), false);
assert.equal(string.startsWith('\xF1t\xEBr', 1), true);
assert.equal(string.startsWith('\xE0liz\xE6'), false);
assert.equal(string.startsWith('\xE0liz\xE6', 11), true);
assert.equal(string.startsWith('\xF8n\u2603\uD83D\uDCA9'), false);
assert.equal(string.startsWith('\xF8n\u2603\uD83D\uDCA9', 18), true);
assert.equal(string.startsWith('\u2603'), false);
assert.equal(string.startsWith('\u2603', 20), true);
assert.equal(string.startsWith('\uD83D\uDCA9'), false);
assert.equal(string.startsWith('\uD83D\uDCA9', 21), true);

assert.throw(function() { String.prototype.startsWith.call(undefined); }, TypeError);
assert.throw(function() { String.prototype.startsWith.call(undefined, 'b'); }, TypeError);
assert.throw(function() { String.prototype.startsWith.call(undefined, 'b', 4); }, TypeError);
assert.throw(function() { String.prototype.startsWith.call(null); }, TypeError);
assert.throw(function() { String.prototype.startsWith.call(null, 'b'); }, TypeError);
assert.throw(function() { String.prototype.startsWith.call(null, 'b', 4); }, TypeError);
assert.equal(String.prototype.startsWith.call(42, '2'), false);
assert.equal(String.prototype.startsWith.call(42, '4'), true);
assert.equal(String.prototype.startsWith.call(42, 'b', 4), false);
assert.equal(String.prototype.startsWith.call(42, '2', 1), true);
assert.equal(String.prototype.startsWith.call(42, '2', 4), false);
assert.equal(String.prototype.startsWith.call({ 'toString': function() { return 'abc'; } }, 'b', 0), false);
assert.equal(String.prototype.startsWith.call({ 'toString': function() { return 'abc'; } }, 'b', 1), true);
assert.equal(String.prototype.startsWith.call({ 'toString': function() { return 'abc'; } }, 'b', 2), false);
assert.throw(function() { String.prototype.startsWith.call({ 'toString': function() { throw RangeError(); } }, /./); }, RangeError);

assert.throw(function() { String.prototype.startsWith.apply(undefined); }, TypeError);
assert.throw(function() { String.prototype.startsWith.apply(undefined, ['b']); }, TypeError);
assert.throw(function() { String.prototype.startsWith.apply(undefined, ['b', 4]); }, TypeError);
assert.throw(function() { String.prototype.startsWith.apply(null); }, TypeError);
assert.throw(function() { String.prototype.startsWith.apply(null, ['b']); }, TypeError);
assert.throw(function() { String.prototype.startsWith.apply(null, ['b', 4]); }, TypeError);
assert.equal(String.prototype.startsWith.apply(42, ['2']), false);
assert.equal(String.prototype.startsWith.apply(42, ['4']), true);
assert.equal(String.prototype.startsWith.apply(42, ['b', 4]), false);
assert.equal(String.prototype.startsWith.apply(42, ['2', 1]), true);
assert.equal(String.prototype.startsWith.apply(42, ['2', 4]), false);
assert.equal(String.prototype.startsWith.apply({ 'toString': function() { return 'abc'; } }, ['b', 0]), false);
assert.equal(String.prototype.startsWith.apply({ 'toString': function() { return 'abc'; } }, ['b', 1]), true);
assert.equal(String.prototype.startsWith.apply({ 'toString': function() { return 'abc'; } }, ['b', 2]), false);
assert.throw(function() { String.prototype.startsWith.apply({ 'toString': function() { throw RangeError(); } }, [/./]); }, RangeError);

delete Object.prototype[1];
