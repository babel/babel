struct S {
  a = (() => {});
  b = (function () {});
  c = (class {});
}
const s = new S();
expect(s.a.name).toBe("a");
expect(s.b.name).toBe("b");
expect(s.c.name).toBe("c");
