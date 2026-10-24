var log = [];
function foo(arg) {
  log.push(["foo", arg]);
  return { foo: arg };
}
function bar() {
  log.push(["bar"]);
  return { m: { n: "n", o1: 1, o2: 2 }, p1: 3, p2: 4 };
}
function baz() {
  log.push(["baz"]);
  return "baz";
}
var a = { x: "x", y1: 1, y2: 2 };
var r = { s1: 1, s2: 2 };

const { x, ...y } = a,
  z = foo(y);

const { ...s } = r,
  t = foo(s);

// ordering is preserved
var l = foo(),
    { m: { n, ...o }, ...p } = bar(),
    q = baz();

expect(x).toBe("x");
expect(y).toEqual({ y1: 1, y2: 2 });
expect(z.foo).toBe(y);
expect(s).toEqual({ s1: 1, s2: 2 });
expect(s).not.toBe(r);
expect(t.foo).toBe(s);
expect(l).toEqual({ foo: undefined });
expect(n).toBe("n");
expect(o).toEqual({ o1: 1, o2: 2 });
expect(p).toEqual({ p1: 3, p2: 4 });
expect(q).toBe("baz");
expect(log).toEqual([
  ["foo", y],
  ["foo", s],
  ["foo", undefined],
  ["bar"],
  ["baz"],
]);
expect(log[0][1]).toBe(y);
expect(log[1][1]).toBe(s);
