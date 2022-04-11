let a = "outside";

function q(a, g = (b = a) => b) {
  g(a);
}
