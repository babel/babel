var a, b = true, c;

a ||= function d() {};
b &&= function e() {};
c ??= function f() {};

expect(a.name).toBe("d");
expect(b.name).toBe("e");
expect(c.name).toBe("f");
