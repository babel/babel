// The getter reads the reference to the target when the property is accessed
const o = { ...{}, ...{}, get p() { return super.toString === Object.prototype.toString; } };
expect(o.p).toBe(true);
