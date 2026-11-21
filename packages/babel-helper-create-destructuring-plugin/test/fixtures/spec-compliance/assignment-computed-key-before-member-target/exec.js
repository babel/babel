// https://github.com/babel/babel/issues/18363
const original = {};
let target = original;
function key() { target = {}; return "x"; }
({ [key()]: target.x } = { x: 1 });
expect(original.x).toBe(undefined);
expect(target.x).toBe(1);
