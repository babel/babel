// The results of the async functions can't be checked: the exec test can't
// return a promise, since `return` outside of a function isn't allowed here.
var promises = [];

// ForXStatement
{
  let a, b;
  for (const [{a, ...b}] of []) {}
  for ([{a, ...b}] of []) {}
  async function f() {
    for await ([{a, ...b}] of []) {}
  }

  for (const { a: [{a, ...b}] } of []) {}

  // The async function is called to check that it runs.
  promises.push(f());
  expect(a).toBeUndefined();
  expect(b).toBeUndefined();
}

// skip
{
  for ([{a}] in {}) {}
  for ([{a}] of []) {}
  async function a() {
    for await ([{a}] of []) {}
  }

  promises.push(a());
}
{
  for ([a, ...b] in {}) {}
  for ([a, ...b] of []) {}
  async function a() {
    for await ([a, ...b] of []) {}
  }

  promises.push(a());
}

// The same loops over non-empty iterables.
{
  let a, b;
  for (const [{a, ...b}] of [[{ a: 1, x: 2 }]]) {
    expect(a).toBe(1);
    expect(b).toEqual({ x: 2 });
  }
  expect(a).toBeUndefined();
  expect(b).toBeUndefined();

  for ([{a, ...b}] of [[{ a: 3, y: 4 }], [{ a: 5, z: 6 }]]) {}
  expect(a).toBe(5);
  expect(b).toEqual({ z: 6 });

  async function f() {
    for await ([{a, ...b}] of [Promise.resolve([{ a: 7, w: 8 }])]) {}
    return [a, b];
  }
  promises.push(f());

  for (const { a: [{a, ...b}] } of [{ a: [{ a: 9, v: 10 }] }]) {
    expect(a).toBe(9);
    expect(b).toEqual({ v: 10 });
  }
}
{
  let a, b;
  for ([{a}] in { xy: 1 }) {}
  expect(a).toBeUndefined();
  for ([{a}] of [[{ a: 11 }]]) {}
  expect(a).toBe(11);
  async function f() {
    for await ([{a}] of [Promise.resolve([{ a: 12 }])]) {}
    return a;
  }
  promises.push(f());

  for ([a, ...b] in { xyz: 1 }) {}
  expect(a).toBe("x");
  expect(b).toEqual(["y", "z"]);
  for ([a, ...b] of [[13, 14, 15]]) {}
  expect(a).toBe(13);
  expect(b).toEqual([14, 15]);
}

expect(promises).toHaveLength(5);
promises.forEach(promise => expect(promise).toBeInstanceOf(Promise));
