expect(() => {
  class C {
    static [C + 3] = 3;
  }
}).toThrow();
