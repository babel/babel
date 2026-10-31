function f({ ...r }, b = 1) {
  {
    function r() {}
  }
  return r;
}
function g({ ...s }) {
  if (s) function s() {}
  return typeof s;
}
