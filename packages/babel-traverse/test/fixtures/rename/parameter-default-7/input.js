let a = "outside";

function n(a, g = (a = a) => {}) {
  a = "inside";
}
