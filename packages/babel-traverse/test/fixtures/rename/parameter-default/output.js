let a = "outside";

function f(g = () => a) {
  let z = "inside";
  return g();
}

function h(z, g = () => z) {
  return g();
}

function j(g = a) {
  let z = "inside";
  return g;
}

function k([{
  g = a
}]) {
  let z = "inside";
  return g;
}

function l([{
  [a]: g
}]) {
  let z = "inside";
  return g;
}
