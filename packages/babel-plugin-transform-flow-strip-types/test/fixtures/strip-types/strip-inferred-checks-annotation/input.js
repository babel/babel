var f = (x): %checks => typeof x === "string";
var g = (x: mixed): boolean %checks => typeof x === "string";
function h(x: mixed): %checks {
  return typeof x === "string";
}
