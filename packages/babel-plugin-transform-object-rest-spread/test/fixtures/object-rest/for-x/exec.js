// ForXStatement
for (var {a, ...b} of []) {}
for ({a, ...b} of []) {}
async function a() {
  for await ({a, ...b} of []) {}
}

// skip
for ({a} in {}) {}
for ({a} of []) {}
async function a() {
  for await ({a} of []) {}
}

for (a in {}) {}
for (a of []) {}
async function a() {
  for await (a of []) {}
}

// Nothing is iterated: `a` is still the last hoisted function declaration.
expect(typeof a).toBe("function");
expect(b).toBeUndefined();
var lastA = a();

// The same loops over non-empty iterables.
for (var {a, ...b} of [{ a: 1, b: 2, c: 3 }]) {}
expect(a).toBe(1);
expect(b).toEqual({ b: 2, c: 3 });

for ({a, ...b} of [{ a: 4, d: 5 }, { a: 6, e: 7 }]) {}
expect(a).toBe(6);
expect(b).toEqual({ e: 7 });

for ({a} in { xy: 1 }) {}
expect(a).toBeUndefined();
for ({a} of [{ a: 8 }]) {}
expect(a).toBe(8);

for (a in { k1: 1, k2: 2 }) {}
expect(a).toBe("k2");
for (a of [9, 10]) {}
expect(a).toBe(10);

// The results of the async functions can't be checked: the exec test can't
// return a promise, since `return` outside of a function isn't allowed here.
async function forAwaitRest() {
  for await ({a, ...b} of [Promise.resolve({ a: 11, f: 12 }), { a: 13, g: 14 }]) {}
  return [a, b];
}
expect(lastA).toBeInstanceOf(Promise);
expect(forAwaitRest()).toBeInstanceOf(Promise);
