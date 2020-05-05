var a, b = true, c;

a ||= function () {};
b &&= function () {};
c ??= function () {};

expect(a.name).toBe("");
expect(b.name).toBe("");
expect(c.name).toBe("");
