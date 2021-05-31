let a = "outside";

function f(g = () => a) {
  let a = "inside";
  return g();
}

