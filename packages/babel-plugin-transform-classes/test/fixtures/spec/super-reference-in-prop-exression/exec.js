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
}).toThrow();
expect(called).toBe(false);
