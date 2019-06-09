let a = "outside";

function f(g = () => a) {
  let a = "inside";
  return g();
}

function h(a, g = () => a) {
  return g();
}

function j(g = a) {
  let a = "inside";
  return g;
}
