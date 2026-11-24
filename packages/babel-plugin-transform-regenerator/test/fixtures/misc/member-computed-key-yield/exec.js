// The object of a member expression is evaluated before a yield in its key.
var o = { a: "old" };
function* g() { return o[yield]; }
var it = g();
it.next();
o = { a: "new" };
expect(it.next("a").value).toBe("old");

var p = { a: 1 };
function* h() { p[yield]++; }
var it2 = h();
it2.next();
var oldP = p;
p = { a: 100 };
it2.next("a");
expect(oldP.a).toBe(2);
expect(p.a).toBe(100);
