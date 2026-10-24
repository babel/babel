let a = 0, b;
class C {
  constructor() { a = 2; }
}
[a, b] = [1, new C()];
expect(a).toBe(1);
expect(b).toBeInstanceOf(C);
