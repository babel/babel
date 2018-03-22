var callCount = 0;
function getArray() {
  callCount++;
  return Array;
}

expect([1, 2, 3]).toEqual(new Array(...[1, 2, 3]));

// Ensure the expression of the function being initialized is not copied.
expect([1, 2, 3]).toEqual(new (getArray())(...[1, 2, 3]));
expect(callCount).toBe(1);
