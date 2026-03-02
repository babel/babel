var log = [];

var a = {
  ...{ get foo() { log.push(1); } },
  get bar() { log.push(2); }
};

// Loose mode uses regular Get, not GetOwnProperty.
expect(log).toEqual([1, 2]);
