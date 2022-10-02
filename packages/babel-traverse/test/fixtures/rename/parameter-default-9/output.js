let a = "outside";
function r(z, g = (a, b = a) => a) {
  g(z);
}
