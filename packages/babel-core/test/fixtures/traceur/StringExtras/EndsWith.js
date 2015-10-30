// Tests taken from https://mths.be/endswith

assert.equal(String.prototype.endsWith.length, 1);

assert.equal('undefined'.endsWith(), true);
assert.equal('undefined'.endsWith(undefined), true);
assert.equal('undefined'.endsWith(null), false);
assert.equal('null'.endsWith(), false);
assert.equal('null'.endsWith(undefined), false);
assert.equal('null'.endsWith(null), true);

assert.equal('abc'.endsWith(), false);
assert.equal('abc'.endsWith(''), true);
assert.equal('abc'.endsWith('\0'), false);
assert.equal('abc'.endsWith('c'), true);
assert.equal('abc'.endsWith('b'), false);
assert.equal('abc'.endsWith('ab'), false);
assert.equal('abc'.endsWith('bc'), true);
assert.equal('abc'.endsWith('abc'), true);
assert.equal('abc'.endsWith('bcd'), false);
assert.equal('abc'.endsWith('abcd'), false);
assert.equal('abc'.endsWith('bcde'), false);

assert.equal('abc'.endsWith('', NaN), true);
assert.equal('abc'.endsWith('\0', NaN), false);
assert.equal('abc'.endsWith('c', NaN), false);
assert.equal('abc'.endsWith('b', NaN), false);
assert.equal('abc'.endsWith('ab', NaN), false);
assert.equal('abc'.endsWith('bc', NaN), false);
assert.equal('abc'.endsWith('abc', NaN), false);
assert.equal('abc'.endsWith('bcd', NaN), false);
assert.equal('abc'.endsWith('abcd', NaN), false);
assert.equal('abc'.endsWith('bcde', NaN), false);

assert.equal('abc'.endsWith('', false), true);
assert.equal('abc'.endsWith('\0', false), false);
assert.equal('abc'.endsWith('c', false), false);
assert.equal('abc'.endsWith('b', false), false);
assert.equal('abc'.endsWith('ab', false), false);
assert.equal('abc'.endsWith('bc', false), false);
assert.equal('abc'.endsWith('abc', false), false);
assert.equal('abc'.endsWith('bcd', false), false);
assert.equal('abc'.endsWith('abcd', false), false);
assert.equal('abc'.endsWith('bcde', false), false);

assert.equal('abc'.endsWith('', undefined), true);
assert.equal('abc'.endsWith('\0', undefined), false);
assert.equal('abc'.endsWith('c', undefined), true);
assert.equal('abc'.endsWith('b', undefined), false);
assert.equal('abc'.endsWith('ab', undefined), false);
assert.equal('abc'.endsWith('bc', undefined), true);
assert.equal('abc'.endsWith('abc', undefined), true);
assert.equal('abc'.endsWith('bcd', undefined), false);
assert.equal('abc'.endsWith('abcd', undefined), false);
assert.equal('abc'.endsWith('bcde', undefined), false);

assert.equal('abc'.endsWith('', null), true);
assert.equal('abc'.endsWith('\0', null), false);
assert.equal('abc'.endsWith('c', null), false);
assert.equal('abc'.endsWith('b', null), false);
assert.equal('abc'.endsWith('ab', null), false);
assert.equal('abc'.endsWith('bc', null), false);
assert.equal('abc'.endsWith('abc', null), false);
assert.equal('abc'.endsWith('bcd', null), false);
assert.equal('abc'.endsWith('abcd', null), false);
assert.equal('abc'.endsWith('bcde', null), false);

assert.equal('abc'.endsWith('', -Infinity), true);
assert.equal('abc'.endsWith('\0', -Infinity), false);
assert.equal('abc'.endsWith('c', -Infinity), false);
assert.equal('abc'.endsWith('b', -Infinity), false);
assert.equal('abc'.endsWith('ab', -Infinity), false);
assert.equal('abc'.endsWith('bc', -Infinity), false);
assert.equal('abc'.endsWith('abc', -Infinity), false);
assert.equal('abc'.endsWith('bcd', -Infinity), false);
assert.equal('abc'.endsWith('abcd', -Infinity), false);
assert.equal('abc'.endsWith('bcde', -Infinity), false);

assert.equal('abc'.endsWith('', -1), true);
assert.equal('abc'.endsWith('\0', -1), false);
assert.equal('abc'.endsWith('c', -1), false);
assert.equal('abc'.endsWith('b', -1), false);
assert.equal('abc'.endsWith('ab', -1), false);
assert.equal('abc'.endsWith('bc', -1), false);
assert.equal('abc'.endsWith('abc', -1), false);
assert.equal('abc'.endsWith('bcd', -1), false);
assert.equal('abc'.endsWith('abcd', -1), false);
assert.equal('abc'.endsWith('bcde', -1), false);

