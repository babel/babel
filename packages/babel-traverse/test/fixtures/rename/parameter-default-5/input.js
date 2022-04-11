let a = "outside";

function f([{
  [a]: g
}]) {
  let a = "inside";
  return g;
}
