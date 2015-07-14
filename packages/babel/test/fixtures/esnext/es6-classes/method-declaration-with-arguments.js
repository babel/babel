class Tripler {
  triple(n) {
    return n * 3;
  }
}

assert.equal(new Tripler().triple(2), 6);
