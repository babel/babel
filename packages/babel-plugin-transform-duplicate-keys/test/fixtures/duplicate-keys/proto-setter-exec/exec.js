const proto = {};
const __proto__ = 1;

for (const obj of [
  { __proto__() {}, __proto__: proto },
  { __proto__, "__proto__": proto },
  { get __proto__() { return 1; }, __proto__: proto },
  { __proto__: proto, get __proto__() { return 1; } },
  { set __proto__(v) {}, __proto__: proto },
  { get __proto__() { return 1; }, __proto__: proto, set __proto__(v) {} },
  { __proto__: proto, __proto__() {} },
  { __proto__: proto, __proto__ },
]) {
  expect(Object.getPrototypeOf(obj)).toBe(proto);
  expect(Object.keys(obj)).toEqual(["__proto__"]);
}

const obj = { get __proto__() { return 1; }, __proto__: null };
expect(Object.getPrototypeOf(obj)).toBe(null);
expect(obj.__proto__).toBe(1);

let a, b;
({ __proto__: a, __proto__: b } = proto);
expect(a).toBe(Object.prototype);
expect(b).toBe(Object.prototype);
