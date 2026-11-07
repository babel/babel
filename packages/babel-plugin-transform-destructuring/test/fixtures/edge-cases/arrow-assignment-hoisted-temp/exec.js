const log = [];
const obj = {};
const key = () => (log.push("key"), "k");
const value = {};
const source = () => (log.push("source"), value);

const f = () => ({ a: obj[key()] = 1 } = source());
expect(f()).toBe(value);
expect(obj.k).toBe(1);
expect(log).toEqual(["source", "key"]);
