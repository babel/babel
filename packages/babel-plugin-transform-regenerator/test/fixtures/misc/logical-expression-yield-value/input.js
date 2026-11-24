function* f(a) {
  return [(yield "x") || a, (yield "y") && a, a || (yield "z")];
}
