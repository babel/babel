function f(a = 1, b = 2) {
  return a + b;
}

expect(f).toHaveLength(0);
expect(f()).toBe(3);
expect(f(4)).toBe(6);
expect(f(8, 16)).toBe(24);

expect(f(undefined, undefined)).toBe(3);
expect(f(undefined, 32)).toBe(33);

function g(a, b = a) {
  return a + b;
}

expect(g).toHaveLength(1);
expect(g(2)).toBe(4);
expect(g(2, undefined)).toBe(4);
expect(g(2, 3)).toBe(5);

function C(obj = this) {
  this.obj = obj;
}

expect(C).toHaveLength(0);

var c = new C;
expect(c).toBe(c.obj);

var c2 = new C(undefined);
expect(c2).toBe(c2.obj);

var c3 = new C(42);
expect(c3.obj).toBe(42);

function h(a = 1, b) {
  return {a: a, b: b};
}

expect(h().a).toBe(1);
expect(h(2).a).toBe(2);
expect(h().b).toBeUndefined();
expect(h(2).b).toBeUndefined();
expect(h(3, 4).b).toBe(4);
