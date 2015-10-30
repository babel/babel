'use strict';

(function() {

// test MemberLookupExpression
function f(a) {
  var b = [42];
  return (a||b)[0];
}

assert.equal(42, f(null));
assert.equal(43, f([43]));

// test NewExpression
var a, b = function() { this.ans = 42; };
assert.equal(new (a||b)().ans, 42);

a = function() { this.ans = 43; };
assert.equal(new (a||b)().ans, 43);

// test CallExpression
a = undefined;
b = function() { return 42; }
assert.equal((a||b)(), 42);

a = function() { return 43; }
assert.equal((a||b)(), 43);

})();
