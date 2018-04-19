var s = Symbol();

var object = {
  [s]: 42
};

expect(object[s]).toBe(42);
