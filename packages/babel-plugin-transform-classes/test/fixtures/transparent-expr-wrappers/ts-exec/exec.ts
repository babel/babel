class A {
  m(...args: any[]) {
    return [this, ...args];
  }
}

class B extends A {
  as() {
    return (super.m as any)(1);
  }
  nonNull() {
    return super.m!(1);
  }
}

const b = new B();
expect(b.as()).toEqual([b, 1]);
expect(b.nonNull()).toEqual([b, 1]);
