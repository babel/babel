let a = "outside";
function f(g = () => a) {
  let z = "inside";
  return g();
}
