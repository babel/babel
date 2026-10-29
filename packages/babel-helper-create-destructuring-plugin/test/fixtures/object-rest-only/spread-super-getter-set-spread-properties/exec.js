// Object.assign calls the getter, which reads the reference to the target
const o = { ...{}, get p() { return super.toString === Object.prototype.toString; } };
expect(o.p).toBe(true);

// A data property after an accessor defined in a loop header replaces it
let log = [];
let q;
for (let i = 0; q = { ...{}, set p(v) { log.push(v); }, m() { return super.x; }, p: 1 }, i < 1; i++);
expect(log).toEqual([]);
expect(Object.getOwnPropertyDescriptor(q, "p")).toEqual({
  value: 1,
  writable: true,
  enumerable: true,
  configurable: true,
});
