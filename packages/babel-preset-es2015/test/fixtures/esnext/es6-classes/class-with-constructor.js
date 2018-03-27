class Multiplier {
  constructor(n=1) {
    this.n = n;
  }

  multiply(n=1) {
    return n * this.n;
  }
}

expect(new Multiplier().n).toBe(1);
expect(new Multiplier(6).n).toBe(6);
expect(new Multiplier().multiply()).toBe(1);
expect(new Multiplier(2).multiply(3)).toBe(6);
