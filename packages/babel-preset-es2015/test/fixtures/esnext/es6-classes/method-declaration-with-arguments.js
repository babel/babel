class Tripler {
  triple(n) {
    return n * 3;
  }
}

expect(new Tripler().triple(2)).toBe(6);
