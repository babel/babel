// The property name is evaluated before the assignment target.
const log = [];
const obj = {};
const key = () => (log.push("key"), "a");
const target = () => (log.push("target"), "t");
const source = { a: undefined, b: 2 };

({ [key()]: obj[target()] = 1 } = source);
expect(log).toEqual(["key", "target"]);
expect(obj.t).toBe(1);

// a target with side effects can change the key
let k = "a";
const target2 = () => ((k = "b"), "u");
({ [k]: obj[target2()] } = source);
expect(obj.u).toBe(undefined);
