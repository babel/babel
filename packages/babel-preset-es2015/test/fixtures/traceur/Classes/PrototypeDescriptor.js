class C {}

var descr = Object.getOwnPropertyDescriptor(C, 'prototype');
assert.isFalse(descr.enumerable);
assert.isFalse(descr.configurable);
assert.isFalse(descr.writable);
assert.equal(descr.value, C.prototype);
