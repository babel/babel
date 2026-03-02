expect(() => {
  class X { [0 in 0]; }
}).toThrow();

expect(() => {
  class X { [0 instanceof 0]; }
}).toThrow();
