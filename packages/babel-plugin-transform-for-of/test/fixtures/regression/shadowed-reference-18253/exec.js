const obj = {};
for (obj.value of [1]) {
  const obj = 2;
  expect(obj).toBe(2);
}
expect(obj.value).toBe(1);

const o = {};
const key = "k";
for (o[key] of new Set([1])) {
  const key = "other";
}
expect(o).toEqual({ k: 1 });

const def = "outer";
const seen = [];
for (const { a = def } of [{}]) {
  const def = "inner";
  seen.push(a);
}
expect(seen).toEqual(["outer"]);

const name = "outer";
let fromClosure;
for (const { fn = () => name } of [{}]) {
  const name = "inner";
  fromClosure = fn();
}
expect(fromClosure).toBe("outer");
