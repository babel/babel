function test() {
  this[do { return 42 }] += 1;
}
