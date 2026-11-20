function* gen(obj) {
  const { a, b: [c, d = 1], ...rest } = yield obj;
  let [e, , ...f] = obj.list, { g } = obj;
  for (let i = 0, { h } = obj; i < h; i++) yield i;
  for (var [k, l] in obj) yield k + l;
  return [a, c, d, rest, e, f, g];
}

const obj = { list: [1, 2, 3, 4], g: "g", h: 2 };
const it = gen(obj);
expect(it.next()).toEqual({ value: obj, done: false });
expect(it.next({ a: "a", b: ["c"], z: "z" })).toEqual({ value: 0, done: false });
expect(it.next()).toEqual({ value: 1, done: false });
expect(it.next()).toEqual({ value: "li", done: false });
expect(it.next()).toEqual({ value: "gundefined", done: false });
expect(it.next()).toEqual({ value: "hundefined", done: false });
expect(it.next()).toEqual({
  value: ["a", "c", 1, { z: "z" }, 1, [3, 4], "g"],
  done: true,
});

async function fn(promise) {
  const { x, y: [z] } = await promise;
  return x + z;
}

return fn(Promise.resolve({ x: 1, y: [2] })).then(result => {
  expect(result).toBe(3);
});
