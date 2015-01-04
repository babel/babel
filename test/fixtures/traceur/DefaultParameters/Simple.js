function f(a = 1, b = 2) {
  return a + b;
}

assert.equal(0, f.length);
assert.equal(3, f());
assert.equal(6, f(4));
assert.equal(24, f(8, 16));

assert.equal(3, f(undefined, undefined));
assert.equal(33, f(undefined, 32));

function g(a, b = a) {
  return a + b;
}

assert.equal(1, g.length);
assert.equal(4, g(2));
assert.equal(4, g(2, undefined));
assert.equal(5, g(2, 3));

function C(obj = this) {
  this.obj = obj;
}

assert.equal(0, C.length);

var c = new C;
assert.equal(c, c.obj);

var c2 = new C(undefined);
assert.equal(c2, c2.obj);

var c3 = new C(42);
assert.equal(42, c3.obj);

function h(a = 1, b) {
  return {a: a, b: b};
}

assert.equal(1, h().a);
assert.equal(2, h(2).a);
assert.isUndefined(h().b);
assert.isUndefined(h(2).b);
assert.equal(4, h(3, 4).b);
