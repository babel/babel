var obj = {
  __proto__: { inherited: 5 },
  a: 1,
  b: 2,
  c: 3,
  get d() {
    return 4;
  },
};
Object.defineProperty(obj, "hidden", { value: 6, enumerable: false });

var { a, b, ...c } = obj;

expect(a).toBe(1);
expect(b).toBe(2);
expect(c).toEqual({ c: 3, d: 4 });
expect(Object.getOwnPropertyDescriptor(c, "d").value).toBe(4);
expect(c).not.toBe(obj);
expect("hidden" in c).toBe(false);
expect("inherited" in c).toBe(false);
expect(Object.keys(obj)).toEqual(["a", "b", "c", "d"]);
