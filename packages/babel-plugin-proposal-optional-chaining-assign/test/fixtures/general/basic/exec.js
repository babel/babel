let a = null;

function never(i) {
  throw new Error("This should not be evaluated " + i);
}

expect(() => {
  a.b?.c.d?.e.f = never(1);
}).toThrow(TypeError);

a = { b: null };
expect(() => {
  a.b?.c.d?.e.f = never(2);
}).not.toThrow();

a = { b: { c: null } };
expect(() => {
  a.b?.c.d?.e.f = never(3);
}).toThrow(TypeError);

a = { b: { c: { d: null } } };
expect(() => {
  a.b?.c.d?.e.f = never(4);
}).not.toThrow();

a = { b: { c: { d: { e: null } } } };
let evaluated = false;
expect(() => {
  a.b?.c.d?.e.f = (evaluated = true);
}).toThrow(TypeError);
expect(evaluated).toBe(true);

a = { b: { c: { d: { e: {} } } } };
let g = {};
expect(() => {
  a.b?.c.d?.e.f = g;
}).not.toThrow();
expect(a.b.c.d.e.f).toBe(g);
