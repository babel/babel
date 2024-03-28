function test() {
  (throw 1, 2);
  (3, throw 4);
  f(throw 5, 6);
  f(7, throw 8);
}
