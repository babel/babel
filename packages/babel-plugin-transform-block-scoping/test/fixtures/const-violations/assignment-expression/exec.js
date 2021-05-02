const state1 = {};
expect(function() {
  const a = 3;
  let b = 1;
  state1.getA = () => a;
  state1.getB = () => b;

  a += b++;
}).toThrow('"a" is read-only');
expect(state1.getA()).toBe(3); // Assignment did not succeed
expect(state1.getB()).toBe(2); // `b++` was evaluated before error thrown

const state2 = {};
expect(function() {
  const a = {
    valueOf() {
      state2.valueOfIsCalled = true;
    }
  };
  state2.a = a;
  state2.getA = () => a;
  state2.getB = () => b;

  let b = 1;
  a += b++;
}).toThrow('"a" is read-only');
expect(state2.getA()).toBe(state2.a); // Assignment did not succeed
expect(state2.getB()).toBe(2); // `b++` was evaluated before error thrown
expect(state2.valueOfIsCalled).toBe(true); // `a` was read before error thrown

const state3 = {};
expect(function() {
  const a = 32;
  let b = 1;
  state3.getA = () => a;
  state3.getB = () => b;

  a >>>= ++b;
}).toThrow('"a" is read-only');
expect(state3.getA()).toBe(32); // Assignment did not succeed
expect(state3.getB()).toBe(2); // `++b` was evaluated before error thrown
