const state1 = {};
expect(function() {
  const foo = 1;
  state1.getFoo = () => foo;

  foo++;
}).toThrow('"foo" is read-only');
expect(state1.getFoo()).toBe(1); // Assignment did not succeed

const state2 = {};
expect(function() {
  const bar = {
    valueOf() {
      state2.valueOfIsCalled = true;
    }
  };
  state2.bar = bar;
  state2.getBar = () => bar;

  bar++;
}).toThrow('"bar" is read-only');
expect(state2.getBar()).toBe(state2.bar); // Assignment did not succeed
expect(state2.valueOfIsCalled).toBe(true); // `bar` was read before error thrown
