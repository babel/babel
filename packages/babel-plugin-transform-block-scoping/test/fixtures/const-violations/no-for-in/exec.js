const state = {};
function f(arr) {
  const MULTIPLIER = 5;
  state.getMultiplier = () => MULTIPLIER;

  for (MULTIPLIER in arr);

  return 'survived';
}

expect(function() {
  f([1,2,3]);
}).toThrow('"MULTIPLIER" is read-only');
expect(state.getMultiplier()).toBe(5); // Assignment did not succeed

expect(f([])).toBe('survived');
