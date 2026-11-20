function* gen(obj, target) {
  for (target[yield "key"] in obj) yield target;
  for ((yield "object").key in obj);
}

const target = {};
const other = {};
const it = gen({ a: 1, b: 2 }, target);

expect(it.next()).toEqual({ value: "key", done: false });
expect(it.next("x")).toEqual({ value: target, done: false });
expect(target).toEqual({ x: "a" });
expect(it.next()).toEqual({ value: "key", done: false });
expect(it.next("y")).toEqual({ value: target, done: false });
expect(target).toEqual({ x: "a", y: "b" });

expect(it.next()).toEqual({ value: "object", done: false });
expect(it.next(other)).toEqual({ value: "object", done: false });
expect(other).toEqual({ key: "a" });
expect(it.next(other)).toEqual({ value: undefined, done: true });
expect(other).toEqual({ key: "b" });
