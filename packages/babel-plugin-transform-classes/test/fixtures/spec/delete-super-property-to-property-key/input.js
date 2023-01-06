// [Symbol.toPrimitive] must be called if exist
var counter = 0;
(new class {
  f() {
    delete super[{
      [Symbol.toPrimitive]: function() { ++counter; return 0; },
    }];
  }
}).f();

// [Symbol.toPrimitive] must return a primitive value
(new class {
  f() {
    delete super[{
      [Symbol.toPrimitive]: function() { return {}; },
    }];
  }
}).f();
