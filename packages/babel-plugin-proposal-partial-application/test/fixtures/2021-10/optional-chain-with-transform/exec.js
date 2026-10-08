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
