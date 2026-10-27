// The default values of a rest parameter pattern can't see the declarations
// of the function body, like those of the other parameters.
var x = "outer";
function f(...[{ a = () => x, ...r }]) {
  var x = "inner";
  return [a(), r];
}
expect(f({ b: 1 })).toEqual(["outer", { b: 1 }]);
