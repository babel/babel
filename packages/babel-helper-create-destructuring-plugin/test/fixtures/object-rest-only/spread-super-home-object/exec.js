const proto = { x: 7 };
const obj = { ...{}, __proto__: proto, m() { return super.x; } };
expect(obj.m()).toBe(7);
Object.setPrototypeOf(obj, { x: 9 });
expect(obj.m()).toBe(9);

const before = { ...{}, m() { return super.x; }, __proto__: proto };
expect(before.m()).toBe(7);
const getter = { ...{}, __proto__: proto, get x() { return super.x; } };
expect(getter.x).toBe(7);

const methods = [];
for (let i = 0; i < 2; i++) {
  const obj = { ...{}, __proto__: { x: i }, m() { return () => super.x; } };
  methods.push(obj.m());
}
expect(methods.map(method => method())).toEqual([0, 1]);

let first = true;
for (const obj = { ...{}, __proto__: proto, m() { return super.x; } }; first; first = false) {
  expect(obj.m()).toBe(7);
}
for (const obj of [{ ...{}, __proto__: proto, m() { return super.x; } }]) {
  expect(obj.m()).toBe(7);
}

const make = value => ({ ...{}, __proto__: { x: value }, m() { return super.x; } });
expect(make(3).m()).toBe(3);

function* objects() {
  const obj = { ...{}, __proto__: { x: yield 4 }, *m() { yield super.x; } };
  return obj.m().next().value;
}
const iterator = objects();
expect(iterator.next()).toEqual({ value: 4, done: false });
expect(iterator.next(5)).toEqual({ value: 5, done: true });
