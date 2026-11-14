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

let assigned = 0;
for (const { a = (assigned = 1) } of [{}]) {
  let assigned = 5;
}
expect(assigned).toBe(1);

let updated = 0;
for (const { a = (updated += 1) } of [{}]) {
  let updated = 5;
}
expect(updated).toBe(1);

const target = {};
let computed;
for (target[(computed = "z")] of [1]) {
  let computed;
}
expect(computed).toBe("z");
expect(target).toEqual({ z: 1 });

let fromArray;
for (const { a = ([fromArray] = [1]) } of [{}]) {
  let fromArray;
}
expect(fromArray).toBe(1);

let fromObject;
for (const { a = ({ fromObject } = { fromObject: 2 }) } of [{}]) {
  let fromObject;
}
expect(fromObject).toBe(2);

let setInClosure = 0;
for (const { fn = () => { setInClosure = 1; } } of [{}]) {
  let setInClosure;
  fn();
}
expect(setInClosure).toBe(1);

const nested = {};
let nestedKey;
for ({ a: nested[(nestedKey = "y")] } of [{ a: 3 }]) {
  let nestedKey;
}
expect(nestedKey).toBe("y");
expect(nested).toEqual({ y: 3 });
