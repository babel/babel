const p = { inherited: true };
const log = [];
const o = {
  ...{ get a() { log.push("a"); return 1; } },
  b: log.push("b"),
  __proto__: (log.push("proto"), p),
  c: log.push("c"),
  ...{ get d() { log.push("d"); return 4; } },
};
expect(log).toEqual(["a", "b", "proto", "c", "d"]);
expect(Object.getPrototypeOf(o)).toBe(p);
expect(Object.keys(o)).toEqual(["a", "b", "c", "d"]);

expect(Object.getPrototypeOf({ ...{ a: 1 }, "__proto__": null })).toBe(null);
// Values that are neither objects nor null are ignored
expect(Object.getPrototypeOf({ ...{ a: 1 }, __proto__: 1 })).toBe(Object.prototype);

// Setters inherited from the new prototype are not called
const proto = { set c(v) { throw new Error("setter called"); } };
const s = { ...{ a: 1 }, __proto__: proto, c: 1, ...{ d: 2 } };
expect(Object.keys(s)).toEqual(["a", "c", "d"]);

// Only `__proto__: value` sets the prototype
const __proto__ = p;
for (const own of [{ ...{}, __proto__ }, { ...{}, ["__proto__"]: p }, { ...{}, __proto__() {} }]) {
  expect(Object.getPrototypeOf(own)).toBe(Object.prototype);
  expect(Object.keys(own)).toEqual(["__proto__"]);
}
