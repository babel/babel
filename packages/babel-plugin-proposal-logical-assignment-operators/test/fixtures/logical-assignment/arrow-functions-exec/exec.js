var a, b = true, c;

a ||= () => {};
b &&= () => {};
c ??= () => {};

expect(a.name).toBe("a");
expect(b.name).toBe("b");
expect(c.name).toBe("c");
