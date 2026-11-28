const key = "real";
let keys = 0;
const obj = {
  real(a) {
    return [this, "real", a];
  },
  key(a) {
    return [this, "key", a];
  },
  "a-b"(a, b) {
    return [a, b];
  },
};
const getKey = () => (keys++, "real");

const f = obj[key](?);
const g = obj["a-b"](1, ?);
const h = obj[getKey()](?);

expect(f(1)).toEqual([obj, "real", 1]);
expect(g(2)).toEqual([1, 2]);
expect(keys).toBe(1);
expect(h(3)).toEqual([obj, "real", 3]);
expect(h(4)).toEqual([obj, "real", 4]);
expect(keys).toBe(1);
