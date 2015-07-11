var callCount = 0;
function getArray() {
  callCount++;
  return Array;
}

assert.deepEqual([1, 2, 3], new Array(...[1, 2, 3]));

// Ensure the expression of the function being initialized is not copied.
assert.deepEqual([1, 2, 3], new (getArray())(...[1, 2, 3]));
assert.equal(callCount, 1);
