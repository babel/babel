// should have a length of 1
assert.equal(Array.prototype.fill.length, 1);

// should fill from basic case
assert.deepEqual([1, 2, 3].fill(5), [5, 5, 5]);

// should fill from start
assert.deepEqual([1, 2, 3].fill(5, 1), [1, 5, 5]);

// should fill from start to end
assert.deepEqual([1, 2, 3].fill(5, 1, 2), [1, 5, 3]);

// should fill from negative start
assert.deepEqual([1, 2, 3].fill(5, -1), [1, 2, 5]);

// should fill from negative start to positive end
assert.deepEqual([1, 2, 3].fill(5, -2, 3), [1, 5, 5]);

// should fill from negative start to negative end
assert.deepEqual([1, 2, 3].fill(5, -3, -1), [5, 5, 3]);

// should fill from positive start to negative end
assert.deepEqual([1, 2, 3].fill(5, 1, -1), [1, 5, 3]);

// should fill custom object
assert.deepEqual(Array.prototype.fill.call({'0': 1, 'length': 3}, 5), {'0': 5, '1': 5, '2': 5, 'length': 3});

// should handle custom object with negative length
//assert.deepEqual(Array.prototype.fill.call({'0': 2, 'length': -1}, 5), {'0': 2, 'length': -1});

// should handle no elements
assert.deepEqual([].fill(5), []);

// should handle bad start
assert.deepEqual([1, 2, 3].fill(5, 'hello'), [5, 5, 5]);

// should handle bad end
assert.deepEqual([1, 2, 3].fill(5, 1, {}), [1, 2, 3]);

// should handle bad start and end
assert.deepEqual([1, 2, 3].fill(5, 'hello', {}), [1, 2, 3]);


// should handle bad this
assert.throws(function() {
  Array.prototype.fill.call(null, 5)
}, TypeError);
