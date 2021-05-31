function dec(el) { return el }

expect(() => {
  class A {
    @dec
    get foo() {}

    @dec
    set foo(x) {}
  }
}).toThrow(ReferenceError);
