function B() {}
B.b = function() {
  return 'B.b';
};

class C extends B {}

assert.equal(Object.getPrototypeOf(C), B);
assert.equal(Object.getPrototypeOf(C.prototype), B.prototype);

assert.equal(C.b(), 'B.b');

class D extends Object {}

assert.equal(Object.getPrototypeOf(D), Object);
assert.equal(Object.getPrototypeOf(D.prototype), Object.prototype);
assert.equal(D.keys, Object.keys);

class E {}

assert.equal(Object.getPrototypeOf(E), Function.prototype);
assert.equal(Object.getPrototypeOf(E.prototype), Object.prototype);
assert.isFalse('keys' in E);