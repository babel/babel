let a = "outside";

function h(a, g = () => a) {
  return g();
}
