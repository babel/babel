let called = false;

class A {
  get prop() {
    called = true;
  }
}

class B extends A {
  constructor() {
    super[super().prop]
  }
}

expect(() => {
  new B();
}).toThrow(ReferenceError);
expect(called).toBe(false);
