expect(() => {
  new class { y = delete super.x; };
}).toThrow(ReferenceError);

expect(() => {
  new class { y = delete super[0]; };
}).toThrow(ReferenceError);

expect(() => {
  class X1 { static y = delete super.x; }
}).toThrow(ReferenceError);

expect(() => {
  class X2 { static y = delete super[0]; }
}).toThrow(ReferenceError);
