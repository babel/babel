var log = [];

var a = {
  ...{ get foo() { log.push(1); } },
  get bar() { log.push(2); }
};

expect(log).toEqual([1]);
