var log = [];

var a = {
  ...{ get foo() { log.push(1); } },
  get bar() { log.push(2); }
};

// Spread sources are read, while literal accessors are defined on the target.
expect(log).toEqual([1]);
a.bar;
expect(log).toEqual([1, 2]);
