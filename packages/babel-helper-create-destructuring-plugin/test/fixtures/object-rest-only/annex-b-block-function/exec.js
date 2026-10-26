// A function declared in a block is only declared as a `var` of the function
// (Annex B) when its name is not a parameter: the names bound by a lowered
// parameter must stay excluded.
function f({ ...r }, b = 1) {
  {
    function r() {}
  }
  return r;
}
expect(f({ x: 1 }, 2)).toEqual({ x: 1 });

function g({ ...s }) {
  if (s) function s() {}
  return typeof s;
}
expect(g({ y: 1 })).toBe("object");
