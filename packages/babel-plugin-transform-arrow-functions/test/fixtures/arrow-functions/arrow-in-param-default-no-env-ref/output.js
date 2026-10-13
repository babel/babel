function f(cb = function () {
  return 1;
}) {
  return cb();
}