assert.equal('abc'.endsWith('', -0), true);
assert.equal('abc'.endsWith('\0', -0), false);
assert.equal('abc'.endsWith('c', -0), false);
assert.equal('abc'.endsWith('b', -0), false);
assert.equal('abc'.endsWith('ab', -0), false);
assert.equal('abc'.endsWith('bc', -0), false);
assert.equal('abc'.endsWith('abc', -0), false);
assert.equal('abc'.endsWith('bcd', -0), false);
assert.equal('abc'.endsWith('abcd', -0), false);
assert.equal('abc'.endsWith('bcde', -0), false);

assert.equal('abc'.endsWith('', +0), true);
assert.equal('abc'.endsWith('\0', +0), false);
assert.equal('abc'.endsWith('c', +0), false);
assert.equal('abc'.endsWith('b', +0), false);
assert.equal('abc'.endsWith('ab', +0), false);
assert.equal('abc'.endsWith('bc', +0), false);
assert.equal('abc'.endsWith('abc', +0), false);
assert.equal('abc'.endsWith('bcd', +0), false);
assert.equal('abc'.endsWith('abcd', +0), false);
assert.equal('abc'.endsWith('bcde', +0), false);

assert.equal('abc'.endsWith('', 1), true);
assert.equal('abc'.endsWith('\0', 1), false);
assert.equal('abc'.endsWith('c', 1), false);
assert.equal('abc'.endsWith('b', 1), false);
assert.equal('abc'.endsWith('ab', 1), false);
assert.equal('abc'.endsWith('bc', 1), false);
assert.equal('abc'.endsWith('abc', 1), false);
assert.equal('abc'.endsWith('bcd', 1), false);
assert.equal('abc'.endsWith('abcd', 1), false);
assert.equal('abc'.endsWith('bcde', 1), false);

assert.equal('abc'.endsWith('', 2), true);
assert.equal('abc'.endsWith('\0', 2), false);
assert.equal('abc'.endsWith('c', 2), false);
assert.equal('abc'.endsWith('b', 2), true);
assert.equal('abc'.endsWith('ab', 2), true);
assert.equal('abc'.endsWith('bc', 2), false);
assert.equal('abc'.endsWith('abc', 2), false);
assert.equal('abc'.endsWith('bcd', 2), false);
assert.equal('abc'.endsWith('abcd', 2), false);
assert.equal('abc'.endsWith('bcde', 2), false);

assert.equal('abc'.endsWith('', +Infinity), true);
assert.equal('abc'.endsWith('\0', +Infinity), false);
assert.equal('abc'.endsWith('c', +Infinity), true);
assert.equal('abc'.endsWith('b', +Infinity), false);
assert.equal('abc'.endsWith('ab', +Infinity), false);
assert.equal('abc'.endsWith('bc', +Infinity), true);
assert.equal('abc'.endsWith('abc', +Infinity), true);
assert.equal('abc'.endsWith('bcd', +Infinity), false);
assert.equal('abc'.endsWith('abcd', +Infinity), false);
assert.equal('abc'.endsWith('bcde', +Infinity), false);

assert.equal('abc'.endsWith('', true), true);
assert.equal('abc'.endsWith('\0', true), false);
assert.equal('abc'.endsWith('c', true), false);
assert.equal('abc'.endsWith('b', true), false);
assert.equal('abc'.endsWith('ab', true), false);
assert.equal('abc'.endsWith('bc', true), false);
assert.equal('abc'.endsWith('abc', true), false);
assert.equal('abc'.endsWith('bcd', true), false);
assert.equal('abc'.endsWith('abcd', true), false);
assert.equal('abc'.endsWith('bcde', true), false);

assert.equal('abc'.endsWith('', 'x'), true);
assert.equal('abc'.endsWith('\0', 'x'), false);
assert.equal('abc'.endsWith('c', 'x'), false);
assert.equal('abc'.endsWith('b', 'x'), false);
assert.equal('abc'.endsWith('ab', 'x'), false);
assert.equal('abc'.endsWith('bc', 'x'), false);
assert.equal('abc'.endsWith('abc', 'x'), false);
assert.equal('abc'.endsWith('bcd', 'x'), false);
assert.equal('abc'.endsWith('abcd', 'x'), false);
assert.equal('abc'.endsWith('bcde', 'x'), false);

