var a, b = true, c;

a ||= function () {};
b &&= function () {};
c ??= function () {};

expect(a.name).toBe("a");
expect(b.name).toBe("b");
expect(c.name).toBe("c");
