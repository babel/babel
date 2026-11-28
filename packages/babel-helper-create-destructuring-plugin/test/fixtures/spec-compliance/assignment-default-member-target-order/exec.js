// https://github.com/babel/babel/issues/18362
const original = {};
let target = original;
const source = { get x() { target = {}; return 1; } };
({ x: target.x = 0 } = source);
expect(original.x).toBe(1);
expect(target.x).toBe(undefined);

const original2 = {};
let target2 = original2;
const source2 = { get x() { target2 = {}; return undefined; } };
({ x: target2.x = 0 } = source2);
expect(original2.x).toBe(0);
expect(target2.x).toBe(undefined);
