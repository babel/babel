// The defaults are moved into the body, which is wrapped in a function so
// that they keep referencing the outer `q`.
var q = "outer";
function g({ ...R }, a = R, f = q) {
  let q = "inner";
  return [R, a, f, q];
}
expect(g({ x: 1 })).toEqual([{ x: 1 }, { x: 1 }, "outer", "inner"]);
