function f(...args) {
  return args;
}

expect(function() {
  // Should throw due to ToObject(undefined)
  f(0, ...undefined, 1);
}).toThrow(TypeError);
