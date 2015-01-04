function f(...args) {
  return args;
}

assert.throw(function() {
  // Should throw due to ToObject(undefined)
  f(0, ...undefined, 1);
}, TypeError)
