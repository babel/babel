let a = "outside";
function f([{
  [a]: g
}]) {
  let z = "inside";
  return g;
}
