let count = 0;

let withFoo = { get foo() { return count++; } };
let withBar = { get bar() { return count++; } };

let res = { ...withFoo, middle: count, ...withBar };

// Without assuming that getters are pure (in this case it isn't),
// the result should be { foo: 0, middle: 1, bar: 1 }
expect(res).toEqual({ foo: 0, middle: 0, bar: 1 });
