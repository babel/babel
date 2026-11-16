var log = [];
var first = { a: 1, b: 1 };
var second = {
  b: 2,
  c: 2,
  get d() {
    log.push("get d");
    return 2;
  },
};
Object.defineProperty(second, "hidden", { value: 2, enumerable: false });
var sym = Symbol();
var third = { c: 3, [sym]: 3 };

var obj = {
  ...first,
  c: 0,
  ["b"]: 0,
  d: 0,
  ...second,
  get ["e"]() {
    log.push("get e");
    return 0;
  },
  set f(v) {
    log.push("set f");
  },
  ...third,
  ...{ f: 4 },
  ...null,
  ["a"]: 5,
};

// The spread reads the getter of its argument, but not the ones defined before it
expect(log).toEqual(["get d"]);
expect(obj).toEqual({ a: 5, b: 2, c: 3, d: 2, e: 0, f: 4, [sym]: 3 });
expect(Object.keys(obj)).toEqual(["a", "b", "c", "d", "e", "f"]);
expect(Object.getOwnPropertyDescriptor(obj, "d").value).toBe(2);
expect(Object.getOwnPropertyDescriptor(obj, "f").value).toBe(4);
