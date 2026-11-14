function f(a, ...[b]) {
  var b = 1;
  {
    function a() {}
  }
  return typeof a;
}