assert.equal('[a-z]+(bar)?'.endsWith('(bar)?'), true);
assert.throw(function() { '[a-z]+(bar)?'.endsWith(/(bar)?/); }, TypeError);
assert.equal('[a-z]+(bar)?'.endsWith('[a-z]+', 6), true);
assert.throw(function() { '[a-z]+(bar)?'.endsWith(/(bar)?/); }, TypeError);
assert.throw(function() { '[a-z]+/(bar)?/'.endsWith(/(bar)?/); }, TypeError);

// https://mathiasbynens.be/notes/javascript-unicode#poo-test
var string = 'I\xF1t\xEBrn\xE2ti\xF4n\xE0liz\xE6ti\xF8n\u2603\uD83D\uDCA9';
assert.equal(string.endsWith(''), true);
assert.equal(string.endsWith('\xF1t\xEBr'), false);
assert.equal(string.endsWith('\xF1t\xEBr', 5), true);
assert.equal(string.endsWith('\xE0liz\xE6'), false);
assert.equal(string.endsWith('\xE0liz\xE6', 16), true);
assert.equal(string.endsWith('\xF8n\u2603\uD83D\uDCA9'), true);
assert.equal(string.endsWith('\xF8n\u2603\uD83D\uDCA9', 23), true);
assert.equal(string.endsWith('\u2603'), false);
assert.equal(string.endsWith('\u2603', 21), true);
assert.equal(string.endsWith('\uD83D\uDCA9'), true);
assert.equal(string.endsWith('\uD83D\uDCA9', 23), true);

assert.throw(function() { String.prototype.endsWith.call(undefined); }, TypeError);
assert.throw(function() { String.prototype.endsWith.call(undefined, 'b'); }, TypeError);
assert.throw(function() { String.prototype.endsWith.call(undefined, 'b', 4); }, TypeError);
assert.throw(function() { String.prototype.endsWith.call(null); }, TypeError);
assert.throw(function() { String.prototype.endsWith.call(null, 'b'); }, TypeError);
assert.throw(function() { String.prototype.endsWith.call(null, 'b', 4); }, TypeError);
assert.equal(String.prototype.endsWith.call(42, '2'), true);
assert.equal(String.prototype.endsWith.call(42, '4'), false);
assert.equal(String.prototype.endsWith.call(42, 'b', 4), false);
assert.equal(String.prototype.endsWith.call(42, '2', 1), false);
assert.equal(String.prototype.endsWith.call(42, '2', 4), true);
assert.equal(String.prototype.endsWith.call({ 'toString': function() { return 'abc'; } }, 'b', 0), false);
assert.equal(String.prototype.endsWith.call({ 'toString': function() { return 'abc'; } }, 'b', 1), false);
assert.equal(String.prototype.endsWith.call({ 'toString': function() { return 'abc'; } }, 'b', 2), true);
assert.throw(function() { String.prototype.endsWith.call({ 'toString': function() { throw RangeError(); } }, /./); }, RangeError);

assert.throw(function() { String.prototype.endsWith.apply(undefined); }, TypeError);
assert.throw(function() { String.prototype.endsWith.apply(undefined, ['b']); }, TypeError);
assert.throw(function() { String.prototype.endsWith.apply(undefined, ['b', 4]); }, TypeError);
assert.throw(function() { String.prototype.endsWith.apply(null); }, TypeError);
assert.throw(function() { String.prototype.endsWith.apply(null, ['b']); }, TypeError);
assert.throw(function() { String.prototype.endsWith.apply(null, ['b', 4]); }, TypeError);
assert.equal(String.prototype.endsWith.apply(42, ['2']), true);
assert.equal(String.prototype.endsWith.apply(42, ['4']), false);
assert.equal(String.prototype.endsWith.apply(42, ['b', 4]), false);
assert.equal(String.prototype.endsWith.apply(42, ['2', 1]), false);
assert.equal(String.prototype.endsWith.apply(42, ['2', 4]), true);
assert.equal(String.prototype.endsWith.apply({ 'toString': function() { return 'abc'; } }, ['b', 0]), false);
assert.equal(String.prototype.endsWith.apply({ 'toString': function() { return 'abc'; } }, ['b', 1]), false);
assert.equal(String.prototype.endsWith.apply({ 'toString': function() { return 'abc'; } }, ['b', 2]), true);
assert.throw(function() { String.prototype.endsWith.apply({ 'toString': function() { throw RangeError(); } }, [/./]); }, RangeError);
