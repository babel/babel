// The following parentheses should be kept
(a + b)~();
(a || b)~();
(a ?? b)~();
(x => x)~();
(async x => x)~();
(a ? b : c)~(?);
(a = b)~();
(a, b)~();
(-a)~();
(++a)~();
(a++)~();
(await a)~();
function* g() {
  (yield a)~();
}
(a + b)?.~();
(x => x)?.~();
(a ? b : c)?.~();
(await a)?.~();
new (a + b)~();
new (x => x)~();
new (a ? b : c)~();
new (await a)~();

// The following parentheses can be removed
a.b~();
a()~();
f~()~();
new F~()~();