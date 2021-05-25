const state1 = {};
expect(function() {
  const a = 3;
  state1.getA = () => a;

  a = 7;
}).toThrow('"a" is read-only');
expect(state1.getA()).toBe(3); // Assignment did not succeed

const state2 = {};
expect(function() {
  const a = 3;
  let b = 0;
  state2.getA = () => a;
  state2.getB = () => b;

  a = b++;
}).toThrow('"a" is read-only');
expect(state2.getA()).toBe(3); // Assignment did not succeed
expect(state2.getB()).toBe(1); // `b++` was evaluated before error thrown
