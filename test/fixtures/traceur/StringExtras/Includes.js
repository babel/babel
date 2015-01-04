// Tests taken from https://mths.be/includes

assert.equal(String.prototype.includes.length, 1);
assert.equal(String.prototype.propertyIsEnumerable('includes'), false);

assert.equal('abc'.includes(), false);
assert.equal('aundefinedb'.includes(), true);
assert.equal('abc'.includes(undefined), false);
assert.equal('aundefinedb'.includes(undefined), true);
assert.equal('abc'.includes(null), false);
assert.equal('anullb'.includes(null), true);
assert.equal('abc'.includes(false), false);
assert.equal('afalseb'.includes(false), true);
assert.equal('abc'.includes(NaN), false);
assert.equal('aNaNb'.includes(NaN), true);
assert.equal('abc'.includes('abc'), true);
assert.equal('abc'.includes('def'), false);
assert.equal('abc'.includes(''), true);
assert.equal(''.includes(''), true);

assert.equal('abc'.includes('b', -Infinity), true);
assert.equal('abc'.includes('b', -1), true);
assert.equal('abc'.includes('b', -0), true);
assert.equal('abc'.includes('b', +0), true);
assert.equal('abc'.includes('b', NaN), true);
assert.equal('abc'.includes('b', 'x'), true);
assert.equal('abc'.includes('b', false), true);
assert.equal('abc'.includes('b', undefined), true);
assert.equal('abc'.includes('b', null), true);
assert.equal('abc'.includes('b', 1), true);
assert.equal('abc'.includes('b', 2), false);
assert.equal('abc'.includes('b', 3), false);
assert.equal('abc'.includes('b', 4), false);
assert.equal('abc'.includes('b', +Infinity), false);
assert.equal('abc'.includes('bc'), true);
assert.equal('abc'.includes('bc\0'), false);

assert.equal('abc123def'.includes(1, -Infinity), true);
assert.equal('abc123def'.includes(1, -1), true);
assert.equal('abc123def'.includes(1, -0), true);
assert.equal('abc123def'.includes(1, +0), true);
assert.equal('abc123def'.includes(1, NaN), true);
assert.equal('abc123def'.includes(1, 'x'), true);
assert.equal('abc123def'.includes(1, false), true);
assert.equal('abc123def'.includes(1, undefined), true);
assert.equal('abc123def'.includes(1, null), true);
assert.equal('abc123def'.includes(1, 1), true);
assert.equal('abc123def'.includes(1, 2), true);
assert.equal('abc123def'.includes(1, 3), true);
assert.equal('abc123def'.includes(1, 4), false);
assert.equal('abc123def'.includes(1, 5), false);
assert.equal('abc123def'.includes(1, +Infinity), false);

assert.equal('abc123def'.includes(9, -Infinity), false);
assert.equal('abc123def'.includes(9, -1), false);
assert.equal('abc123def'.includes(9, -0), false);
assert.equal('abc123def'.includes(9, +0), false);
assert.equal('abc123def'.includes(9, NaN), false);
assert.equal('abc123def'.includes(9, 'x'), false);
assert.equal('abc123def'.includes(9, false), false);
assert.equal('abc123def'.includes(9, undefined), false);
assert.equal('abc123def'.includes(9, null), false);
assert.equal('abc123def'.includes(9, 1), false);
assert.equal('abc123def'.includes(9, 2), false);
assert.equal('abc123def'.includes(9, 3), false);
assert.equal('abc123def'.includes(9, 4), false);
assert.equal('abc123def'.includes(9, 5), false);
assert.equal('abc123def'.includes(9, +Infinity), false);

assert.equal('foo[a-z]+(bar)?'.includes('[a-z]+'), true);
assert.throw(function() { 'foo[a-z]+(bar)?'.includes(/[a-z]+/); }, TypeError);
assert.throw(function() { 'foo/[a-z]+/(bar)?'.includes(/[a-z]+/); }, TypeError);
assert.equal('foo[a-z]+(bar)?'.includes('(bar)?'), true);
assert.throw(function() { 'foo[a-z]+(bar)?'.includes(/(bar)?/); }, TypeError);
assert.throw(function() { 'foo[a-z]+/(bar)?/'.includes(/(bar)?/); }, TypeError);

// https://mathiasbynens.be/notes/javascript-unicode#poo-test
var string = 'I\xF1t\xEBrn\xE2ti\xF4n\xE0liz\xE6ti\xF8n\u2603\uD83D\uDCA9';
assert.equal(string.includes(''), true);
assert.equal(string.includes('\xF1t\xEBr'), true);
assert.equal(string.includes('\xE0liz\xE6'), true);
assert.equal(string.includes('\xF8n\u2603\uD83D\uDCA9'), true);
assert.equal(string.includes('\u2603'), true);
assert.equal(string.includes('\uD83D\uDCA9'), true);

assert.throw(function() { String.prototype.includes.call(undefined); }, TypeError);
assert.throw(function() { String.prototype.includes.call(undefined, 'b'); }, TypeError);
assert.throw(function() { String.prototype.includes.call(undefined, 'b', 4); }, TypeError);
assert.throw(function() { String.prototype.includes.call(null); }, TypeError);
assert.throw(function() { String.prototype.includes.call(null, 'b'); }, TypeError);
assert.throw(function() { String.prototype.includes.call(null, 'b', 4); }, TypeError);
assert.equal(String.prototype.includes.call(42, '2'), true);
assert.equal(String.prototype.includes.call(42, 'b', 4), false);
assert.equal(String.prototype.includes.call(42, '2', 4), false);
assert.equal(String.prototype.includes.call({ 'toString': function() { return 'abc'; } }, 'b', 0), true);
assert.equal(String.prototype.includes.call({ 'toString': function() { return 'abc'; } }, 'b', 1), true);
assert.equal(String.prototype.includes.call({ 'toString': function() { return 'abc'; } }, 'b', 2), false);
assert.throw(function() { String.prototype.includes.call({ 'toString': function() { throw RangeError(); } }, /./); }, RangeError);
assert.throw(function() { String.prototype.includes.call({ 'toString': function() { return 'abc'; } }, /./); }, TypeError);

assert.throw(function() { String.prototype.includes.apply(undefined); }, TypeError);
assert.throw(function() { String.prototype.includes.apply(undefined, ['b']); }, TypeError);
assert.throw(function() { String.prototype.includes.apply(undefined, ['b', 4]); }, TypeError);
assert.throw(function() { String.prototype.includes.apply(null); }, TypeError);
assert.throw(function() { String.prototype.includes.apply(null, ['b']); }, TypeError);
assert.throw(function() { String.prototype.includes.apply(null, ['b', 4]); }, TypeError);
assert.equal(String.prototype.includes.apply(42, ['2']), true);
assert.equal(String.prototype.includes.apply(42, ['b', 4]), false);
assert.equal(String.prototype.includes.apply(42, ['2', 4]), false);
assert.equal(String.prototype.includes.apply({ 'toString': function() { return 'abc'; } }, ['b', 0]), true);
assert.equal(String.prototype.includes.apply({ 'toString': function() { return 'abc'; } }, ['b', 1]), true);
assert.equal(String.prototype.includes.apply({ 'toString': function() { return 'abc'; } }, ['b', 2]), false);
assert.throw(function() { String.prototype.includes.apply({ 'toString': function() { throw RangeError(); } }, [/./]); }, RangeError);
assert.throw(function() { String.prototype.includes.apply({ 'toString': function() { return 'abc'; } }, [/./]); }, TypeError);
