var x = "outer";
function f(...[{ a = () => x, ...r }]) {
  var x = "inner";
  return [a(), r];
}
