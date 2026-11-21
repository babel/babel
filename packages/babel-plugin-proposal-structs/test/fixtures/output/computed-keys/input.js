struct S {
  [a()] = 1;
  [b()];
  ["literal"] = 2;
  [3] = 3;
  [c()]() {}
  static [d()] = 4;
  [e()] = function () {};
}
