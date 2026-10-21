class B {
  constructor(v) {
    this.v = v;
  }
}

const obj = {};

class A extends B {
  constructor(x) {
    const getThis = () => this;
    if (x === 1) super(1);
    else super(2);
    expect(getThis()).toBe(this);
    if (x === 3) return obj;
    if (x === 4) return;
    this.x = x;
  }
}

expect(new A(1).v).toBe(1);
expect(new A(2).v).toBe(2);
expect(new A(2).x).toBe(2);
expect(new A(3)).toBe(obj);
expect(new A(4)).toBeInstanceOf(A);
expect(new A(4).x).toBeUndefined();
