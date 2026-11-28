// The right-hand side is evaluated before the assignment targets.
let log = [];
let obj = {};
const original = obj;
const key = () => (log.push("key"), "k");
const source = () => (log.push("source"), (obj = {}), { a: 1 });

({ a: obj[key()] } = source());
expect(log).toEqual(["source", "key"]);
expect(obj.k).toBe(1);
expect(original.k).toBe(undefined);

obj = original;
({ a: obj.x = 1 } = source());
expect(obj.x).toBe(1);
expect(original.x).toBe(undefined);

obj = original;
({ a: obj.y } = source());
expect(obj.y).toBe(1);
expect(original.y).toBe(undefined);

obj = original;
log = [];
const arraySource = () => (log.push("source"), (obj = {}), [1]);
[obj[key()]] = arraySource();
expect(log).toEqual(["source", "key"]);
expect(obj.k).toBe(1);

// the target is evaluated after reading `value`
let value = { a: 1 };
const key2 = () => ((value = { a: 2 }), "k");
obj = {};
({ a: obj[key2()] } = value);
expect(obj.k).toBe(1);
