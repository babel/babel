function f(arr) {
  const MULTIPLIER = 5;
  for (MULTIPLIER in arr);

  return 'survived';
}

assert.throws(function() {
  f([1,2,3]);
}, '"MULTIPLIER" is read-only');

assert.equal(f([]), 'survived', 'For-in over empty array should not throw.');
