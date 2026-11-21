function f() {
  const out = [];
  for (const k of ["a", "b"]) {
    switch (0) {
      case 0:
        struct S {
          [k] = 1;
        }
        out.push(S);
    }
  }
  return out.map(S => new S());
}
const [a, b] = f();
expect(Object.keys(a)).toEqual(["a"]);
expect(Object.keys(b)).toEqual(["b"]);
expect(a.a).toBe(1);
expect(b.b).toBe(1);
