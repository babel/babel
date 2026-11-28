let z = "outside";
function f(b = z, {
  c = z
} = {}) {
  var a = "inside";
  return [a, b, c];
}
const g = (b = z) => {
  let a;
  return b;
};
const o = {
  m(b = z) {
    function a() {}
    return b;
  }
};
function h(a, b = a) {
  var a;
  return b;
}
