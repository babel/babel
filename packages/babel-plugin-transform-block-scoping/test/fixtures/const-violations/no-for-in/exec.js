function f(arr) {
  const MULTIPLIER = 5;
  for (MULTIPLIER in arr);

  return 'survived';
}

expect(function() {
  f([1,2,3]);
}).toThrow('"MULTIPLIER" is read-only');

expect(f([])).toBe('survived');
