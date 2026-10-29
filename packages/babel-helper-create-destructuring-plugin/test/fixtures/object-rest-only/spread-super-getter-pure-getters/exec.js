// The getter is called when copied, and reads the reference to the target
const o = { ...{}, ...{}, get p() { return super.toString === Object.prototype.toString; } };
expect(o.p).toBe(true);
