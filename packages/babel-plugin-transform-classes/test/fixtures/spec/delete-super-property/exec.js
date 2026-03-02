expect(() => {
  (new class {
    f() { delete super.x; }
  }).f();
}).toThrow(ReferenceError);

expect(() => {
  (new class {
    f() { delete super[0]; }
  }).f();
}).toThrow(ReferenceError);

// [expr] should be evaluated
var counter = 0;
expect(() => {
  (new class {
    f() { delete super[++counter]; }
  }).f();
}).toThrow(ReferenceError);
expect(counter).toBe(1);

// TypeError before ReferenceError
expect(() => {
  (new class {
    f() { delete super[0()]; }
  }).f();
}).toThrow(TypeError);
