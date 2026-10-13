function f(cb = () => new.target) {
  return cb();
}
