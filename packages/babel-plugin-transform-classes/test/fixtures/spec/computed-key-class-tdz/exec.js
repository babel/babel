expect(() => {
  class A {
    [A.name]() {}
  }
}).toThrow(ReferenceError);
