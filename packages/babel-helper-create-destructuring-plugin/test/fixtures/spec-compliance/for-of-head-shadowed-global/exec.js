// The pattern is evaluated outside of the loop body, even for names with no
// declaration in the outer scopes.
globalThis.shadowedGlobal = 1;
const results = [];
for (const { a = shadowedGlobal, ...rest } of [{ b: 2 }]) {
  let shadowedGlobal = 3;
  results.push([a, rest, shadowedGlobal]);
}
let a, rest;
for ({ a = shadowedGlobal, ...rest } of [{ c: 4 }]) {
  let shadowedGlobal = 5;
  results.push([a, rest, shadowedGlobal]);
}
expect(results).toEqual([
  [1, { b: 2 }, 3],
  [1, { c: 4 }, 5],
]);
delete globalThis.shadowedGlobal;
