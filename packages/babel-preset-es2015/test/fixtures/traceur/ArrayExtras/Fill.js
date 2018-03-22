// should have a length of 1
expect(Array.prototype.fill).toHaveLength(1);

// should fill from basic case
expect([1, 2, 3].fill(5)).toEqual([5, 5, 5]);

// should fill from start
expect([1, 2, 3].fill(5, 1)).toEqual([1, 5, 5]);

// should fill from start to end
expect([1, 2, 3].fill(5, 1, 2)).toEqual([1, 5, 3]);

// should fill from negative start
expect([1, 2, 3].fill(5, -1)).toEqual([1, 2, 5]);

// should fill from negative start to positive end
expect([1, 2, 3].fill(5, -2, 3)).toEqual([1, 5, 5]);

// should fill from negative start to negative end
expect([1, 2, 3].fill(5, -3, -1)).toEqual([5, 5, 3]);

// should fill from positive start to negative end
expect([1, 2, 3].fill(5, 1, -1)).toEqual([1, 5, 3]);

// should fill custom object
expect(Array.prototype.fill.call({'0': 1, 'length': 3}, 5)).toEqual({'0': 5, '1': 5, '2': 5, 'length': 3});

// should handle custom object with negative length
//assert.deepEqual(Array.prototype.fill.call({'0': 2, 'length': -1}, 5), {'0': 2, 'length': -1});

// should handle no elements
expect([].fill(5)).toEqual([]);

// should handle bad start
expect([1, 2, 3].fill(5, 'hello')).toEqual([5, 5, 5]);

// should handle bad end
expect([1, 2, 3].fill(5, 1, {})).toEqual([1, 2, 3]);

// should handle bad start and end
expect([1, 2, 3].fill(5, 'hello', {})).toEqual([1, 2, 3]);


// should handle bad this
expect(function() {
  Array.prototype.fill.call(null, 5)
}).toThrow(TypeError);
