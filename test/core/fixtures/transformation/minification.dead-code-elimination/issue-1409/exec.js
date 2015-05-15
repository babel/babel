class A {
  k() { return 12345; }
}

assert.equal((new A()).k(), 12345);
