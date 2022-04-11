let a = "outside";

function r(a, g = (a, b = a) => a) {
  g(a);
}
