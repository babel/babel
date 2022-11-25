expect(() => {
  class x { static y = delete super[0]; }
}).toThrow(ReferenceError);
