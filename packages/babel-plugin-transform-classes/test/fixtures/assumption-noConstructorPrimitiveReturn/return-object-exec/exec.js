class B {}

const obj = {};
class A extends B {
  constructor(ret) {
    super();
    if (ret) return obj;
    this.x = 1;
  }
}

expect(new A(true)).toBe(obj);
expect(new A(false)).toBeInstanceOf(A);
expect(new A(false).x).toBe(1);
