const state1 = {};
expect(function() {
  const a = "str";
  state1.getA = () => a;

  --a;
}).toThrow('"a" is read-only');
expect(state1.getA()).toBe("str"); // Assignment did not succeed

const state2 = {};
expect(function() {
  const b = {
    valueOf() {
      state2.valueOfIsCalled = true;
    }
  };
  state2.b = b;
  state2.getB = () => b;

  --b;
}).toThrow('"b" is read-only');
expect(state2.getB()).toBe(state2.b); // Assignment did not succeed
expect(state2.valueOfIsCalled).toBe(true); // `bar` was read before error thrown
