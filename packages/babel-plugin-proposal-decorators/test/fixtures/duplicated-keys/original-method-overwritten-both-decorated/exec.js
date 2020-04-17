expect(() => {
  class A {
    @(el => el)
    method() {
      return 1;
    }

    @(el => el)
    method() {
      return 2;
    }
  }
}).toThrow(ReferenceError);
