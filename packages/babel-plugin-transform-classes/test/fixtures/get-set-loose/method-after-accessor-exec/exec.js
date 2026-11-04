// This (correctly) does not throw when not in loose mode
expect(() => {
  class C {
    get p() { return 0 }
    p() { return 1 }
  }
}).toThrow(TypeError);
