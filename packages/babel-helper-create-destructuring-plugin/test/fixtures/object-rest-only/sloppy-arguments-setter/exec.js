// A setter must have exactly one parameter: no rest element is added to keep
// `arguments` unmapped.
var z = "outer";
var log = [];
var o = {
  set x({ a, ...b }) {
    arguments[0] = "changed";
    log.push(a, b, arguments.length);
  },
  set y({ c = z, ...d }) {
    var z;
    log.push(c, d, arguments[0]);
  },
};
o.x = { a: 1, b: 2 };
var value = { e: 3 };
o.y = value;
expect(log).toEqual([1, { b: 2 }, 1, "outer", { e: 3 }, value]);
expect(Object.getOwnPropertyDescriptor(o, "x").set.length).toBe(1);
