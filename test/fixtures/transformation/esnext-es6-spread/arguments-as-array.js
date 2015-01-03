function arrayOf() {
  return [...arguments];
}

assert.equal(Object.prototype.toString.call(arrayOf()), '[object Array]');
assert.deepEqual(arrayOf(1, 2, 3), [1, 2, 3]);
