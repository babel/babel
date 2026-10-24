const results = [];
for (const { a, b: [c = 10, ...d] = [], ...rest } of [{ a: 1, b: [2, 3, 4], e: 5 }, { a: 6 }]) {
  results.push([a, c, d, rest]);
}
expect(results).toEqual([[1, 2, [3, 4], { e: 5 }], [6, 10, [], {}]]);

let x, y;
for ({ x, ...y } of [{ x: 1, z: 2 }]) {
  expect(x).toBe(1);
  expect(y).toEqual({ z: 2 });
}
