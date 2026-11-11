const proto = {};
const __proto__ = 1;

for (const obj of [
  { __proto__() {}, __proto__: proto },
  { __proto__, "__proto__": proto },
  { get __proto__() { return 1; }, __proto__: proto },
  { __proto__: proto, __proto__() {} },
  { __proto__: proto, __proto__ },
]) {
  expect(Object.getPrototypeOf(obj)).toBe(proto);
  expect(Object.keys(obj)).toEqual(["__proto__"]);
}
