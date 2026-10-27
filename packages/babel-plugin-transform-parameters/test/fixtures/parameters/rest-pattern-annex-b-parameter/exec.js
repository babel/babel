// A function declared in a block is only declared as a `var` of the function
// (Annex B) when its name is not a parameter: the body moved into an IIFE
// must keep that exclusion.
function f(a, ...[b]) {
  var b = 1;
  {
    function a() {}
  }
  return typeof a;
}
expect(f(1)).toBe("number");
