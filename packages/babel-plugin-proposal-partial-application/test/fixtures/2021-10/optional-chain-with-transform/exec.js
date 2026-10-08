const add = (x, y) => x + y;
let log = [];
const arg = v => (log.push(v), v);

expect(add?.~(?, 1)(2)).toBe(3);
const none = null;
expect(none?.~(?, arg(1))).toBe(undefined);
expect(log).toEqual([]);

const console2 = { prefix: "> ", log(m) { return this.prefix + m; } };
expect(console2?.log~(?)("hi")).toBe("> hi");
expect(none?.log~(?, arg(2))).toBe(undefined);
expect(none?.a.b.log~(?, arg(2))).toBe(undefined);
expect(log).toEqual([]);

// The rest of the chain short-circuits
expect(none?.log~(?).name).toBe(undefined);
expect(none?.log~(?)(1)).toBe(undefined);
expect(none?.log~(?)~(?)).toBe(undefined);
expect(typeof console2?.log~(?).call).toBe("function");

// `?.~` checks the callee
expect(console2.missing?.~(?, arg(3))).toBe(undefined);
expect(log).toEqual([]);
expect(console2?.log?.~(?)("x")).toBe("> x");

// The receiver, the key and the arguments are evaluated in order
const order = [];
const target = { f(...args) { return args; } };
const h = (order.push("o"), target)?.[(order.push("k"), "f")]~((order.push("a"), 1), ?);
expect(order).toEqual(["o", "k", "a"]);
expect(h(2)).toEqual([1, 2]);

// Fixed arguments are not shared between partial applications
const fns = [];
for (var i = 0; i < 3; i++) {
  fns.push(target?.f~(i, ?));
}
expect(fns.map(fn => fn("x"))).toEqual([[0, "x"], [1, "x"], [2, "x"]]);
