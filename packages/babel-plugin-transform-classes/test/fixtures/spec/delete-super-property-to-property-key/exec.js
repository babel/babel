// [Symbol.toPrimitive] must be called if exist
var counter = 0;
expect(() => {
  (new class {
    f() {
      delete super[{
        [Symbol.toPrimitive]: function() { ++counter; return 0; },
      }];
    }
  }).f();
}).toThrow(ReferenceError);
expect(counter).toBe(1);

// [Symbol.toPrimitive] must return a primitive value
expect(() => {
  (new class {
    f() {
      delete super[{
        [Symbol.toPrimitive]: function() { return {}; },
      }];
    }
  }).f();
}).toThrow(TypeError);
