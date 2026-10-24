// https://github.com/babel/babel/issues/18349
var { a, [String(a)]: b, ...rest } = { a: "b", b: 1 };
expect(a).toBe("b");
expect(b).toBe(1);
expect(rest).toEqual({});

var log = [];
var { [(log.push("k1"), "x")]: x = log.push("d1"), [(log.push("k2"), "y")]: y, ...r } = {
  get x() { log.push("get x"); },
  get y() { log.push("get y"); return 2; },
  z: 3,
};
expect(log).toEqual(["k1", "get x", "d1", "k2", "get y"]);
expect(r).toEqual({ z: 3 });
