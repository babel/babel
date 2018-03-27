'use strict';

(function() {

// test MemberLookupExpression
function f(a) {
  var b = [42];
  return (a||b)[0];
}

expect(f(null)).toBe(42);
expect(f([43])).toBe(43);

// test NewExpression
var a, b = function() { this.ans = 42; };
expect(new (a||b)().ans).toBe(42);

a = function() { this.ans = 43; };
expect(new (a||b)().ans).toBe(43);

// test CallExpression
a = undefined;
b = function() { return 42; }
expect((a||b)()).toBe(42);

a = function() { return 43; }
expect((a||b)()).toBe(43);

})();
