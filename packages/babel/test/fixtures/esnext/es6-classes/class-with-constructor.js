class Multiplier {
  constructor(n=1) {
    this.n = n;
  }

  multiply(n=1) {
    return n * this.n;
  }
}

assert.equal(new Multiplier().n, 1);
assert.equal(new Multiplier(6).n, 6);
assert.equal(new Multiplier().multiply(), 1);
assert.equal(new Multiplier(2).multiply(3), 6);
