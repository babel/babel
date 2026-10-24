let value;

class A {
  get foo() {}
  set foo(v) {}
  static get bar() {}
  method() {}
}

class B extends A {
  get x() {}

  m() {}
}

// This is not by spec - but under these assumptions we can guarantee that we
// will emit the prototype of base classes as writable.
expect(Object.getOwnPropertyDescriptor(A, "prototype").writable).toBe(true);
expect(Object.getOwnPropertyDescriptor(B, "prototype").writable).toBe(true);
