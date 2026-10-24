const d = "d";
const results = [];
for (const { a = d, ...r } of [{ b: 1 }]) {
  let unrelated = 2;
  results.push([a, r, unrelated]);
}
try {
  throw { a: "a", c: 3 };
} catch ({ a = d, ...r }) {
  let unrelated = 4;
  results.push([a, r, unrelated]);
}
expect(results).toEqual([
  ["d", { b: 1 }, 2],
  ["a", { c: 3 }, 4],
]);
