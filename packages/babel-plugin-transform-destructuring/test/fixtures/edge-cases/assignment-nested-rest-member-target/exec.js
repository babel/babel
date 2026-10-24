// The property is read before the nested rest target is evaluated.
let log = [];
const obj = {};
const key = () => (log.push("key"), "k");
const source = {
  get a() {
    log.push("get");
    return [1];
  },
};

({ a: [...obj[key()]] } = source);
expect(log).toEqual(["get", "key"]);
expect(obj.k).toEqual([1]);

log = [];
({ a: { ...obj[key()] } } = source);
expect(log).toEqual(["get", "key"]);
expect(obj.k).toEqual({ 0: 1 });
