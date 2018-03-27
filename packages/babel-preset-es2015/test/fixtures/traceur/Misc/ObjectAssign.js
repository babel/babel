var target = {a: 0, b: 2};
var source = {a: 1, c: 3, get d() { return this.b || this.a + 64; }};
var assigned = Object.assign(target, source);

// ----------------------------------------------------------------------------

expect(Object).toHaveProperty("assign");
expect(assigned.a).toBe(source.a);
expect(assigned.b).toBe(target.b);
expect(assigned.c).toBe(source.c);
expect(assigned.d).toBe(source.d);
