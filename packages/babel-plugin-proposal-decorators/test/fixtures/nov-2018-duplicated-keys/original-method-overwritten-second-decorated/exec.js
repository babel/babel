expect(() => {
  class A {
    @(el => el)
    method() {
      return 1;
    }

    method() {
      return 2;
    }
  }
}).toThrow(ReferenceError);
